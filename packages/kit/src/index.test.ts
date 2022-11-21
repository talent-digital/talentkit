import TalentKit from ".";
import { SeasonDefinition } from "./season";
import season from "./season.yml";

const seasonDefinition = season as SeasonDefinition;

import { beforeAll, describe, expect, it } from "vitest";
import Badge from "./badge";

describe("Sdk Base Tests", () => {
  let kit: TalentKit;
  beforeAll(async () => {
    kit = await TalentKit.create({
      tenant: "devtd2",
      testMode: true,
      seasonDefinition,
      episodeId: "1",
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

  it("Loads the correct badges for the episode", () => {
    expect(kit.badges["caffeine"]).toBeInstanceOf(Badge);
    expect(kit.badges["caffeine"].name.de).toBe("Perfekter Koffein-Level!");
    expect(kit.badges["caffeine"].name.en).toBe("Perfect caffeine level!");
  });

  it("Can award a badge", () => {
    expect(kit.badges["caffeine"].awarded).toBeFalsy();
    kit.badges["caffeine"].award();
    expect(kit.badges["caffeine"].awarded).toBeTruthy();
  });
});
