import { SeasonDefinition } from "@talentdigital/season";

import { ErrorObject, FormInputs } from "../types";
import { isErrorObject } from "./is-error-object";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

export const validateSeason = (
  maybeSeason: SeasonDefinition | ErrorObject,
  values: FormInputs,
  setError: UseFormSetError<FormInputs>
): maybeSeason is SeasonDefinition => {
  if (!isErrorObject(maybeSeason)) {
    return true;
  }

  if (maybeSeason.testItemIdDuplicates) {
    validateTestItems(setError, values, maybeSeason.testItemIdDuplicates);
  }
  if (maybeSeason.notNumericEpisodes) {
    validateNumericEpisodes(setError, values, maybeSeason.notNumericEpisodes);
  }
  if (maybeSeason.feedbackQuesionsHaveTooLongAnswers) {
    validateFeedbackQuesionsHaveTooLongAnswers();
  }

  return false;
};

const validateTestItems = (
  setError: UseFormSetError<FormInputs>,
  values: FormInputs,
  testItemIdDuplicates: string[]
) => {
  values.testItems.forEach((item, index) => {
    if (testItemIdDuplicates.includes(item.testItemId)) {
      const fieldId = `testItems[${index}].testItemId` as "testItems";
      setError(fieldId, {
        message: "Duplicate test item id",
      });
    }
  });

  toast.error(
    `Error: Duplicate Test IDs. Please make sure your Test IDs are unique for this season. Duplicates found: ${testItemIdDuplicates.join(
      ", "
    )}`
  );
};

const validateNumericEpisodes = (
  setError: UseFormSetError<FormInputs>,
  values: FormInputs,
  notNumericEpisodes: string[]
) => {
  values.episodes.forEach((item, index) => {
    if (notNumericEpisodes.includes(item.episodeId)) {
      const fieldId = `episodes[${index}].episodeId` as "episodes";
      setError(fieldId, {
        message: "Episode id must be numeric",
      });
    }
  });

  toast.error(
    `Error: episode ids must be numeric when linear season is checked. Non numeric episode ids found: ${notNumericEpisodes.join(
      ", "
    )}`
  );
};

const validateFeedbackQuesionsHaveTooLongAnswers = () => {
  toast.error(`Error: Feedback questions have too long answers.`);
};
