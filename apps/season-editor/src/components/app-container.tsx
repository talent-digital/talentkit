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
import { grey } from "@mui/material/colors";
import { useFieldArray, useForm } from "react-hook-form";
import { parse, stringify } from "yaml";
import { LocalizedString, SeasonDefinition } from "@talentdigital/season";
import { ChangeEvent, useEffect, useState } from "react";

type LanguageCode = `${keyof LocalizedString}`;

const DEFAULT_LANGUAGE: LanguageCode = "en"; // TODO: change to "de"
const availableLanguages: LanguageCode[] = ["de", "en"];

type Inputs = {
  title: string;
  info: string;
  assetsURL: string;
  seasonEndMessage: string;
  competenceAreas: {
    competenceAreaId: string;
    name: string;
  }[];
  competences: {
    competenceAreaId: string;
    competenceId: string;
    name: string;
  }[];
  subCompetences: {
    competenceAreaId: string;
    competenceId: string;
    subCompetenceId: string;
    name: string;
  }[];
};

/* TODO:
  - Allow to init without importing a file
*/
export const AppContainer = () => {
  const { register, reset, getValues, control } = useForm<Inputs>();
  const [readFileErrorMsg, setReadFileError] = useState<string | null>(null);
  const [season, setSeason] = useState<SeasonDefinition>();
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  const { fields: competenceAreaFields, append: appendCompetenceArea } =
    useFieldArray({
      control,
      name: "competenceAreas",
    });

  const { fields: competenceFields, append: appendCompetence } = useFieldArray({
    control,
    name: "competences",
  });

  const { fields: subCompetenceFields, append: appendSubCompetence } =
    useFieldArray({
      control,
      name: "subCompetences",
    });

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

    const competenceAreas: Inputs["competenceAreas"] = [];
    const competences: Inputs["competences"] = [];
    const subCompetences: Inputs["subCompetences"] = [];

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

          {competenceAreaFields.map((competenceAreaField, index) => (
            <Box key={competenceAreaField.id}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <StyledInput short>
                  <label>id</label>
                  <input
                    disabled
                    type="text"
                    {...register(
                      `competenceAreas.${index}.competenceAreaId` as "competenceAreas.0.name"
                    )}
                  />
                </StyledInput>
                <StyledInput>
                  <label>name</label>
                  <input
                    type="text"
                    {...register(
                      `competenceAreas.${index}.name` as "competenceAreas.0.name"
                    )}
                  />
                </StyledInput>
              </Box>
              {/* competenceFields */}
              <Box
                sx={{
                  paddingLeft: 4,
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  borderLeft: `1px solid ${grey[400]}`,
                }}
              >
                {competenceFields
                  .filter(
                    (competenceField) =>
                      competenceField.competenceAreaId ===
                      competenceAreaField.competenceAreaId
                  )
                  .map((competenceField, index) => (
                    <div key={competenceField.id}>
                      <Box
                        sx={{
                          display: "flex",

                          gap: 2,
                        }}
                      >
                        <StyledInput short>
                          <label>id</label>
                          <input
                            disabled
                            type="text"
                            {...register(
                              `competences.${index}.competenceId` as "competences.0.competenceId"
                            )}
                          />
                        </StyledInput>
                        <StyledInput>
                          <label>name</label>
                          <input
                            type="text"
                            {...register(
                              `competences.${index}.name` as "competences.0.name"
                            )}
                          />
                        </StyledInput>
                      </Box>

                      <Box
                        sx={{
                          paddingLeft: 4,
                          marginTop: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          borderLeft: `1px solid ${grey[300]}`,
                        }}
                      >
                        {subCompetenceFields
                          .filter(
                            (subCompetenceField) =>
                              subCompetenceField.competenceAreaId ===
                                competenceAreaField.competenceAreaId &&
                              subCompetenceField.competenceId ===
                                competenceField.competenceId
                          )
                          .map((subCompetenceField, index) => (
                            <Box
                              key={subCompetenceField.id}
                              sx={{
                                display: "flex",

                                gap: 2,
                              }}
                            >
                              <StyledInput short>
                                <label>id</label>
                                <input
                                  disabled
                                  type="text"
                                  {...register(
                                    `subCompetences.${index}.competenceId` as "subCompetences.0.subCompetenceId"
                                  )}
                                />
                              </StyledInput>
                              <StyledInput>
                                <label>name</label>
                                <input
                                  type="text"
                                  {...register(
                                    `subCompetences.${index}.name` as "subCompetences.0.name"
                                  )}
                                />
                              </StyledInput>
                            </Box>
                          ))}
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            onClick={() =>
                              appendSubCompetence({
                                name: "",
                                competenceAreaId:
                                  competenceAreaField.competenceAreaId,
                                competenceId: competenceField.competenceId,
                                subCompetenceId: `${Math.ceil(
                                  Math.random() * 100000
                                )}`, // TODO: generate id in a smart way
                              })
                            }
                          >
                            Add SubCompetence
                          </Button>
                        </div>
                      </Box>
                    </div>
                  ))}

                <div>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() =>
                      appendCompetence({
                        name: "",
                        competenceAreaId: competenceAreaField.competenceAreaId,
                        competenceId: `${Math.ceil(Math.random() * 100000)}`, // TODO: generate id in a smart way
                      })
                    }
                  >
                    Add Competence
                  </Button>
                </div>
              </Box>
            </Box>
          ))}

          <div>
            <Button
              variant="contained"
              type="button"
              onClick={() =>
                appendCompetenceArea({
                  name: "",
                  competenceAreaId: `${Math.ceil(Math.random() * 100000)}`, // TODO: generate id in a smart way
                })
              }
            >
              Add Competence Area
            </Button>
          </div>
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
  valuesWithEmpty: Inputs,
  language: LanguageCode
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
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: 800,
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  background: "#fff",
}));

const StyledInput = styled(Box, {
  shouldForwardProp: (prop) => prop !== "short",
})<{
  short?: boolean;
}>(({ theme, short }) => ({
  display: "flex",
  flexDirection: "column",
  width: short ? "75px" : "100%",
  "& input": {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${grey[500]}`,
    padding: theme.spacing(1),

    "&:focus": {
      outline: `1px solid ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
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
