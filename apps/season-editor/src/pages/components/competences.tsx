import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import { StyledInput } from "./styled-input";
import { SubCompetences } from "./sub-competences";

type CompetencesProps = {
  competenceAreaId: string;
};

export const Competences = ({ competenceAreaId }: CompetencesProps) => {
  const { register, control } = useFormContext<FormInputs>();
  const { fields: competenceFields, append: appendCompetence } = useFieldArray({
    control,
    name: `competences-${competenceAreaId}`,
  });

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
          onClick={() =>
            appendCompetence({
              name: "",
              competenceAreaId: competenceAreaId,
              competenceId: `${Math.ceil(Math.random() * 100000)}`, // TODO: generate id in a smart way
            })
          }
        >
          Add Competence
        </Button>
      </div>
    </Box>
  );
};
