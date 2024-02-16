import { useKit } from "@talentdigital/react";
import "./App.css";
import { FormatConfiguration } from "./main";
import { useEffect } from "react";

function App() {
  const kit = useKit<FormatConfiguration>({
    tenant: "devtd2",
    savegameKeyId: "canaryapp",
    // localBackendURL: "http://localhost:8081",
    // logRocketId: "hdghyj/canary-kgdjy",
  });

  useEffect(() => {
    // Set default season config for testing if not present in the url
    const hasSid = new URLSearchParams(window.location.search).get("sid");
    if (!hasSid) {
      window.location.search =
        "?sid=talent-digital-canary-season&eid=2&redirectUrl=https://cockpit-talentdigital.netlify.app";
    }
  }, []);

  return (
    <div className="App">
      {kit ? (
        <>
          <p>Hello {kit.profile.playerName}</p>
          <p>Episode intro text: {kit.formatConfiguration?.introText}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={() => {
          const savegame = kit?.savegame.load() as Record<string, unknown>;
          console.log(savegame);
          kit?.savegame.save({ ...savegame, a: "dadas" });
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          void kit?.events.end();
        }}
      >
        End
      </button>
      <button
        onClick={() => {
          kit?.events.pause();
        }}
      >
        Pause
      </button>
    </div>
  );
}

export default App;
