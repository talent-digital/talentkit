import TalentKit from "@talentdigital/kit";
import "./App.css";

function App({ kit }: { kit: TalentKit }) {
  const onClick = () => {
    kit.test.testId1.pass();
  };

  return (
    <div className="App">
      <button onClick={onClick}>Pass</button>
    </div>
  );
}

export default App;
