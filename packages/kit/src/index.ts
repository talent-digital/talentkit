import { EpisodeResponseWeb } from "@talentdigital/api-client";
import { createApiClient } from "./api.service";
import { AuthService } from "./auth.service";
import Badge from "./badge";
import Engagement from "./engagement";
import FeedbackQuestion from "./feedback-question";
import {
  ApiClient,
  Badges,
  Config,
  FeedbackQuestions,
  ID,
  ProfileStorage,
  Tests,
} from "./interfaces";
import { createCustomFetch } from "./mock-api";
import RemoteStorage from "./remote-storage";
import Savegame from "./savegame";
import StorageService from "./storage.service";
import Test from "./test";
import Tracker from "./tracker";

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
  const redirectUrl = params.get("redirectUrl");

  if (!season || !episode)
    throw "Could not retrieve season or episode id from URL";

  if (!redirectUrl) throw "Could not retrieve redirectUrl from URL";

  return { season, episode, redirectUrl };
};

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
class TalentKit {
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
    /**
     * All info about episode
     */
    private episode: EpisodeResponseWeb,

    /**
     * The episode's configuration as a string
     */
    public episodeConfiguration: string | undefined,

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
     * Add feedback questions available in this episode
     */
    public feedbackQuestions: FeedbackQuestions,

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

    /**
     * The season and episode IDs
     */
    readonly id: ID,

    /**
     * The currenr player's profile settings
     */
    readonly profile: ProfileStorage,

    /**
     * Track user events and captures session replays
     */
    readonly tracker?: Tracker
  ) {}

  /**
   * Creates a new TalentKit
   * @param config
   * @returns TalentKit
   */
  static async create(config: Config) {
    let auth: AuthService | undefined;
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

      auth = await AuthService.create(config.tenant);
      if (!auth) throw "Could not create Authentication Service";

      apiClient = createApiClient({
        auth,
        tenant: config.tenant,
        localBackendURL: config.localBackendURL,
      });
      storage = new StorageService(await RemoteStorage.create(apiClient));
    }

    if (!apiClient) throw new Error(`Coudn't initialize the library`);

    const { data: episode } = await apiClient.domainModelSeasons.getEpisode(
      id.season,
      id.episode,
      { format: "json" }
    );

    let episodeConfiguration: string | undefined;
    if (episode.assetsURL && episode.formatConfiguration) {
      try {
        const res = await fetch(
          `${episode.assetsURL}/${episode.formatConfiguration}`,
          { mode: "no-cors" }
        );
        episodeConfiguration = await res.text();
      } catch (err) {
        console.error("No episode configuration found");
      }
    }

    const tests: Tests = Test.createForEpisode(id, episode, apiClient);
    const feedbackQuestions: FeedbackQuestions =
      FeedbackQuestion.createForEpisode(id, episode, apiClient);
    const savegame: Savegame = new Savegame(id, storage);
    const engagement = new Engagement(storage);
    const badges = Badge.createForEpisode(episode, storage);
    const profileStorage =
      storage.getItem<ProfileStorage>("SETTINGS") || defaultProfile;

    let tracker: Tracker | undefined;
    if (config.logRocketId && auth?.user) {
      tracker = new Tracker(
        config.logRocketId,
        auth.user,
        profileStorage.playerName
      );
    }

    return new TalentKit(
      apiClient,
      episode,
      episodeConfiguration,
      badges,
      tests,
      feedbackQuestions,
      savegame,
      engagement,
      id,
      profileStorage,
      tracker
    );
  }
}

export type { Config };
export default TalentKit;
