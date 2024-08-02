import {
  Box,
  Button,
  Typography,
  styled,
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
import { SidebarStatistics } from "./sidebar-statistics";
import { FormInputs, LanguageCode } from "../types";
import {
  detectLanguage,
  validateSeason,
  mapToSeasonObject,
  languageToFullForm,
} from "../utils";
import { SidebarHistory } from "./sidebar-history";
import { SidebarJumpToSection } from "./sidebar-just-to-section";
import { SidebarAdvancedTools } from "./sidebar-advanced-tools";
import { StyledSidebarSection } from "./styled-sidebar-section";
import { SidebarTranslateSection } from "./sidebar-translate-section";

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

    if (!validateSeason(maybeSeason, values, setError)) {
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([stringify(maybeSeason)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "season.yaml";
    element.click();
  };

  return (
    <StyledSidebar>
      <StyledSidebarSection>
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
                  {languageToFullForm(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button variant="outlined" onClick={handleExport} fullWidth>
          Export season.yaml
        </Button>
      </StyledSidebarSection>

      <SidebarTranslateSection
        season={season}
        onSeasonChange={onSeasonChange}
        language={language}
      />
      <SidebarJumpToSection />
      <SidebarHistory />
      <SidebarStatistics />
      <SidebarAdvancedTools />
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

  "& > div:not(:last-child)": {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
