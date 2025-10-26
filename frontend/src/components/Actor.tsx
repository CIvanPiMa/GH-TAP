import type { Character, Monster } from "../client/types.gen";
import { getCharacterIconPath } from "../utils/assetsGetter";

export interface ActorProps {
  actor: Character | Monster;
  type: "character" | "monster";
  maxHealth?: number;
  initiative?: number;
}

const Actor: React.FC<ActorProps> = ({
  actor,
  type,
  maxHealth,
  initiative,
}) => {
  const isCharacter = type === "character";

  const borderColorClass = isCharacter
    ? "border-gloom-brown"
    : "border-gloom-white";

  const textColorClass = isCharacter
    ? "text-gloom-brown-light"
    : "text-gloom-white";

  return (
    <div
      className={`
      p-4 rounded-lg border ${borderColorClass} bg-black/30
    `}
    >
      {/* Actor Info Layout */}
      <div className="flex justify-between items-start mb-3">
        {/* Actor Name and Pills */}
        <div className="flex flex-col gap-2">
          {/* Actor Name */}
          <h3 className={`text-lg font-bold ${textColorClass}`}>
            {actor.name}
          </h3>
          {/* Health and Initiative Pills */}
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-red-500/30 text-white text-xs font-bold rounded-full">
              health: {maxHealth}
            </span>
            <span className="px-2 py-1 bg-blue-500/30 text-white text-xs font-bold rounded-full">
              initiative: {initiative}
            </span>
          </div>
        </div>

        {/* Character Icon (only for characters) - spans both rows */}
        {isCharacter && (
          <div className="shrink-0">
            <img
              src={getCharacterIconPath(actor.id)}
              alt={`${actor.name} icon`}
              className="w-16 h-16 rounded-lg border border-gloom-brown/50 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Actor;
