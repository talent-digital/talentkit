import { FormInputs } from "../types";

export function tryRemoveCompetence(
  values: FormInputs,
  subCompetenceIdsToCheck: string[],
  removeFn: () => void
) {
  const subCompetenceUsedInTestItems: boolean = values.testItems
    .map(
      (item) => item.competenceAreaId + item.competenceId + item.subCompetenceId
    )
    .some((id) => subCompetenceIdsToCheck.includes(id));

  const subCompetenceUsedInFeedbackQuestions: boolean = values.feedbackQuestions
    .map(
      (item) => item.competenceAreaId + item.competenceId + item.subCompetenceId
    )
    .some((id) => subCompetenceIdsToCheck.includes(id));

  if (subCompetenceUsedInTestItems || subCompetenceUsedInFeedbackQuestions) {
    alert(
      "Cannot delete competence because one of it's sub-competences is used in a test item or feedback question."
    );
  } else {
    removeFn();
  }
}
