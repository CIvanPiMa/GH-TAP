import type { GameActor } from "../../types";

interface InitiativeOrderProps {
  actors: GameActor[];
  onConfirm: () => void;
}

const InitiativeOrder: React.FC<InitiativeOrderProps> = ({
  actors,
  onConfirm,
}) => {
  // Sort actors by initiative (lower goes first, undefined goes last)
  const sortedActors = [...actors].sort((a, b) => {
    if (a.initiative === undefined && b.initiative === undefined) return 0;
    if (a.initiative === undefined) return 1;
    if (b.initiative === undefined) return -1;
    return a.initiative - b.initiative;
  });

  const getActorTypeIcon = (actor: GameActor) => {
    return actor.type === "character" ? "🧙‍♂️" : "👹";
  };

  const getHealthBar = (actor: GameActor) => {
    if (actor.currentHealth === undefined || actor.maxHealth === undefined)
      return null;

    const percentage = (actor.currentHealth / actor.maxHealth) * 100;
    const barColor =
      percentage > 60
        ? "bg-green-500"
        : percentage > 30
          ? "bg-yellow-500"
          : "bg-red-500";

    return (
      <div className="w-full bg-white/20 rounded-full h-2 mt-1">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Initiative Order</h2>
        <p className="text-white/70">
          Actors will act in this order during the turn
        </p>
      </div>

      <div className="space-y-3">
        {sortedActors.map((actor, index) => (
          <div
            key={`${actor.type}-${actor.actor.id}`}
            className="card flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{getActorTypeIcon(actor)}</div>
              <div>
                <h3 className="text-lg font-semibold">{actor.actor.name}</h3>
                <p className="text-sm text-white/60 capitalize">{actor.type}</p>
                {getHealthBar(actor) && (
                  <div className="w-32">
                    {getHealthBar(actor)}
                    <div className="text-xs text-white/60 mt-1">
                      {actor.currentHealth}/{actor.maxHealth} HP
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-white/60">Turn Order</div>
                <div className="text-2xl font-bold text-gloom-brown">
                  #{index + 1}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Initiative</div>
                <div
                  className={`text-xl font-bold px-3 py-1 rounded ${
                    actor.initiative !== undefined
                      ? "bg-blue-500/20 border border-blue-500/40"
                      : "bg-red-500/20 border border-red-500/40"
                  }`}
                >
                  {actor.initiative ?? "—"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={onConfirm} className="btn-primary px-8 py-3">
          Start Turn
        </button>
      </div>
    </div>
  );
};

export default InitiativeOrder;
