import { SeasonDefinition } from "@talentdigital/season";
import { FormInputs, LanguageCode } from "../types";

type ExtractCompetencesReturn = {
  competenceAreas: FormInputs["competenceAreas"];
  competences: Record<
    `competences-${string}`,
    FormInputs[`competences-${string}`]
  >;
  subCompetences: Record<
    `subCompetences-${string}-${string}`,
    FormInputs[`subCompetences-${string}-${string}`]
  >;
  testItems: FormInputs["testItems"];
};

export function extractFromCompetences(
  season: SeasonDefinition,
  language: LanguageCode
): ExtractCompetencesReturn {
  const competenceAreas: ExtractCompetencesReturn["competenceAreas"] = [];
  const competences: ExtractCompetencesReturn["competences"] = {};
  const subCompetences: ExtractCompetencesReturn["subCompetences"] = {};
  const testItems: ExtractCompetencesReturn["testItems"] = [];

  Object.entries(season.competenceAreas).forEach(
    ([competenceAreaId, competenceAreaValue]) => {
      competenceAreas.push({
        competenceAreaId,
        name: competenceAreaValue.name?.[language] ?? "",
      });

      Object.entries(competenceAreaValue.competences).forEach(
        ([competenceId, competenceValue]) => {
          const competenceKey = `competences-${competenceAreaId}` as const;
          if (!competences[competenceKey]) {
            competences[competenceKey] = [];
          }

          competences[competenceKey].push({
            competenceAreaId,
            competenceId,
            name: competenceValue.name?.[language] ?? "",
          });

          Object.entries(competenceValue.subCompetences).forEach(
            ([subCompetenceId, subCompetenceValue]) => {
              const subCompetenceKey =
                `subCompetences-${competenceAreaId}-${competenceId}` as const;

              if (!subCompetences[subCompetenceKey]) {
                subCompetences[subCompetenceKey] = [];
              }

              subCompetences[subCompetenceKey].push({
                competenceAreaId,
                competenceId,
                subCompetenceId,
                name: subCompetenceValue.name?.[language] ?? "",
              });

              if (!subCompetenceValue.testItems) return;

              Object.entries(subCompetenceValue.testItems).forEach(
                ([testItemId, testItemValue]) => {
                  testItems.push({
                    competenceAreaId,
                    competenceId,
                    subCompetenceId,
                    testItemId,
                    episode: testItemValue.episode,
                    level: testItemValue.level,
                    documentation:
                      testItemValue.documentation?.[language] ?? "",
                  });
                }
              );
            }
          );
        }
      );
    }
  );

  return { competenceAreas, competences, subCompetences, testItems };
}
