import { Button, Box, Typography } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext, FieldArray } from "react-hook-form";
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
          <Typography variant="h5">TestItem {testItem.testItemId}</Typography>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledInput>
              <label>documentation</label>
              <input
                type="text"
                {...register(`testItems.${index}.documentation` as const)}
              />
            </StyledInput>

            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>id</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.testItemId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>level</label>
                <select {...register(`testItems.${index}.level` as const)}>
                  {levelOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </StyledInput>
              <StyledInput>
                <label>episode</label>
                <input
                  type="text"
                  {...register(`testItems.${index}.episode` as const)}
                />
              </StyledInput>
            </StyledMultilineInputWrapper>
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
                testItemId: getNewTestItemId(testItemFields),
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

function getNewTestItemId(
  testItemFields: FieldArray<FormInputs, "testItems">[]
): string {
  if (testItemFields.length === 0) {
    return "1";
  }
  const highesTestItemId = testItemFields
    .map((testItem) => Number(testItem.testItemId))
    .sort((a, b) => b - a)[0];
  const maybeTestItemNumber = String(highesTestItemId + 1);

  return maybeTestItemNumber === "NaN" ? "0" : maybeTestItemNumber;
}
