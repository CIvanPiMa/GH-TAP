import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFromLocalStorage,
  setToLocalStorage,
  STORAGE_KEYS,
} from "../utils/localStorage";
import {
  ActiveGamesList,
  ScenarioInfo,
  TurnNavigation,
  CharacterCardSelection,
  MonsterInitiativeSelection,
  TurnExecution,
} from "../components";
import { useCharacter, useScenario, useMonstersByIds } from "../hooks";
import type {
  GameData,
  GameActor,
  ExtendedGameState,
  CharacterAbilityCard,
  TurnState,
} from "../types";
import type {
  CardId,
  MonsterInitiativeSymbol,
  Monster,
} from "../client/types.gen";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [currentGame, setCurrentGame] = useState<GameData | null>(null);
  const [gameState, setGameState] = useState<ExtendedGameState | null>(null);
  // Manage which tab is active - MOVED TO TOP to prevent hook order issues
  const [activeTab, setActiveTab] = useState<"rules" | "turns">("rules");

  // Fetch character and scenario data based on current game
  const { character, loading: characterLoading } = useCharacter(
    currentGame?.character.id || null,
  );
  const { scenario, loading: scenarioLoading } = useScenario(
    currentGame?.scenario.id || null,
  );

  // Fetch monsters based on scenario data
  const { monsters, loading: monstersLoading } = useMonstersByIds(
    scenario?.monsters_id || [],
  );

  // Load current game from localStorage on component mount
  useEffect(() => {
    const gameData = getFromLocalStorage<GameData | null>(
      STORAGE_KEYS.CURRENT_GAME,
      null,
    );
    setCurrentGame(gameData);
  }, []);

  // Initialize or restore game state
  useEffect(() => {
    if (character && scenario && !monstersLoading && currentGame) {
      // Try to restore existing game state
      const existingState = getFromLocalStorage<ExtendedGameState | null>(
        STORAGE_KEYS.GAME_STATE,
        null,
      );

      const isExistingState = !!existingState;
      const isSameScenario =
        isExistingState && existingState.scenario.id === scenario.id;
      const hasMonsters = isExistingState && existingState.monsters.length > 0;
      const isSameGameId =
        isExistingState && existingState.gameId === currentGame.gameId;

      if (isExistingState && isSameScenario && hasMonsters && isSameGameId) {
        // Restore existing game state only if it's the same game instance (same gameId)
        setGameState(existingState);
      } else {
        // Initialize new game state
        const healthLevel =
          scenario.level.toString() as keyof typeof character.health_lvls;
        const maxHealth = character.health_lvls[healthLevel];

        const characterActor: GameActor = {
          actor: character,
          type: "character",
          currentHealth: maxHealth,
          maxHealth: maxHealth,
          initiative: undefined,
        };

        const monsterActors: GameActor[] = monsters.map((monster) => ({
          actor: monster,
          type: "monster",
          currentHealth: monster.health,
          maxHealth: monster.health,
          initiative: undefined,
        }));

        // Initialize character cards with ability levels from game data
        const characterCards: CharacterAbilityCard[] = Object.keys(
          character.abilities,
        ).map((cardId) => ({
          cardId: cardId as CardId,
          level: currentGame.abilityLevels[cardId as CardId] || "1",
          sideAUsed: false,
          sideBUsed: false,
          discarded: false,
        }));

        const initialTurnState: TurnState = {
          step: 1,
          selectedCards: [],
          isLongRest: false,
          actorOrder: [],
        };

        const newGameState: ExtendedGameState = {
          scenario,
          character: characterActor,
          monsters: monsterActors,
          currentRound: 1,
          gamePhase: "playing",
          turnState: initialTurnState,
          characterCards,
          currentTurn: 1,
          gameId: currentGame.gameId,
        };

        setGameState(newGameState);
        setToLocalStorage(STORAGE_KEYS.GAME_STATE, newGameState);
      }
    }
  }, [character, scenario, monsters, monstersLoading, currentGame]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (gameState) {
      setToLocalStorage(STORAGE_KEYS.GAME_STATE, gameState);
    }
  }, [gameState]);

  const updateGameState = useCallback((updates: Partial<ExtendedGameState>) => {
    setGameState((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const updateTurnState = useCallback((updates: Partial<TurnState>) => {
    setGameState((prev) =>
      prev
        ? {
            ...prev,
            turnState: { ...prev.turnState, ...updates },
          }
        : null,
    );
  }, []);

  // Character card selection handlers
  const handleCardSelect = useCallback(
    (cardId: CardId) => {
      if (!gameState) return;

      const { selectedCards, isLongRest } = gameState.turnState;
      if (isLongRest) return;

      let newSelectedCards: CardId[];
      if (selectedCards.includes(cardId)) {
        newSelectedCards = selectedCards.filter((id) => id !== cardId);
      } else if (selectedCards.length < 2) {
        newSelectedCards = [...selectedCards, cardId];
      } else {
        return; // Can't select more than 2 cards
      }

      updateTurnState({ selectedCards: newSelectedCards });
    },
    [gameState, updateTurnState],
  );

  const handleLongRest = useCallback(() => {
    if (!gameState) return;

    if (gameState.turnState.isLongRest) {
      // Deselect Long Rest - restore original cards state
      updateTurnState({
        selectedCards: [],
        isLongRest: false,
        selectedInitiative: undefined,
      });
    } else {
      // Select Long Rest - reset all character cards
      const resetCards = gameState.characterCards.map((card) => ({
        ...card,
        sideAUsed: false,
        sideBUsed: false,
        discarded: false,
      }));

      updateGameState({ characterCards: resetCards });
      updateTurnState({
        selectedCards: [],
        isLongRest: true,
        selectedInitiative: 99,
      });
    }
  }, [gameState, updateGameState, updateTurnState]);

  const handleInitiativeSelect = useCallback(
    (initiative: number) => {
      updateTurnState({ selectedInitiative: initiative });
    },
    [updateTurnState],
  );

  const handleCharacterConfirm = useCallback(() => {
    if (!gameState) return;

    // Mark selected cards as used (side A for now)
    if (!gameState.turnState.isLongRest) {
      const updatedCards = gameState.characterCards.map((card) => {
        if (gameState.turnState.selectedCards.includes(card.cardId)) {
          if (!card.sideAUsed) {
            return { ...card, sideAUsed: true };
          } else if (!card.sideBUsed) {
            return { ...card, sideBUsed: true, discarded: true };
          }
        }
        return card;
      });
      updateGameState({ characterCards: updatedCards });
    }

    // Set character initiative
    const updatedCharacter = {
      ...gameState.character,
      initiative: gameState.turnState.selectedInitiative,
    };

    updateGameState({ character: updatedCharacter });
    updateTurnState({ step: 2 as const });
  }, [gameState, updateGameState, updateTurnState]);

  // Monster initiative handlers
  const handleMonsterSymbolSelect = useCallback(
    (symbol: MonsterInitiativeSymbol) => {
      if (!gameState) return;

      // Update all monster initiatives based on selected symbol
      const updatedMonsters = gameState.monsters.map((monster) => ({
        ...monster,
        initiative: (monster.actor as any).initiatives[symbol] || 0,
      }));

      updateGameState({ monsters: updatedMonsters });
      updateTurnState({ monsterInitiativeSymbol: symbol });
    },
    [gameState, updateGameState, updateTurnState],
  );

  const handleMonsterConfirm = useCallback(() => {
    if (!gameState) return;

    // Sort actors by initiative and go directly to step 4 (execution)
    const allActors = [gameState.character, ...gameState.monsters];
    const sortedActors = [...allActors].sort((a, b) => {
      if (a.initiative === undefined && b.initiative === undefined) return 0;
      if (a.initiative === undefined) return 1;
      if (b.initiative === undefined) return -1;
      return a.initiative - b.initiative;
    });

    updateTurnState({
      step: 4 as const,
      actorOrder: sortedActors,
    });
  }, [gameState, updateTurnState]);

  // Turn execution handlers
  const handleFinishTurn = useCallback(() => {
    if (!gameState) return;

    // Reset all actor initiatives
    const resetCharacter = { ...gameState.character, initiative: undefined };
    const resetMonsters = gameState.monsters.map((monster) => ({
      ...monster,
      initiative: undefined,
    }));

    // Reset turn state to step 1
    const resetTurnState: TurnState = {
      step: 1,
      selectedCards: [],
      isLongRest: false,
      actorOrder: [],
    };

    updateGameState({
      character: resetCharacter,
      monsters: resetMonsters,
      turnState: resetTurnState,
      currentTurn: gameState.currentTurn + 1,
    });
  }, [gameState, updateGameState]);

  // Navigation handlers
  const handlePrevStep = useCallback(() => {
    if (!gameState) return;

    if (gameState.turnState.step === 4) {
      updateTurnState({ step: 2 as const });
    } else if (gameState.turnState.step === 2) {
      updateTurnState({ step: 1 as const });
    }
  }, [gameState, updateTurnState]);

  const handleNextStep = useCallback(() => {
    if (!gameState) return;

    if (gameState.turnState.step === 1) {
      updateTurnState({ step: 2 as const });
    } else if (gameState.turnState.step === 2) {
      updateTurnState({ step: 4 as const });
    }
  }, [gameState, updateTurnState]);

  // Determine navigation state
  const canGoNext = gameState
    ? (() => {
        switch (gameState.turnState.step) {
          case 1:
            return gameState.turnState.selectedInitiative !== undefined;
          case 2:
            return gameState.turnState.monsterInitiativeSymbol !== undefined;
          case 4:
            return false; // No next from execution step
          default:
            return false;
        }
      })()
    : false;

  const canGoPrev = gameState ? gameState.turnState.step > 1 : false;

  if (!currentGame) {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <div className="card mb-8">
          <h2 className="text-2xl mb-4">No Game Active!</h2>
          <p className="text-white/70 mb-6">
            Please start a new scenario or select one from your available games
            below.
          </p>
          <button
            onClick={() => navigate("/new-scenario")}
            className="btn-primary"
          >
            Start New Scenario
          </button>
        </div>

        <ActiveGamesList
          title="Available Games"
          emptyMessage="No games found. Create your first scenario above!"
        />
      </div>
    );
  }

  if (characterLoading || scenarioLoading || monstersLoading) {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-4"></div>
            <div className="h-4 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!scenario || !gameState) {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <div className="card">
          <h2 className="text-2xl mb-4 text-red-400">Error Loading Game</h2>
          <p className="text-white/70 mb-6">
            Could not load scenario data. Please try again.
          </p>
          {/* Debug Info */}
          <div className="text-xs text-white/50 mb-4">
            <p>
              Debug: scenario={!!scenario}, gameState={!!gameState}
            </p>
            <p>
              Monsters: {monsters.length} loaded, loading=
              {monstersLoading.toString()}
            </p>
            <p>
              Scenario monsters_id:{" "}
              {scenario?.monsters_id?.join(", ") || "none"}
            </p>
          </div>
          <button onClick={() => navigate("/")} className="btn-primary">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Create the turn content to be rendered in the Turns tab
  const turnContent = (
    <div className="space-y-6">
      <TurnNavigation
        currentStep={gameState.turnState.step}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNext={canGoNext ? handleNextStep : undefined}
        onPrev={canGoPrev ? handlePrevStep : undefined}
        currentTurn={gameState.currentTurn}
      />

      {/* Turn Step Content */}
      <div className="min-h-[400px]">
        {gameState.turnState.step === 1 && character && (
          <CharacterCardSelection
            character={character}
            characterCards={gameState.characterCards}
            selectedCards={gameState.turnState.selectedCards}
            isLongRest={gameState.turnState.isLongRest}
            onCardSelect={handleCardSelect}
            onLongRest={handleLongRest}
            onInitiativeSelect={handleInitiativeSelect}
            onConfirm={handleCharacterConfirm}
          />
        )}

        {gameState.turnState.step === 2 && (
          <MonsterInitiativeSelection
            monsters={gameState.monsters.map((m) => m.actor as Monster)}
            selectedSymbol={gameState.turnState.monsterInitiativeSymbol}
            onSymbolSelect={handleMonsterSymbolSelect}
            onRandomSelect={() => {}} // Random selection is handled inside the component
            onConfirm={handleMonsterConfirm}
          />
        )}

        {gameState.turnState.step === 4 && (
          <TurnExecution
            actors={
              gameState.turnState.actorOrder.length > 0
                ? gameState.turnState.actorOrder
                : [gameState.character, ...gameState.monsters]
            }
            currentTurn={gameState.currentTurn}
            onFinishTurn={handleFinishTurn}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ScenarioInfo
        scenario={scenario}
        difficulty={currentGame.difficulty}
        currentRound={gameState.currentRound || 1}
        turnContent={turnContent}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Game;
