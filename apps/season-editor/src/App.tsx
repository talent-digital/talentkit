import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./theme";
import { AppContainer } from "./components/app-container";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer />
    </ThemeProvider>
  );
}

export default App;
