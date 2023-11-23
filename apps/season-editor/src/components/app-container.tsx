import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { parse, stringify } from "yaml";
import { SeasonDefinition } from "@talentdigital/season";

import { ChangeEvent, useEffect, useState } from "react";

type AvailableLanguages = "de" | "en";
const DEFAULT_LANGUAGE: AvailableLanguages = "en"; // TODO: change to "de"
const availableLanguages: AvailableLanguages[] = ["de", "en"];

type Inputs = {
  title: string;
  info: string;
  assetsURL: string;
  seasonEndMessage: string;
};

export const AppContainer = () => {
  const { register, reset, getValues } = useForm<Inputs>();
  const [readFileErrorMsg, setReadFileError] = useState<string | null>(null);
  const [season, setSeason] = useState<SeasonDefinition>();
  const [language, setLanguage] =
    useState<AvailableLanguages>(DEFAULT_LANGUAGE);

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

  useEffect(() => {
    if (!season) return;

    reset({
      title: season.title[language] ?? "",
      info: season.info[language] ?? "",
      assetsURL: season.assetsURL ?? "",
      seasonEndMessage: season.seasonEndMessage[language] ?? "",
    });
  }, [season, language, reset]);

  return (
    <Box>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <button onClick={handleExport}>Save and Export season.yaml</button>
        <FormControl>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as AvailableLanguages)
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
          <h3>Basic information</h3>
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

          <StyledInput>
            <label>seasonEndMessage</label>
            <input type="text" {...register("seasonEndMessage")} />
          </StyledInput>
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

function detectLanguage(season?: SeasonDefinition): AvailableLanguages {
  if (typeof season?.title === "object") {
    const maybeLanguageKey = Object.keys(season.title)[0];

    if (isLanguageKey(maybeLanguageKey)) {
      return maybeLanguageKey;
    }
  }

  return DEFAULT_LANGUAGE;
}

function isLanguageKey(key: string): key is AvailableLanguages {
  return availableLanguages.includes(key as AvailableLanguages);
}

function mapToSeasonObject(
  originalFileLoaded: SeasonDefinition,
  valuesWithEmpty: Inputs,
  language: AvailableLanguages
) {
  const newFile = JSON.parse(JSON.stringify(originalFileLoaded));
  const values: Partial<Inputs> = Object.fromEntries(
    Object.entries(valuesWithEmpty).filter((entries) => Boolean(entries[1]))
  );

  newFile.title[language] = values.title;
  newFile.info[language] = values.info;
  newFile.assetsURL = values.assetsURL;
  newFile.seasonEndMessage[language] = values.seasonEndMessage;

  return newFile;
}

const StyledSectionWrapper = styled("div")(({ theme }) => ({
  boxShadow: `3px 3px 10px rgba(0, 0, 0, 0.3)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: 800,
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  background: "#fff",
}));

const StyledInput = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& input": {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${grey[500]}`,
    padding: theme.spacing(1),
  },
}));

const StyledNavigation = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));
