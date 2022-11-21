import { SeasonDefinition, TestItem } from "./season";

export const createCustomFetch =
  (seasonDefinition: SeasonDefinition) =>
  async (input: string, init?: RequestInit) => {
    if (!init) throw "Invalid request";
    const { method } = init;

    const fullPath = input.split("/").slice(3).join("/");
    let m;

    if (method === "GET") {
      if ((m = /season\/.+\/episode\/(.+)/.exec(fullPath)) !== null) {
        const id = m[1];
        const episode = seasonDefinition.episodes[id];
        if (!episode) throw `Episode ${id} not found`;

        return Promise.resolve(new Response(JSON.stringify(episode)));
      }

      if (
        (m = /user-report\/test-details\?season=.*&episode=(.*)/.exec(
          fullPath
        )) !== null
      ) {
        const id = m[1];

        const testItems = extractTestItems(seasonDefinition.competenceAreas);
        console.log(testItems);

        return Promise.resolve(new Response(JSON.stringify({})));
      }
    }

    if (method === "POST") {
      return Promise.resolve();
    }
  };

enum levels {
  BEGINNER = "FOUNDATION",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  HIGHLY_SKILLED = "HIGHLY_SPECIALISED",
}

const extractTestItems = (
  competenceAreas: SeasonDefinition["competenceAreas"]
) =>
  Object.entries(competenceAreas).flatMap(
    ([competenceAreaId, { competences }]) =>
      Object.entries(competences).flatMap(
        ([competenceId, { subCompetences }]) =>
          Object.entries(subCompetences).flatMap(
            ([subCompetenceId, { name, testItems }]) =>
              testItems
                ? Object.entries(testItems).map(
                    ([testItemId, { level, documentation }]) => ({
                      competenceAreaId,
                      competenceId,
                      subCompetenceId,
                      name,
                      testItemId,
                      documentation,
                    })
                  )
                : []
          )
      )
  );
