import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const StyledSectionWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "indented",
})<{
  indented?: boolean;
}>(({ theme, indented }) => ({
  border: `1px solid ${grey["500"]}`,
  borderRadius: theme.shape.borderRadius,
  width: `calc(100% - ${indented ? theme.spacing(3) : "0px"})`,
  marginLeft: indented ? theme.spacing(3) : "0px",
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  borderLeft: indented
    ? `5px solid ${theme.palette.primary.main}`
    : `1px solid ${grey["500"]}`,
}));
