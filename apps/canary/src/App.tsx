import { useKit } from "@talentdigital/react";
import "./App.css";
import { FormatConfiguration } from "./main";

const Child = () => {
  const kit = useKit<FormatConfiguration>();

  return <p>{kit?.formatConfiguration?.introText}</p>;
};

const Image = () => {
  const kit = useKit<FormatConfiguration>();

  const imageUrl = kit?.formatConfiguration?.backgroundImage
    ? kit.assets.getUrl(kit.formatConfiguration.backgroundImage)
    : "";

  return <img src={imageUrl} />;
};

function App() {
  const kit = useKit<FormatConfiguration>({
    tenant: "devtd2",
  });

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
