import { Box, Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import { StyledInput } from "./styled-input";
import { SubCompetences } from "./sub-competences";
import DeleteIcon from "@mui/icons-material/Delete";
import { getNextCompetenceId } from "../utils";

type CompetencesProps = {
  competenceAreaId: string;
};

export const Competences = ({ competenceAreaId }: CompetencesProps) => {
  const { register, control, getValues, setFocus } =
    useFormContext<FormInputs>();
  const {
    fields: competenceFields,
    append: appendCompetence,
    remove: removeCompetence,
  } = useFieldArray({
    control,
    name: `competences-${competenceAreaId}`,
    shouldUnregister: true,
  });

  const getCompetenceId = (): string => {
    const values = getValues();
    const competences = values[`competences-${competenceAreaId}`];

    return getNextCompetenceId(
      values.seedId,
      competenceAreaId,
      competences,
      "competenceId"
    );
  };

  const handleAppendCompetence = () => {
    appendCompetence({
      name: "",
      competenceAreaId: competenceAreaId,
      competenceId: getCompetenceId(),
    });

    setTimeout(() => {
      const index = competenceFields.length;
      setFocus(`competences-${competenceAreaId}.${index}.name`);
    });
  };

  return (
    <Box
      sx={{
        paddingLeft: 4,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderLeft: `1px solid ${grey[400]}`,
      }}
    >
      {competenceFields
        .filter(
          (competenceField) =>
            competenceField.competenceAreaId === competenceAreaId
        )
        .map((competenceField, index) => {
          return (
            <div key={competenceField.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                }}
              >
                <StyledInput short>
                  <label>Id</label>
                  <input
                    disabled
                    type="text"
                    {...register(
                      `competences-${competenceAreaId}.${index}.competenceId` as const
                    )}
                  />
                </StyledInput>
                <StyledInput>
                  <label>Name</label>
                  <input
                    type="text"
                    {...register(
                      `competences-${competenceAreaId}.${index}.name` as const
                    )}
                  />
                </StyledInput>
                <div>
                  <IconButton
                    onClick={() => removeCompetence(index)}
                    color="error"
                    title="Delete competence"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
              <SubCompetences
                competenceId={competenceField.competenceId}
                competenceAreaId={competenceAreaId}
              />
            </div>
          );
        })}

      <div>
        <Button
          variant="contained"
          type="button"
          onClick={handleAppendCompetence}
        >
          Add Competence
        </Button>
      </div>
    </Box>
  );
};
