import { SeasonDefinition } from "@talentdigital/season";
import { LanguageCode } from "../types";
import toast from "react-hot-toast";
import { languageToFullForm } from "./language-to-full-form";
import md5 from "crypto-js/md5";
import OpenAI from "openai";

type TranslationObject = Record<string, string>;

export const translateSeason = async (
  season: SeasonDefinition,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode,
  apiKey: string
): Promise<SeasonDefinition> => {
  const translationObject: TranslationObject = {};
  const seasonWithMarkedTranslations = markDeepForTranslation(
    season,
    fromLanguage,
    toLanguage,
    translationObject
  );

  const translations = await fetchTranslation(
    translationObject,
    fromLanguage,
    toLanguage,
    apiKey
  );

  const seasonWithTranslations = mapTranslationsToSeason(
    seasonWithMarkedTranslations,
    translations
  );

  if (!isSeasonDefinition(seasonWithTranslations)) {
    toast.error("Season incorrectly translated");

    return season as SeasonDefinition;
  }

  return seasonWithTranslations;
};

const markDeepForTranslation = (
  obj: SeasonDefinition | Record<string, unknown>,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode,
  translationObject: Record<string, string>
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (isObject(value)) {
        if (typeof value[fromLanguage] === "string" && !value[toLanguage]) {
          const { hash, markedValue } = markForTranslation(
            value,
            fromLanguage,
            toLanguage
          );
          const valueFromLanguage = value[fromLanguage];
          if (typeof valueFromLanguage === "string") {
            translationObject[hash] = valueFromLanguage;
          }

          return [
            key,
            markDeepForTranslation(
              markedValue,
              fromLanguage,
              toLanguage,
              translationObject
            ),
          ];
        }
        return [
          key,
          markDeepForTranslation(
            value,
            fromLanguage,
            toLanguage,
            translationObject
          ),
        ];
      }
      return [key, value];
    })
  );
};

type MarkForTranslationReturn = {
  hash: string;
  markedValue: Record<string, unknown>;
};

const markForTranslation = (
  value: Record<string, unknown>,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode
): MarkForTranslationReturn => {
  const hash = md5(value[fromLanguage] as string).toString();

  return {
    hash,
    markedValue: {
      ...value,
      [toLanguage]: hash,
    },
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

const fetchTranslation = async (
  translationObject: TranslationObject,
  fromLanguage: LanguageCode,
  toLanguage: LanguageCode,
  apiKey: string
) => {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that translates languages. You may only translate text that is provided to you and in the format that it is provided. Your response should only contain the translated text, this is very important as your response is going to be parsed by a script. You are going to receive a JSON containing a key value pair where the key is a hash and the value is the text that needs to be translated. You should translate the text and return a JSON with the same key value pair structure where the key is the same hash and the value is the translated text.",
        },
        {
          role: "user",
          content: `Translate this from ${languageToFullForm(fromLanguage)} into ${languageToFullForm(toLanguage)}: ${JSON.stringify(translationObject)}`,
        },
      ],
    });

    const content = response.choices[0].message?.content;

    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    try {
      return JSON.parse(content) as TranslationObject;
    } catch (error) {
      throw new Error("Error parsing JSON");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const mapTranslationsToSeason = (
  season: Record<string, unknown>,
  translations: TranslationObject
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(season).map(([key, value]) => {
      if (isObject(value)) {
        return [key, mapTranslationsToSeason(value, translations)];
      }
      if (typeof value === "string") {
        const maybeTranslatedValue = translations[value] || value;

        return [key, maybeTranslatedValue];
      }

      return [key, value];
    })
  );
};

const isObject = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && !Array.isArray(input);
};
