import TalentKit from ".";

import { beforeAll, describe, expect, it } from "vitest";

describe("Sdk Base Tests", () => {
  let kit: TalentKit;
  beforeAll(async () => {
    kit = await TalentKit.create({
      tenant: "devtd2",
      testMode: true,
    });
  });

  it("Returns a mocked client when running locally", () => {
    expect(kit).toBeInstanceOf(TalentKit);
  });

  it("Can save and load from savegame", () => {
    const objectToSave = { foo: "bar", bar: ["baz"] };
    kit.savegame.save(objectToSave);
    expect(kit.savegame.load()).toEqual(objectToSave);
  });

  it("Can correctly add engagement points", () => {
    expect(kit.engagement.points).toBe(0);
    kit.engagement.add(10);
    expect(kit.engagement.points).toBe(10);
  });
});
