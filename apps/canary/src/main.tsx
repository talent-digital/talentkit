import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import season from "./season.yml";

const seasonDefinition = season as SeasonDefinition;

import TalentKit from "@talentdigital/kit";
import { SeasonDefinition } from "@talentdigital/season";

const kit = await TalentKit.create({
  tenant: "devtd2",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App kit={kit} />
  </React.StrictMode>
);
