import { SeasonDefinition } from "@talentdigital/season";
import { LanguageCode } from "../types";
import toast from "react-hot-toast";

export const translateSeason = (
  season: SeasonDefinition,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode
): SeasonDefinition => {
  const seasonWithTranslations = deepTranslate(
    season,
    fromLanguage,
    toLanguage
  );

  if (!isSeasonDefinition(seasonWithTranslations)) {
    toast.error("Season incorrectly translated");

    return season as SeasonDefinition;
  }

  return seasonWithTranslations;
};

const deepTranslate = (
  obj: SeasonDefinition | Record<string, unknown>,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        if (typeof value[fromLanguage] === "string" && !value[toLanguage]) {
          return [
            key,
            deepTranslate(
              translate(value, fromLanguage, toLanguage),
              fromLanguage,
              toLanguage
            ),
          ];
        }
        return [key, deepTranslate(value, fromLanguage, toLanguage)];
      }
      return [key, value];
    })
  );
};

const translate = (
  value: Record<string, unknown>,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode
) => {
  return {
    ...value,
    // TODO: add GPT translation
    [toLanguage]: `::T-${toLanguage}::` + value[fromLanguage] ?? "",
  };
};

const isSeasonDefinition = (input: unknown): input is SeasonDefinition => {
  return Boolean(
    input &&
      typeof input === "object" &&
      input !== null &&
      "title" in input &&
      "info" in input &&
      "seasonEndMessage" in input &&
      "competenceAreas" in input &&
      "episodes" in input
  );
};
