import { styled, Button, Box, Typography } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useFieldArray,
  useFormContext,
  FieldArrayWithId,
} from "react-hook-form";
import { grey } from "@mui/material/colors";
import { Maturity } from "@talentdigital/season";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";

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

  const selectOptions: MaturityCode[] = ["ALPHA", "BETA", "PENDING", "PUBLIC"];

  return (
    <>
      {episodeFields.map((episode, index) => (
        <StyledSectionWrapper key={episode.id}>
          <Typography variant="h5">Episode {episode.episodeId}</Typography>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <StyledInput>
              <label>title</label>
              <input
                type="text"
                {...register(`episodes.${index}.title` as "episodes.0.title")}
              />
            </StyledInput>

            <StyledInput>
              <label>description</label>
              <input
                type="text"
                {...register(
                  `episodes.${index}.description` as "episodes.0.description"
                )}
              />
            </StyledInput>

            <StyledWrapper>
              <StyledInput>
                <label>id</label>
                <input
                  type="text"
                  {...register(
                    `episodes.${index}.episodeId` as "episodes.0.episodeId"
                  )}
                />
              </StyledInput>

              <StyledSelect>
                <label>maturity</label>
                <select
                  {...register(
                    `episodes.${index}.maturity` as "episodes.0.maturity"
                  )}
                >
                  {selectOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </StyledSelect>
              <StyledInput>
                <label>imageUrl</label>
                <input
                  type="text"
                  {...register(
                    `episodes.${index}.imageUrl` as "episodes.0.imageUrl"
                  )}
                />
              </StyledInput>
              <StyledInput>
                <label>format</label>
                <input
                  type="text"
                  {...register(
                    `episodes.${index}.format` as "episodes.0.format"
                  )}
                />
              </StyledInput>
              <StyledInput>
                <label>formatConfiguration</label>
                <input
                  type="text"
                  {...register(
                    `episodes.${index}.formatConfiguration` as "episodes.0.formatConfiguration"
                  )}
                />
              </StyledInput>
            </StyledWrapper>
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

      {episodeFields.length === 0 && (
        <StyledSectionWrapper>
          <Typography variant="h5">No episodes</Typography>
        </StyledSectionWrapper>
      )}

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
    </>
  );
};

function getNewEpisodeId(
  episodeFields: FieldArrayWithId<FormInputs, "episodes", "id">[]
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

const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),

  "> div": {
    flex: `0 0 calc(33.333% - ${theme.spacing(2)})`,
  },
}));

const StyledSelect = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  "& select": {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${grey[500]}`,
    padding: theme.spacing(1),

    "&:focus": {
      outline: `1px solid ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
