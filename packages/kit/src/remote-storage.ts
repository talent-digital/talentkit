import { ApiClient } from "./interfaces";

class RemoteStorage implements Storage {
  private constructor(
    private api: ApiClient,
    private state: Record<string, unknown> = {},
    private savegameKeyId: string
  ) {}
  get length(): number {
    return Object.keys(this.state).length;
  }

  static async create(api: ApiClient, savegameKeyId: string) {
    const { data } = await api.utilitiesSavegame.getResult(savegameKeyId);

    const state = data?.state
      ? (JSON.parse(data.state) as Record<string, unknown>)
      : {};

    return new RemoteStorage(api, state, savegameKeyId);
  }
  clear(): void {
    this.state = {};
    this.sync();
  }
  key(index: number): string | null {
    return Object.keys(this.state)[index] || null;
  }
  removeItem(key: string): void {
    delete this.state[key];
    this.sync();
  }

  getItem(key: string): string | null {
    const value = this.state[key];
    return value ? JSON.stringify(value) : null;
  }

  setItem(key: string, payload: string) {
    this.state[key] = JSON.parse(payload);
    this.sync();
  }

  private sync() {
    void this.api.utilitiesSavegame.saveOrUpdateState({
      applicationId: this.savegameKeyId,
      state: JSON.stringify(this.state),
    });
  }
}

export default RemoteStorage;
