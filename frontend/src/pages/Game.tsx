import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, STORAGE_KEYS } from "../utils/localStorage";
import type { GameData } from "../types";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [currentGame, setCurrentGame] = useState<GameData | null>(null);

  // Load current game from localStorage on component mount
  useEffect(() => {
    const gameData = getFromLocalStorage<GameData | null>(
      STORAGE_KEYS.CURRENT_GAME,
      null,
    );
    setCurrentGame(gameData);
  }, []);

  if (!currentGame) {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <div className="card">
          <h2 className="text-2xl mb-4">No Game Active!</h2>
          <p className="text-white/70 mb-6">
            Please start a new scenario or select one from your recent games.
          </p>
          <button
            onClick={() => navigate("/new-scenario")}
            className="btn-primary"
          >
            Go to New Scenario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl mb-4">Current Scenario</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <span className="px-4 py-2 bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg font-semibold">
            #{currentGame.scenario.id}: {currentGame.scenario.name} (lvl:
            {currentGame.scenario.level})
          </span>
          <span className="px-4 py-2 bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg font-semibold">
            Difficulty: {currentGame.difficulty}
          </span>
          <span className="px-4 py-2 bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg font-semibold">
            Character: {currentGame.character.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="card"></div>
        </div>

        <div className="lg:col-span-1">
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
