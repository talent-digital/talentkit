import { styled } from "@mui/material";

export const StyledSectionWrapper = styled("div")(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: 800,
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  background: "#fff",
}));
