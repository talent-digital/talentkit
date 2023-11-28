export type FormInputs = {
  title: string;
  info: string;
  assetsURL: string;
  seasonEndMessage: string;
  testItems: {
    testItemId: string;
    episode: string;
    level: string;
    documentation: string;
    // search: // TODO
    //   en:
    //     links: []
    //   de:
    //     links: []
  }[];
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
