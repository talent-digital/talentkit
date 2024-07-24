import { Button, Box, Typography } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Level, ToolType } from "@talentdigital/season";

import { FormInputs, FromInputSubCompetence } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-wrapper";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConfirmDialogContext } from "../context";
import { InputList } from "./input-list";

type LevelCode = `${Level}`;

const levelOptions: LevelCode[] = [
  "FOUNDATION",
  "INTERMEDIATE",
  "ADVANCED",
  "HIGHLY_SPECIALISED",
];

type ToolTypeCode = `${ToolType}`;

const toolTypeOptions: ToolTypeCode[] = [
  "video-conference",
  "chat",
  "chatbot",
  "calendar-services",
  "project-collaboration",
  "crm",
  "document-creation",
];

const EMPTY_OPTION = "";
const TEST_ID_DIVIDER = "--";

export const TestItems = () => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const [legacyOptionsExpanded, setLegacyOptionsExpanded] = useState<number[]>(
    []
  );
  const [subCompetenceValues, setSubCompetenceValues] = useState<
    Record<string, string>
  >({});
  const [episodeOptions, setEpisodeOptions] = useState<string[] | undefined>(
    undefined
  );
  const [subCompetenceOptions, setSubCompetenceOptions] = useState<
    FromInputSubCompetence[]
  >([]);
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<FormInputs>();
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
    const seedId = getValues("seedId");
    const testItems = getValues("testItems");
    const newTestId = getNewTestId(seedId, testItems);

    return `test-${seedId}${TEST_ID_DIVIDER}${newTestId}`;
  };

  const handleRemoveTestItem = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }

    removeTestItem(index);
  };

  useEffect(() => {
    testItemFields.forEach((_, index) => {
      const {
        competenceAreaId,
        competenceId,
        subCompetenceId,
        searchGeneric,
        searchLinks,
        searchTool,
        toolType,
      } = testItemFields[index];
      setSubCompetenceValues((prev) => ({
        ...prev,
        [index]: `${competenceAreaId}-${competenceId}-${subCompetenceId}`,
      }));

      const hasLegacyOptionsUsed =
        searchGeneric.length > 0 ||
        searchLinks.length > 0 ||
        searchTool.length > 0 ||
        Boolean(toolType);

      if (hasLegacyOptionsUsed) {
        setLegacyOptionsExpanded((prev) => [...prev, index]);
      }
    });
  }, [testItemFields]);

  useEffect(() => {
    updateEpisodeList();
    // Without this initial update the selected sub-competence is emtpy
    const timeout = setTimeout(() => {
      updateSubCompetenceList();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [updateSubCompetenceList, updateEpisodeList]);

  return (
    <>
      {testItemFields.map((testItemField, index) => (
        <StyledSectionWrapper key={testItemField.id} indented>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                  type="text"
                  {...register(`testItems.${index}.testItemId` as const, {
                    onBlur: () => clearErrors(`testItems.${index}.testItemId`),
                  })}
                />
                <span>{errors?.testItems?.[index]?.testItemId?.message}</span>
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

            <div>
              <Typography
                component="button"
                type="button"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  p: 0,
                }}
                variant="caption"
                onClick={() => {
                  setLegacyOptionsExpanded((prev) => {
                    return prev.includes(index)
                      ? prev.filter((item) => item !== index)
                      : [...prev, index];
                  });
                }}
              >
                {legacyOptionsExpanded.includes(index)
                  ? "Hide legacy options"
                  : "Show legacy options"}
              </Typography>
            </div>

            {legacyOptionsExpanded.includes(index) && (
              <Box sx={{ mt: 2 }}>
                <StyledInput>
                  <label>Tool type</label>
                  <select {...register(`testItems.${index}.toolType` as const)}>
                    <option value={""} />
                    {toolTypeOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </StyledInput>
                <InputList
                  formFieldName="searchGeneric"
                  list={testItemField.searchGeneric}
                  onUpdate={(idx, list) => {
                    setValue(`testItems.${idx}.searchGeneric`, list);
                  }}
                  itemIndex={index}
                  label="Search generic"
                />

                <InputList
                  formFieldName="searchLinks"
                  list={testItemField.searchLinks}
                  onUpdate={(idx, list) => {
                    setValue(`testItems.${idx}.searchLinks`, list);
                  }}
                  itemIndex={index}
                  label="Search Link"
                />

                <InputList
                  formFieldName="searchTool"
                  list={testItemField.searchTool}
                  onUpdate={(idx, list) => {
                    setValue(`testItems.${idx}.searchTool`, list);
                  }}
                  itemIndex={index}
                  label="Search Tool"
                />
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => handleRemoveTestItem(index)}
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
                documentation: "",
                episode: "",
                level: "FOUNDATION",
                searchGeneric: "",
                searchLinks: "",
                searchTool: "",
                toolType: "",
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

function getNewTestId(
  seedId: string,
  testItmes: FormInputs["testItems"]
): number {
  if (testItmes.length === 0) {
    return 1;
  }

  const lastTestId =
    testItmes[testItmes.length - 1]?.testItemId.split(TEST_ID_DIVIDER)[1];
  const lastTestIdIsNumber = !isNaN(Number(lastTestId));

  if (!lastTestIdIsNumber) {
    return getNewTestId(seedId, testItmes.slice(0, -1));
  }

  return Number(lastTestId) + 1;
}
