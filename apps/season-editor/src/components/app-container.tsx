import { Alert, Box, Button, Snackbar, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { parse, stringify } from "yaml";

import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, useState } from "react";

type Inputs = {
  title: string;
  info: string;
  assetsURL: string;
  seasonEndMessage: string;
};

const selectedLanguage = "de";

export const AppContainer = () => {
  const { register, reset, getValues } = useForm<Inputs>();
  const [readFileErrorMsg, setReadFileError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const file = event.target.files[0];
    const readFile = await file.text();
    try {
      const parsedFiled = parse(readFile);
      reset({
        title: parsedFiled.title[selectedLanguage],
        info: parsedFiled.info[selectedLanguage],
        assetsURL: parsedFiled.assetsURL,
        seasonEndMessage: parsedFiled.seasonEndMessage[selectedLanguage],
      });
    } catch (error) {
      if (error instanceof Error) {
        setReadFileError(error.message);
      }
    }
  };

  const handleExport = () => {
    const values = mapToSeasonObject(getValues());
    const element = document.createElement("a");
    const file = new Blob([stringify(values)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "season.yaml";
    element.click();
  };

  return (
    <Box>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <button onClick={handleExport}>Save and Export season.yaml</button>
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

function mapToSeasonObject(values: Inputs) {
  return {
    title: {
      [selectedLanguage]: values.title,
    },
    info: {
      [selectedLanguage]: values.info,
    },
    assetsURL: values.assetsURL,
    seasonEndMessage: {
      [selectedLanguage]: values.seasonEndMessage,
    },
  };
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
}));
