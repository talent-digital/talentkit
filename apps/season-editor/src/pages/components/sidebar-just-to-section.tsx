import { styled, Typography } from "@mui/material";
import { StyledSidebarSection } from "./styled-sidebar-section";

const navigationList = [
  "basic-information",
  "competence-areas",
  "episodes",
  "test-items",
  "feedback-questions",
  "badges",
];

export const SidebarJumpToSection = () => {
  return (
    <StyledSidebarSection>
      <Typography variant="h6">Jump to section</Typography>
      <StyledNavList>
        {navigationList.map((section) => (
          <li key={section}>
            <a href={`#${section}`}>{section.replace("-", " ")}</a>
          </li>
        ))}
      </StyledNavList>
    </StyledSidebarSection>
  );
};

const StyledNavList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "& > li": {
    "& > a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      textTransform: "capitalize",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));
