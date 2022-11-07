import type { Api } from "@talentdigital/api-client";
import { applicationId } from ".";
import { SecurityDataType } from "./interfaces";

enum TestResult {
  "fail" = 0,
  "pass" = 1,
}

class Test {
  constructor(
    readonly id: string,
    private prefix: string,
    private api: Api<SecurityDataType>
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

  result: TestResult | undefined;

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

export default Test;
