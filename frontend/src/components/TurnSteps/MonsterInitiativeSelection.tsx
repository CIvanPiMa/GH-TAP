import { useState } from "react";
import type { Monster, MonsterInitiativeSymbol } from "../../client/types.gen";

interface MonsterInitiativeSelectionProps {
  monsters: Monster[];
  selectedSymbol?: MonsterInitiativeSymbol;
  onSymbolSelect: (symbol: MonsterInitiativeSymbol) => void;
  onRandomSelect: () => void;
  onConfirm: () => void;
}

const MonsterInitiativeSelection: React.FC<MonsterInitiativeSelectionProps> = ({
  monsters,
  selectedSymbol,
  onSymbolSelect,
  onRandomSelect,
  onConfirm,
}) => {
  const [showInitiatives, setShowInitiatives] = useState(false);

  const symbols: MonsterInitiativeSymbol[] = ["-", "o", "+"];

  const handleSymbolClick = (symbol: MonsterInitiativeSymbol) => {
    onSymbolSelect(symbol);
    setShowInitiatives(true);
  };

  const handleRandomClick = () => {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    onSymbolSelect(randomSymbol);
    setShowInitiatives(true);
    onRandomSelect();
  };

  const getMonsterInitiative = (
    monster: Monster,
    symbol: MonsterInitiativeSymbol,
  ) => {
    return monster.initiatives[symbol] || 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Monster Initiative</h2>
        <p className="text-white/70">
          Choose an initiative symbol for all monsters
        </p>
      </div>

      {/* Symbol Selection */}
      <div className="flex justify-center gap-6">
        {symbols.map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleSymbolClick(symbol)}
            className={`w-20 h-20 text-3xl font-bold rounded-lg border-2 transition-all ${
              selectedSymbol === symbol
                ? "border-gloom-brown bg-gloom-brown/20 text-gloom-brown"
                : "border-white/40 bg-white/10 hover:border-white/60 hover:bg-white/20"
            }`}
          >
            {symbol === "o" ? "○" : symbol}
          </button>
        ))}
      </div>

      {/* Random Selection Button */}
      <div className="flex justify-center">
        <button onClick={handleRandomClick} className="btn-secondary px-6 py-2">
          🎲 Random Selection
        </button>
      </div>

      {/* Show Monster Initiatives */}
      {showInitiatives && selectedSymbol && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Monster Initiatives
          </h3>

          <div className="grid gap-3 mb-6">
            {monsters.map((monster) => {
              const initiative = getMonsterInitiative(monster, selectedSymbol);
              return (
                <div
                  key={monster.id}
                  className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/20"
                >
                  <span className="font-medium">{monster.name}</span>
                  <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded text-sm">
                    Initiative: {initiative}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button onClick={onConfirm} className="btn-primary">
              Confirm Monster Initiatives
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonsterInitiativeSelection;
