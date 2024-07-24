import { Button, Box } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-wrapper";
import { useCallback, useContext, useEffect, useState } from "react";
import { ConfirmDialogContext } from "../context";

export const Badges = () => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const [episodeOptions, setEpisodeOptions] = useState<string[] | undefined>(
    undefined
  );
  const { register, control, getValues } = useFormContext<FormInputs>();
  const {
    fields: badgesFields,
    append: appendBadge,
    remove: removeBadge,
  } = useFieldArray({
    control,
    name: "badges",
  });

  const updateEpisodeList = useCallback(() => {
    const episodes = getValues("episodes").map((episode) => episode.episodeId);
    setEpisodeOptions(episodes);
  }, [getValues]);

  const handleRemoveBadge = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }

    removeBadge(index);
  };

  useEffect(() => {
    updateEpisodeList();
  }, [updateEpisodeList]);

  const getBadgeId = () => {
    const DIVIDER = "--";
    const seedId = getValues("seedId");
    const lastId =
      badgesFields[badgesFields.length - 1]?.badgeId.split(DIVIDER)[1];
    const lastIdIsNumber = !isNaN(Number(lastId));
    const newBadgeId = lastIdIsNumber ? Number(lastId) + 1 : 1;

    return `badge-${seedId}${DIVIDER}${newBadgeId}`;
  };

  return (
    <>
      {badgesFields.map((badgeField, index) => (
        <StyledSectionWrapper key={badgeField.id} indented>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledMultilineInputWrapper>
              <StyledInput>
                <label>id</label>
                <input
                  readOnly
                  type="text"
                  {...register(`badges.${index}.badgeId` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Name</label>
                <input
                  type="text"
                  {...register(`badges.${index}.name` as const)}
                />
              </StyledInput>

              <StyledInput>
                <label>Image</label>
                <input
                  type="text"
                  {...register(`badges.${index}.image` as const)}
                />
              </StyledInput>

              {episodeOptions !== undefined && (
                <StyledInput>
                  <label>Episode</label>
                  <select
                    {...register(`badges.${index}.episode` as const)}
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => handleRemoveBadge(index)}
            >
              Remove Badge
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
              appendBadge({
                badgeId: getBadgeId(),
                episode: "",
                image: "",
                name: "",
              })
            }
          >
            Add Badge
          </Button>
        </div>
      </StyledSectionWrapper>
    </>
  );
};
