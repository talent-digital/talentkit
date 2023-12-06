import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormInputs, FromInputSubCompetence } from "../types";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";
import { FeedbackQuestionsAnswers } from "./feedback-questions-answers";
import { ChangeEvent, useState } from "react";
import { grey } from "@mui/material/colors";

const EMPTY_OPTION = "";

export const FeedbackQuestions = () => {
  const [episodeOptions, setEpisodeOptions] = useState<string[]>([]);
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
  };

  const handleSubCompetenceSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selected = subCompetenceOptions.find(
      (item) => getSubCompetenceKey(item) === event.target.value
    );

    if (selected) {
      setValue(
        `feedbackQuestions.${index}.competenceAreaId`,
        selected?.competenceAreaId
      );
      setValue(
        `feedbackQuestions.${index}.competenceId`,
        selected?.competenceId
      );
      setValue(
        `feedbackQuestions.${index}.subCompetenceId`,
        selected?.subCompetenceId
      );
    }
  };

  const updateEpisodeList = () => {
    const episodes = getValues("episodes").map((episode) => episode.episodeId);
    setEpisodeOptions(episodes);
  };

  const updateSubCompetenceList = () => {
    const values = getValues();
    const list: FromInputSubCompetence[] = Object.entries(values)
      .filter(([key]) => key.startsWith("subCompetences"))
      .flatMap(([_, value]) => value as unknown as FromInputSubCompetence);

    setSubCompetenceOptions(list);
  };

  const getFeedbackQuestionId = () => {
    const DIVIDER = "--";
    const seedId = getValues("seedId");
    const lastTestId =
      feedbackQuestionFields[
        feedbackQuestionFields.length - 1
      ]?.feedbackQuestionId.split(DIVIDER)[1];
    const lastTestIdIsNumber = !isNaN(Number(lastTestId));
    const newTestId = lastTestIdIsNumber ? Number(lastTestId) + 1 : 1;

    return `feedback-${seedId}${DIVIDER}${newTestId}`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {feedbackQuestionFields.map((feedbackQuestionField, index) => (
        <Box
          key={feedbackQuestionField.id}
          sx={{
            pb: 4,
            borderBottom: `3px solid ${grey[600]}`,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
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
                  defaultValue={EMPTY_OPTION}
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
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>Question</label>
              <input
                type="text"
                {...register(`feedbackQuestions.${index}.question` as const)}
              />
            </StyledInput>

            <FeedbackQuestionsAnswers
              answers={feedbackQuestionField.answers}
              feedbackQuestionIndex={index}
              onUpdate={handleUpdate}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="error"
                onClick={() => removeFeedbackQuestion(index)}
              >
                Remove Feedback Question
              </Button>
            </Box>
          </Box>
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          type="button"
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
    </Box>
  );
};

function getSubCompetenceKey(subCompetence: FromInputSubCompetence) {
  return `${subCompetence.competenceAreaId}-${subCompetence.competenceId}-${subCompetence.subCompetenceId}`;
}
