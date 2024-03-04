import {
  EpisodeWeb,
  LocalizedString,
  TestItemWeb,
} from "@talentdigital/api-client";
import { ApiClient, ID, Tests } from "./interfaces";

enum TestResult {
  "fail" = 0,
  "pass" = 1,
}

type TestData = Record<string, unknown> | Record<string, unknown>[];

class Test {
  result: TestResult | undefined;

  private constructor(
    readonly id: string,
    readonly documentation: LocalizedString,
    readonly level: TestItemWeb["level"],
    private api: ApiClient,
    private seasonId: string,
    private episodeId: string,
    private savegameKeyId: string
  ) {}

  static createForEpisode(
    id: ID,
    info: EpisodeWeb,
    api: ApiClient,
    savegameKeyId: string
  ): Tests {
    if (!info?.testItems) {
      return {};
    }

    return Object.fromEntries(
      info.testItems.map((test) => {
        return [
          test.id,
          new Test(
            test.id as string,
            test.documentation as LocalizedString,
            test.level as TestItemWeb["level"],
            api,
            id.season,
            id.episode,
            savegameKeyId
          ),
        ];
      })
    ) as Tests;
  }

  pass(data?: TestData) {
    this.result = TestResult.pass;

    return this.api.domainModelEvents.saveEvent(
      this.generatePayload(TestResult.pass, data)
    );
  }

  fail(data?: TestData) {
    this.result = TestResult.fail;

    return this.api.domainModelEvents.saveEvent(
      this.generatePayload(TestResult.fail, data)
    );
  }

  private generatePayload(result: TestResult, data?: TestData) {
    const events = [
      {
        type: "test.complete",
        payload: {
          test: this.id,
          data: data || {},
          failed: !result,
          timestamp: Date.now(),
        },
        result: { id: this.id, value: result },
      },
    ];

    return {
      applicationId: this.savegameKeyId,
      events,
      seasonId: this.seasonId,
      episodeId: this.episodeId,
    };
  }
}

export default Test;
