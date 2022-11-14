import TalentKit from ".";

import { beforeAll, describe, expect, it } from "vitest";

describe("Sdk Base Tests", async () => {
  let kit: TalentKit;
  beforeAll(async () => {
    kit = await TalentKit.create({
      tenant: "devtd2",
      testMode: true,
    });
  });

  it("Returns a mocked client when running locally", async () => {
    expect(kit).toBeInstanceOf(TalentKit);

    await kit.events.end();
  });
});
