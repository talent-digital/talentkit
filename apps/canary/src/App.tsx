import TdSdk from "@talentdigital/sdk";
import { useState } from "react";
import "./App.css";

function App({ kit }: { kit: TdSdk }) {
  const episode = kit.episode;
  const storage = kit.storage;
  const [done, setDone] = useState(false);

  return (
    <div className="App">
      {episode ? (
        !done ? (
          <div>
            <p>
              Hey <b>{storage?.getUserProfile()?.playerName}</b>&nbsp;from&nbsp;
              <b>{storage?.getUserProfile()?.companyName}</b>
            </p>
            <br />
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
