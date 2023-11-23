import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { parse, stringify } from "yaml";
import { LocalizedString, SeasonDefinition } from "@talentdigital/season";
import { ChangeEvent, useEffect, useState } from "react";
import { StyledInput } from "./components/styled-input";
import { CompetenceAreas } from "./components";
import { FormInputs } from "./types";

type LanguageCode = `${keyof LocalizedString}`;

const DEFAULT_LANGUAGE: LanguageCode = "en"; // TODO: change to "de"
const availableLanguages: LanguageCode[] = ["de", "en"];

/* TODO:
  - Allow to init without importing a file
*/
export const SeasonEditor = () => {
  const methods = useForm<FormInputs>();
  const { register, reset, getValues } = methods;
  const [readFileErrorMsg, setReadFileError] = useState<string | null>(null);
  const [season, setSeason] = useState<SeasonDefinition>();
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

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

  useEffect(() => {
    if (!season) return;

    const competenceAreas: FormInputs["competenceAreas"] = [];
    const competences: FormInputs["competences"] = [];
    const subCompetences: FormInputs["subCompetences"] = [];

    Object.entries(season.competenceAreas).forEach(
      ([competenceAreaId, competenceAreaValue]) => {
        competenceAreas.push({
          competenceAreaId,
          name: competenceAreaValue.name?.[language] ?? "",
        });

        Object.entries(competenceAreaValue.competences).forEach(
          ([competenceId, competenceValue]) => {
            competences.push({
              competenceAreaId,
              competenceId,
              name: competenceValue.name?.[language] ?? "",
            });

            Object.entries(competenceValue.subCompetences).forEach(
              ([subCompetenceId, subCompetenceValue]) => {
                subCompetences.push({
                  competenceAreaId,
                  competenceId,
                  subCompetenceId,
                  name: subCompetenceValue.name?.[language] ?? "",
                });
              }
            );
          }
        );
      }
    );

    reset({
      title: season.title[language] ?? "",
      info: season.info[language] ?? "",
      assetsURL: season.assetsURL ?? "",
      seasonEndMessage: season.seasonEndMessage[language] ?? "",
      competenceAreas,
      competences,
      subCompetences,
    });
  }, [season, language, reset]);

  return (
    <Box>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleExport}>
          Save and Export season.yaml
        </Button>
        <Button variant="contained" onClick={handleLogForm}>
          Log form
        </Button>
        <FormControl>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as LanguageCode)
            }
          >
            {availableLanguages.map((language) => (
              <MenuItem value={language} key={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledNavigation>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
          padding: 4,
        }}
      >
        <StyledSectionWrapper>
          <Typography variant="h5">Basic information</Typography>
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
        </StyledSectionWrapper>

        <StyledSectionWrapper>
          <Typography variant="h5">Competence Areas</Typography>

          <FormProvider {...methods}>
            <CompetenceAreas />
          </FormProvider>
        </StyledSectionWrapper>
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

function detectLanguage(season?: SeasonDefinition): LanguageCode {
  if (typeof season?.title === "object") {
    const maybeLanguageKey = Object.keys(season.title)[0];

    if (isLanguageKey(maybeLanguageKey)) {
      return maybeLanguageKey;
    }
  }

  return DEFAULT_LANGUAGE;
}

function isLanguageKey(key: string): key is LanguageCode {
  return availableLanguages.includes(key as LanguageCode);
}

function mapToSeasonObject(
  originalFileLoaded: SeasonDefinition,
  valuesWithEmpty: FormInputs,
  language: LanguageCode
) {
  const newFile = JSON.parse(JSON.stringify(originalFileLoaded));
  const values: Partial<FormInputs> = Object.fromEntries(
    Object.entries(valuesWithEmpty).filter((entries) => Boolean(entries[1]))
  );

  newFile.title[language] = values.title;
  newFile.info[language] = values.info;
  newFile.assetsURL = values.assetsURL;
  newFile.seasonEndMessage[language] = values.seasonEndMessage;

  return newFile;
}

const StyledSectionWrapper = styled("div")(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: 800,
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  background: "#fff",
}));

const StyledNavigation = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background: "#fff",
  boxShadow: theme.shadows[3],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
}));
