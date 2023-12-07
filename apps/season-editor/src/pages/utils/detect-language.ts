import { SeasonDefinition } from "@talentdigital/season";
import { LanguageCode } from "../types";
import { DEFAULT_LANGUAGE, availableLanguages } from "../dictionaries";

export function detectLanguage(season?: SeasonDefinition): LanguageCode {
  if (typeof season?.title === "object") {
    const maybeLanguageKey = Object.entries(season.title)
      .filter(([_, value]) => {
        return Boolean(value);
      })
      .map(([key]) => key)[0];

    if (isLanguageKey(maybeLanguageKey)) {
      return maybeLanguageKey;
    }
  }

  return DEFAULT_LANGUAGE;
}

function isLanguageKey(key: string): key is LanguageCode {
  return availableLanguages.includes(key as LanguageCode);
}
