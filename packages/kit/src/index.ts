import { createApiClient } from "./api.service";
import { AuthService } from "./auth.service";
import { Config, SecurityDataType, State, Tests } from "./interfaces";
import Test from "./test";

import { Api } from "@talentdigital/api-client";

export const applicationId = "talentApplicationProfileTwo";

const instantiateTests = (
  testIds: string[],
  api: ReturnType<typeof createApiClient>
): Tests => {
  return Object.fromEntries(
    testIds.map((testId) => [testId, new Test(testId, "season99episode1", api)])
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
    private api: Api<SecurityDataType>,
    public test: Tests,
    testMode: boolean = false
  ) {
    this.state = testMode
      ? { sid: "sid", eid: "eid" }
      : createStateFromUrlParams();
  }

  static async create(config: Config) {
    // TODO: Implement test mode

    const auth = await AuthService.create(config.tenant, "dev");
    if (!auth) throw "Could not create Authentication Service";

    const api = createApiClient(auth);

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

      await this.api.domainModelEvents.saveEvent({ applicationId, events });
    },
  };
}

export default TalentKit;
