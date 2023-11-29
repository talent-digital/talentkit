import { Box, Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";

type SubCompetencesProps = {
  competenceAreaId: string;
  competenceId: string;
};

export const SubCompetences = ({
  competenceAreaId,
  competenceId,
}: SubCompetencesProps) => {
  const { register, control } = useFormContext<FormInputs>();
  const {
    fields: subCompetenceFields,
    append: appendSubCompetence,
    remove: removeSubCompetence,
  } = useFieldArray({
    control,
    name: `subCompetences-${competenceAreaId}-${competenceId}`,
  });

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
            <StyledInput short>
              <label>Id</label>
              <input
                disabled
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
                onClick={() => removeSubCompetence(index)}
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
          onClick={() =>
            appendSubCompetence({
              name: "",
              competenceAreaId: competenceAreaId,
              competenceId: competenceId,
              subCompetenceId: `${Math.ceil(Math.random() * 100000)}`, // TODO: generate id in a smart way
            })
          }
        >
          Add SubCompetence
        </Button>
      </div>
    </Box>
  );
};
