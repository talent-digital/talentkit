import TdSdk from "..";
import { DBStore, UserProfile } from "./interfaces";

const applicationId = "talentApplicationProfileTwo";

export class TdStorage {
  private state: Record<string, any> = {};

  private constructor(
    protected sdk: TdSdk,
    private readonly sid: string,
    private readonly eid: string
  ) {}

  static async create(sid: string, eid: string, sdk: TdSdk) {
    const storage = new TdStorage(sdk, sid, eid);
    storage.state = await storage.init();

    return storage;
  }

  private init = async () => {
    const data = (await this.sdk.request(
      `profile/application/${applicationId}`,
      "get"
    )) as DBStore;

    return data && data.state ? JSON.parse(data.state) : {};
  };

  public getUserProfile = (): UserProfile | undefined => {
    return this.state["SETTINGS"];
  };

  public save = (data: any) => {
    if (!this.state[this.sid]) {
      this.state[this.sid] = {
        [this.eid]: data,
      };
    } else {
      this.state[this.sid][this.eid] = data;
    }

    this.sync();
  };

  private sync = async () => {
    return this.sdk.request("", "post", {
      json: this.state,
    });
  };
}
