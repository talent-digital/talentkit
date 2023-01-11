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
      <Child />
      <Image />
    </div>
  );
}

export default App;
