import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { SeasonDefinition } from "@talentdigital/season";
import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { translateSeason } from "../utils/translate-season";
import { StyledSidebarSection } from "./styled-sidebar-section";
import { LanguageCode } from "../types";
import ReactDOM from "react-dom";

const STORAGE_KEY = "td-season-editor-gpt-api-key";

export const SidebarTranslateSection = ({
  language,
  onSeasonChange,
  season,
}: {
  language: LanguageCode;
  onSeasonChange: (_season: SeasonDefinition) => void;
  season: SeasonDefinition;
}) => {
  const [apiKey, setApiKey] = useState<string>(
    localStorage.getItem(STORAGE_KEY) || ""
  );
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, apiKey);
  }, [apiKey]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    const fromLanguage = getOppositeLanguage(language);
    const translatedSeason = await translateSeason(
      season,
      fromLanguage,
      language,
      apiKey
    );
    onSeasonChange(translatedSeason);
    setIsTranslating(false);
  };

  return (
    <>
      {isTranslating &&
        ReactDOM.createPortal(
          <Box
            sx={{
              position: "fixed",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              zIndex: 1,
              background: "rgb(0, 0, 0, 0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>,
          document.body
        )}
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
                Please check the correctness of the translation after the
                process.
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

        <form>
          <TextField
            label="GPT API key"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            autoComplete="off"
          />
        </form>
        <Button
          variant="outlined"
          onClick={handleTranslate}
          fullWidth
          disabled={!apiKey}
        >
          Translate from {getOppositeLanguage(language)}
        </Button>
      </StyledSidebarSection>
    </>
  );
};

const getOppositeLanguage = (language: LanguageCode) =>
  language === "en" ? "de" : "en";
