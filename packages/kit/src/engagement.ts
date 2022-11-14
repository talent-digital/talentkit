class Engagement {
  private _points = 0;

  private readonly storageKey = "ENGAGEMENT_POINTS";

  constructor(private storage: Storage) {
    const pointsStorage = storage.getItem(this.storageKey);
    if (pointsStorage) {
      this._points = JSON.parse(pointsStorage).points;
    }
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
    let data = s ? JSON.parse(s) : {};
    s = { ...data, points: this._points };
    this.storage.setItem(this.storageKey, JSON.stringify(data));
  }
}

export default Engagement;
