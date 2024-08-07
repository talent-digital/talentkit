import { Button, Box, Alert } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormInputs, FromInputSubCompetence } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-wrapper";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConfirmDialogContext } from "../context";
import { InputList } from "./input-list";
import { MAX_FEEDBACK_QUESTIONS_ANSWERS_LENGTH } from "../dictionaries";

const EMPTY_OPTION = "";

export const FeedbackQuestions = () => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const [subCompetenceValues, setSubCompetenceValues] = useState<
    Record<string, string>
  >({});
  const [episodeOptions, setEpisodeOptions] = useState<string[] | undefined>(
    undefined
  );
  const [longAnswersErrorFieldIds, setLongAnswersErrorFieldIds] = useState<
    number[]
  >([]);
  const [subCompetenceOptions, setSubCompetenceOptions] = useState<
    FromInputSubCompetence[]
  >([]);
  const { register, control, setValue, getValues } =
    useFormContext<FormInputs>();
  const {
    fields: feedbackQuestionFields,
    append: appendFeedbackQuestion,
    remove: removeFeedbackQuestion,
  } = useFieldArray({
    control,
    name: "feedbackQuestions",
  });

  const handleUpdate = (index: number, answers: string) => {
    setValue(`feedbackQuestions.${index}.answers`, answers);

    const answersLength = JSON.stringify(
      answers.split(",").map((answer, index) => ({
        id: index,
        de: answer,
      }))
    ).length;
    const newAnswersError =
      answersLength > MAX_FEEDBACK_QUESTIONS_ANSWERS_LENGTH
        ? longAnswersErrorFieldIds.concat(index)
        : longAnswersErrorFieldIds.filter((id) => id !== index);
    setLongAnswersErrorFieldIds(newAnswersError);
  };

  const handleSubCompetenceSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selected = subCompetenceOptions.find(
      (item) => getSubCompetenceKey(item) === event.target.value
    );

    if (selected) {
      const { competenceAreaId, competenceId, subCompetenceId } = selected;
      setValue(`feedbackQuestions.${index}.competenceAreaId`, competenceAreaId);
      setValue(`feedbackQuestions.${index}.competenceId`, competenceId);
      setValue(`feedbackQuestions.${index}.subCompetenceId`, subCompetenceId);
      setSubCompetenceValues((prev) => ({
        ...prev,
        [index]: `${competenceAreaId}-${competenceId}-${subCompetenceId}`,
      }));
    }
  };

  const updateEpisodeList = useCallback(() => {
    const episodes = getValues("episodes").map((episode) => episode.episodeId);
    setEpisodeOptions(episodes);
  }, [getValues]);

  const updateSubCompetenceList = useCallback(() => {
    const values = getValues();
    const list: FromInputSubCompetence[] = Object.entries(values)
      .filter(([key]) => key.startsWith("subCompetences"))
      .flatMap(([_, value]) => value as unknown as FromInputSubCompetence);

    setSubCompetenceOptions(list);
  }, [getValues]);

  const getFeedbackQuestionId = () => {
    const DIVIDER = "--";
    const seedId = getValues("seedId");
    const lastId =
      feedbackQuestionFields[
        feedbackQuestionFields.length - 1
      ]?.feedbackQuestionId.split(DIVIDER)[1];
    const lastIdIsNumber = !isNaN(Number(lastId));
    const newId = lastIdIsNumber ? Number(lastId) + 1 : 1;

    return `feedback-${seedId}${DIVIDER}${newId}`;
  };

  const handleRemoveFeedbackQuestion = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }

    removeFeedbackQuestion(index);
  };

  useEffect(() => {
    feedbackQuestionFields.forEach((_, index) => {
      const { competenceAreaId, competenceId, subCompetenceId } =
        feedbackQuestionFields[index];
      setSubCompetenceValues((prev) => ({
        ...prev,
        [index]: `${competenceAreaId}-${competenceId}-${subCompetenceId}`,
      }));
    });
  }, [feedbackQuestionFields]);

  useEffect(() => {
    updateEpisodeList();
    // Without this initial update the selected sub-competence is emtpy
    const timeout = setTimeout(() => {
      updateSubCompetenceList();
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [updateSubCompetenceList, updateEpisodeList]);

  return (
    <>
      {feedbackQuestionFields.map((feedbackQuestionField, index) => (
        <StyledSectionWrapper key={feedbackQuestionField.id} indented>
          <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
            <input
              type="text"
              hidden
              {...register(
                `feedbackQuestions.${index}.competenceAreaId` as const
              )}
            />

            <input
              type="text"
              hidden
              {...register(`feedbackQuestions.${index}.competenceId` as const)}
            />

            <input
              type="text"
              hidden
              {...register(
                `feedbackQuestions.${index}.subCompetenceId` as const
              )}
            />
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>Id</label>
                <input
                  type="text"
                  readOnly
                  {...register(
                    `feedbackQuestions.${index}.feedbackQuestionId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>Sub-competence</label>
                <select
                  value={subCompetenceValues[index]}
                  onClick={updateSubCompetenceList}
                  onChange={(event) => handleSubCompetenceSelect(event, index)}
                >
                  <option value={EMPTY_OPTION}>{EMPTY_OPTION}</option>
                  {subCompetenceOptions.map((option) => (
                    <option
                      value={getSubCompetenceKey(option)}
                      key={getSubCompetenceKey(option)}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </StyledInput>

              {episodeOptions !== undefined && (
                <StyledInput>
                  <label>Episode</label>
                  <select
                    {...register(`feedbackQuestions.${index}.episode` as const)}
                    onClick={updateEpisodeList}
                  >
                    {episodeOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </StyledInput>
              )}
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>Question</label>
              <input
                type="text"
                {...register(`feedbackQuestions.${index}.question` as const)}
              />
            </StyledInput>

            {longAnswersErrorFieldIds.includes(index) && (
              <Alert severity="error">
                The combined text from all of your answers is too long. Try
                shortening them or remove some answers.
              </Alert>
            )}

            <InputList
              formFieldName="answers"
              hasError={longAnswersErrorFieldIds.includes(index)}
              itemIndex={index}
              label="answer"
              list={feedbackQuestionField.answers}
              onUpdate={handleUpdate}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              onClick={() => handleRemoveFeedbackQuestion(index)}
            >
              Remove Feedback Question
            </Button>
          </Box>
        </StyledSectionWrapper>
      ))}

      <Box sx={{ display: "flex", alignSelf: "flex-start", pl: 3 }}>
        <Button
          variant="outlined"
          type="button"
          startIcon={<AddIcon />}
          sx={{ background: "#fff" }}
          onClick={() =>
            appendFeedbackQuestion({
              competenceAreaId: "",
              competenceId: "",
              subCompetenceId: "",
              feedbackQuestionId: getFeedbackQuestionId(),
              episode: "",
              question: "",
              answers: "",
            })
          }
        >
          Add Feedback Question
        </Button>
      </Box>
    </>
  );
};

function getSubCompetenceKey(subCompetence: FromInputSubCompetence) {
  return `${subCompetence.competenceAreaId}-${subCompetence.competenceId}-${subCompetence.subCompetenceId}`;
}
