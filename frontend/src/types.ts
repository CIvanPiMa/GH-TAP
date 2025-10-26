import type {
  CardId,
  CardLevel,
  Character,
  Monster,
  Scenario,
  MonsterInitiativeSymbol,
} from "./client/types.gen";

export interface GameData {
  gameId: string;
  scenario: {
    id: string;
    name: string;
    level: number;
  };
  difficulty: string;
  character: {
    id: string;
    name: string;
  };
  abilityLevels: Partial<Record<CardId, CardLevel>>;
  createdAt: string;
}

export interface GameActor {
  actor: Character | Monster;
  type: "character" | "monster";
  currentHealth?: number;
  maxHealth?: number;
  initiative?: number;
}

export interface GameState {
  scenario: Scenario;
  character: GameActor;
  monsters: GameActor[];
  currentRound?: number;
  gamePhase?: "setup" | "playing" | "completed";
}

export interface CharacterAbilityCard {
  cardId: CardId;
  level: CardLevel;
  sideAUsed: boolean;
  sideBUsed: boolean;
  discarded: boolean;
}

export interface TurnState {
  step: 1 | 2 | 3;
  selectedCards: CardId[];
  selectedInitiative?: number;
  isLongRest: boolean;
  monsterInitiativeSymbols: { [monsterId: string]: MonsterInitiativeSymbol };
  actorOrder: GameActor[];
}

export interface ExtendedGameState extends GameState {
  turnState: TurnState;
  characterCards: CharacterAbilityCard[];
  currentTurn: number;
  gameId: string; // Unique identifier for this game session
}
