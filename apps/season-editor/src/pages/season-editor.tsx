import {
  Box,
  Button,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { SeasonDefinition } from "@talentdigital/season";
import { useEffect, useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import {
  CompetenceAreas,
  Episodes,
  StyledSectionWrapper,
  StyledInput,
  TestItems,
  FeedbackQuestions,
  Sidebar,
  Badges,
  SectionWrapper,
  BasicInfo,
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
  const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
  const theme = useTheme();

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
    <>
      <Box
        sx={{
          position: "fixed",
          right: theme.spacing(3),
          top: theme.spacing(3),
        }}
      >
        <IconButton
          onClick={() => setFullscreenMode((value) => !value)}
          title="Toggle fullscreen mode"
        >
          {fullscreenMode ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>

      <Box sx={{ paddingLeft: fullscreenMode ? 0 : `${SIDEBAR_SIZE}px` }}>
        {!fullscreenMode && (
          <FormProvider {...methods}>
            <Sidebar
              language={language}
              season={season}
              onLanguageChange={(lang) => setLanguage(lang)}
              onSeasonChange={(season) => setSeason(season)}
            />
          </FormProvider>
        )}

        {!seedIdFilled && (
          <StyledContent>
            <StyledSectionWrapper>
              <Typography
                variant="h5"
                sx={{
                  background: theme.palette.primary.main,
                  color: "#fff",
                  p: 2,
                }}
              >
                To start provide an unique Id or load a file that contains it
              </Typography>

              <Box sx={{ p: 2 }}>
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
              </Box>
            </StyledSectionWrapper>
          </StyledContent>
        )}

        {seedIdFilled && (
          <StyledContent>
            <SectionWrapper
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              sectionName="basicInformation"
              title="Season description"
            >
              <FormProvider {...methods}>
                <BasicInfo />
              </FormProvider>
            </SectionWrapper>

            <SectionWrapper
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              sectionName="competenceAreas"
              title="Competence Areas"
            >
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
            </SectionWrapper>

            <SectionWrapper
              childrenOutsideWrapper={true}
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              sectionName="episodes"
              title="Episodes"
            >
              <FormProvider {...methods}>
                <Episodes />
              </FormProvider>
            </SectionWrapper>

            <SectionWrapper
              childrenOutsideWrapper={true}
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              sectionName="testItems"
              title="Test items"
            >
              <FormProvider {...methods}>
                <TestItems />
              </FormProvider>
            </SectionWrapper>

            <SectionWrapper
              childrenOutsideWrapper={true}
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              sectionName="feedbackQuestions"
              title="Feedback questions"
            >
              <FormProvider {...methods}>
                <FeedbackQuestions />
              </FormProvider>
            </SectionWrapper>

            <SectionWrapper
              childrenOutsideWrapper={true}
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              sectionName="badges"
              title="Badges"
            >
              <FormProvider {...methods}>
                <Badges />
              </FormProvider>
            </SectionWrapper>
          </StyledContent>
        )}
      </Box>
    </>
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
