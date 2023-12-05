import { Box, Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { getNextCompetenceId, tryRemoveCompetence } from "../utils";

type SubCompetencesProps = {
  competenceAreaId: string;
  competenceId: string;
};

export const SubCompetences = ({
  competenceAreaId,
  competenceId,
}: SubCompetencesProps) => {
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

  const handleRemoveSubCompetence = (index: number) => {
    const values = getValues();
    const removeFn = () => removeSubCompetence(index);
    const subCompetenceId = subCompetenceFields[index].subCompetenceId;
    const subCompetenceIdsToCheck = [
      competenceAreaId + competenceId + subCompetenceId,
    ];

    tryRemoveCompetence(values, subCompetenceIdsToCheck, removeFn);
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
              alignItems: "flex-end",
              gap: 2,
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
              <label>Name</label>
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
