import { SeasonDefinition } from "@talentdigital/season";

export const getEmptySeason = (): SeasonDefinition => ({
  title: getEmptyText(),
  info: getEmptyText(),
  seasonEndMessage: getEmptyText(),
  competenceAreas: {},
  episodes: {},
});

const getEmptyText = () => ({ en: "", de: "" });
