import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledInput } from "./styled-input";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

type AnswersFormInputs = {
  answers: {
    text: string;
  }[];
};

type FeedbackQuestionsAnswersProps = {
  answers: string;
  feedbackQuestionIndex: number;
  onUpdate: (index: number, asnwers: string) => void;
};

export const FeedbackQuestionsAnswers = ({
  answers,
  feedbackQuestionIndex,
  onUpdate,
}: FeedbackQuestionsAnswersProps) => {
  const { register, control, getValues } = useForm<AnswersFormInputs>({
    defaultValues: {
      answers: answers?.split(",").map((text) => ({ text })) ?? [],
    },
  });
  const {
    fields: answersFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `answers`,
  });

  const handleOnBlur = () => {
    onUpdate(
      feedbackQuestionIndex,
      getValues()
        .answers.map(({ text }) => text)
        .join(",")
    );
  };

  return (
    <Box
      sx={{
        paddingLeft: 4,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {answersFields.map((answersField, index) => (
        <Box
          key={answersField.id}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <StyledInput>
            <label>Answer {index}</label>
            <input
              type="text"
              {...register(`answers.${index}.text` as const)}
              onBlur={handleOnBlur}
            />
          </StyledInput>
          <div>
            <IconButton onClick={() => removeAnswer(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </Box>
      ))}
      <div>
        <Button
          variant="contained"
          type="button"
          onClick={() =>
            appendAnswer({
              text: "",
            })
          }
        >
          Add Answer
        </Button>
      </div>
    </Box>
  );
};
