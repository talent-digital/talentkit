import { Theme, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const PRIMARY_LIGHT = "#1B9D96";

const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
    primary: {
      main: "#116E6B",
      light: PRIMARY_LIGHT,
    },
  },
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
