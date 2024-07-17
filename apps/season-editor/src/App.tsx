import { Toaster } from "react-hot-toast";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";

import theme from "./theme";
import { SeasonEditor } from "./pages/season-editor";
import { ConfirmDialogContextProvider } from "./pages/context";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfirmDialogContextProvider>
        <SeasonEditor />
      </ConfirmDialogContextProvider>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore Library typing error, Toaster works fine, try to remove after package updates */}
      <Toaster position="bottom-right" toastOptions={getToastOptions(theme)} />
    </ThemeProvider>
  );
}

const getToastOptions = (theme: Theme) => ({
  success: {
    iconTheme: {
      primary: "#fff",
      secondary: theme.palette.success.main,
    },
    style: {
      background: theme.palette.success.main,
      color: theme.palette.success.contrastText,
    },
  },
  error: {
    iconTheme: {
      primary: "#fff",
      secondary: theme.palette.error.main,
    },
    style: {
      background: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  },
});

export default App;
