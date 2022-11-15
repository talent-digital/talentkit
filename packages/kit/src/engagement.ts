import { EngagementPointsStorage } from "./interfaces";
import StorageService from "./storage.service";

class Engagement {
  private _points = 0;

  private readonly storageKey = "ENGAGEMENT_POINTS";

  constructor(private storage: StorageService) {
    const pointsStorage = storage.getItem<EngagementPointsStorage>(
      this.storageKey
    );
    if (pointsStorage) {
      this._points = pointsStorage.points;
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
    let data = this.storage.getItem<EngagementPointsStorage>(this.storageKey);

    if (data) {
      data = { ...data, points: this._points };
      this.storage.setItem<EngagementPointsStorage>(this.storageKey, data);
    }
  }
}

export default Engagement;
