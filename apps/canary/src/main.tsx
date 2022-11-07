import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import TalentKit from "@talentdigital/kit";

const kit = await TalentKit.create({
  tenant: "devtd2",
  testMode: false,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App kit={kit} />
  </React.StrictMode>
);
