import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./theme";
import { SeasonEditor } from "./pages/season-editor";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SeasonEditor />
    </ThemeProvider>
  );
}

export default App;
