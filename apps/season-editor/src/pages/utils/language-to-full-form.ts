import { LanguageCode } from "../types";

export const languageToFullForm = (language: LanguageCode) => {
  switch (language) {
    case "en":
      return "English";
    case "de":
      return "German";
    default:
      return language;
  }
};
