import { SeasonDefinition } from "@talentdigital/season";
import { LanguageCode } from "../types";
import { DEFAULT_LANGUAGE, availableLanguages } from "../dictionaries";

export function detectLanguage(season?: SeasonDefinition): LanguageCode {
  if (typeof season?.title === "object") {
    const maybeLanguageKey = Object.keys(season.title)[0];

    if (isLanguageKey(maybeLanguageKey)) {
      return maybeLanguageKey;
    }
  }

  return DEFAULT_LANGUAGE;
}

function isLanguageKey(key: string): key is LanguageCode {
  return availableLanguages.includes(key as LanguageCode);
}
