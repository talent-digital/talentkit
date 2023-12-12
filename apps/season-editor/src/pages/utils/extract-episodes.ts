import { SeasonDefinition } from "@talentdigital/season";
import { FormInputs, LanguageCode } from "../types";

export function extractEpisodes(
  season: SeasonDefinition,
  language: LanguageCode
): FormInputs["episodes"] {
  return Object.entries(season.episodes).map(([episodeId, episodeValue]) => ({
    episodeId,
    title: episodeValue.title[language] ?? "",
    description: episodeValue.description[language] ?? "",
    maturity: episodeValue.maturity,
    imageUrl: episodeValue.imageUrl ?? "",
    format: episodeValue.format,
    formatConfiguration: episodeValue.formatConfiguration ?? "",
  }));
}
