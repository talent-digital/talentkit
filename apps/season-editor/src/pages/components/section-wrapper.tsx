import { Box, Typography, useTheme } from "@mui/material";
import { kebabCase } from "change-case";

import { SectionVisibilityButton } from "./section-visibility-button";
import { SectionName } from "../types";
import { StyledSectionWrapper } from "./styled-section-wrapper";

type Props = {
  children: React.ReactNode;
  childrenOutsideWrapper?: boolean;
  hiddenSections: SectionName[];
  onToggleSectionVisibility: (_sectionName: SectionName) => void;
  sectionName: SectionName;
  title: string;
};

export const SectionWrapper = ({
  children,
  childrenOutsideWrapper = false,
  hiddenSections,
  onToggleSectionVisibility,
  sectionName,
  title,
}: Props) => {
  const theme = useTheme();

  return (
    <>
      <StyledSectionWrapper id={kebabCase(sectionName)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: theme.palette.primary.main,
            color: "#fff",
            p: 2,
          }}
        >
          <Typography variant="h5">{title}</Typography>

          <SectionVisibilityButton
            hiddenSections={hiddenSections}
            onToggle={onToggleSectionVisibility}
            sectionName={sectionName}
          />
        </Box>

        {childrenOutsideWrapper ||
        hiddenSections.includes(sectionName) ? null : (
          <Box sx={{ p: 2 }}>{children}</Box>
        )}
      </StyledSectionWrapper>

      {childrenOutsideWrapper && !hiddenSections.includes(sectionName)
        ? children
        : null}
    </>
  );
};
