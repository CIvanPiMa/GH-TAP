import React from "react";
import { ApiStatusDisplay, TurnForm, TurnsList } from "../components";
import { useApiStatus, useTurns } from "../hooks";

const Scenario: React.FC = () => {
  const apiStatus = useApiStatus();
  const { turns, createTurn, deleteTurn, clearAllTurns } = useTurns();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl mb-4 text-gloom-brown font-pirata">
          Current Scenario
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <span className="px-4 py-2 bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg text-gloom-brown font-semibold">
            #1
          </span>
          <span className="px-4 py-2 bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg text-gloom-brown font-semibold">
            Black Barrow
          </span>
          <span className="px-4 py-2 bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg text-gloom-brown font-semibold">
            Normal Difficulty
          </span>
        </div>
      </div>

      <ApiStatusDisplay status={apiStatus} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl mb-6 text-gloom-brown font-pirata">
              Turn Management
            </h2>
            <TurnForm onSubmit={createTurn} />
            <TurnsList
              turns={turns}
              onDeleteTurn={deleteTurn}
              onClearAll={clearAllTurns}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-2xl mb-6 text-gloom-brown font-pirata">
              Scenario Controls
            </h2>
            <div className="flex flex-col gap-4">
              <button className="px-6 py-3 bg-gray-200 text-gloom-brown border border-gloom-brown rounded-lg hover:bg-gloom-brown hover:text-white transition-all">
                Pause Scenario
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gloom-brown border border-gloom-brown rounded-lg hover:bg-gloom-brown hover:text-white transition-all">
                Save Progress
              </button>
              <button className="px-6 py-3 bg-gray-200 text-red-400 border border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition-all">
                End Scenario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenario;
