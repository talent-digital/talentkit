import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { SeasonDefinition } from "@talentdigital/season";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { translateSeason } from "../utils/translate-season";
import { StyledSidebarSection } from "./styled-sidebar-section";
import { LanguageCode } from "../types";

export const SidebarTranslateSection = ({
  language,
  onSeasonChange,
  season,
}: {
  language: LanguageCode;
  onSeasonChange: (_season: SeasonDefinition) => void;
  season: SeasonDefinition;
}) => {
  const [gptApiKey, setGptApiKey] = useState<string>("");

  const handleTranslate = () => {
    const fromLanguage = getOppositeLanguage(language);
    const translatedSeason = translateSeason(season, fromLanguage, language);
    onSeasonChange(translatedSeason);
  };

  return (
    <StyledSidebarSection>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Translation </Typography>

        <Tooltip
          title={
            <Typography>
              Provide a GPT API key to translate the season from the opposite
              language.
              <br />
              Contact the manager in your organization to get the api key.
              <br />
              Please check the correctness of the translation after the process.
              <br />
              <br />
              Only empty fields are translated.
              <br />
              Legacy options are not translated.
            </Typography>
          }
        >
          <InfoOutlinedIcon />
        </Tooltip>
      </Box>

      <TextField
        label="GPT API key"
        variant="outlined"
        fullWidth
        size="small"
        value={gptApiKey}
        onChange={(event) => setGptApiKey(event.target.value)}
      />
      <Button
        variant="outlined"
        onClick={handleTranslate}
        fullWidth
        disabled={!gptApiKey}
      >
        Translate from {getOppositeLanguage(language)}
      </Button>
    </StyledSidebarSection>
  );
};

const getOppositeLanguage = (language: LanguageCode) =>
  language === "en" ? "de" : "en";
