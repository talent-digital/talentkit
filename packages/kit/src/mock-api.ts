/* eslint-disable @typescript-eslint/no-unused-vars */
import { EpisodeWeb } from "@talentdigital/api-client";
import { SeasonDefinition } from "@talentdigital/season";
import { ID } from "./interfaces";

export const createCustomFetch =
  (seasonDefinition: SeasonDefinition) =>
  async (input: string, init?: RequestInit) => {
    if (!init) throw "Invalid request";
    const { method } = init;

    const fullPath = input.split("/").slice(3).join("/");
    let m;

    if (method === "GET") {
      if ((m = /season\/(.+)\/episode\/(.+)/.exec(fullPath)) !== null) {
        const id: ID = { season: m[1], episode: m[2] };
        const episodeDefinition = seasonDefinition.episodes[id.episode];

        if (!episodeDefinition) throw `Episode ${id.episode} not found`;

        const episode: EpisodeWeb = { ...episodeDefinition };

        episode.assetsURL = seasonDefinition.assetsURL;

        episode.testItems = extractTestItems(
          seasonDefinition.competenceAreas,
          id
        );

        episode.feedbackQuestions = extractFeedbackQuestions(
          seasonDefinition.competenceAreas,
          id
        );

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
  { episode }: ID
): EpisodeWeb["testItems"] =>
  Object.values(competenceAreas).flatMap(({ competences }) =>
    Object.values(competences).flatMap(({ subCompetences }) =>
      Object.values(subCompetences).flatMap(({ testItems }) =>
        testItems
          ? Object.entries(testItems)
              .filter(([_, testItem]) => testItem.episode === episode)
              .map(([id, { level, documentation }]) => ({
                id,
                level,
                documentation,
              }))
          : []
      )
    )
  );

const extractFeedbackQuestions = (
  competenceAreas: SeasonDefinition["competenceAreas"],
  { episode }: ID
): EpisodeWeb["feedbackQuestions"] =>
  Object.values(competenceAreas).flatMap(({ competences }) =>
    Object.values(competences).flatMap(({ subCompetences }) =>
      Object.values(subCompetences).flatMap(({ feedbackQuestions }) =>
        feedbackQuestions
          ? Object.entries(feedbackQuestions)
              .filter(
                ([_, feedbackQuestion]) => feedbackQuestion.episode === episode
              )
              .map(([id, { question, answers }]) => ({
                id,
                question,
                answers,
              }))
          : []
      )
    )
  );
