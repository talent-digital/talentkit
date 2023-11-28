import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const StyledInput = styled(Box, {
  shouldForwardProp: (prop) => prop !== "short",
})<{
  short?: boolean;
}>(({ theme, short }) => ({
  display: "flex",
  flexDirection: "column",
  width: short ? "75px" : "100%",
  "& input, & select": {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${grey[500]}`,
    padding: theme.spacing(1),

    "&:focus": {
      outline: `1px solid ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
