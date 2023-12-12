import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { parse, stringify } from "yaml";
import { SeasonDefinition } from "@talentdigital/season";
import { ChangeEvent, useEffect, useState } from "react";

import {
  CompetenceAreas,
  Episodes,
  StyledSectionWrapper,
  StyledInput,
  SectionVisibilityButton,
  TestItems,
  FeedbackQuestions,
} from "./components";
import { FormInputs, LanguageCode, SectionName } from "./types";
import {
  detectLanguage,
  extractEpisodes,
  extractFromCompetences,
  getEmptySeason,
  mapToSeasonObject,
} from "./utils";
import { DEFAULT_LANGUAGE, availableLanguages } from "./dictionaries";

const navigationList = [
  "basic-information",
  "competence-areas",
  "episodes",
  "test-items",
  "feedback-questions",
];

const SIDEBAR_SIZE = 300;

export const SeasonEditor = () => {
  const methods = useForm<FormInputs>();
  const { register, reset, getValues } = methods;
  const [readFileErrorMsg, setReadFileError] = useState<string | null>(null);
  const [season, setSeason] = useState<SeasonDefinition>(getEmptySeason());
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [hiddenSections, setHiddenSections] = useState<SectionName[]>([]);
  const [seedIdFilled, setSeedIdFilled] = useState<boolean>(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const file = event.target.files[0];
    const readFile = await file.text();
    try {
      const parsedFiled: SeasonDefinition = parse(readFile);
      const detectedLanguage = detectLanguage(parsedFiled);
      setLanguage(detectedLanguage);
      setSeason(parsedFiled);
    } catch (error) {
      if (error instanceof Error) {
        setReadFileError(error.message);
      }
    }
  };

  const handleExport = () => {
    const values = mapToSeasonObject(season, getValues(), language);
    const element = document.createElement("a");
    const file = new Blob([stringify(values)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "season.yaml";
    element.click();
  };

  const handleLogForm = () => {
    console.log(getValues());
  };

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

    const episodes = extractEpisodes(season, language);
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
      <StyledSidebar>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">Configuration and actions</Typography>

          <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />

          <StyledInput short>
            <label>Language</label>
            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as LanguageCode)
              }
            >
              {availableLanguages.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </StyledInput>

          <Button variant="contained" onClick={handleExport}>
            Export season.yaml
          </Button>
        </Box>

        <Divider />

        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Jump to section
          </Typography>
          <StyledNavList>
            {navigationList.map((section) => (
              <li key={section}>
                <a href={`#${section}`}>{section.replace("-", " ")}</a>
              </li>
            ))}
          </StyledNavList>
        </div>

        <Divider />

        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Advanced tools
          </Typography>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button onClick={handleLogForm} variant="contained">
              Log form
            </Button>
          </Box>
        </div>
      </StyledSidebar>

      {!seedIdFilled && (
        <StyledContent>
          <StyledSectionWrapper>
            <Typography variant="h5">
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
              <Typography variant="h5">Season description</Typography>

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
                  <input type="text" {...register("info")} />
                </StyledInput>

                <StyledInput>
                  <label>Assets URL</label>
                  <input type="text" {...register("assetsURL")} />
                </StyledInput>
              </>
            )}
          </StyledSectionWrapper>

          <StyledSectionWrapper id="competence-areas">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Competence Areas</Typography>

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
              <Typography variant="h5">Episodes</Typography>

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
              <Typography variant="h5">Test items</Typography>

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
              <Typography variant="h5">Feedback questions</Typography>

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
        </StyledContent>
      )}

      <Snackbar
        open={readFileErrorMsg !== null}
        message={readFileErrorMsg}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setReadFileError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {readFileErrorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const StyledContent = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  width: 900,
  margin: "auto",
}));

const StyledSidebar = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 2),
  background: "#fff",
  boxShadow: theme.shadows[3],
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  position: "fixed",
  left: 0,
  width: SIDEBAR_SIZE,
  height: "100%",
}));

const StyledNavList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& > li": {
    "& > a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      textTransform: "capitalize",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));
