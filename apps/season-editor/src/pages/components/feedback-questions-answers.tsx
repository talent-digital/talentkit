import { Box, Button } from "@mui/material";
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
  // eslint-disable-next-line no-unused-vars
  onUpdate: (index: number, answers: string) => void;
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

  const updateValues = () => {
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
              onBlur={updateValues}
            />
          </StyledInput>
          <div>
            <IconButton
              onClick={() => {
                removeAnswer(index);
                updateValues();
              }}
              color="error"
              title={`Delete answer ${index}`}
            >
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
