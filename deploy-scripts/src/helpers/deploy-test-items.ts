import cliProgress from "cli-progress";
import got from "got";
import { SeasonDefinition, Level } from "./SeasonDefinition";

type TestItem = {
  documentation: string;
  eventType: string;
  level: string;
  subCompetenceId: number;
  testId: string;
};

// TODO: Prefix variable
export const deployTestItems = async (
  baseUrl: string,
  authorization: string,
  data: SeasonDefinition["competenceAreas"]
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

const extractTestItems = (
  competenceAreas: SeasonDefinition["competenceAreas"],
  prefix: string
): TestItem[] => {
  return Object.values(competenceAreas).flatMap((area) => {
    return Object.values(area.competences).flatMap((competence) => {
      return Object.keys(competence.subCompetences).flatMap(
        (subCompetenceKey) => {
          const subCompetence = competence.subCompetences[subCompetenceKey];

          return Object.keys(subCompetence.testItems).map((testItemKey) => {
            const testItem = subCompetence.testItems[testItemKey];

            return {
              documentation: JSON.stringify(testItem.documentation),
              eventType: `${prefix}.${testItemKey}`,
              level: Level[testItem.level],
              subCompetenceId: Number(subCompetenceKey),
              testId: testItemKey,
            };
          });
        }
      );
    });
  });
};
