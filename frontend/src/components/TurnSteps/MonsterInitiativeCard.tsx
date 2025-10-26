import type { Monster, MonsterInitiativeSymbol } from "../../client/types.gen";

interface MonsterInitiativeCardProps {
  monster: Monster;
  selectedSymbol?: MonsterInitiativeSymbol;
  onSymbolSelect: (symbol: MonsterInitiativeSymbol) => void;
}

const MonsterInitiativeCard: React.FC<MonsterInitiativeCardProps> = ({
  monster,
  selectedSymbol,
  onSymbolSelect,
}) => {
  const symbols: MonsterInitiativeSymbol[] = ["-", "o", "+"];

  const handleSymbolClick = (symbol: MonsterInitiativeSymbol) => {
    onSymbolSelect(symbol);
  };

  const handleRandomClick = () => {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    onSymbolSelect(randomSymbol);
  };

  const getMonsterInitiative = (symbol: MonsterInitiativeSymbol) => {
    return monster.initiatives[symbol] || 0;
  };

  const currentInitiative = selectedSymbol
    ? getMonsterInitiative(selectedSymbol)
    : undefined;

  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/20">
      {/* Monster Initiative Selection Buttons */}
      <div className="flex items-center gap-2">
        {symbols.map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleSymbolClick(symbol)}
            className={`w-8 h-8 text-sm font-bold rounded border-2 transition-all ${
              selectedSymbol === symbol
                ? "border-gloom-brown bg-gloom-brown/20 text-gloom-brown"
                : "border-white/40 bg-white/10 hover:border-white/60 hover:bg-white/20"
            }`}
          >
            {symbol === "o" ? "○" : symbol}
          </button>
        ))}

        {/* Random Selection Button */}
        <button
          onClick={handleRandomClick}
          className="w-8 h-8 text-sm rounded border-2 border-white/40 bg-white/10 hover:border-white/60 hover:bg-white/20 transition-all"
        >
          🎲
        </button>
      </div>

      {/* Monster Name and Initiative */}
      <div className="flex items-center gap-4">
        <span className="font-medium">{monster.name}</span>
        {currentInitiative !== undefined && (
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-sm">
            Initiative: {currentInitiative}
          </span>
        )}
      </div>
    </div>
  );
};

export default MonsterInitiativeCard;
