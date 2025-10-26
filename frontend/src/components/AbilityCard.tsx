import type { Ability, CardId, CardLevel } from "../client/types.gen";

interface AbilityCardProps {
  cardId: CardId;
  ability: {
    [key in CardLevel]?: Ability;
  };
  selectedLevel: CardLevel;
  onLevelChange: (cardId: CardId, level: CardLevel) => void;
}

const AbilityCard: React.FC<AbilityCardProps> = ({
  cardId,
  ability,
  selectedLevel,
  onLevelChange,
}) => {
  const level1 = ability["1"];
  const level2 = ability["2"];

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-center mb-2">
          Card {cardId}
        </h3>
      </div>

      {level1 && (
        <div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all mb-3 ${
            selectedLevel === "1"
              ? "border-gloom-brown bg-gloom-brown/20"
              : "border-white/20 bg-white/5 hover:border-white/40"
          }`}
          onClick={() => onLevelChange(cardId, "1")}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">Level 1</span>
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-sm">
              Initiative: {level1.a.initiative}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded">
              <div className="text-sm text-white/70 mb-1">Side A</div>
              <div className="font-medium">{level1.a.name}</div>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <div className="text-sm text-white/70 mb-1">Side B</div>
              <div className="font-medium">{level1.b.name}</div>
            </div>
          </div>
        </div>
      )}

      {level2 && (
        <div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedLevel === "2"
              ? "border-gloom-brown bg-gloom-brown/20"
              : "border-white/20 bg-white/5 hover:border-white/40"
          }`}
          onClick={() => onLevelChange(cardId, "2")}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">Level 2</span>
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-sm">
              Initiative: {level2.a.initiative}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded">
              <div className="text-sm text-white/70 mb-1">Side A</div>
              <div className="font-medium">{level2.a.name}</div>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <div className="text-sm text-white/70 mb-1">Side B</div>
              <div className="font-medium">{level2.b.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
