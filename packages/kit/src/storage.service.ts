import { applicationId } from ".";
import { ApiClient } from "./interfaces";

class RemoteStorage implements Storage {
  private constructor(
    private api: ApiClient,
    private state: Record<string, any> = {}
  ) {}
  get length(): number {
    return Object.keys(this.state).length;
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

  static async create(api: ApiClient) {
    const { data } = await api.utilitiesSavegame.getResult(applicationId);

    const state = data ? JSON.parse(data.state) : {};

    return new RemoteStorage(api, state);
  }

  getItem(key: string): string | null {
    const value = this.state[key];
    return value ? JSON.stringify(value) : null;
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

export default RemoteStorage;