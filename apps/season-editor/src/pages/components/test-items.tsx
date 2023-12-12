import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Level } from "@talentdigital/season";

import { FormInputs, FromInputSubCompetence } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type LevelCode = `${Level}`;

const levelOptions: LevelCode[] = [
  "FOUNDATION",
  "INTERMEDIATE",
  "ADVANCED",
  "HIGHLY_SPECIALISED",
];

const EMPTY_OPTION = "";

export const TestItems = () => {
  const [subCompetenceValues, setSubCompetenceValues] = useState<
    Record<string, string>
  >({});
  const [episodeOptions, setEpisodeOptions] = useState<string[] | undefined>(
    undefined
  );
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
      const { competenceAreaId, competenceId, subCompetenceId } = selected;
      setValue(`testItems.${index}.competenceAreaId`, competenceAreaId);
      setValue(`testItems.${index}.competenceId`, competenceId);
      setValue(`testItems.${index}.subCompetenceId`, subCompetenceId);
      setSubCompetenceValues((prev) => ({
        ...prev,
        [index]: `${competenceAreaId}-${competenceId}-${subCompetenceId}`,
      }));
    }
  };

  const updateEpisodeList = useCallback(() => {
    const episodes = getValues("episodes").map((episode) => episode.episodeId);
    setEpisodeOptions(episodes);
  }, [getValues]);

  const updateSubCompetenceList = useCallback(() => {
    const values = getValues();
    const list: FromInputSubCompetence[] = Object.entries(values)
      .filter(([key]) => key.startsWith("subCompetences"))
      .flatMap(([_, value]) => value as unknown as FromInputSubCompetence);

    setSubCompetenceOptions(list);
  }, [getValues]);

  const getTestItemId = () => {
    const DIVIDER = "--";
    const seedId = getValues("seedId");
    const lastTestId =
      testItemFields[testItemFields.length - 1]?.testItemId.split(DIVIDER)[1];
    const lastTestIdIsNumber = !isNaN(Number(lastTestId));
    const newTestId = lastTestIdIsNumber ? Number(lastTestId) + 1 : 1;

    return `test-${seedId}${DIVIDER}${newTestId}`;
  };

  useEffect(() => {
    testItemFields.forEach((_, index) => {
      const { competenceAreaId, competenceId, subCompetenceId } =
        testItemFields[index];
      setSubCompetenceValues((prev) => ({
        ...prev,
        [index]: `${competenceAreaId}-${competenceId}-${subCompetenceId}`,
      }));
    });
  }, [testItemFields]);

  useEffect(() => {
    updateEpisodeList();
    // Without this initial update the selected sub-competence is emtpy
    const timeout = setTimeout(() => {
      updateSubCompetenceList();
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [updateSubCompetenceList, updateEpisodeList]);

  return (
    <>
      {testItemFields.map((testItem, index) => (
        <StyledSectionWrapper key={testItem.id} indented>
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

              {episodeOptions !== undefined && (
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
              )}
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>Sub-competence</label>
              <select
                value={subCompetenceValues[index]}
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
                testItemId: getTestItemId(),
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

function getSubCompetenceKey(subCompetence: FromInputSubCompetence) {
  return `${subCompetence.competenceAreaId}-${subCompetence.competenceId}-${subCompetence.subCompetenceId}`;
}
