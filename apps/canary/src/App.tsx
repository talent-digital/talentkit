import { useTdSdk } from "@talentkit/react";
import TdSdk from "@talentkit/sdk";
import { Episode } from "@talentkit/sdk/src/episode";
import { useEffect, useState } from "react";
import "./App.css";

const config = {
  realm: "talentdigital-devtd2",
  url: "https://devtd2.talentdigit.al/auth",
  clientId: "td-profile2",
};

function App({ kit }: { kit: TdSdk }) {
  // const kit = useTdSdk(config);
  const [episode, setEpisode] = useState<Episode | undefined>();

  const [done, setDone] = useState(false);

  useEffect(() => {
    if (kit) {
      kit.createEpisode("id").then(setEpisode);
    }
  }, [kit]);

  return (
    <div className="App">
      {episode ? (
        !done ? (
          <div>
            <p>What is 2 + 2?</p>
            <div>
              <button
                onClick={() => {
                  episode.test("basic_math", 0).then(() => setDone(true));
                }}
              >
                69
              </button>
              <button
                onClick={() => {
                  episode.test("basic_math", 1).then(() => setDone(true));
                }}
              >
                4
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              episode.end();
            }}
          >
            end episode
          </button>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
