import {
  EpisodeResponseWeb,
  LocalizedStringImpl,
  TestItemResponse,
} from "@talentdigital/api-client";
import { applicationId } from ".";
import { ApiClient, ID } from "./interfaces";

enum TestResult {
  "fail" = 0,
  "pass" = 1,
}

class Test {
  result: TestResult | undefined;

  private constructor(
    readonly id: string,
    readonly documentation: LocalizedStringImpl,
    readonly level: TestItemResponse["level"],
    private api: ApiClient,
    private seasonId: string,
    private episodeId: string
  ) {}

  static async createForEpisode(
    id: ID,
    info: EpisodeResponseWeb,
    api: ApiClient
  ): Promise<any> {
    if (!info?.testItems) {
      return {};
    }

    return Object.fromEntries(
      info.testItems.map((test) => {
        return [
          test.id,
          new Test(
            test.id as string,
            test.documentation as LocalizedStringImpl,
            test.level,
            api,
            id.season,
            id.episode
          ),
        ];
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
        result: { id: this.id, value: result },
      },
    ];

    return {
      applicationId,
      events,
      seasonId: this.seasonId,
      episodeId: this.episodeId,
    };
  }
}

export default Test;
