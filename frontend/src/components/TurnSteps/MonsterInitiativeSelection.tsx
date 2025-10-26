import type { Monster, MonsterInitiativeSymbol } from "../../client/types.gen";
import MonsterInitiativeCard from "./MonsterInitiativeCard";

interface MonsterInitiativeSelectionProps {
  monsters: Monster[];
  selectedSymbols: { [monsterId: string]: MonsterInitiativeSymbol };
  onMonsterSymbolSelect: (
    monsterId: string,
    symbol: MonsterInitiativeSymbol,
  ) => void;
}

const MonsterInitiativeSelection: React.FC<MonsterInitiativeSelectionProps> = ({
  monsters,
  selectedSymbols,
  onMonsterSymbolSelect,
}) => {
  const handleMonsterSymbolSelect = (
    monsterId: string,
    symbol: MonsterInitiativeSymbol,
  ) => {
    onMonsterSymbolSelect(monsterId, symbol);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Monster Initiatives</h2>
        <p className="text-white/70">
          Choose initiative symbols for each monster individually
        </p>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Monster Initiatives
        </h3>

        <div className="grid gap-3">
          {monsters.map((monster) => (
            <MonsterInitiativeCard
              key={monster.id}
              monster={monster}
              selectedSymbol={selectedSymbols[monster.id]}
              onSymbolSelect={(symbol) =>
                handleMonsterSymbolSelect(monster.id, symbol)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonsterInitiativeSelection;
