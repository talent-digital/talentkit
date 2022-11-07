import Keycloak from "keycloak-js";
import { AuthClient, Environment, IAuthService } from "./interfaces";

export type KeycloakRole =
  | "talent_admin"
  | "talent_article_author"
  | "talent_company_report";

const devTenants = ["devtd2", "internaldemo"];

const domains = {
  dev: "talentdigit.al",
  prod: "talentdigital.eu",
};

export class AuthService implements IAuthService {
  private constructor(protected auth: AuthClient) {
    this.auth.onTokenExpired = async () => {
      if (this.auth.token) {
        await this.auth.updateToken(5);
      }
    };
  }

  static async create(tenant: string) {
    const domain = devTenants.includes(tenant) ? domains.dev : domains.prod;

    const realm = `talentdigital-${tenant}`;
    const url = `https://${tenant}.${domain}/auth`;
    const clientId = "td-profile2";

    const auth = new Keycloak({ realm, url, clientId });

    try {
      const authenticated = await auth.init({
        onLoad: "check-sso",
      });
      if (authenticated) {
        return new AuthService(auth);
      } else {
        auth.login({ maxAge: 100000 });
      }
    } catch (e) {
      alert("Error authenticating");
      console.error(e);
    }
  }

  get token() {
    return this.auth.token as string;
  }

  updateToken() {
    this.auth.updateToken(5);
  }

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
