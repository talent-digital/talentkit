import { Badges, BadgesStorage, ID } from "./interfaces";
import StorageService from "./storage.service";

class Badge {
  private readonly storageKey = "BADGES_ENGINE_STORAGE";
  private constructor(readonly id: string, private storage: StorageService) {}

  /**
   * Has this badge already been awarded
   */
  get awarded(): boolean {
    const awardedBadges =
      this.storage.getItem<BadgesStorage>(this.storageKey) || [];

    return awardedBadges.includes(this.id);
  }

  /**
   * Create the badges for this episode
   * @param id The ID object for this episode
   * @param storage
   * @returns Record<Badge["id"], Badge>
   */
  static createForEpisode(id: ID, storage: StorageService): Badges {
    // Get badges for this episode from the Season Endpoint;
    const ids = ["1", "2"];

    return Object.fromEntries(
      ids.map((badgeId) => [badgeId, new Badge(badgeId, storage)])
    );
  }

  /**
   * Award this badge to the current user
   */
  award() {
    const awardedBadges =
      this.storage.getItem<BadgesStorage>(this.storageKey) || [];

    this.storage.setItem<BadgesStorage>(this.storageKey, [
      ...awardedBadges,
      this.id,
    ]);
  }
}

export default Badge;
