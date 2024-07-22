import { Button, Box, Typography } from "@mui/material";
import { StyledInput } from "./styled-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray, useFormContext, FieldArray } from "react-hook-form";
import { Maturity } from "@talentdigital/season";

import { FormInputs } from "../types";
import { StyledSectionWrapper } from ".";
import { StyledMultilineInputWrapper } from "./styled-multiline-wrapper";
import { useContext, useEffect, useState } from "react";
import { ConfirmDialogContext } from "../context";

type MaturityCode = `${Maturity}`;
type StatisticsObject = {
  [id: string]: number;
};

const maturityOptions: MaturityCode[] = ["ALPHA", "BETA", "PENDING", "PUBLIC"];

export const Episodes = () => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const [episodeTestItems, setEpisodeTestItems] = useState<StatisticsObject>(
    {}
  );
  const [episodeFeedbackQuestions, setEpisodeFeedbackQuestions] =
    useState<StatisticsObject>({});
  const {
    register,
    control,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormInputs>();
  const {
    fields: episodeFields,
    append: appendEpisode,
    remove: removeEpisode,
  } = useFieldArray({
    control,
    name: "episodes",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const values = getValues();

      const newEpisodeTestItems: StatisticsObject = {};
      const newEpisodeFeedbackQuestions: StatisticsObject = {};
      episodeFields.forEach((episode) => {
        newEpisodeTestItems[episode.episodeId] = values.testItems.filter(
          (test) => test.episode === episode.episodeId
        ).length;
        newEpisodeFeedbackQuestions[episode.episodeId] =
          values.feedbackQuestions.filter(
            (test) => test.episode === episode.episodeId
          ).length;
      });

      setEpisodeTestItems(newEpisodeTestItems);
      setEpisodeFeedbackQuestions(newEpisodeFeedbackQuestions);
    }, 3000);

    return () => clearInterval(interval);
  }, [episodeFields, getValues, setEpisodeTestItems]);

  const handleRemoveEpisode = async (index: number, episodeId: string) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }
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
                  {...register(`episodes.${index}.episodeId` as const, {
                    onBlur: () => clearErrors(`episodes.${index}.episodeId`),
                  })}
                />
                <span>{errors?.episodes?.[index]?.episodeId?.message}</span>
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
              <textarea
                rows={2}
                {...register(`episodes.${index}.description` as const)}
              />
            </StyledInput>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              Test items: <b>{episodeTestItems[episode.episodeId] ?? "⏳"}</b>,
              feedback questions:{" "}
              <b>{episodeFeedbackQuestions[episode.episodeId] ?? "⏳"}</b>
            </Typography>
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
