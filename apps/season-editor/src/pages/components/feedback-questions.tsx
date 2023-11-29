import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";

export const FeedbackQuestions = () => {
  const { register, control } = useFormContext<FormInputs>();
  const {
    fields: testItemFields,
    append: appendFeedbackQuestion,
    remove: removeFeedbackQuestion,
  } = useFieldArray({
    control,
    name: "feedbackQuestions",
  });

  return (
    <>
      {testItemFields.map((testItem, index) => (
        <StyledSectionWrapper key={testItem.id} indented>
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

            <StyledInput>
              <label>answers (comma separated)</label>
              <input
                type="text"
                {...register(`feedbackQuestions.${index}.answers` as const)}
              />
            </StyledInput>
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
