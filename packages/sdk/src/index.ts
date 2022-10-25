import { AuthService } from "./auth.service";
import { Episode } from "./episode";
import { AppConfig, AppState, HttpClient } from "./interfaces";
import { MockAuthService, mockKy } from "./mocks";

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
class TdSdk {
  private episode?: Episode;

  private _state: AppState = {};

  public get state(): AppState {
    return this._state;
  }

  public get auth(): AuthService | MockAuthService {
    return this._auth;
  }

  private constructor(
    private _auth: AuthService | MockAuthService,
    private http: HttpClient,
    private config: AppConfig
  ) {
    if (config.processUrl) this._state = this.processUrl();
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
      return new TdSdk(auth, http, config);
    }

    throw new Error(`Coudn't initialize the library`);
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

  navigateToDashboard = () => {
    if (this.state.redirectUrl) {
      window.location.href = this.state.redirectUrl;
    } else {
      throw Error("Redirect url is not set");
    }
  };

  private processUrl = (): AppState => {
    const params = new URLSearchParams(window.location.search);

    const state: AppState = {
      redirectUrl: params.get("redirectUrl") || "",
      sid: params.get("sid") || "",
      eid: params.get("eid") || "",
    };

    if (!state.sid?.length || !state.eid?.length) {
      if (state?.redirectUrl?.length) {
        window.location.href = state.redirectUrl;
      } else {
        window.history.back();
      }
    }

    return state;
  };
}

export default TdSdk;
