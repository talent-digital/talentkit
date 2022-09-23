import { readFile } from "fs/promises";
import { join } from "path";
import { getAuthorizationHeader } from "./auth.js";
import { deployCompetences } from "./competences";
// import { deployFeedbackQuestions } from "./feedback-question.js";
// import { deploySignalModules } from "./signal.js";
// import { deployTestItems } from "./test-item.js";
import { parse } from "yaml";

export const deploySeasons = async (
  domain: string,
  baseUrl: string,
  environmemt: string,
  clientId: string,
  clientSecret: string
) => {
  const authorization = await getAuthorizationHeader(
    domain,
    environmemt,
    clientId,
    clientSecret
  );
  //   await deployCompetences(baseUrl, seasonId, authorization);
  //   await deployTestItems(baseUrl, seasonId, authorization);
  //   await deploySignalModules(baseUrl, seasonId, authorization);
  //   await deployFeedbackQuestions(baseUrl, seasonId, authorization);
  const path = join("..", "season.yaml"); // TODO
  const season = parse(await readFile(path, "utf-8"));
  await deployCompetences(baseUrl, authorization, season.competenceAreas);
};
