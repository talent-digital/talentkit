import Keycloak from "keycloak-js";
import { AuthClient, AuthConfig, HttpClient } from "./interfaces";
import ky from "ky";

export type KeycloakRole =
  | "talent_admin"
  | "talent_article_author"
  | "talent_company_report";

export class AuthService {
  private constructor(protected auth: AuthClient) {
    auth.onAuthSuccess = async () => {
      if (auth.token) {
        await this.updateServiceWorker();
      }
    };

    this.auth.onTokenExpired = async () => {
      if (this.auth.token) {
        await this.auth.updateToken(5);
        await this.updateServiceWorker();
      }
    };

    if ("serviceWorker" in navigator)
      navigator.serviceWorker.addEventListener(
        "message",
        this.updateServiceWorker
      );
  }

  static async create(config: AuthConfig) {
    const auth = new Keycloak(config);

    try {
      const authenticated = await auth.init({
        onLoad: "check-sso",
      });
      if (authenticated) {
        if (!("serviceWorker" in navigator)) {
          alert(
            "Your browser is missing Service Worker functionality. Some images and videos may not load correctly."
          );
        }

        return new AuthService(auth);
      } else {
        auth.login({ maxAge: 100000 });
      }
    } catch (e) {
      alert("Error authenticating");
      console.error(e);
    }
  }

  private updateServiceWorker = async () => {
    if ("serviceWorker" in navigator && this.auth.token) {
      await navigator.serviceWorker.ready;

      navigator.serviceWorker.controller?.postMessage({
        token: this.auth.token,
      });
    }
  };

  createHttp = (): HttpClient => {
    return ky.create({
      prefixUrl: "/api/",
      hooks: {
        beforeRequest: [
          async (request) => {
            await this.auth.updateToken(5);
            request.headers.set("Authorization", `Bearer ${this.auth.token}`);
          },
        ],
      },
      timeout: false,
    });
  };

  userHasRole = (role: KeycloakRole): boolean => {
    if (this.auth.tokenParsed) {
      return this.auth.tokenParsed.realm_access?.roles.includes(role) || false;
    } else {
      throw new Error("Keycloak token has not been parsed");
    }
  };

  getUser = () => {
    if (this.auth.tokenParsed) {
      return this.auth.tokenParsed as any;
    } else {
      throw new Error("Keycloak token has not been parsed");
    }
  };

  getUserFullname = (): string => {
    if (this.auth.tokenParsed) {
      return (this.auth.tokenParsed as any)?.name;
    } else {
      throw new Error("Keycloak token has not been parsed");
    }
  };

  getUserEmail = (): string => {
    if (this.auth.tokenParsed) {
      return (this.auth.tokenParsed as any)?.email;
    } else {
      throw new Error("Keycloak token has not been parsed");
    }
  };
}
