import { SeasonDefinition } from "@talentdigital/season";
import { FormInputs, LanguageCode } from "../types";

export function extractFromEpisodes(
  season: SeasonDefinition,
  language: LanguageCode
): {
  episodes: FormInputs["episodes"];
  badges: FormInputs["badges"];
} {
  const episodes = Object.entries(season.episodes).map(
    ([episodeId, episodeValue]) => ({
      episodeId,
      title: episodeValue.title[language] ?? "",
      description: episodeValue.description[language] ?? "",
      maturity: episodeValue.maturity,
      imageUrl: episodeValue.imageUrl ?? "",
      format: episodeValue.format,
      formatConfiguration: episodeValue.formatConfiguration ?? "",
    })
  );

  const badges = Object.entries(season.episodes).flatMap(
    ([episodeId, episodeValue]) => {
      return Object.entries(episodeValue?.badges ?? {}).map(
        ([badgeId, badgeValue]) => ({
          badgeId,
          name: badgeValue.name[language] ?? "",
          image: badgeValue.image,
          episode: episodeId,
        })
      );
    }
  );

  return { episodes, badges };
}
