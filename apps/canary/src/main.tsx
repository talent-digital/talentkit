import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import TalentKit from "@talentdigital/kit";
import season from "./season.yaml";
import { SeasonDefinition } from "@talentdigital/season";

const seasonDefinition = season as SeasonDefinition;

const kit = await TalentKit.create({
  tenant: "devtd2",
  // seasonDefinition,
  // localBackendURL: "http://localhost:8081",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App kit={kit} />
  </React.StrictMode>
);
