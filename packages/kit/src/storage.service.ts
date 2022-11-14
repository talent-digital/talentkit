import { applicationId } from ".";
import { ApiClient } from "./interfaces";

class Storage {
  private constructor(
    private api: ApiClient,
    private state: Record<string, any> = {}
  ) {}

  static async create(api: ApiClient) {
    const { data } = await api.utilitiesSavegame.getResult(applicationId);

    const state = data ? JSON.parse(data.state) : {};

    return new Storage(api, state);
  }

  getItem(key: string) {
    return this.state[key];
  }

  setItem(key: string, payload: any) {
    this.state[key] = payload;
    this.sync();
  }

  private sync() {
    this.api.utilitiesSavegame.saveOrUpdateState({
      applicationId,
      state: JSON.stringify(this.state),
    });
  }
}

export default Storage;
