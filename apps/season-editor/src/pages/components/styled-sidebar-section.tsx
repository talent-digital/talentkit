import { styled } from "@mui/material";

export const StyledSidebarSection = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
}));
