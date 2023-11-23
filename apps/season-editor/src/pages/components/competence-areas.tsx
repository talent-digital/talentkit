import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";

export const CompetenceAreas = () => {
  const { register, control } = useFormContext<FormInputs>();

  const { fields: competenceAreaFields, append: appendCompetenceArea } =
    useFieldArray({
      control,
      name: "competenceAreas",
    });

  const { fields: competenceFields, append: appendCompetence } = useFieldArray({
    control,
    name: "competences",
  });

  const { fields: subCompetenceFields, append: appendSubCompetence } =
    useFieldArray({
      control,
      name: "subCompetences",
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
                  competenceField.competenceAreaId ===
                  competenceAreaField.competenceAreaId
              )
              .map((competenceField, index) => (
                <div key={competenceField.id}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <StyledInput short>
                      <label>id</label>
                      <input
                        disabled
                        type="text"
                        {...register(
                          `competences.${index}.competenceId` as "competences.0.competenceId"
                        )}
                      />
                    </StyledInput>
                    <StyledInput>
                      <label>name</label>
                      <input
                        type="text"
                        {...register(
                          `competences.${index}.name` as "competences.0.name"
                        )}
                      />
                    </StyledInput>
                  </Box>

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
                          subCompetenceField.competenceAreaId ===
                            competenceAreaField.competenceAreaId &&
                          subCompetenceField.competenceId ===
                            competenceField.competenceId
                      )
                      .map((subCompetenceField, index) => (
                        <Box
                          key={subCompetenceField.id}
                          sx={{
                            display: "flex",
                            gap: 2,
                          }}
                        >
                          <StyledInput short>
                            <label>id</label>
                            <input
                              disabled
                              type="text"
                              {...register(
                                `subCompetences.${index}.competenceId` as "subCompetences.0.subCompetenceId"
                              )}
                            />
                          </StyledInput>
                          <StyledInput>
                            <label>name</label>
                            <input
                              type="text"
                              {...register(
                                `subCompetences.${index}.name` as "subCompetences.0.name"
                              )}
                            />
                          </StyledInput>
                        </Box>
                      ))}
                    <div>
                      <Button
                        variant="contained"
                        type="button"
                        onClick={() =>
                          appendSubCompetence({
                            name: "",
                            competenceAreaId:
                              competenceAreaField.competenceAreaId,
                            competenceId: competenceField.competenceId,
                            subCompetenceId: `${Math.ceil(
                              Math.random() * 100000
                            )}`, // TODO: generate id in a smart way
                          })
                        }
                      >
                        Add SubCompetence
                      </Button>
                    </div>
                  </Box>
                </div>
              ))}

            <div>
              <Button
                variant="contained"
                type="button"
                onClick={() =>
                  appendCompetence({
                    name: "",
                    competenceAreaId: competenceAreaField.competenceAreaId,
                    competenceId: `${Math.ceil(Math.random() * 100000)}`, // TODO: generate id in a smart way
                  })
                }
              >
                Add Competence
              </Button>
            </div>
          </Box>
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
