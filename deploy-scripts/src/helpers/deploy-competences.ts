import got from "got";
import { SeasonDefinition } from "./SeasonDefinition.js";

type SubCompetence = {
  id: number;
  name: string;
};

type Competence = {
  id: number;
  name?: string;
  subCompetences: SubCompetence[];
};

type CompetenceArea = {
  id: number;
  name?: string;
  competences: Competence[];
};

export const deployCompetences = async (
  baseUrl: string,
  authorization: string,
  data: SeasonDefinition["competenceAreas"]
) => {
  console.log("Deploying: competences");

  try {
    await got.post(`${baseUrl}/api/v1/profile2/competences/competences-tree`, {
      headers: {
        authorization,
      },
      json: adaptToCompetenceArea(data),
    });

    console.log("Deploy completed: competences\n");
  } catch (err) {
    console.error("Error during competences deploy", JSON.stringify(err));
  }
};

const adaptToCompetenceArea = (
  competenceAreas: SeasonDefinition["competenceAreas"]
): CompetenceArea[] => {
  return Object.keys(competenceAreas).map((areaKey) => {
    const competences = competenceAreas[areaKey].competences;

    return {
      id: Number(areaKey),
      competences: Object.keys(competences).map((competenceKey) => {
        const subCompetences = competences[competenceKey].subCompetences;

        return {
          id: Number(competenceKey),
          subCompetences: Object.keys(subCompetences).map(
            (subCompetenceKey) => {
              return {
                id: Number(subCompetenceKey),
                name: subCompetences[subCompetenceKey].name.de,
              };
            }
          ),
        };
      }),
    };
  });
};
