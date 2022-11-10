import { applicationId } from ".";
import { ApiClient, State, Tests } from "./interfaces";

enum TestResult {
  "fail" = 0,
  "pass" = 1,
}

class Test {
  result: TestResult | undefined;

  constructor(
    readonly id: string,
    private prefix: string,
    readonly bestResult: TestResult,
    private api: ApiClient
  ) {}

  private generatePayload(result: TestResult) {
    const events = [
      {
        type: "test.complete",
        result: { id: `${this.prefix}.${this.id}`, value: result },
      },
    ];
    return { applicationId, events };
  }

  pass() {
    this.result = TestResult.pass;
    return this.api.domainModelEvents.saveEvent(
      this.generatePayload(TestResult.pass)
    );
  }

  fail() {
    this.result = TestResult.fail;
    return this.api.domainModelEvents.saveEvent(
      this.generatePayload(TestResult.fail)
    );
  }
}

export const instantiateTests = async (
  state: State,
  api: ApiClient
): Promise<Tests> => {
  const { data } =
    await api.userAnalyticsProgressReporting.getCompetenceAreaTestDetailsReports(
      { season: Number(state.sid), episode: Number(state.eid) }
    );

  if (!data || !data.length) return {};

  return Object.fromEntries(
    data
      .flatMap((ca) => ca.tests)
      .map((test) => {
        const [prefix, id] = test?.id?.split(".") as string[];
        const result = test?.result as TestResult;
        return [id, new Test(id, prefix, result, api)];
      })
  );
};

export default Test;
