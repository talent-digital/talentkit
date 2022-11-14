import { applicationId } from ".";
import { ApiClient, ID, Tests } from "./interfaces";

enum TestResult {
  "fail" = 0,
  "pass" = 1,
}

class Test {
  result: TestResult | undefined;

  private constructor(
    readonly id: string,
    private prefix: string,
    readonly bestResult: TestResult,
    private api: ApiClient
  ) {}

  static async createForEpisode(id: ID, api: ApiClient): Promise<Tests> {
    const { data } =
      await api.userAnalyticsProgressReporting.getCompetenceAreaTestDetailsReports(
        { season: Number(id.season), episode: Number(id.episode) }
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

  private generatePayload(result: TestResult) {
    const events = [
      {
        type: "test.complete",
        result: { id: `${this.prefix}.${this.id}`, value: result },
      },
    ];
    return { applicationId, events };
  }
}

export default Test;
