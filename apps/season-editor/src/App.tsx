import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./theme";
import { AppContainer } from "./components";
import { AppContainer2 } from "./components/app-container/app-container-2";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppContainer /> */}
      <AppContainer2 />
    </ThemeProvider>
  );
}

export default App;
