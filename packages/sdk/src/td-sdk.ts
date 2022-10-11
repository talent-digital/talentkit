import Keycloak from "keycloak-js";
import ky from "ky";
import { Episode } from "./episode";
import { AuthClient, AuthConfig, HttpClient } from "./interfaces";
import { MockKeycloak, mockKy } from "./mocks";

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
export class TdSdk {
  private constructor(private http: HttpClient) {}

  private episode?: Episode;

  static async create(config: AuthConfig, testMode?: boolean) {
    let http: HttpClient;
    let auth: AuthClient;

    if (testMode) {
      auth = new MockKeycloak(config);
      http = mockKy.create({});

      return new TdSdk(http);
    }

    auth = new Keycloak(config);
    const authenticated = await auth.init({
      onLoad: "check-sso",
    });

    if (!authenticated) auth.login({ maxAge: 100000 });

    auth.onTokenExpired = async () => {
      await auth.updateToken(5);
    };

    http = ky.create({
      prefixUrl: "/api/",
      hooks: {
        beforeRequest: [
          async (request) => {
            await auth.updateToken(5);
            request.headers.set("Authorization", `Bearer ${auth.token}`);
          },
        ],
      },
      timeout: false,
    });

    return new TdSdk(http);
  }

  async createEpisode(id: string) {
    this.episode = await Episode.create(id, this);
    return this.episode;
  }

  async request(url: string, method: "get" | "post" = "get", options?: any) {
    switch (method) {
      case "get":
        return this.http.get(url).then((res) => res.json());
      case "post":
        return this.http.post(url, options);
    }
  }
}
