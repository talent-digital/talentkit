import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// const seasonDefinition = season as SeasonDefinition;

export interface FormatConfiguration {
  backgroundImage: string;
  introText: string;
  questions: any[];
}

// const kit = await TalentKit.create<FormatConfiguration>({
//   tenant: "devtd2",
//   // seasonDefinition,
//   // localBackendURL: "http://localhost:8081",
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
