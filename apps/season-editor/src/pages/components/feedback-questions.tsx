import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";
import { FeedbackQuestionsAnswers } from "./feedback-questions-answers";

export const FeedbackQuestions = () => {
  const { register, control, setValue } = useFormContext<FormInputs>();
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

  return (
    <>
      {feedbackQuestionFields.map((feedbackQuestionField, index) => (
        <StyledSectionWrapper key={feedbackQuestionField.id} indented>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>feedbackQuestionId</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.feedbackQuestionId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>competenceAreaId</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.competenceAreaId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>competenceId</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.competenceId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>subCompetenceId</label>
                <input
                  type="text"
                  {...register(
                    `feedbackQuestions.${index}.subCompetenceId` as const
                  )}
                />
              </StyledInput>

              <StyledInput>
                <label>episode</label>
                <input
                  type="text"
                  {...register(`feedbackQuestions.${index}.episode` as const)}
                />
              </StyledInput>
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>question</label>
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
