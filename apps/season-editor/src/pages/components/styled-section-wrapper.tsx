import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const StyledSectionWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "indented",
})<{
  indented?: boolean;
}>(({ theme, indented }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: `calc(100% - ${indented ? theme.spacing(3) : "0px"})`,
  marginLeft: indented ? theme.spacing(3) : "0px",
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  background: "#fff",
  borderLeft: indented ? `5px solid ${grey["600"]}` : "none",
}));
