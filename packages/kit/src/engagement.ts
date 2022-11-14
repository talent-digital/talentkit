import type Storage from "./storage.service";

class Engagement {
  private _points = 0;

  private readonly storageKey = "ENGAGEMENT_POINTS";

  constructor(private storage: Storage) {
    this._points = storage.getItem(this.storageKey).points;
  }

  get points() {
    return this._points;
  }

  add(points: number): number {
    this._points += points;
    this.sync();
    return this._points;
  }

  private sync() {
    let s = this.storage.getItem(this.storageKey);
    s = { ...s, points: this._points };
    this.storage.setItem(this.storageKey, s);
  }
}

export default Engagement;
