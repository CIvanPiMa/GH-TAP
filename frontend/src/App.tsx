import "./App.css";
import { ApiStatusDisplay, TurnForm, TurnsList } from "./components";
import { useApiStatus, useTurns } from "./hooks";

function App() {
  const apiStatus = useApiStatus();
  const { turns, createTurn, deleteTurn, clearAllTurns } = useTurns();

  return (
    <div className="app">
      <ApiStatusDisplay status={apiStatus} />

      <div className="container">
        <TurnForm onSubmit={createTurn} />
        <TurnsList
          turns={turns}
          onDeleteTurn={deleteTurn}
          onClearAll={clearAllTurns}
        />
      </div>
    </div>
  );
}

export default App;
