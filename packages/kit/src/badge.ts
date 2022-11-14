import { Badges, ID } from "./interfaces";
import type Storage from "./storage.service";

class Badge {
  private readonly storageKey = "BADGES_ENGINE_STORAGE";
  private constructor(readonly id: string, private storage: Storage) {}

  /**
   * Award this badge to the current user
   */
  award() {
    const obtained = this.storage.getItem(this.storageKey) || [];
    this.storage.setItem(this.storageKey, [...obtained, this.id]);
  }

  /**
   * Has this badge already been awarded
   */
  get awarded(): boolean {
    const obtained: string[] = this.storage.getItem(this.storageKey) || [];
    return obtained.includes(this.id);
  }

  /**
   * Create the badges for this episode
   * @param id The ID object for this episode
   * @param storage
   * @returns Record<Badge["id"], Badge>
   */
  static createForEpisode(id: ID, storage: Storage): Badges {
    // Get badges for this episode from the Season Endpoint;
    const ids = ["1", "2"];

    return Object.fromEntries(
      ids.map((badgeId) => [badgeId, new Badge(badgeId, storage)])
    );
  }
}

export default Badge;
