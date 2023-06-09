import TalentKit from ".";
import { SeasonDefinition } from "@talentdigital/season";
import season from "./season.yml";

const seasonDefinition = season as SeasonDefinition;

import { beforeEach, describe, expect, it } from "vitest";
import Badge from "./badge";
import Test from "./test";

describe("Sdk Base Tests", () => {
  let kit: TalentKit;
  beforeEach(async () => {
    kit = await TalentKit.create({
      seasonDefinition,
      id: { season: "SeasonID", episode: "1" },
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

  it("Can award a badge1", () => {
    expect(kit.badges["caffeine"].awarded).toBeFalsy();
    kit.badges["caffeine"].award();
    expect(kit.badges["caffeine"].awarded).toBeTruthy();
  });

  it("Loads the correct test items for the episode", () => {
    expect(Object.keys(kit.tests)).toHaveLength(1);
    expect(kit.tests["costToSolution"]).toBeInstanceOf(Test);
  });

  it("Can correctly pass a test", async () => {
    expect(kit.tests["costToSolution"].result).toBeUndefined();
    await kit.tests["costToSolution"].pass();
    expect(kit.tests["costToSolution"].result).toBe(1);
  });

  it("Loads the feedback questions correctly for the episde", () => {
    expect(Object.keys(kit.feedbackQuestions)).toHaveLength(1);

    const q = kit.feedbackQuestions["digitalpotential"];

    expect(q.question.de).toBe(
      "Wie schätzt du selber das Potential von digitalen Lösungen im Building Management ein?"
    );
    expect(q.question.en).toBe(
      "What is your impression of the impact of digital solutions in the building management area?"
    );
    expect(Object.keys(q.answers).length).toBe(3);
    expect(Object.values(q.answers)[0].de).toBe(
      "Untergeordnet im Vergleich zu Geräten."
    );
  });

  it("Correctly submits a feedback question", async () => {
    expect(
      await kit.feedbackQuestions["digitalpotential"].submit("0")
    ).toBeInstanceOf(Response);

    expect(
      await kit.feedbackQuestions["digitalpotential"].submit("3")
    ).toBeUndefined();
  });

  it("Correctly gets an asset's URL", () => {
    const fileName = "file.txt";
    expect(kit.assets.getUrl(fileName)).toBe(
      `${seasonDefinition.assetsURL}/${fileName}`
    );
  });
});
