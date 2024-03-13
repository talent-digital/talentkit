import { EpisodeWeb } from "@talentdigital/api-client";
import { SeasonDefinition } from "@talentdigital/season";
import { createApiClient } from "./api.service";
import { AuthService } from "./auth.service";
import Badge from "./badge";
import Engagement from "./engagement";
import Events from "./events";
import FeedbackQuestion from "./feedback-question";
import { parseContent } from "./helpers";
import {
  ApiClient,
  Badges,
  Config,
  FeedbackQuestions,
  ID,
  ProfileStorage,
  Tests,
  SavegameStorage,
  SeasonStorage,
  EpisodeStorage,
} from "./interfaces";
import { createCustomFetch } from "./mock-api";
import RemoteStorage from "./remote-storage";
import Savegame from "./savegame";
import StorageService from "./storage.service";
import Test from "./test";
import Tracker from "./tracker";
import LogRocket from "logrocket";
import { KeycloakTokenParsed } from "keycloak-js";

export const savegameKey = "SEASONS";

const defaultProfile = {
  id: "player",
  companyName: "ACME Inc.",
  companyLogo: "/logos/logo1.svg",
  playerName: "Teammitglied",
  playerAvatar: "/avatars/avatar5.svg",
  leadingColor: "#d3e553",
  playerEmailAddress: "teammitglied@acme.com",
};

const getIdFromUrlParamsOrStorage = (): ID => {
  const STORAGE_PREFIX = "td";
  const params = new URLSearchParams(location.search);

  const season =
    params.get("sid") || localStorage.getItem(`${STORAGE_PREFIX}-sid`);
  const episode =
    params.get("eid") || localStorage.getItem(`${STORAGE_PREFIX}-eid`);
  const redirectUrl =
    params.get("redirectUrl") ||
    localStorage.getItem(`${STORAGE_PREFIX}-redirectUrl`);
  const configUrl =
    params.get("configUrl") ||
    localStorage.getItem(`${STORAGE_PREFIX}-configUrl`) ||
    undefined;

  if (!season || !episode)
    throw "Could not retrieve season or episode id from URL";

  if (!redirectUrl) throw "Could not retrieve redirectUrl from URL";

  localStorage.setItem(`${STORAGE_PREFIX}-sid`, season);
  localStorage.setItem(`${STORAGE_PREFIX}-eid`, episode);
  localStorage.setItem(`${STORAGE_PREFIX}-redirectUrl`, redirectUrl);
  if (configUrl) {
    localStorage.setItem(`${STORAGE_PREFIX}-configUrl`, configUrl);
  }

  return { season, episode, redirectUrl, configUrl };
};

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
class TalentKit<T = unknown> {
  assets = {
    getUrl: (filename: string): string => {
      if (!this.episode?.assetsURL)
        throw new Error("Assets URL is not defined");

      return `${this.episode.assetsURL}/${filename}`;
    },

    get: async <T = unknown>(file: string): Promise<T> => {
      let textContent: string;

      try {
        const res = await fetch(this.assets.getUrl(file));

        if (!(res.status === 200)) {
          throw new Error(`Could not fetch data. HTML status: ${res.status}`);
        }

        textContent = await res.text();
        if (!textContent) throw new Error("File is empty!");
      } catch (err) {
        throw err;
      }

      return parseContent<T>({ content: textContent, fileName: file });
    },
  };

  private constructor(
    private api: ApiClient,
    /**
     * All info about episode
     */
    private episode: EpisodeWeb,

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
     * Handle episode events
     */
    public events: Events,

    /**
     * The season and episode IDs
     */
    readonly id: ID,

    /**
     * The current player's profile settings
     */
    readonly profile: ProfileStorage,

    /**
     * The parsed formatConfiguration for the loaded episode
     */
    public formatConfiguration?: T,

    /**
     * Track user events and captures session replays
     */
    readonly tracker?: Tracker,

    /**
     * Currently logged in user's authentication information
     */
    readonly authUser?: KeycloakTokenParsed
  ) {}

  /**
   * Creates a new TalentKit
   * @param config
   * @returns TalentKit
   */
  static async create<T = unknown>(config: Config) {
    let auth: AuthService | undefined;
    let apiClient: ApiClient;
    let storage: StorageService;

    const id = config.id || getIdFromUrlParamsOrStorage();
    const savegameKeyId = config?.savegameKeyId;

    if (!savegameKeyId) {
      throw new Error("savegameKeyId not found");
    }

    if (!id.season || !id.episode) {
      throw new Error("sid or eid not found");
    }

    if (config.seasonDefinition) {
      const customFetch = createCustomFetch(config.seasonDefinition);
      apiClient = createApiClient({ customFetch });
      storage = new StorageService(window.localStorage);
    } else if (id.configUrl) {
      const data = await (await fetch(`${id.configUrl}/season.yaml`)).text();
      const yaml = await import("yaml");
      const parsedConfig = yaml.parse(data) as SeasonDefinition;
      const customFetch = createCustomFetch({
        ...parsedConfig,
        assetsURL: id.configUrl,
      });
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
      storage = new StorageService(
        await RemoteStorage.create(apiClient, savegameKeyId)
      );
    }

    if (!apiClient) throw new Error(`Couldn't initialize the library`);

    const { data: episode } = await apiClient.domainModelSeasons.getEpisode(
      id.season,
      id.episode,
      { format: "json" }
    );

    let configString: string | undefined;
    if (
      episode.assetsURL &&
      episode.formatConfiguration &&
      !config.seasonDefinition
    ) {
      try {
        const res = await fetch(
          `${episode.assetsURL}/${episode.formatConfiguration}`
        );
        configString = await res.text();
      } catch (err) {
        console.error("No episode configuration found");
        LogRocket.captureException(new Error("No episode configuration found"));
      }
    }

    let formatConfiguration: T | undefined;
    if (configString) {
      formatConfiguration = await parseContent<T>({
        content: configString,
        fileName: episode.formatConfiguration,
      });
    }

    const tests: Tests = Test.createForEpisode(
      id,
      episode,
      apiClient,
      savegameKeyId
    );
    const feedbackQuestions: FeedbackQuestions =
      FeedbackQuestion.createForEpisode(id, episode, apiClient, savegameKeyId);
    const savegame: Savegame = new Savegame(id, storage);
    const engagement = new Engagement(storage);
    const badges = Badge.createForEpisode(episode, storage);
    const profileStorage =
      storage.getItem<ProfileStorage>("SETTINGS") || defaultProfile;
    const events = new Events(apiClient, storage, id, savegameKeyId);
    let tracker: Tracker | undefined;
    if (config.logRocketId && auth?.user) {
      tracker = await Tracker.create({
        logRocketId: config.logRocketId,
        userInfo: auth.user,
        playerName: profileStorage.playerName,
      });
    }

    return new TalentKit<T>(
      apiClient,
      episode,
      badges,
      tests,
      feedbackQuestions,
      savegame,
      engagement,
      events,
      id,
      profileStorage,
      formatConfiguration,
      tracker,
      auth?.user
    );
  }
}

export type { Config, SavegameStorage, SeasonStorage, EpisodeStorage };
export default TalentKit;
