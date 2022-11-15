class StorageService {
  constructor(private storage: Storage) {}

  getItem<T = unknown>(key: string): T | null {
    const s = this.storage.getItem(key);

    const data = s ? (JSON.parse(s) as T) : null;

    return data;
  }

  setItem<T = unknown>(key: string, payload: T): void {
    this.storage.setItem(key, JSON.stringify(payload));
  }
}

export default StorageService;
