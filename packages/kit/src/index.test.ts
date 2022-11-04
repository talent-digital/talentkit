import TalentKit from ".";

import { beforeAll, describe, expect, it } from "vitest";

describe("Sdk Base Tests", async () => {
  let sdk: TalentKit;
  beforeAll(async () => {
    sdk = await TalentKit.create({
      tenant: "devtd2",
      testMode: true,
    });
  });

  it("Returns a mocked client when running locally", async () => {
    expect(sdk).toBeInstanceOf(TalentKit);

    await sdk.events.end();
  });
});
