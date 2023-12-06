import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Level } from "@talentdigital/season";

import { FormInputs, FromInputSubCompetence } from "../types";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";
import { ChangeEvent, useState } from "react";
import { grey } from "@mui/material/colors";

type LevelCode = `${Level}`;

const levelOptions: LevelCode[] = [
  "FOUNDATION",
  "INTERMEDIATE",
  "ADVANCED",
  "HIGHLY_SPECIALISED",
];

const EMPTY_OPTION = "";

export const TestItems = () => {
  const [episodeOptions, setEpisodeOptions] = useState<string[]>([]);
  const [subCompetenceOptions, setSubCompetenceOptions] = useState<
    FromInputSubCompetence[]
  >([]);
  const { register, control, getValues, setValue } =
    useFormContext<FormInputs>();
  const {
    fields: testItemFields,
    append: appendTestItem,
    remove: removeTestItem,
  } = useFieldArray({
    control,
    name: "testItems",
  });

  const handleSubCompetenceSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selected = subCompetenceOptions.find(
      (item) => getSubCompetenceKey(item) === event.target.value
    );

    if (selected) {
      setValue(
        `testItems.${index}.competenceAreaId`,
        selected?.competenceAreaId
      );
      setValue(`testItems.${index}.competenceId`, selected?.competenceId);
      setValue(`testItems.${index}.subCompetenceId`, selected?.subCompetenceId);
    }
  };

  const updateEpisodeList = () => {
    const episodes = getValues("episodes").map((episode) => episode.episodeId);
    setEpisodeOptions(episodes);
  };

  const updateSubCompetenceList = () => {
    const values = getValues();
    const list: FromInputSubCompetence[] = Object.entries(values)
      .filter(([key]) => key.startsWith("subCompetences"))
      .flatMap(([_, value]) => value as unknown as FromInputSubCompetence);

    setSubCompetenceOptions(list);
  };

  const getTestItemId = () => {
    const DIVIDER = "--";
    const seedId = getValues("seedId");
    const lastTestId =
      testItemFields[testItemFields.length - 1]?.testItemId.split(DIVIDER)[1];
    const lastTestIdIsNumber = !isNaN(Number(lastTestId));
    const newTestId = lastTestIdIsNumber ? Number(lastTestId) + 1 : 1;

    return `test-${seedId}${DIVIDER}${newTestId}`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {testItemFields.map((testItem, index) => (
        <Box
          key={testItem.id}
          sx={{
            pb: 4,
            borderBottom: `3px solid ${grey[600]}`,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <input
              hidden
              type="text"
              {...register(`testItems.${index}.competenceAreaId` as const)}
            />

            <input
              hidden
              type="text"
              {...register(`testItems.${index}.competenceId` as const)}
            />

            <input
              hidden
              type="text"
              {...register(`testItems.${index}.subCompetenceId` as const)}
            />

            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>Id</label>
                <input
                  readOnly
                  type="text"
                  {...register(`testItems.${index}.testItemId` as const)}
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
                <select
                  {...register(`testItems.${index}.episode` as const)}
                  onClick={updateEpisodeList}
                >
                  {episodeOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </StyledInput>
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>Sub-competence</label>
              <select
                defaultValue={EMPTY_OPTION}
                onClick={updateSubCompetenceList}
                onChange={(event) => handleSubCompetenceSelect(event, index)}
              >
                <option value={EMPTY_OPTION}>{EMPTY_OPTION}</option>
                {subCompetenceOptions.map((option) => (
                  <option
                    value={getSubCompetenceKey(option)}
                    key={getSubCompetenceKey(option)}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </StyledInput>

            <StyledInput>
              <label>Documentation</label>
              <input
                type="text"
                {...register(`testItems.${index}.documentation` as const)}
              />
            </StyledInput>
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
          </Box>
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          type="button"
          onClick={() =>
            appendTestItem({
              competenceAreaId: "",
              competenceId: "",
              subCompetenceId: "",
              testItemId: getTestItemId(),
              episode: "",
              level: "FOUNDATION",
              documentation: "",
            })
          }
        >
          Add Test Item
        </Button>
      </Box>
    </Box>
  );
};

function getSubCompetenceKey(subCompetence: FromInputSubCompetence) {
  return `${subCompetence.competenceAreaId}-${subCompetence.competenceId}-${subCompetence.subCompetenceId}`;
}
