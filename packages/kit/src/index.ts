import { createApiClient } from "./api.service";
import { AuthService } from "./auth.service";
import Badge from "./badge";
import Engagement from "./engagement";
import { ApiClient, Badges, Config, ID, Profile, Tests } from "./interfaces";
import Savegame from "./savegame";
import Storage from "./storage.service";
import Test from "./test";

export const applicationId = "talentApplicationProfileTwo";

const getIdFromUrlParams = (): ID => {
  const params = new URLSearchParams(window.location.search);

  const season = params.get("sid");
  const episode = params.get("eid");

  if (!season || !episode)
    throw "Could not retrieve season or episode id from URL";

  return { season, episode };
};

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
class TalentKit {
  /**
   * @description The current user's player profile
   */
  readonly profile: Profile;

  events = {
    /**
     * @description Mark the episode as completed and return to the dashboard
     */
    end: async () => {
      const events = [
        {
          eventTypeId: "episode.end",
          season: this.id.season,
          episode: this.id.episode,
        },
      ];

      await this.api.domainModelEvents.saveEvent({ applicationId, events });
    },
  };

  private constructor(
    private api: ApiClient,
    storage: Storage,
    /**
     * All badges available in the current episode
     */

    public badges: Badges,
    /**
     * All tests available in this episode
     * @example kit.tests["test1"].pass();
     */

    public tests: Tests,
    /**
     * Savegame for the current episode
     * @example const savegame = kit.savegame.load();
     * @example kit.savegame.save(obj);
     */
    public savegame: Savegame,
    /**
     * Award and read engagement points
     *
     * @example kit.engagement.add(1)
     * @example const points = kit.engagement.points
     */
    public engagement: Engagement,
    readonly id: ID
  ) {
    this.profile = storage.getItem("SETTINGS");
  }

  /**
   * Creates a new TalentKit
   * @param config
   * @returns TalentKit
   */
  static async create(config: Config) {
    let apiClient: ApiClient;
    const id = getIdFromUrlParams();
    if (!id.season || !id.episode) {
      throw new Error("sid or eid not found");
    }

    if (config.testMode) {
      apiClient = createApiClient();
    } else {
      const auth = await AuthService.create(config.tenant);
      if (!auth) throw "Could not create Authentication Service";

      apiClient = createApiClient(auth);
    }

    if (!apiClient) throw new Error(`Coudn't initialize the library`);

    const tests: Tests = await Test.createForEpisode(id, apiClient);
    const storage: Storage = await Storage.create(apiClient);
    const savegame: Savegame = new Savegame(id, storage);
    const engagement = new Engagement(storage);
    const badges = Badge.createForEpisode(id, storage);

    return new TalentKit(
      apiClient,
      storage,
      badges,
      tests,
      savegame,
      engagement,
      id
    );
  }
}

export default TalentKit;
