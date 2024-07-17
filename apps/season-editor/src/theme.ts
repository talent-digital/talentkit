import { Theme, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          padding: theme.spacing(2),
        }),
      },
    },
  },
});

export default theme;
