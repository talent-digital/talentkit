import { useKit } from "@talentdigital/react";
import "./App.css";
import { FormatConfiguration } from "./main";
import { useEffect, useState } from "react";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRandomNumber] = useState(0);
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

  const handleChangeNameToRandom = () => {
    const fn = async () => {
      await kit?.profile.update({
        ...kit.profile.data,
        avatarName: `Random name ${Math.floor(Math.random() * 100)}`,
      });
    };

    fn().catch(console.error);
  };

  return (
    <div className="App">
      <h2>Basic information</h2>
      {kit ? (
        <>
          <p>Hello {kit.profile.data.avatarName}</p>
          <p>Episode intro text: {kit.formatConfiguration?.introText}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Action buttons</h2>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={() => setRandomNumber(Math.random())}>Rerender</button>
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
        <button onClick={handleChangeNameToRandom}>
          Change name to random
        </button>
      </div>
      <h2>Badges</h2>
      <div>
        {Object.entries(kit?.badges ?? {}).map(([key, value]) => (
          <div key={key}>
            <img
              src={kit?.assets.getUrl(value.image)}
              alt={value.name.en}
              style={{ opacity: value.awarded ? 1 : 0.5 }}
            />
            <p>{value.name.en}</p>
            <button
              onClick={() => {
                value.award();
              }}
            >
              Award
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
