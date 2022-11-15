import { Badges, ID } from "./interfaces";

class Badge {
  private readonly storageKey = "BADGES_ENGINE_STORAGE";
  private constructor(readonly id: string, private storage: Storage) {}

  /**
   * Has this badge already been awarded
   */
  get awarded(): boolean {
    const storageItem = this.storage.getItem(this.storageKey);
    const obtained = storageItem ? (JSON.parse(storageItem) as string[]) : [];

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

  /**
   * Award this badge to the current user
   */
  award() {
    const storageItem = this.storage.getItem(this.storageKey);
    const obtained = storageItem ? (JSON.parse(storageItem) as string[]) : [];
    this.storage.setItem(
      this.storageKey,
      JSON.stringify([...obtained, this.id])
    );
  }
}

export default Badge;
