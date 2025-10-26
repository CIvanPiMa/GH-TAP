import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
  STORAGE_KEYS,
} from "../utils/localStorage";
import type { GameData } from "../types";

interface ActiveGamesListProps {
  title?: string;
  emptyMessage?: string;
}

const ActiveGamesList: React.FC<ActiveGamesListProps> = ({
  title = "Active Games",
  emptyMessage = "No active games found. Start your first adventure!",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [games, setGames] = useState<GameData[]>([]);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);

  // Load games from localStorage on component mount
  useEffect(() => {
    const savedGames = getFromLocalStorage<GameData[]>(STORAGE_KEYS.GAMES, []);
    // Sort by creation date, most recent first
    const sortedGames = savedGames.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setGames(sortedGames);
  }, []);

  const handleDeleteGame = (gameId: string) => {
    setGameToDelete(gameId);
  };

  const confirmDelete = () => {
    if (gameToDelete) {
      const updatedGames = games.filter((game) => game.gameId !== gameToDelete);
      setGames(updatedGames);
      setToLocalStorage(STORAGE_KEYS.GAMES, updatedGames);

      // Check if the deleted game is the current game and remove it from localStorage
      const currentGame = getFromLocalStorage<GameData | null>(
        STORAGE_KEYS.CURRENT_GAME,
        null,
      );
      if (currentGame && currentGame.gameId === gameToDelete) {
        removeFromLocalStorage(STORAGE_KEYS.CURRENT_GAME);
      }

      setGameToDelete(null);
    }
  };

  const cancelDelete = () => {
    setGameToDelete(null);
  };

  const handleGameClick = (game: GameData) => {
    // Set the clicked game as the current game
    setToLocalStorage(STORAGE_KEYS.CURRENT_GAME, game);

    // If we're already on the game page, refresh it; otherwise navigate
    if (location.pathname === "/game") {
      window.location.reload();
    } else {
      navigate("/game");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <>
      <div className="card text-left">
        <h2 className="text-2xl mb-4">{title}</h2>
        {games.length === 0 ? (
          <p className="text-white/70">{emptyMessage}</p>
        ) : (
          <div className="space-y-4">
            {games.map((game) => (
              <div
                key={game.gameId}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => handleGameClick(game)}
                      className="text-lg font-medium text-white hover:text-gloom-brown-light transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                    >
                      Scenario {game.scenario.id}: {game.scenario.name}
                    </button>
                    <span className="px-2 py-1 text-xs bg-gloom-brown/30 text-gloom-brown-light rounded-full">
                      Level {game.scenario.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <span>Character: {game.character.name}</span>
                    <span>Difficulty: {game.difficulty}</span>
                    <span>Created: {formatDate(game.createdAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteGame(game.gameId)}
                  className="ml-4 p-2 text-white/50 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                  title="Delete game"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {gameToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-white/20">
            <h3 className="text-xl font-medium text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-white/70 mb-6">
              Are you sure you want to delete this game?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-white/10 text-white/70 border border-white/20 rounded-lg hover:text-white hover:border-white/40 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveGamesList;
