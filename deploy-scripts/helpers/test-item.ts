import cliProgress from "cli-progress";
import { constants } from "fs";
import { access, readdir, readFile } from "fs/promises";
import got from "got";
import { join } from "path";
import { parse } from "yaml";

type TestItem = {
  documentation: string;
  eventType: string;
  level: string;
  subCompetenceId: number;
  testId: string;
};

enum levels {
  BEGINNER = "FOUNDATION",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  HIGHLY_SKILLED = "HIGHLY_SPECIALISED",
}

// TODO: Prefix variable
export const deployTestItems = async (
  baseUrl: string,
  authorization: string,
  data: any // SeasonDefinition["competenceAreas"]
) => {
  const prefix = "season-episode-prefix"; // TODO
  const testItemList = extractTestItems(data, prefix);

  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: `{bar} {prefix}    {testId}`,
    },
    cliProgress.Presets.shades_classic
  );

  const bars = {};
  bars[prefix] = multibar.create(Object.keys(data).length, 0, {
    prefix,
    testId: "",
  });

  for (const testItem of testItemList) {
    try {
      await got
        .post(`${baseUrl}/api/v1/test-item`, {
          headers: {
            authorization,
          },
          json: testItem,
        })
        .json();
    } catch (err) {
      console.log(`error while posting ${testItem.eventType}`, err);
      continue;
    } finally {
      bars[prefix].increment({ testId: testItem.testId });
    }
  }

  multibar.stop();
};

const extractTestItems = (competenceAreas: any, prefix: string): TestItem[] => {
  return Object.values(competenceAreas).flatMap((area: any) => {
    return Object.values(area.competences).flatMap((competence: any) => {
      return Object.keys(competence.subCompetences).flatMap(
        (subCompetenceKey: any) => {
          const subCompetence = competence.subCompetences[subCompetenceKey];

          return Object.keys(subCompetence.testItems).map((testItemKey) => {
            const testItem = subCompetence.testItems[testItemKey];

            return {
              documentation: JSON.stringify(testItem.documentation),
              eventType: `${prefix}.${testItemKey}`,
              level: levels[testItem.level],
              subCompetenceId: Number(subCompetenceKey),
              testId: testItemKey,
            };
          });
        }
      );
    });
  });
};
