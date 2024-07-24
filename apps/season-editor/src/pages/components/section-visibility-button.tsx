import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { SectionName } from "../types";

type Props = {
  hiddenSections: SectionName[];
  onToggle: (_sectionName: SectionName) => void;
  sectionName: SectionName;
};

export const SectionVisibilityButton = ({
  sectionName,
  onToggle,
  hiddenSections,
}: Props) => {
  return (
    <div>
      <IconButton onClick={() => onToggle(sectionName)} sx={{ color: "#fff" }}>
        {hiddenSections.includes(sectionName) ? (
          <VisibilityOffIcon />
        ) : (
          <VisibilityIcon />
        )}
      </IconButton>
    </div>
  );
};
