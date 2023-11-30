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

  newFile.seedId = values.seedId;
  newFile.title[language] = values.title;
  newFile.info[language] = values.info;
  newFile.assetsURL = values.assetsURL;
  newFile.seasonEndMessage[language] = values.seasonEndMessage;
  newFile.competenceAreas = mapToSeasonCompetenceAreas(
    values,
    newFile,
    language
  );
  newFile.episodes = mapToSeasonEpisodes(values, newFile, language);

  return newFile;
}

function mapToSeasonCompetenceAreas(
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
          competences: mapToSeasonCompetences(
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

function mapToSeasonCompetences(
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
          subCompetences: mapToSeasonSubCompetences(
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

function mapToSeasonSubCompetences(
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
      const oldNames =
        oldValues.competenceAreas[competenceAreaId]?.competences[competenceId]
          ?.subCompetences[subCompetence.subCompetenceId]?.name;

      return {
        ...accumulator,
        [subCompetence.subCompetenceId]: {
          name: {
            ...oldNames,
            [language]: subCompetence.name,
          },
          testItems: mapToSeasonTestItems(
            values,
            oldValues,
            language,
            competenceAreaId,
            competenceId,
            subCompetence.subCompetenceId
          ),
          feedbackQuestions: mapToSeasonFeedbackQuestions(
            values,
            oldValues,
            language,
            competenceAreaId,
            competenceId,
            subCompetence.subCompetenceId
          ),
        },
      };
    }, {}) ?? {}
  );
}

function mapToSeasonTestItems(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode,
  competenceAreaId: string,
  competenceId: string,
  subCompetenceId: string
) {
  const testItems = values.testItems?.filter(
    (testItem) =>
      testItem.competenceAreaId === competenceAreaId &&
      testItem.competenceId === competenceId &&
      testItem.subCompetenceId === subCompetenceId
  );

  return (
    testItems?.reduce((accumulator, testItem) => {
      const oldTestItem =
        oldValues.competenceAreas[competenceAreaId].competences[competenceId]
          .subCompetences[subCompetenceId].testItems?.[testItem.testItemId];
      const oldDocumentation = oldTestItem?.documentation ?? {};

      return {
        ...accumulator,
        [testItem.testItemId]: {
          ...oldTestItem,
          level: testItem.level,
          episode: testItem.episode,
          documentation: {
            ...oldDocumentation,
            [language]: testItem.documentation,
          },
        },
      };
    }, {}) ?? {}
  );
}

function mapToSeasonFeedbackQuestions(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode,
  competenceAreaId: string,
  competenceId: string,
  subCompetenceId: string
) {
  const feedbackQuestions = values.feedbackQuestions?.filter(
    (feedbackQuestion) =>
      feedbackQuestion.competenceAreaId === competenceAreaId &&
      feedbackQuestion.competenceId === competenceId &&
      feedbackQuestion.subCompetenceId === subCompetenceId
  );

  return (
    feedbackQuestions?.reduce((accumulator, feedbackQuestion) => {
      const oldFeedbackQuestion =
        oldValues.competenceAreas[competenceAreaId].competences[competenceId]
          .subCompetences[subCompetenceId].feedbackQuestions?.[
          feedbackQuestion.feedbackQuestionId
        ];
      const oldQuestion = oldFeedbackQuestion?.question ?? {};
      const oldAnswers = oldFeedbackQuestion?.answers ?? {};
      const newAnswers = oldFeedbackQuestion?.answers ?? {};

      feedbackQuestion.answers.split(", ").forEach((answer, index) => {
        newAnswers[index] = {
          ...oldAnswers[index],
          [language]: answer,
        };
      });

      return {
        ...accumulator,
        [feedbackQuestion.feedbackQuestionId]: {
          ...oldFeedbackQuestion,
          episode: feedbackQuestion.episode,
          question: {
            ...oldQuestion,
            [language]: feedbackQuestion.question,
          },
          answers: newAnswers,
        },
      };
    }, {}) ?? {}
  );
}

function mapToSeasonEpisodes(
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
