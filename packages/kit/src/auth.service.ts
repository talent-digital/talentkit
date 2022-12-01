import Keycloak from "keycloak-js";
import { AuthClient } from "./interfaces";

const devTenants = ["devtd2", "internaldemo"];

const domains = {
  dev: "talentdigit.al",
  prod: "talentdigital.eu",
};

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
