import { createApiClient } from "./api.service";
import { AuthService } from "./auth.service";
import { ApiClient, Config, State, Tests } from "./interfaces";
import { instantiateTests } from "./test";

export const applicationId = "talentApplicationProfileTwo";

const createStateFromUrlParams = (): State => {
  const params = new URLSearchParams(window.location.search);

  const state: State = Object.fromEntries(params.entries());

  return state;
};

/**
 * @description To create a new sdk, use the create method.
 * @example const sdk = await TdSdk.create(config);
 */
class TalentKit {
  private constructor(
    private api: ApiClient,
    public test: Tests,
    readonly state: State = {}
  ) {}

  static async create(config: Config) {
    let apiClient: ApiClient;
    const state = createStateFromUrlParams();
    if (!state.sid || !state.eid) {
      throw new Error("sid or eid not found");
    }

    if (config.testMode) {
      apiClient = createApiClient();
    } else {
      const auth = await AuthService.create(config.tenant);
      if (!auth) throw "Could not create Authentication Service";

      apiClient = createApiClient(auth);
    }

    if (apiClient) {
      const tests: Tests = await instantiateTests(state, apiClient);

      return new TalentKit(apiClient, tests, state);
    }

    throw new Error(`Coudn't initialize the library`);
  }

  events = {
    end: async () => {
      const events = [
        {
          eventTypeId: "episode.end",
          season: this.state.sid,
          episode: this.state.eid,
        },
      ];

      await this.api.domainModelEvents.saveEvent({ applicationId, events });
    },
  };
}

export default TalentKit;
