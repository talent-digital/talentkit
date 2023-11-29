import { Box, Button, IconButton } from "@mui/material";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import { Competences } from "./competences";
import DeleteIcon from "@mui/icons-material/Delete";

export const CompetenceAreas = () => {
  const { register, control } = useFormContext<FormInputs>();
  const {
    fields: competenceAreaFields,
    append: appendCompetenceArea,
    remove: removeCompetenceArea,
  } = useFieldArray({
    control,
    name: "competenceAreas",
  });

  return (
    <>
      {competenceAreaFields.map((competenceAreaField, index) => (
        <Box key={competenceAreaField.id}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledInput short>
              <label>Id</label>
              <input
                disabled
                type="text"
                {...register(
                  `competenceAreas.${index}.competenceAreaId` as const
                )}
              />
            </StyledInput>
            <StyledInput>
              <label>Name</label>
              <input
                type="text"
                {...register(`competenceAreas.${index}.name` as const)}
              />
            </StyledInput>
            <div>
              <IconButton
                onClick={() => removeCompetenceArea(index)}
                color="error"
                title="Delete competence area"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Box>

          <Competences
            competenceAreaId={competenceAreaField.competenceAreaId}
          />
        </Box>
      ))}
      <div>
        <Button
          variant="contained"
          type="button"
          onClick={() =>
            appendCompetenceArea({
              name: "",
              competenceAreaId: `${Math.ceil(Math.random() * 100000)}`, // TODO: generate id in a smart way
            })
          }
        >
          Add Competence Area
        </Button>
      </div>
    </>
  );
};
