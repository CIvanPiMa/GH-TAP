import { useState, useEffect } from "react";
import type { Character, CardId } from "../../client/types.gen";
import type { CharacterAbilityCard } from "../../types";

interface CharacterCardSelectionProps {
  character: Character;
  characterCards: CharacterAbilityCard[];
  selectedCards: CardId[];
  selectedInitiative?: number;
  isLongRest: boolean;
  onCardSelect: (cardId: CardId) => void;
  onLongRest: () => void;
  onInitiativeSelect: (initiative: number | undefined) => void;
}

const CharacterCardSelection: React.FC<CharacterCardSelectionProps> = ({
  character,
  characterCards,
  selectedCards,
  selectedInitiative: parentSelectedInitiative,
  isLongRest,
  onCardSelect,
  onLongRest,
  onInitiativeSelect,
}) => {
  const [selectedInitiative, setSelectedInitiative] = useState<
    number | undefined
  >();
  const [showInitiativeSelection, setShowInitiativeSelection] = useState(false);

  // Get available initiatives from selected cards
  const getAvailableInitiatives = (): number[] => {
    if (isLongRest) return [99];

    const initiatives: number[] = [];
    selectedCards.forEach((cardId) => {
      const card = characterCards.find((c) => c.cardId === cardId);
      if (card) {
        const ability = character.abilities[cardId]?.[card.level];
        if (ability) {
          // Only show initiative for side A if side A hasn't been used, or side B if side A has been used
          if (!card.sideAUsed) {
            initiatives.push(ability.a.initiative);
          } else if (card.sideAUsed && !card.sideBUsed) {
            initiatives.push(ability.b.initiative);
          }
        }
      }
    });
    return [...new Set(initiatives)]; // Remove duplicates
  };

  const handleCardClick = (cardId: CardId) => {
    if (isLongRest) return; // Can't select cards during long rest

    const card = characterCards.find((c) => c.cardId === cardId);
    if (card && card.sideAUsed && card.sideBUsed) return; // Can't select fully used cards

    onCardSelect(cardId);
  };

  const handleLongRestClick = () => {
    onLongRest();
    setSelectedInitiative(99);
    onInitiativeSelect(99);
    setShowInitiativeSelection(true);
  };

  const handleInitiativeClick = (initiative: number) => {
    setSelectedInitiative(initiative);
    onInitiativeSelect(initiative);
  };

  // Sync with parent's selected initiative
  useEffect(() => {
    if (parentSelectedInitiative !== undefined) {
      setSelectedInitiative(parentSelectedInitiative);
    }
  }, [parentSelectedInitiative]);

  // Check if we should show initiative selection
  useEffect(() => {
    if (isLongRest || selectedCards.length === 2) {
      setShowInitiativeSelection(true);
    } else {
      setShowInitiativeSelection(false);
      // Only clear initiative if there are no selected cards and it's not long rest
      // This prevents clearing when navigating back to step 1
      if (
        selectedCards.length === 0 &&
        !isLongRest &&
        !parentSelectedInitiative
      ) {
        setSelectedInitiative(undefined);
        onInitiativeSelect(undefined);
      }
    }
  }, [
    isLongRest,
    selectedCards.length,
    onInitiativeSelect,
    parentSelectedInitiative,
  ]);

  const availableInitiatives = getAvailableInitiatives();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Character Cards</h2>
      </div>

      {/* Character Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(character.abilities).map(([cardId, cardAbilities]) => {
          const card = characterCards.find(
            (c) => c.cardId === (cardId as CardId),
          );
          if (!card) return null;

          // Show all cards except permanently discarded ones
          // Cards with both sides used should be shown as disabled, not hidden
          const isCardFullyUsed = card.sideAUsed && card.sideBUsed;
          if (card.discarded && !isCardFullyUsed) return null;

          const isSelected = selectedCards.includes(cardId as CardId);
          const isDisabled =
            isLongRest ||
            (selectedCards.length === 2 && !isSelected) ||
            isCardFullyUsed;

          return (
            <div
              key={cardId}
              className={`card transition-all border-2 p-2 ${
                isSelected
                  ? "text-gloom-brown cursor-pointer"
                  : isCardFullyUsed
                    ? "opacity-50 cursor-not-allowed border-red-500/40 bg-red-500/10"
                    : isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "text-gloom-white cursor-pointer"
              }`}
              onClick={() => !isDisabled && handleCardClick(cardId as CardId)}
            >
              <div className="text-center mb-2">
                <h3 className="text-sm font-semibold">Card {cardId}</h3>
                <span className="text-xs text-white/60">
                  Level {card.level}
                </span>
              </div>

              {cardAbilities[card.level] && (
                <div className="space-y-1">
                  {/* Side A */}
                  <div
                    className={`p-2 rounded text-center ${
                      card.sideAUsed
                        ? "bg-red-500/20 border border-red-500/40"
                        : "bg-blue-500/20 border border-blue-500/40"
                    }`}
                  >
                    <div className="text-xs text-white/70 mb-1">
                      Side A {card.sideAUsed && "(Used)"}
                    </div>
                    <div className="font-medium text-xs">
                      {cardAbilities[card.level]!.a.name}
                    </div>
                    <div className="text-xs text-white/60">
                      Initiative: {cardAbilities[card.level]!.a.initiative}
                    </div>
                  </div>

                  {/* Side B */}
                  <div
                    className={`p-2 rounded text-center ${
                      card.sideBUsed
                        ? "bg-red-500/20 border border-red-500/40"
                        : "bg-blue-500/20 border border-blue-500/40"
                    }`}
                  >
                    <div className="text-xs text-white/70 mb-1">
                      Side B {card.sideBUsed && "(Used)"}
                    </div>
                    <div className="font-medium text-xs">
                      {cardAbilities[card.level]!.b.name}
                    </div>
                    <div className="text-xs text-white/60">
                      Initiative: {cardAbilities[card.level]!.b.initiative}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Long Rest Card */}
      <div
        className={`card cursor-pointer transition-all border-2 ${
          isLongRest
            ? "border-gloom-brown bg-gloom-brown-alpha-20 hover:border-gloom-brown-light hover:bg-gloom-brown-alpha-10"
            : selectedCards.length > 0
              ? "opacity-50 cursor-not-allowed border-white/20"
              : "border-purple-500/40 bg-purple-500/10 hover:border-purple-500/60 hover:bg-purple-500/20"
        }`}
        onClick={() => {
          if (isLongRest) {
            // Deselect Long Rest
            setSelectedInitiative(undefined);
            setShowInitiativeSelection(false);
            onLongRest(); // This will toggle off the long rest state
          } else if (selectedCards.length === 0) {
            // Select Long Rest (only if no cards are selected)
            handleLongRestClick();
          }
        }}
      >
        <div className="text-center mb-3">
          <h3
            className={`text-lg font-semibold ${
              isLongRest ? "text-gloom-brown" : "text-purple-300"
            }`}
          >
            Long Rest
          </h3>
          <span className="text-sm text-white/60">Initiative: 99</span>
        </div>
      </div>

      {/* Initiative Selection */}
      {showInitiativeSelection && availableInitiatives.length > 0 && (
        <div className="card">
          {!isLongRest && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Select Initiative
              </h3>
              <div className="flex justify-center gap-4 mb-6">
                {availableInitiatives.map((initiative) => (
                  <button
                    key={initiative}
                    onClick={() => handleInitiativeClick(initiative)}
                    className={`px-4 py-2 rounded transition-all border-2 ${
                      selectedInitiative === initiative
                        ? "bg-gloom-brown border-gloom-brown text-white"
                        : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 text-white"
                    }`}
                  >
                    {initiative}
                  </button>
                ))}
              </div>
            </>
          )}

          {isLongRest && (
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Long Rest Selected</h3>
              <p className="text-purple-300">
                Initiative automatically set to 99
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterCardSelection;
