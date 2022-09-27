import { readFile } from "fs/promises";
import { join } from "path";
import { getAuthorizationHeader } from "./auth.js";
import { deployCompetences } from "./deploy-competences.js";
import { deployFeedbackQuestions } from "./deploy-feedback-questions.js";
import { deployTestItems } from "./deploy-test-items.js";
import { parse } from "yaml";

const rootPath = process.env.SEASON_FILE_PATH ?? "./";

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
  const path = join(rootPath, "season.yaml");
  const season = parse(await readFile(path, "utf-8"));
  await deployCompetences(baseUrl, authorization, season.competenceAreas);
  await deployTestItems(baseUrl, authorization, season.competenceAreas);
  await deployFeedbackQuestions(baseUrl, authorization, season.competenceAreas);
};
