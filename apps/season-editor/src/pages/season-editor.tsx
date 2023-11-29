import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  styled,
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
  mapToSeasonObject,
} from "./utils";
import { DEFAULT_LANGUAGE, availableLanguages } from "./dictionaries";

/* TODO:
  - Allow to init without importing a file
  - Add id generator
  - Add remove competence option

  - Add popup for delete confirmation
  - Add sticky header
  - Description fields as textarea
  - Select subCompetences in testItems (possibly with text instead of ID) by name and automatically
    fill competence ids
  - Ensure ids are unique for testItem and feedbackQuestion (or disable the field and generate it automatically)
  - Test item support for toolType and search
  - Add statistics (number of episodes, number of test items, number of test items per episode etc.)
  - Hide log form button under some dev tools icon
*/

/*
  Questions:
  - Pretty names, e.g. instead of assetsURL -> Assets URL
*/
export const SeasonEditor = () => {
  const methods = useForm<FormInputs>();
  const { register, reset, getValues } = methods;
  const [readFileErrorMsg, setReadFileError] = useState<string | null>(null);
  const [season, setSeason] = useState<SeasonDefinition>();
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [hiddenSections, setHiddenSections] = useState<SectionName[]>([]);

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
    if (!season) return;

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

    reset({
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
  }, [season, language, reset]);

  return (
    <Box>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <Button onClick={handleLogForm}>Log form</Button>

        <Button variant="contained" onClick={handleExport}>
          Export
        </Button>
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
      </StyledNavigation>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
          padding: 4,
          width: 800,
          margin: "auto",
        }}
      >
        <StyledSectionWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Basic information</Typography>

            <SectionVisibilityButton
              hiddenSections={hiddenSections}
              onToggle={handleToggleSectionVisibility}
              sectionName="basicInformation"
            />
          </Box>
          {hiddenSections.includes("basicInformation") ? null : (
            <>
              <StyledInput>
                <label>Title</label>
                <input type="text" {...register("title")} />
              </StyledInput>

              <StyledInput>
                <label>Info</label>
                <input type="text" {...register("info")} />
              </StyledInput>

              <StyledInput>
                <label>assetsURL</label>
                <input type="text" {...register("assetsURL")} />
              </StyledInput>
            </>
          )}
        </StyledSectionWrapper>

        <StyledSectionWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Competence Areas</Typography>

            <SectionVisibilityButton
              hiddenSections={hiddenSections}
              onToggle={handleToggleSectionVisibility}
              sectionName="competenceAreas"
            />
          </Box>

          {hiddenSections.includes("competenceAreas") ? null : (
            <FormProvider {...methods}>
              <CompetenceAreas />
            </FormProvider>
          )}
        </StyledSectionWrapper>

        <StyledSectionWrapper>
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

        <StyledSectionWrapper>
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

        <StyledSectionWrapper>
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
      </Box>

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

const StyledNavigation = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background: "#fff",
  boxShadow: theme.shadows[3],
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: theme.spacing(2),
}));
