import { FromInputSubCompetence } from "./form-input-sub-competence";

export type FormInputs = {
  seedId: string;
  title: string;
  info: string;
  assetsURL: string;
  linearSeason: boolean;
  seasonEndMessage: string;
  competenceAreas: {
    competenceAreaId: string;
    name: string;
  }[];
  [key: `competences-${string}`]: {
    competenceAreaId: string;
    competenceId: string;
    name: string;
  }[];
  [key: `subCompetences-${string}-${string}`]: FromInputSubCompetence[];
  episodes: {
    episodeId: string;
    title: string;
    description: string;
    maturity: string;
    imageUrl: string;
    format: string;
    formatConfiguration: string;
  }[];
  testItems: {
    testItemId: string;
    competenceAreaId: string;
    competenceId: string;
    subCompetenceId: string;
    episode: string;
    level: string;
    documentation: string;
  }[];
  feedbackQuestions: {
    feedbackQuestionId: string;
    competenceAreaId: string;
    competenceId: string;
    subCompetenceId: string;
    episode: string;
    question: string;
    answers: string;
  }[];
};
