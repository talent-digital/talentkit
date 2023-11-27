export type FormInputs = {
  title: string;
  info: string;
  assetsURL: string;
  seasonEndMessage: string;
  competenceAreas: {
    competenceAreaId: string;
    name: string;
  }[];
  competences: {
    competenceAreaId: string;
    competenceId: string;
    name: string;
  }[];
  subCompetences: {
    competenceAreaId: string;
    competenceId: string;
    subCompetenceId: string;
    name: string;
  }[];
  episodes: {
    episodeId: string;
    title: string;
    description: string;
    maturity: string;
    imageUrl: string;
    format: string;
    formatConfiguration: string;
  }[];
};
