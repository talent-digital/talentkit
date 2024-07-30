export type ErrorObject = {
  isError: true;
  notNumericEpisodes?: string[];
  testItemIdDuplicates?: string[];
  feedbackQuesionsHaveTooLongAnswers?: boolean;
};
