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

import {
  CompetenceAreas,
  Episodes,
  StyledSectionWrapper,
  StyledInput,
  SectionVisibilityButton,
  TestItems,
} from "./components";
import { FormInputs, SectionName } from "./types";

type LanguageCode = `${keyof LocalizedString}`;

const DEFAULT_LANGUAGE: LanguageCode = "en"; // TODO: change to "de"
const availableLanguages: LanguageCode[] = ["de", "en"];

/* TODO:
  - Allow to init without importing a file
  - Add id generator
  - Add remove options
  - Add popup for delete confirmation
  - Add sticky header
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

    const { competenceAreas, competences, subCompetences } = extractCompetences(
      season,
      language
    );

    reset({
      title: season.title[language] ?? "",
      info: season.info[language] ?? "",
      assetsURL: season.assetsURL ?? "",
      seasonEndMessage: season.seasonEndMessage[language] ?? "",
      competenceAreas,
      ...competences,
      ...subCompetences,
      episodes,
    });
  }, [season, language, reset]);

  return (
    <Box>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleExport}>
          Export
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
        <Button onClick={handleLogForm}>Log form</Button>
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
  const newFile: SeasonDefinition = JSON.parse(
    JSON.stringify(originalFileLoaded)
  );
  const values: Partial<FormInputs> = Object.fromEntries(
    Object.entries(valuesWithEmpty).filter((entries) => Boolean(entries[1]))
  ) as Partial<FormInputs>;

  newFile.title[language] = values.title;
  newFile.info[language] = values.info;
  newFile.assetsURL = values.assetsURL;
  newFile.seasonEndMessage[language] = values.seasonEndMessage;
  newFile.competenceAreas = mapFormCompetenceAreasToSeasonCompetenceAreas(
    values,
    newFile,
    language
  );
  newFile.episodes = mapFormEpisodesToSeasonEpisodes(values, newFile, language);

  return newFile;
}

function mapFormCompetenceAreasToSeasonCompetenceAreas(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode
): SeasonDefinition["competenceAreas"] {
  return (
    values.competenceAreas?.reduce((accumulator, competenceArea) => {
      return {
        ...accumulator,
        [competenceArea.competenceAreaId]: {
          name: {
            ...oldValues.competenceAreas[competenceArea.competenceAreaId]?.name,
            [language]: competenceArea.name,
          },
          competences: mapFormCompetencesToSeasonCompetences(
            values,
            oldValues,
            language,
            competenceArea.competenceAreaId
          ),
        },
      };
    }, {}) ?? {}
  );
}

function mapFormCompetencesToSeasonCompetences(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode,
  competenceAreaId: string
) {
  const competences = values[`competences-${competenceAreaId}`];

  return (
    competences?.reduce((accumulator, competence) => {
      return {
        ...accumulator,
        [competence.competenceId]: {
          name: {
            ...oldValues.competenceAreas[competence.competenceId]?.name,
            [language]: competence.name,
          },
          subCompetences: mapFormSubCompetencesToSeasonSubCompetences(
            values,
            oldValues,
            language,
            competenceAreaId,
            competence.competenceId
          ),
        },
      };
    }, {}) ?? {}
  );
}

function mapFormSubCompetencesToSeasonSubCompetences(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode,
  competenceAreaId: string,
  competenceId: string
) {
  const subCompetences =
    values[`subCompetences-${competenceAreaId}-${competenceId}`];

  return (
    subCompetences?.reduce((accumulator, subCompetence) => {
      return {
        ...accumulator,
        [subCompetence.subCompetenceId]: {
          name: {
            ...oldValues.competenceAreas[competenceAreaId]?.competences[
              competenceId
            ]?.subCompetences[subCompetence.subCompetenceId]?.name,
            [language]: subCompetence.name,
          },
        },
      };
    }, {}) ?? {}
  );
}

function mapFormEpisodesToSeasonEpisodes(
  values: Partial<FormInputs>,
  oldValues: SeasonDefinition,
  language: LanguageCode
): SeasonDefinition["episodes"] {
  return (
    values.episodes?.reduce((accumulator, episode) => {
      return {
        ...accumulator,
        [episode.episodeId]: {
          title: {
            ...oldValues.episodes[episode.episodeId]?.title,
            [language]: episode.title,
          },
          description: {
            ...oldValues.episodes[episode.episodeId]?.description,
            [language]: episode.description,
          },
          maturity: episode.maturity,
          imageUrl: episode.imageUrl,
          format: episode.format,
          formatConfiguration: episode.formatConfiguration,
        },
      };
    }, {}) ?? {}
  );
}

function extractEpisodes(
  season: SeasonDefinition,
  language: LanguageCode
): FormInputs["episodes"] {
  return Object.entries(season.episodes).map(([episodeId, episodeValue]) => ({
    episodeId,
    title: episodeValue.title[language] ?? "",
    description: episodeValue.description[language] ?? "",
    maturity: episodeValue.maturity,
    imageUrl: episodeValue.imageUrl ?? "",
    format: episodeValue.format,
    formatConfiguration: episodeValue.formatConfiguration ?? "",
  }));
}

type ExtractCompetencesReturn = {
  competenceAreas: FormInputs["competenceAreas"];
  competences: Record<
    `competences-${string}`,
    FormInputs[`competences-${string}`]
  >;
  subCompetences: Record<
    `subCompetences-${string}-${string}`,
    FormInputs[`subCompetences-${string}-${string}`]
  >;
};

function extractCompetences(
  season: SeasonDefinition,
  language: LanguageCode
): ExtractCompetencesReturn {
  const competenceAreas: ExtractCompetencesReturn["competenceAreas"] = [];
  const competences: ExtractCompetencesReturn["competences"] = {};
  const subCompetences: ExtractCompetencesReturn["subCompetences"] = {};

  Object.entries(season.competenceAreas).forEach(
    ([competenceAreaId, competenceAreaValue]) => {
      competenceAreas.push({
        competenceAreaId,
        name: competenceAreaValue.name?.[language] ?? "",
      });

      Object.entries(competenceAreaValue.competences).forEach(
        ([competenceId, competenceValue]) => {
          const competenceKey = `competences-${competenceAreaId}` as const;
          if (!competences[competenceKey]) {
            competences[competenceKey] = [];
          }

          competences[competenceKey].push({
            competenceAreaId,
            competenceId,
            name: competenceValue.name?.[language] ?? "",
          });

          Object.entries(competenceValue.subCompetences).forEach(
            ([subCompetenceId, subCompetenceValue]) => {
              const subCompetenceKey =
                `subCompetences-${competenceAreaId}-${competenceId}` as const;

              if (!subCompetences[subCompetenceKey]) {
                subCompetences[subCompetenceKey] = [];
              }

              subCompetences[subCompetenceKey].push({
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

  return { competenceAreas, competences, subCompetences };
}

const StyledNavigation = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background: "#fff",
  boxShadow: theme.shadows[3],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
}));
