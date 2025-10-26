import type { GameActor } from "../../types";
import Actor from "../Actor";

interface TurnExecutionProps {
  actors: GameActor[];
  currentTurn: number;
  onFinishTurn: () => void;
}

const TurnExecution: React.FC<TurnExecutionProps> = ({
  actors,
  currentTurn,
  onFinishTurn,
}) => {
  // Sort actors by initiative for display
  const sortedActors = [...actors].sort((a, b) => {
    if (a.initiative === undefined && b.initiative === undefined) return 0;
    if (a.initiative === undefined) return 1;
    if (b.initiative === undefined) return -1;
    return a.initiative - b.initiative;
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Turn {currentTurn} - Execute Actions
        </h2>
        <p className="text-white/70">
          Actors perform their actions in initiative order. Use this screen to
          track the turn progress.
        </p>
      </div>

      {/* Actor Components in Initiative Order */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gloom-brown-light mb-3">
          Actors (Initiative Order)
        </h3>

        {sortedActors.map((actor, index) => (
          <div key={`${actor.type}-${actor.actor.id}`} className="relative">
            {/* Turn Order Badge */}
            <div className="absolute -top-2 -left-2 z-10">
              <div className="bg-gloom-brown text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-white">
                {index + 1}
              </div>
            </div>

            <Actor
              actor={actor.actor}
              type={actor.type}
              maxHealth={actor.maxHealth}
              initiative={actor.initiative}
            />
          </div>
        ))}
      </div>

      {/* Game Instructions */}
      <div className="card bg-blue-500/10 border-blue-500/30">
        <h3 className="text-lg font-semibold mb-2 text-blue-300">
          📋 Turn Instructions
        </h3>
        <ul className="text-sm text-white/80 space-y-1">
          <li>• Execute actions in initiative order</li>
          <li>• Character use their selected ability cards</li>
          <li>• Monsters follow their ability cards and behaviors</li>
          <li>• Track damage, conditions, and other effects</li>
          <li>
            • Click "Finish Turn" when all actors have completed their actions
          </li>
        </ul>
      </div>

      {/* Finish Turn Button */}
      <div className="text-center">
        <button
          onClick={onFinishTurn}
          className="btn-primary px-8 py-3 text-lg"
        >
          Finish Turn
        </button>
      </div>
    </div>
  );
};

export default TurnExecution;
