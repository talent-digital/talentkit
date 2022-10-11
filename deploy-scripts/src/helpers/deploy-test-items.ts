import got from "got";
import { SeasonDefinition } from "./SeasonDefinition.js";

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

export const deployTestItems = async (
  baseUrl: string,
  authorization: string,
  data: SeasonDefinition["competenceAreas"]
) => {
  console.log("Deploying: test items");

  const testItemList = extractTestItems(data);

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

      console.log("Deploy completed: test items\n");
    } catch (err) {
      console.log(`error while posting ${testItem.eventType}`, err);
      continue;
    }
  }
};

const extractTestItems = (
  competenceAreas: SeasonDefinition["competenceAreas"]
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
              eventType: testItem.id,
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
