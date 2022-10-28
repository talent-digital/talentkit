import { AuthService } from "./auth.service";
import { Episode } from "./episode";
import { AppConfig, AppState, HttpClient } from "./interfaces";
import { MockAuthService, mockKy } from "./mocks";
import { Storage } from "./storage/storage";

const processUrl = (): AppState => {
  const params = new URLSearchParams(window.location.search);

  const state: AppState = Object.fromEntries(params.entries());
  if (!state.sid || !state.eid) {
    if (state.redirectUrl?.length) {
      window.location.href = state.redirectUrl;
    } else {
      window.history.back();
    }
  }
  return state;
};

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
class TdSdk {
  public episode?: Episode;

  public storage?: Storage;

  readonly state: AppState = {};

  private constructor(
    readonly auth: AuthService | MockAuthService,
    protected http: HttpClient,
    protected config: AppConfig
  ) {
    if (config.notProcessUrl) {
      this.state = {
        eid: config.processedUrlData?.eid,
        sid: config.processedUrlData?.sid,
        redirectUrl: config.processedUrlData?.redirectUrl,
      };
    } else {
      this.state = processUrl();
    }
  }

  static async create(config: AppConfig) {
    if (config.testMode) {
      const auth = await MockAuthService.create(config.auth, () => {});
      const http = mockKy.create({});

      return new TdSdk(auth, http, config);
    }

    const auth = await AuthService.create(config.auth);
    const http = auth?.createHttp();

    if (auth && http) {
      const sdk = new TdSdk(auth, http, config);
      await sdk.createStorage();
      await sdk.createEpisode(sdk.state.eid || "");

      return sdk;
    }

    throw new Error(`Coudn't initialize the library`);
  }

  async createEpisode(id: string) {
    this.episode = await Episode.create(id, this);

    return this.episode;
  }

  async createStorage() {
    if (this.state.sid && this.state.eid) {
      this.storage = await Storage.create(this.state.sid, this.state.eid, this);

      return this.storage;
    }

    throw new Error(`Coudn't initialize storage - sid and eid are missing`);
  }

  async request(url: string, method: "get" | "post" = "get", options?: any) {
    switch (method) {
      case "get":
        return this.http.get(url).then((res) => res.json());
      case "post":
        return this.http.post(url, options);
    }
  }

  navigateToDashboard = () => {
    if (this.state.redirectUrl) {
      window.location.href = this.state.redirectUrl;
    } else {
      throw Error("Redirect url is not set");
    }
  };
}

export default TdSdk;
