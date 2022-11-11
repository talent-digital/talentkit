import { applicationId } from ".";
import { ApiClient, State } from "./interfaces";

class Storage {
  private constructor(
    private state: State,
    private api: ApiClient,
    private _savegame: Record<string, any> = {}
  ) {}

  static async create(state: State, api: ApiClient) {
    const { data } = await api.utilitiesSavegame.getResult(applicationId);

    const savegame = JSON.parse(data.state);

    return new Storage(state, api, savegame);
  }

  save(object: any) {
    this._savegame[this.state.sid][this.state.eid] = object;
    this.sync();
  }

  load() {
    return this._savegame[this.state.sid][this.state.eid];
  }

  get profile() {
    return this._savegame["SETTINGS"] || {};
  }

  private sync() {
    this.api.utilitiesSavegame.saveOrUpdateState({
      applicationId,
      state: JSON.stringify(this._savegame),
    });
  }
}

export default Storage;
