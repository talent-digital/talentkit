import { Box, Button, Typography, styled } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { SeasonDefinition } from "@talentdigital/season";
import { useEffect, useState } from "react";

import {
  CompetenceAreas,
  Episodes,
  StyledSectionWrapper,
  StyledInput,
  SectionVisibilityButton,
  TestItems,
  FeedbackQuestions,
  Sidebar,
  Badges,
} from "./components";
import { FormInputs, LanguageCode, SectionName } from "./types";
import {
  extractFromEpisodes,
  extractFromCompetences,
  getEmptySeason,
} from "./utils";
import { DEFAULT_LANGUAGE, SIDEBAR_SIZE } from "./dictionaries";

export const SeasonEditor = () => {
  const methods = useForm<FormInputs>();
  const { register, reset, getValues } = methods;
  const [season, setSeason] = useState<SeasonDefinition>(getEmptySeason());
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [hiddenSections, setHiddenSections] = useState<SectionName[]>([]);
  const [seedIdFilled, setSeedIdFilled] = useState<boolean>(false);

  const handleToggleSectionVisibility = (sectionName: SectionName) => {
    if (hiddenSections.includes(sectionName)) {
      setHiddenSections(
        hiddenSections.filter((section) => section !== sectionName)
      );
    } else {
      setHiddenSections([...hiddenSections, sectionName]);
    }
  };

  useEffect(() => {
    if (!season) return;

    const { episodes, badges } = extractFromEpisodes(season, language);
    const {
      competenceAreas,
      competences,
      subCompetences,
      testItems,
      feedbackQuestions,
    } = extractFromCompetences(season, language);
    const formSeedId = getValues().seedId;
    if (season.seedId) {
      setSeedIdFilled(true);
    }

    reset({
      seedId: season.seedId ?? formSeedId ?? "",
      title: season.title[language] ?? "",
      info: season.info[language] ?? "",
      assetsURL: season.assetsURL ?? "",
      seasonEndMessage: season.seasonEndMessage[language] ?? "",
      competenceAreas,
      ...competences,
      ...subCompetences,
      episodes,
      testItems,
      feedbackQuestions,
      badges,
    });
  }, [season, language, reset, getValues]);

  const handleSeedIdSubmit = () => {
    const { seedId } = getValues();
    if (seedId) {
      setSeedIdFilled(true);
    }
  };

  return (
    <Box sx={{ paddingLeft: `${SIDEBAR_SIZE}px` }}>
      <FormProvider {...methods}>
        <Sidebar
          language={language}
          season={season}
          onLanguageChange={(lang) => setLanguage(lang)}
          onSeasonChange={(season) => setSeason(season)}
        />
      </FormProvider>

      {!seedIdFilled && (
        <StyledContent>
          <StyledSectionWrapper>
            <Typography variant="h5" sx={{ mb: 2 }}>
              To start provide an unique Id or load a file that contains it
            </Typography>

            <StyledInput>
              <label>Unique season competence Id number (e.g. 100)</label>
              <input type="text" {...register("seedId")} autoFocus />
            </StyledInput>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleSeedIdSubmit}
                type="submit"
              >
                Start
              </Button>
            </Box>
          </StyledSectionWrapper>
        </StyledContent>
      )}

      {seedIdFilled && (
        <StyledContent>
          <StyledSectionWrapper id="basic-information">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Season description
              </Typography>

              <SectionVisibilityButton
                hiddenSections={hiddenSections}
                onToggle={handleToggleSectionVisibility}
                sectionName="basicInformation"
              />
            </Box>
            {hiddenSections.includes("basicInformation") ? null : (
              <>
                <StyledInput>
                  <label>Unique season competence Id number (e.g. 100)</label>
                  <input type="text" {...register("seedId")} disabled />
                </StyledInput>

                <StyledInput>
                  <label>Title</label>
                  <input type="text" {...register("title")} />
                </StyledInput>

                <StyledInput>
                  <label>Info</label>
                  <textarea rows={3} {...register("info")} />
                </StyledInput>

                <StyledInput>
                  <label>Assets URL</label>
                  <input type="text" {...register("assetsURL")} />
                </StyledInput>

                <StyledInput>
                  <label>
                    Season end message <i>(legacy option)</i>
                  </label>
                  <textarea rows={3} {...register("seasonEndMessage")} />
                </StyledInput>

                <div>
                  <input type="checkbox" {...register("linearSeason")} />
                  <label>Linear season</label>
                </div>
              </>
            )}
          </StyledSectionWrapper>

          <StyledSectionWrapper id="competence-areas">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Competence Areas
              </Typography>

              <SectionVisibilityButton
                hiddenSections={hiddenSections}
                onToggle={handleToggleSectionVisibility}
                sectionName="competenceAreas"
              />
            </Box>

            <Box
              sx={{
                flexDirection: "column",
                gap: 2,
                display: hiddenSections.includes("competenceAreas")
                  ? "none"
                  : "flex",
              }}
            >
              <FormProvider {...methods}>
                <CompetenceAreas />
              </FormProvider>
            </Box>
          </StyledSectionWrapper>

          <StyledSectionWrapper id="episodes">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Episodes
              </Typography>

              <SectionVisibilityButton
                hiddenSections={hiddenSections}
                onToggle={handleToggleSectionVisibility}
                sectionName="episodes"
              />
            </Box>
          </StyledSectionWrapper>

          {hiddenSections.includes("episodes") ? null : (
            <FormProvider {...methods}>
              <Episodes />
            </FormProvider>
          )}

          <StyledSectionWrapper id="test-items">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Test items
              </Typography>

              <SectionVisibilityButton
                hiddenSections={hiddenSections}
                onToggle={handleToggleSectionVisibility}
                sectionName="testItems"
              />
            </Box>
          </StyledSectionWrapper>

          {hiddenSections.includes("testItems") ? null : (
            <FormProvider {...methods}>
              <TestItems />
            </FormProvider>
          )}

          <StyledSectionWrapper id="feedback-questions">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Feedback questions
              </Typography>

              <SectionVisibilityButton
                hiddenSections={hiddenSections}
                onToggle={handleToggleSectionVisibility}
                sectionName="feedbackQuestions"
              />
            </Box>
          </StyledSectionWrapper>

          {hiddenSections.includes("feedbackQuestions") ? null : (
            <FormProvider {...methods}>
              <FeedbackQuestions />
            </FormProvider>
          )}

          <StyledSectionWrapper id="badges">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Badges
              </Typography>

              <SectionVisibilityButton
                hiddenSections={hiddenSections}
                onToggle={handleToggleSectionVisibility}
                sectionName="badges"
              />
            </Box>
          </StyledSectionWrapper>

          {hiddenSections.includes("badges") ? null : (
            <FormProvider {...methods}>
              <Badges />
            </FormProvider>
          )}
        </StyledContent>
      )}
    </Box>
  );
};

const StyledContent = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  maxWidth: 900,
  width: "100%",
  margin: "auto",
}));
