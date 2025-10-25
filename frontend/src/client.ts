import { createClient, createConfig } from "./client/client";
import {
  getTurnsTurnsGet,
  createTurnTurnsPost,
  deleteTurnTurnsTurnIdDelete,
  clearTurnsTurnsDelete,
  healthCheckHealthGet,
  getCharactersCharactersGet,
  getCharacterCharactersCharacterIdGet,
  getMonstersMonstersGet,
  getMonsterMonstersMonsterIdGet,
  getScenariosScenariosGet,
  getScenarioScenariosScenarioIdGet,
} from "./client/sdk.gen";
import type {
  Turn,
  Character,
  Characters,
  Monster,
  Monsters,
  Scenario,
  Scenarios,
} from "./client/types.gen";
import { getApiUrl } from "./config";

// Create configured client
const apiClient = createClient(
  createConfig({
    baseUrl: getApiUrl(),
  }),
);

// API Client wrapper
export const client = {
  // Health check
  async checkHealth(): Promise<any> {
    const response = await healthCheckHealthGet({ client: apiClient });
    return response.data;
  },

  // Characters endpoints
  characters: {
    // List all characters
    async list(): Promise<Characters> {
      const response = await getCharactersCharactersGet({ client: apiClient });
      return response.data!;
    },

    // Get a specific character by ID
    async get(characterId: string): Promise<Character> {
      const response = await getCharacterCharactersCharacterIdGet({
        client: apiClient,
        path: { character_id: characterId },
      });
      return response.data!;
    },
  },

  // Monsters endpoints
  monsters: {
    // List all monsters
    async list(): Promise<Monsters> {
      const response = await getMonstersMonstersGet({ client: apiClient });
      return response.data!;
    },

    // Get a specific monster by ID
    async get(monsterId: string): Promise<Monster> {
      const response = await getMonsterMonstersMonsterIdGet({
        client: apiClient,
        path: { monster_id: monsterId },
      });
      return response.data!;
    },
  },

  // Scenarios endpoints
  scenarios: {
    // List all scenarios
    async list(): Promise<Scenarios> {
      const response = await getScenariosScenariosGet({ client: apiClient });
      return response.data!;
    },

    // Get a specific scenario by ID
    async get(scenarioId: string): Promise<Scenario> {
      const response = await getScenarioScenariosScenarioIdGet({
        client: apiClient,
        path: { scenario_id: scenarioId },
      });
      return response.data!;
    },
  },

  // Turns endpoints
  turns: {
    // List all turns
    async list(): Promise<Turn[]> {
      const response = await getTurnsTurnsGet({ client: apiClient });
      return response.data as Turn[];
    },

    // Create a new turn
    async update(turnData: Omit<Turn, "id">): Promise<Turn> {
      const response = await createTurnTurnsPost({
        client: apiClient,
        body: turnData,
      });
      return (response.data as any).turn;
    },

    // Delete a turn by ID
    async delete(turnId: number): Promise<void> {
      await deleteTurnTurnsTurnIdDelete({
        client: apiClient,
        path: { turn_id: turnId },
      });
    },

    // Clear all turns
    async deleteAll(): Promise<void> {
      await clearTurnsTurnsDelete({ client: apiClient });
    },
  },
};
