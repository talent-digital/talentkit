import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { SectionName } from "../types";

type Props = {
  hiddenSections: SectionName[];
  // eslint-disable-next-line no-unused-vars
  onToggle: (sectionName: SectionName) => void;
  sectionName: SectionName;
};

export const SectionVisibilityButton = ({
  sectionName,
  onToggle,
  hiddenSections,
}: Props) => {
  return (
    <IconButton onClick={() => onToggle(sectionName)}>
      {hiddenSections.includes(sectionName) ? (
        <VisibilityOffIcon />
      ) : (
        <VisibilityIcon />
      )}
    </IconButton>
  );
};
