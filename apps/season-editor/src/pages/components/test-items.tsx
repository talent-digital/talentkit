import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Level } from "@talentdigital/season";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";

type LevelCode = `${Level}`;

export const TestItems = () => {
  const { register, control } = useFormContext<FormInputs>();
  const {
    fields: testItemFields,
    append: appendTestItem,
    remove: removeTestItem,
  } = useFieldArray({
    control,
    name: "testItems",
  });

  const levelOptions: LevelCode[] = [
    "FOUNDATION",
    "INTERMEDIATE",
    "ADVANCED",
    "HIGHLY_SPECIALISED",
  ];

  return (
    <>
      {testItemFields.map((testItem, index) => (
        <StyledSectionWrapper key={testItem.id} indented>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>Id</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.testItemId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Competence Area Id</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.competenceAreaId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Competence Id</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.competenceId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Sub-competence Id</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.subCompetenceId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Level</label>
                <select {...register(`testItems.${index}.level` as const)}>
                  {levelOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </StyledInput>
              <StyledInput>
                <label>Episode</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.episode` as const)}
                />
              </StyledInput>
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>Documentation</label>
              <input
                type="text"
                {...register(`testItems.${index}.documentation` as const)}
              />
            </StyledInput>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => removeTestItem(index)}
            >
              Remove Test item
            </Button>
          </Box>
        </StyledSectionWrapper>
      ))}

      <StyledSectionWrapper indented>
        <div>
          <Button
            variant="contained"
            type="button"
            onClick={() =>
              appendTestItem({
                competenceAreaId: "",
                competenceId: "",
                subCompetenceId: "",
                testItemId: "",
                episode: "",
                level: "FOUNDATION",
                documentation: "",
              })
            }
          >
            Add Test Item
          </Button>
        </div>
      </StyledSectionWrapper>
    </>
  );
};
