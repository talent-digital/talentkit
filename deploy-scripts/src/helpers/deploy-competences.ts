import got from "got";
import { CompetenceArea, Competence, SubCompetence } from "types";

type CompetenceAreas = { [id in string]: CompetenceArea };
type Competences = { [id in string]: Competence };
type SubCompetences = { [id in string]: SubCompetence };

type RequestSubCompetence = {
  id: number;
  name: string;
};

type RequestCompetence = {
  id: number;
  name?: string;
  subCompetences: RequestSubCompetence[];
};

type RequestCompetenceArea = {
  id: number;
  name?: string;
  competences: RequestCompetence[];
};

export const deployCompetences = async (
  baseUrl: string,
  authorization: string,
  data: CompetenceAreas
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
  competenceAreas: CompetenceAreas
): RequestCompetenceArea[] => {
  return Object.keys(competenceAreas).map((areaKey) => {
    const competences = competenceAreas[areaKey].competences;

    return {
      id: Number(areaKey),
      competences: adaptToCompetences(competences),
    };
  });
};

const adaptToCompetences = (competences: Competences) => {
  return Object.keys(competences).map((competenceKey) => {
    const subCompetences = competences[competenceKey].subCompetences;

    return {
      id: Number(competenceKey),
      subCompetences: adaptToSubCompetences(subCompetences),
    };
  });
};

const adaptToSubCompetences = (subCompetences: SubCompetences) => {
  return Object.keys(subCompetences).map((subCompetenceKey) => {
    return {
      id: Number(subCompetenceKey),
      name: subCompetences[subCompetenceKey].name.de,
    };
  });
};
