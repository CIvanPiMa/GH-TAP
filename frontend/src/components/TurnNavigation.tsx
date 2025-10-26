interface TurnNavigationProps {
  canGoNext: boolean;
  canGoPrev: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  currentTurn: number;
}

const TurnNavigation: React.FC<TurnNavigationProps> = ({
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  currentTurn,
}) => {
  return (
    <div className="card border-gloom-brown/30 bg-gloom-brown/5">
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`flex items-center space-x-2 px-3 py-2 rounded text-sm transition-all ${
            canGoPrev
              ? "bg-white/10 hover:bg-white/20 text-white"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <span>←</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Turn Counter */}
        <h3 className="text-lg font-bold text-gloom-brown">
          Turn {currentTurn}
        </h3>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center space-x-2 px-3 py-2 rounded text-sm transition-all ${
            canGoNext
              ? "bg-gloom-brown hover:bg-gloom-brown/80 text-white"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default TurnNavigation;
