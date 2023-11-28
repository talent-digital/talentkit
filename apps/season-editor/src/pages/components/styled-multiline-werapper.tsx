import { styled } from "@mui/material";

export const StyledMultilineInputWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: theme.spacing(2),
}));
