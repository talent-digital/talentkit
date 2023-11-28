import { SeasonDefinition } from "@talentdigital/season";
import { FormInputs, LanguageCode } from "../types";

export function mapToSeasonObject(
  originalFileLoaded: SeasonDefinition,
  valuesWithEmpty: FormInputs,
  language: LanguageCode
) {
  const newFile: SeasonDefinition = JSON.parse(
    JSON.stringify(originalFileLoaded)
  );
  const values: Partial<FormInputs> = Object.fromEntries(
    Object.entries(valuesWithEmpty).filter((entries) => Boolean(entries[1]))
  ) as Partial<FormInputs>;

  newFile.title[language] = values.title;
  newFile.info[language] = values.info;
  newFile.assetsURL = values.assetsURL;
  newFile.seasonEndMessage[language] = values.seasonEndMessage;
  newFile.competenceAreas = mapFormCompetenceAreasToSeasonCompetenceAreas(
    values,
    newFile,
    language
  );
  newFile.episodes = mapFormEpisodesToSeasonEpisodes(values, newFile, language);

  return newFile;
}

function mapFormCompetenceAreasToSeasonCompetenceAreas(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode
): SeasonDefinition["competenceAreas"] {
  return (
    values.competenceAreas?.reduce((accumulator, competenceArea) => {
      return {
        ...accumulator,
        [competenceArea.competenceAreaId]: {
          name: {
            ...oldValues.competenceAreas[competenceArea.competenceAreaId]?.name,
            [language]: competenceArea.name,
          },
          competences: mapFormCompetencesToSeasonCompetences(
            values,
            oldValues,
            language,
            competenceArea.competenceAreaId
          ),
        },
      };
    }, {}) ?? {}
  );
}

function mapFormCompetencesToSeasonCompetences(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode,
  competenceAreaId: string
) {
  const competences = values[`competences-${competenceAreaId}`];

  return (
    competences?.reduce((accumulator, competence) => {
      return {
        ...accumulator,
        [competence.competenceId]: {
          name: {
            ...oldValues.competenceAreas[competence.competenceId]?.name,
            [language]: competence.name,
          },
          subCompetences: mapFormSubCompetencesToSeasonSubCompetences(
            values,
            oldValues,
            language,
            competenceAreaId,
            competence.competenceId
          ),
        },
      };
    }, {}) ?? {}
  );
}

function mapFormSubCompetencesToSeasonSubCompetences(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode,
  competenceAreaId: string,
  competenceId: string
) {
  const subCompetences =
    values[`subCompetences-${competenceAreaId}-${competenceId}`];

  return (
    subCompetences?.reduce((accumulator, subCompetence) => {
      return {
        ...accumulator,
        [subCompetence.subCompetenceId]: {
          name: {
            ...oldValues.competenceAreas[competenceAreaId]?.competences[
              competenceId
            ]?.subCompetences[subCompetence.subCompetenceId]?.name,
            [language]: subCompetence.name,
          },
        },
      };
    }, {}) ?? {}
  );
}

function mapFormEpisodesToSeasonEpisodes(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode
): SeasonDefinition["episodes"] {
  return (
    values.episodes?.reduce((accumulator, episode) => {
      return {
        ...accumulator,
        [episode.episodeId]: {
          title: {
            ...oldValues.episodes[episode.episodeId]?.title,
            [language]: episode.title,
          },
          description: {
            ...oldValues.episodes[episode.episodeId]?.description,
            [language]: episode.description,
          },
          maturity: episode.maturity,
          imageUrl: episode.imageUrl,
          format: episode.format,
          formatConfiguration: episode.formatConfiguration,
        },
      };
    }, {}) ?? {}
  );
}
