import {
  EpisodeResponseWeb,
  LocalizedStringImpl,
} from "@talentdigital/api-client";
import { Badges, BadgesStorage } from "./interfaces";
import StorageService from "./storage.service";

class Badge {
  private readonly storageKey = "BADGES_ENGINE_STORAGE";

  private constructor(
    readonly id: string,
    readonly name: LocalizedStringImpl,
    readonly image: string,
    private storage: StorageService
  ) {}

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
  static createForEpisode(
    info: EpisodeResponseWeb,
    storage: StorageService
  ): Badges {
    if (!info?.badges) return {};

    return Object.fromEntries(
      Object.entries(info.badges).map(([id, { name, image }]) => [
        id,
        new Badge(id, name, image, storage),
      ])
    );
  }

  /**
   * Award this badge to the current user
   */
  award() {
    if (this.awarded) return;
    const awardedBadges =
      this.storage.getItem<BadgesStorage>(this.storageKey) || [];

    this.storage.setItem<BadgesStorage>(this.storageKey, [
      ...awardedBadges,
      this.id,
    ]);
  }
}

export default Badge;
