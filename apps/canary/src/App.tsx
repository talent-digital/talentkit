import TalentKit from "@talentdigital/kit";
import "./App.css";

function App({ kit }: { kit: TalentKit }) {
  return (
    <div className="App">
      {Object.values(kit.test)
        .filter((test) => !test.result)
        .map((test) => (
          <button key={test.id} onClick={() => test.pass()}>
            {test.id}
          </button>
        ))}
    </div>
  );
}

export default App;
