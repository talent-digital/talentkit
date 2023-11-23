import { Box, Button } from "@mui/material";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import { Competences } from "./competences";

export const CompetenceAreas = () => {
  const { register, control } = useFormContext<FormInputs>();
  const { fields: competenceAreaFields, append: appendCompetenceArea } =
    useFieldArray({
      control,
      name: "competenceAreas",
    });

  return (
    <>
      {competenceAreaFields.map((competenceAreaField, index) => (
        <Box key={competenceAreaField.id}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledInput short>
              <label>id</label>
              <input
                disabled
                type="text"
                {...register(
                  `competenceAreas.${index}.competenceAreaId` as "competenceAreas.0.name"
                )}
              />
            </StyledInput>
            <StyledInput>
              <label>name</label>
              <input
                type="text"
                {...register(
                  `competenceAreas.${index}.name` as "competenceAreas.0.name"
                )}
              />
            </StyledInput>
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
