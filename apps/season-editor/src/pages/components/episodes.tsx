import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext, FieldArray } from "react-hook-form";
import { Maturity } from "@talentdigital/season";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-werapper";

type MaturityCode = `${Maturity}`;

const maturityOptions: MaturityCode[] = ["ALPHA", "BETA", "PENDING", "PUBLIC"];

export const Episodes = () => {
  const { register, control, getValues } = useFormContext<FormInputs>();
  const {
    fields: episodeFields,
    append: appendEpisode,
    remove: removeEpisode,
  } = useFieldArray({
    control,
    name: "episodes",
  });

  const handleRemoveEpisode = (index: number, episodeId: string) => {
    const values = getValues();
    const usedInTestItems = values.testItems.some(
      (item) => item.episode === episodeId
    );
    const usedInFeedbackQuestion = values.feedbackQuestions.some(
      (item) => item.episode === episodeId
    );

    if (usedInTestItems || usedInFeedbackQuestion) {
      alert(
        "Cannot delete episode because it is used in a test item or a feedback question."
      );
      return;
    }

    removeEpisode(index);
  };

  return (
    <>
      {episodeFields.map((episode, index) => (
        <StyledSectionWrapper key={episode.id} indented>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => handleRemoveEpisode(index, episode.episodeId)}
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
