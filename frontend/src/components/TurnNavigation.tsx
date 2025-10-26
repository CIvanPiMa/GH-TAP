interface TurnNavigationProps {
  currentStep: 1 | 2 | 3 | 4;
  canGoNext: boolean;
  canGoPrev: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  currentTurn: number;
}

const TurnNavigation: React.FC<TurnNavigationProps> = ({
  currentStep,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  currentTurn,
}) => {
  const steps = [
    { step: 1, title: "Character Cards", icon: "🃏" },
    { step: 2, title: "Monster Initiative", icon: "👹" },
    { step: 4, title: "Execute Turn", icon: "⚔️" },
  ];

  return (
    <div className="card border-gloom-brown/30 bg-gloom-brown/5">
      {/* Turn Counter */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gloom-brown">
          Turn {currentTurn}
        </h3>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center space-x-2 mb-4 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.step} className="flex items-center shrink-0">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                step.step === currentStep
                  ? "border-gloom-brown bg-gloom-brown text-white"
                  : step.step < currentStep
                    ? "border-green-500 bg-green-500/20 text-green-300"
                    : "border-white/30 bg-white/5 text-white/60"
              }`}
            >
              <span className="text-sm">{step.icon}</span>
            </div>
            <div className="ml-2 text-xs hidden md:block">
              <div
                className={`font-medium ${
                  step.step === currentStep
                    ? "text-gloom-brown"
                    : step.step < currentStep
                      ? "text-green-300"
                      : "text-white/60"
                }`}
              >
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-4 ${
                  step.step < currentStep ? "bg-green-500" : "bg-white/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
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

        <div className="text-xs text-white/60">
          Step {currentStep === 1 ? 1 : currentStep === 2 ? 2 : 3} of{" "}
          {steps.length}
        </div>

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
