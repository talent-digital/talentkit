import { createApiClient } from "./api.service";
import { AuthService } from "./auth.service";
import Badge from "./badge";
import Engagement from "./engagement";
import {
  ApiClient,
  Badges,
  Config,
  ID,
  ProfileStorage,
  Tests,
} from "./interfaces";
import "./interfaces";
import { createCustomFetch } from "./mock-api";
import RemoteStorage from "./remote-storage";
import Savegame from "./savegame";
import StorageService from "./storage.service";
import Test from "./test";

export const applicationId = "talentApplicationProfileTwo";

const defaultProfile = {
  id: "player",
  companyName: "ACME Inc.",
  companyLogo: "/logos/logo1.svg",
  playerName: "Teammitglied",
  playerAvatar: "/avatars/avatar5.svg",
  leadingColor: "#d3e553",
  playerEmailAddress: "teammitglied@acme.com",
};

const getIdFromUrlParams = (): ID => {
  const params = new URLSearchParams(location.search);

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
  readonly profile: ProfileStorage;

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
    storage: StorageService,
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
    const profileStorage = storage.getItem<ProfileStorage>("SETTINGS");
    this.profile = profileStorage || defaultProfile;
  }

  /**
   * Creates a new TalentKit
   * @param config
   * @returns TalentKit
   */
  static async create(config: Config) {
    let apiClient: ApiClient;
    let storage: StorageService;
    const id = config.id || getIdFromUrlParams();
    if (!id.season || !id.episode) {
      throw new Error("sid or eid not found");
    }

    if (config.seasonDefinition) {
      const customFetch = createCustomFetch(config.seasonDefinition);
      apiClient = createApiClient({ customFetch });
      storage = new StorageService(window.localStorage);
    } else {
      if (!config.tenant) throw "config.tenant must be provided";

      const auth = await AuthService.create(config.tenant);
      if (!auth) throw "Could not create Authentication Service";

      apiClient = createApiClient({ auth });
      storage = new StorageService(await RemoteStorage.create(apiClient));
    }

    if (!apiClient) throw new Error(`Coudn't initialize the library`);

    const tests: Tests = await Test.createForEpisode(id, apiClient);
    const savegame: Savegame = new Savegame(id, storage);
    const engagement = new Engagement(storage);
    const badges = await Badge.createForEpisode(id, storage, apiClient);

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
