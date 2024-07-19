import {
  Typography,
  Box,
  IconButton,
  styled,
  TextField,
  useTheme,
  Tooltip,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

import { FormInputs } from "../types";
import { ConfirmDialogContext } from "../context";
import { StyledSidebarSection } from "./styled-sidebar-section";

type Save = {
  long: boolean;
  name?: string;
  timestamp: number;
  values: FormInputs;
};

const MAX_SHORT_SAVES = 10;
const MAX_AUTOMATIC_SAVES = 100;
const SAVE_TIME_LOOP = 5000;
const DO_LONG_SAVE_EVERY = 30;

export const SidebarHistory = () => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const [chosenSave, setChosenSave] = useState<Save | null>(null);
  const [lastChosenSave, setLastChosenSave] = useState<Save | null>(null);
  const [manualSaveName, setManualSaveName] = useState<string>("");
  const [savedList, setSavedList] = useState<Save[]>([]);
  const [saveCounter, setSaveCounter] = useState<number>(0);
  const [manualSaved, setManualSaved] = useState<Save[]>([]);
  const { getValues, reset } = useFormContext<FormInputs>();
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      const values = getValues();
      const saveAlreadyExists = savedList.some(
        (state) => JSON.stringify(state.values) === JSON.stringify(values)
      );

      if (saveAlreadyExists) {
        return;
      }

      const newSave: Save = { timestamp: Date.now(), values, long: false };
      const list = [newSave, ...savedList]
        .map((item, index) => markAsLong(item, index, saveCounter))
        .filter(removeOldEntries);

      setSaveCounter((counter) => counter + 1);
      setSavedList(list);
      setLastChosenSave(chosenSave);
      setChosenSave(null);
    }, SAVE_TIME_LOOP);

    return () => clearInterval(interval);
  }, [savedList, saveCounter, getValues, chosenSave]);

  const handleRestoreState = (save: Save) => {
    reset(save.values);
    setChosenSave(save);
    setLastChosenSave(null);
  };

  const handleManualSaveState = () => {
    if (!manualSaveName) {
      toast.error("Please provide a name for the save");
      return;
    }

    if (manualSaved.some((state) => state.name === manualSaveName)) {
      toast.error("Save with this name already exists");
      return;
    }

    const newSave = {
      timestamp: Date.now(),
      name: manualSaveName,
      values: getValues(),
      long: true,
    };
    setManualSaved([newSave, ...manualSaved]);
    setChosenSave(newSave);
    setManualSaveName("");
  };

  const removeManualSave = async (name?: string) => {
    if (!name) {
      return;
    }
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (confirmed) {
      setManualSaved(manualSaved.filter((state) => state.name !== name));
    }
  };

  return (
    <StyledSidebarSection>
      <Typography variant="h6">History</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Save current state"
          variant="outlined"
          value={manualSaveName}
          onChange={(event) => setManualSaveName(event.target.value)}
          size="small"
          inputProps={{ maxLength: 17 }}
        />

        <div>
          <IconButton onClick={handleManualSaveState}>
            <SaveIcon />
          </IconButton>
        </div>
      </Box>

      <Box
        sx={{
          maxHeight: 300,
          overflowY: "scroll",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {[...manualSaved, ...savedList].map((save) => (
          <StyledSaveItem
            key={save.name ?? save.timestamp}
            isChosen={isChosen(
              save,
              chosenSave,
              savedList[0].timestamp === save.timestamp
            )}
            isLastChosen={isChosen(save, lastChosenSave, false)}
          >
            <Typography>
              {save.name ?? new Date(save.timestamp).toLocaleTimeString()}
            </Typography>

            <div>
              {save.name && (
                <Tooltip title="Delete saved state" placement="left" arrow>
                  <IconButton
                    onClick={() => removeManualSave(save.name)}
                    sx={{
                      color: isChosen(
                        save,
                        chosenSave,
                        savedList[0].timestamp === save.timestamp
                      )
                        ? "#fff"
                        : "initial",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Restore old state" placement="right" arrow>
                <IconButton
                  onClick={() => handleRestoreState(save)}
                  sx={{
                    color: isChosen(
                      save,
                      chosenSave,
                      savedList[0].timestamp === save.timestamp
                    )
                      ? "#fff"
                      : "initial",
                  }}
                >
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            </div>
          </StyledSaveItem>
        ))}
      </Box>
    </StyledSidebarSection>
  );
};

const markAsLong = (item: Save, index: number, saveCounter: number): Save => {
  if (saveCounter % DO_LONG_SAVE_EVERY === 0 && index === MAX_SHORT_SAVES) {
    return { ...item, long: true };
  }

  return item;
};

const removeOldEntries = (item: Save, index: number): boolean => {
  if (item.name) {
    return true;
  }
  if (index > MAX_SHORT_SAVES && !item.long) {
    return false;
  }
  if (index > MAX_AUTOMATIC_SAVES) {
    return false;
  }

  return true;
};

const isChosen = (
  state: Save,
  chosenSave: Save | null,
  latestSave: boolean
): boolean => {
  if (chosenSave?.name !== undefined && chosenSave.name === state.name) {
    return true;
  }
  if (chosenSave === null) {
    return latestSave;
  }

  return state.timestamp === chosenSave.timestamp;
};

const getChosenBackground = (isChosen?: boolean, isLastChosen?: boolean) => {
  if (isChosen) {
    return blue[500];
  }
  if (isLastChosen) {
    return grey[300];
  }

  return grey[100];
};

export const StyledSaveItem = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !["isLastChosen", "isChosen"].includes(prop),
})<{
  isChosen?: boolean;
  isLastChosen?: boolean;
}>(({ isChosen, isLastChosen }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px",
  color: isChosen ? "#fff" : "initial",
  background: getChosenBackground(isChosen, isLastChosen),

  "&:hover": {
    background: isChosen ? blue[300] : blue[100],
  },
}));
