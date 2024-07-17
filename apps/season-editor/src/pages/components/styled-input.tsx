import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const StyledInput = styled(Box, {
  shouldForwardProp: (prop) => prop !== "short",
})<{
  short?: boolean;
}>(({ theme, short }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: short ? "85px" : "100%",
  marginBottom: theme.spacing(2),

  "& span": {
    position: "absolute",
    bottom: "-16px",
    left: 0,
    color: theme.palette.error.main,
    fontSize: "11px",
  },

  "& select": {
    cursor: "pointer",
  },
  "& input, & select, & textarea": {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${grey[500]}`,
    padding: theme.spacing(1),
    width: "100%",
    fontFamily: theme.typography.fontFamily,
    resize: "vertical",
    lineHeight: "1.4",

    "&[readonly]": {
      backgroundColor: theme.palette.grey[100],
      cursor: "default",
    },

    "&:focus": {
      outline: "none",
    },

    "&:not([readonly]):focus": {
      outline: `1px solid ${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
