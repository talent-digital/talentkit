import { readFile } from "fs/promises";
import { join } from "path";
import { getAuthorizationHeader } from "./auth";
import { deployCompetences } from "./deploy-competences";
import { deployFeedbackQuestions } from "./deploy-feedback-questions";
import { deployTestItems } from "./deploy-test-items";
import { parse } from "yaml";

type DeploySeasonInput = {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  domain: string;
  environmemt: string;
  rootPath: string;
};

export const deploySeasons = async ({
  baseUrl,
  clientId,
  clientSecret,
  domain,
  environmemt,
  rootPath,
}: DeploySeasonInput) => {
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
