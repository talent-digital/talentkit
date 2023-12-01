import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";
import { FeedbackQuestionsAnswers } from "./feedback-questions-answers";
import { useState } from "react";

export const FeedbackQuestions = () => {
  const [episodeOptions, setEpisodeOptions] = useState<string[]>([]);
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

  const updateEpisodeList = () => {
    const episodes = getValues("episodes").map((episode) => episode.episodeId);
    setEpisodeOptions(episodes);
  };

  return (
    <>
      {feedbackQuestionFields.map((feedbackQuestionField, index) => (
        <StyledSectionWrapper key={feedbackQuestionField.id} indented>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>Id</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.feedbackQuestionId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>Competence Area Id</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.competenceAreaId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>Competence Id</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.competenceId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>Sub-competence Id</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.subCompetenceId` as const
                  )}
                />
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
          </Box>
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
        </StyledSectionWrapper>
      ))}

      <StyledSectionWrapper indented>
        <div>
          <Button
            variant="contained"
            type="button"
            onClick={() =>
              appendFeedbackQuestion({
                competenceAreaId: "",
                competenceId: "",
                subCompetenceId: "",
                feedbackQuestionId: "",
                episode: "",
                question: "",
                answers: "",
              })
            }
          >
            Add Feedback Question
          </Button>
        </div>
      </StyledSectionWrapper>
    </>
  );
};
