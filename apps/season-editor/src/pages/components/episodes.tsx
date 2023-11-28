import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext, FieldArray } from "react-hook-form";
import { Maturity } from "@talentdigital/season";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";

type MaturityCode = `${Maturity}`;

export const Episodes = () => {
  const { register, control } = useFormContext<FormInputs>();
  const {
    fields: episodeFields,
    append: appendEpisode,
    remove: removeEpisode,
  } = useFieldArray({
    control,
    name: "episodes",
  });

  const maturityOptions: MaturityCode[] = [
    "ALPHA",
    "BETA",
    "PENDING",
    "PUBLIC",
  ];

  return (
    <>
      {episodeFields.map((episode, index) => (
        <StyledSectionWrapper key={episode.id} indented>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>id</label>
                <input
                  type="text"
                  {...register(`episodes.${index}.episodeId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>maturity</label>
                <select {...register(`episodes.${index}.maturity` as const)}>
                  {maturityOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </StyledInput>
              <StyledInput>
                <label>imageUrl</label>
                <input
                  type="text"
                  {...register(`episodes.${index}.imageUrl` as const)}
                />
              </StyledInput>
              <StyledInput>
                <label>format</label>
                <input
                  type="text"
                  {...register(`episodes.${index}.format` as const)}
                />
              </StyledInput>
              <StyledInput>
                <label>formatConfiguration</label>
                <input
                  type="text"
                  {...register(
                    `episodes.${index}.formatConfiguration` as const
                  )}
                />
              </StyledInput>
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>title</label>
              <input
                type="text"
                {...register(`episodes.${index}.title` as const)}
              />
            </StyledInput>

            <StyledInput>
              <label>description</label>
              <input
                type="text"
                {...register(`episodes.${index}.description` as const)}
              />
            </StyledInput>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => removeEpisode(index)}
            >
              Remove episode
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
              appendEpisode({
                episodeId: getNewEpisodeId(episodeFields),
                title: "",
                description: "",
                maturity: "PUBLIC",
                imageUrl: "",
                format: "",
                formatConfiguration: "",
              })
            }
          >
            Add Episode
          </Button>
        </div>
      </StyledSectionWrapper>
    </>
  );
};

function getNewEpisodeId(
  episodeFields: FieldArray<FormInputs, "episodes">[]
): string {
  if (episodeFields.length === 0) {
    return "1";
  }
  const highestEpisodeId = episodeFields
    .map((episode) => Number(episode.episodeId))
    .sort((a, b) => b - a)[0];
  const maybeEpisodeNumber = String(highestEpisodeId + 1);

  return maybeEpisodeNumber === "NaN" ? "0" : maybeEpisodeNumber;
}
