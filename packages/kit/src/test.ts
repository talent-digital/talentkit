import { applicationId } from ".";
import { IApiService } from "./interfaces";

const eventEndPoint = "1/event/profile2";

enum TestResult {
  "fail" = 0,
  "pass" = 1,
}

class Test {
  constructor(
    readonly id: string,
    private prefix: string,
    private api: IApiService
  ) {}

  private generatePayload(result: TestResult) {
    const events = [
      {
        type: "test.complete",
        result: { id: `${this.prefix}.${this.id}`, result },
      },
    ];
    return {
      json: { applicationId, events },
      retry: {
        limit: 3,
      },
    };
  }

  result: TestResult | undefined;

  pass() {
    this.result = TestResult.pass;
    return this.api.request(
      eventEndPoint,
      "post",
      this.generatePayload(TestResult.pass)
    );
  }

  fail() {
    this.result = TestResult.fail;
    return this.api.request(
      eventEndPoint,
      "post",
      this.generatePayload(TestResult.fail)
    );
  }
}

export default Test;
