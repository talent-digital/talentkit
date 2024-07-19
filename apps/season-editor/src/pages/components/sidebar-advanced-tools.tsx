import { Typography, Box, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { FormInputs } from "../types";
import { StyledSidebarSection } from "./styled-sidebar-section";

export const SidebarAdvancedTools = () => {
  const { getValues } = useFormContext<FormInputs>();

  return (
    <StyledSidebarSection>
      <Typography variant="h6">Advanced tools</Typography>
      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button
          onClick={() => {
            console.log(getValues());
          }}
          variant="outlined"
          fullWidth
        >
          Log form
        </Button>
      </Box>
    </StyledSidebarSection>
  );
};
