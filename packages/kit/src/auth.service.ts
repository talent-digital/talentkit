import Keycloak from "keycloak-js";
import { AuthClient } from "./interfaces";

const devTenants = ["devtd2", "internaldemo"];

const domains = {
  dev: "talentdigit.al",
  prod: "talentdigital.eu",
};

export class AuthService {
  private constructor(protected auth: AuthClient) {
    this.auth.onTokenExpired = async () => {
      if (this.auth.token) {
        await this.auth.updateToken(5);
      }
    };
  }

  get token() {
    return this.auth.token as string;
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

  updateToken() {
    this.auth.updateToken(5);
  }
}
