import { FormInputs } from "../types";
import toast from "react-hot-toast";

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
    toast.error(
      "Cannot delete because the element or its child is used in a test item or a feedback question."
    );
  } else {
    removeFn();
  }
}
