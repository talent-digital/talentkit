import { EpisodeWeb, LocalizedString } from "@talentdigital/api-client";
import { ApiClient, Badges } from "./interfaces";

class Badge {
  private constructor(
    readonly id: string,
    readonly name: LocalizedString,
    readonly image: string,
    private _awarded: boolean,
    private seasonId: string,
    private apiClient: ApiClient
  ) {}

  get awarded() {
    return this._awarded;
  }

  private set awarded(value: boolean) {
    this._awarded = value;
  }

  /**
   * Create the badges for this episode
   * @param id The ID object for this episode
   */
  static async createForEpisode(
    info: EpisodeWeb,
    seasonId: string,
    apiClient: ApiClient
  ): Promise<Badges> {
    const episodeBadges = info.badges ?? {};
    const { data: awardedList } =
      await apiClient.domainModelTalentBadges.getAwarded({
        format: "json",
      });

    return Object.fromEntries(
      Object.entries(episodeBadges).map(([id, { name, image }]) => {
        const awarded = awardedList.map(({ badgeId }) => badgeId).includes(id);

        return [id, new Badge(id, name, image, awarded, seasonId, apiClient)];
      })
    );
  }

  /**
   * Award this badge to the current user
   */
  async award() {
    this.awarded = true;

    try {
      await this.apiClient.domainModelTalentBadges.award(
        {
          badgeId: this.id,
          seasonId: this.seasonId,
        },
        {
          format: "json",
        }
      );
    } catch (err) {
      this.awarded = false;
      console.error("Could not award badge", err);
    }
  }
}

export default Badge;
