import TalentKit from "@talentdigital/kit";
import { useEffect, useState } from "react";
import "./App.css";

function App({ kit }: { kit: TalentKit }) {
  useEffect(() => {
    if (!kit) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    kit.assets
      .get("s01_e01.toml")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const [badges, setBadges] = useState(Object.values(kit.badges));
  const [savegame, setSavegame] = useState(kit.savegame.load());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    kit.savegame.save({ foo: "bar", bar: 100, baz: new Date() });
  }, []);

  return (
    <div className="App">
      <h1>Hello {kit.profile.playerName}</h1>
      <pre>{JSON.stringify(savegame)}</pre>
      <div>
        {Object.values(kit.tests)
          .filter((test) => !test.result)
          .map((test) => (
            <button key={test.id} onClick={() => void test.pass()}>
              {test.id}
            </button>
          ))}
      </div>
      <div>
        {badges.map((badge) => (
          <button
            key={badge.id}
            style={{ background: badge.awarded ? "red" : "blue" }}
            onClick={() => {
              badge.award();
              setBadges(Object.values(kit.badges));
            }}
          >
            {badge.name.en}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
