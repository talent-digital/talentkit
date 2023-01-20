import Keycloak from "keycloak-js";
import { getBaseUrl } from "./helpers";
import { AuthClient } from "./interfaces";

export class AuthService {
  private constructor(protected auth: AuthClient) {
    this.auth.onTokenExpired = () => {
      if (this.auth.token) {
        void this.auth.updateToken(5);
      }
    };
  }

  get token() {
    return this.auth.token as string;
  }

  get user() {
    if (!this.auth.tokenParsed) throw "Token has not been parsed";
    return this.auth.tokenParsed;
  }

  static async create(tenant: string) {
    const realm = `talentdigital-${tenant}`;
    const url = `${getBaseUrl(tenant)}/auth`;
    const clientId = "td-profile2";

    const auth = Keycloak({ realm, url, clientId });

    try {
      const authenticated = await auth.init({
        onLoad: "check-sso",
      });
      if (authenticated) {
        return new AuthService(auth);
      } else {
        await auth.login({ maxAge: 100000 });
      }
    } catch (e) {
      alert("Error authenticating");
      console.error(e);
    }
  }

  updateToken() {
    return this.auth.updateToken(5);
  }
}
