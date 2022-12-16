/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID } from "./interfaces";
import { SeasonDefinition } from "./season";

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
        (m = /user-report\/test-details\?season=(.*)&episode=(.*)/.exec(
          fullPath
        )) !== null
      ) {
        const id: ID = { season: m[1], episode: m[2] };

        const testItems = extractTestItems(
          seasonDefinition.competenceAreas,
          id
        );
        return Promise.resolve(new Response(JSON.stringify(testItems)));
      }
    }

    if (method === "POST") {
      return Promise.resolve(new Response());
    }
  };

const extractTestItems = (
  competenceAreas: SeasonDefinition["competenceAreas"],
  { season, episode }: ID
) =>
  Object.entries(competenceAreas).map(
    ([competenceAreaId, { competences }]) => ({
      competenceAreaId,
      tests: Object.entries(competences).flatMap(
        ([_competenceId, { subCompetences }]) =>
          Object.entries(subCompetences)
            .flatMap(([subCompetenceId, { name: _name, testItems }]) =>
              testItems
                ? Object.entries(testItems).map(
                    ([testItemId, { level, documentation, episode }]) => ({
                      id: `season${season}episode${episode}.${testItemId}`,
                      subCompetenceId,
                      description: JSON.stringify(documentation),
                      level,
                      episode,
                      result: 0,
                    })
                  )
                : []
            )
            .filter((testItem) => testItem.episode === episode)
      ),
    })
  );
