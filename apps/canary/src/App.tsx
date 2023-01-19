import { useKit } from "@talentdigital/react";
import "./App.css";
import { EpisodeConfiguration } from "./main";

const Child = () => {
  const kit = useKit<EpisodeConfiguration>();

  return <p>{kit?.episodeConfiguration?.introText}</p>;
};

const Image = () => {
  const kit = useKit<EpisodeConfiguration>();

  const imageUrl = kit?.episodeConfiguration?.backgroundImage
    ? kit.assets.getUrl(kit.episodeConfiguration.backgroundImage)
    : "";

  return <img src={imageUrl} />;
};

function App() {
  const kit = useKit<EpisodeConfiguration>({ tenant: "devtd2" });

  return (
    <div className="App">
      {kit ? <p>Hello {kit.profile.playerName}</p> : <p>Loading...</p>}
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
