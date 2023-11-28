export type FormInputs = {
  title: string;
  info: string;
  assetsURL: string;
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
  [key: `subCompetences-${string}-${string}`]: {
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

// type MyType = {
//   [key: `competence-${string}`]: string;
// }

// const x: MyType = {
//   "competence-1": "eh",
//   "competence-2": "ah!!",
// }

// console.log(x)
