import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import TdSdk from "@talentkit/sdk";

const config = {
  realm: "talentdigital-devtd2",
  url: "https://devtd2.talentdigit.al/auth",
  clientId: "td-profile2",
};
const kit = await TdSdk.create(config);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App kit={kit} />
  </React.StrictMode>
);
