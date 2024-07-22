import { Box, Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { getNextCompetenceId, tryRemoveCompetence } from "../utils";
import { useContext, useEffect, useState } from "react";
import { ConfirmDialogContext } from "../context";

type SubCompetencesProps = {
  competenceAreaId: string;
  competenceId: string;
};

type StatisticsObject = {
  [id: string]: number;
};

export const SubCompetences = ({
  competenceAreaId,
  competenceId,
}: SubCompetencesProps) => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const [testItemsAttached, setTestItemsAttached] = useState<StatisticsObject>(
    {}
  );
  const [feedbackQuestionsAttached, setFeedbackQuestionsAttached] =
    useState<StatisticsObject>({});
  const { register, control, getValues, setFocus } =
    useFormContext<FormInputs>();
  const {
    fields: subCompetenceFields,
    append: appendSubCompetence,
    remove: removeSubCompetence,
  } = useFieldArray({
    control,
    name: `subCompetences-${competenceAreaId}-${competenceId}`,
    shouldUnregister: true,
  });

  const getSubCompetenceId = (): string => {
    const values = getValues();
    const subCompetences =
      values[`subCompetences-${competenceAreaId}-${competenceId}`];

    return getNextCompetenceId(
      values.seedId,
      competenceId,
      subCompetences,
      "subCompetenceId"
    );
  };

  const handleAppendSubCompetence = () => {
    appendSubCompetence({
      name: "",
      competenceAreaId: competenceAreaId,
      competenceId: competenceId,
      subCompetenceId: getSubCompetenceId(),
    });

    setTimeout(() => {
      const index = subCompetenceFields.length;
      setFocus(
        `subCompetences-${competenceAreaId}-${competenceId}.${index}.name`
      );
    });
  };

  const handleRemoveSubCompetence = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }
    const values = getValues();
    const removeFn = () => removeSubCompetence(index);
    const subCompetenceId = subCompetenceFields[index].subCompetenceId;
    const subCompetenceIdsToCheck = [
      competenceAreaId + competenceId + subCompetenceId,
    ];

    tryRemoveCompetence(values, subCompetenceIdsToCheck, removeFn);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const values = getValues();

      const newFeedbackQuestionsAttached: StatisticsObject = {};
      const newTestItemsAttached: StatisticsObject = {};
      subCompetenceFields.forEach((subCompetence) => {
        newTestItemsAttached[subCompetence.subCompetenceId] =
          values.testItems.filter(
            (test) => test.subCompetenceId === subCompetence.subCompetenceId
          ).length;

        newFeedbackQuestionsAttached[subCompetence.subCompetenceId] =
          values.feedbackQuestions.filter(
            (feedback) =>
              feedback.subCompetenceId === subCompetence.subCompetenceId
          ).length;
      });

      setTestItemsAttached(newTestItemsAttached);
      setFeedbackQuestionsAttached(newFeedbackQuestionsAttached);
    }, 3000);

    return () => clearInterval(interval);
  }, [subCompetenceFields, getValues]);

  const getStatisticsText = (subCompetenceId: string) => {
    const testItems = testItemsAttached[subCompetenceId] ?? "⏳";
    const feedbackQuestions =
      feedbackQuestionsAttached[subCompetenceId] ?? "⏳";
    return `(Test items: ${testItems}, feedback questions: ${feedbackQuestions})`;
  };

  return (
    <Box
      sx={{
        paddingLeft: 4,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderLeft: `1px solid ${grey[300]}`,
      }}
    >
      {subCompetenceFields
        .filter(
          (subCompetenceField) =>
            subCompetenceField.competenceAreaId === competenceAreaId &&
            subCompetenceField.competenceId === competenceId
        )
        .map((subCompetenceField, index) => (
          <Box
            key={subCompetenceField.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: [0, 2],
            }}
          >
            <input
              type="hidden"
              {...register(
                `subCompetences-${competenceAreaId}-${competenceId}.${index}.competenceAreaId` as const
              )}
            />
            <input
              type="hidden"
              {...register(
                `subCompetences-${competenceAreaId}-${competenceId}.${index}.competenceId` as const
              )}
            />
            <StyledInput short>
              <label>Id</label>
              <input
                readOnly
                type="text"
                {...register(
                  `subCompetences-${competenceAreaId}-${competenceId}.${index}.subCompetenceId` as const
                )}
              />
            </StyledInput>
            <StyledInput>
              <label>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  Name{" "}
                  <i style={{ fontSize: 12 }}>
                    {getStatisticsText(subCompetenceField.subCompetenceId)}
                  </i>
                </Box>
              </label>
              <input
                type="text"
                {...register(
                  `subCompetences-${competenceAreaId}-${competenceId}.${index}.name` as const
                )}
              />
            </StyledInput>
            <div>
              <IconButton
                onClick={() => handleRemoveSubCompetence(index)}
                color="error"
                title="Delete sub-competence"
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
          onClick={handleAppendSubCompetence}
        >
          Add SubCompetence
        </Button>
      </div>
    </Box>
  );
};
