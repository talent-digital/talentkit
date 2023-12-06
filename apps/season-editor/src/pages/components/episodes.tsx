import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext, FieldArray } from "react-hook-form";
import { Maturity } from "@talentdigital/season";

import { FormInputs } from "../types";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";
import { grey } from "@mui/material/colors";

type MaturityCode = `${Maturity}`;

const maturityOptions: MaturityCode[] = ["ALPHA", "BETA", "PENDING", "PUBLIC"];

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {episodeFields.map((episode, index) => (
        <Box
          key={episode.id}
          sx={{
            pb: 4,
            borderBottom: `3px solid ${grey[600]}`,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>Id</label>
                <input
                  type="text"
                  {...register(`episodes.${index}.episodeId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Maturity</label>
                <select {...register(`episodes.${index}.maturity` as const)}>
                  {maturityOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </StyledInput>
              <StyledInput>
                <label>Image Url</label>
                <input
                  type="text"
                  {...register(`episodes.${index}.imageUrl` as const)}
                />
              </StyledInput>
              <StyledInput>
                <label>Format</label>
                <input
                  type="text"
                  {...register(`episodes.${index}.format` as const)}
                />
              </StyledInput>
              <StyledInput>
                <label>Format configuration</label>
                <input
                  type="text"
                  {...register(
                    `episodes.${index}.formatConfiguration` as const
                  )}
                />
              </StyledInput>
            </StyledMultilineInputWrapper>

            <StyledInput>
              <label>Title</label>
              <input
                type="text"
                {...register(`episodes.${index}.title` as const)}
              />
            </StyledInput>

            <StyledInput>
              <label>Description</label>
              <input
                type="text"
                {...register(`episodes.${index}.description` as const)}
              />
            </StyledInput>
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
          </Box>
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
      </Box>
    </Box>
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
