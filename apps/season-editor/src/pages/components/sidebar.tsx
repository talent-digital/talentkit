import {
  Box,
  Button,
  Typography,
  styled,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SeasonDefinition } from "@talentdigital/season";
import { useFormContext } from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import { ChangeEvent, useState } from "react";
import { parse, stringify } from "yaml";
import toast from "react-hot-toast";

import { availableLanguages, SIDEBAR_SIZE } from "../dictionaries";
import { Statistics } from "./statistics";
import { FormInputs, LanguageCode } from "../types";
import { detectLanguage, isErrorObject, mapToSeasonObject } from "../utils";

const navigationList = [
  "basic-information",
  "competence-areas",
  "episodes",
  "test-items",
  "feedback-questions",
];

export const Sidebar = ({
  language,
  season,
  onLanguageChange,
  onSeasonChange,
}: {
  language: LanguageCode;
  season: SeasonDefinition;
  onLanguageChange: (_language: LanguageCode) => void;
  onSeasonChange: (_season: SeasonDefinition) => void;
}) => {
  const { getValues, setError } = useFormContext<FormInputs>();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    setSelectedFileName(event.target.files[0].name);
    const file = event.target.files[0];
    const readFile = await file.text();
    try {
      const parsedFiled: SeasonDefinition = parse(readFile);
      const detectedLanguage = detectLanguage(parsedFiled);
      onLanguageChange(detectedLanguage);
      onSeasonChange(parsedFiled);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleExport = () => {
    const values = getValues();
    const maybeSeason = mapToSeasonObject(season, getValues(), language);

    if (isErrorObject(maybeSeason)) {
      if (maybeSeason.testItemIdDuplicates) {
        validateTestItems(values, maybeSeason.testItemIdDuplicates);
      }
      if (maybeSeason.notNumericEpisodes) {
        validateNumericEpisodes(values, maybeSeason.notNumericEpisodes);
      }

      return;
    }

    const element = document.createElement("a");
    const file = new Blob([stringify(maybeSeason)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "season.yaml";
    element.click();
  };

  const validateTestItems = (
    values: FormInputs,
    testItemIdDuplicates: string[]
  ) => {
    values.testItems.forEach((item, index) => {
      if (testItemIdDuplicates.includes(item.testItemId)) {
        const fieldId = `testItems[${index}].testItemId` as "testItems";
        setError(fieldId, {
          message: "Duplicate test item id",
        });
      }
    });

    toast.error(
      `Error: Duplicate Test IDs. Please make sure your Test IDs are unique for this season. Duplicates found: ${testItemIdDuplicates.join(
        ", "
      )}`
    );
  };

  const validateNumericEpisodes = (
    values: FormInputs,
    notNumericEpisodes: string[]
  ) => {
    values.episodes.forEach((item, index) => {
      if (notNumericEpisodes.includes(item.episodeId)) {
        const fieldId = `episodes[${index}].episodeId` as "episodes";
        setError(fieldId, {
          message: "Episode id must be numeric",
        });
      }
    });

    toast.error(
      `Error: episode ids must be numeric when linear season is checked. Non numeric episode ids found: ${notNumericEpisodes.join(
        ", "
      )}`
    );
  };

  const handleLogForm = () => {
    console.log(getValues());
  };

  return (
    <StyledSidebar>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6">Configuration and actions</Typography>

        <Box sx={{ width: "100%" }}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
          >
            Select file
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFileName && (
            <Typography variant="caption">
              Selected file: {selectedFileName}
            </Typography>
          )}
        </Box>

        <Box sx={{ width: "100%", textAlign: "left" }}>
          <FormControl fullWidth size="small">
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(event) =>
                onLanguageChange(event.target.value as LanguageCode)
              }
            >
              {availableLanguages.map((option) => (
                <MenuItem value={option} key={option}>
                  {translateLanguage(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="caption">
            * Changing language might lose changes
          </Typography>
        </Box>

        <Button variant="outlined" onClick={handleExport} fullWidth>
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

      <Statistics />

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
          <Button onClick={handleLogForm} variant="outlined" fullWidth>
            Log form
          </Button>
        </Box>
      </div>
    </StyledSidebar>
  );
};

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
  overflowY: "auto",
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

const translateLanguage = (language: LanguageCode) => {
  switch (language) {
    case "en":
      return "English";
    case "de":
      return "German";
    default:
      return language;
  }
};
