import ApiService from "./api.service";
import { AuthService } from "./auth.service";
import { Config, IApiService, State, Tests } from "./interfaces";
import { MockAuthService } from "./mocks";
import Test from "./test";

export const applicationId = "talentApplicationProfileTwo";

const instantiateTests = (testIds: string[], api: IApiService): Tests => {
  return Object.fromEntries(
    testIds.map((testId) => [testId, new Test(testId, "prefix", api)])
  );
};

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
  readonly state: State = {};

  private constructor(
    private api: ApiService,
    public test: Tests,
    testMode: boolean = false
  ) {
    this.state = testMode
      ? { sid: "sid", eid: "eid" }
      : createStateFromUrlParams();
  }

  static async create(config: Config) {
    if (config.testMode) {
      const auth = await MockAuthService.create();

      const api = new ApiService(auth);

      const tests = instantiateTests(["test1", "test2"], api);

      return new TalentKit(api, tests);
    }

    const auth = await AuthService.create(config.tenant, "prod");
    if (!auth) throw "Could not create Authentication Service";

    const api = new ApiService(auth);

    if (auth && api) {
      // Fetch the Tests
      const testIds = ["testId1", "testId2"];

      const tests: Tests = instantiateTests(testIds, api);

      return new TalentKit(api, tests);
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

      await this.api.request("1/event/profile2", "post", {
        json: { applicationId, events },
      });
    },
  };
}

export default TalentKit;
