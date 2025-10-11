import { createClient, createConfig } from "./client/client";
import {
  getTurnsTurnsGet,
  createTurnTurnsPost,
  deleteTurnTurnsTurnIdDelete,
  clearTurnsTurnsDelete,
  healthCheckHealthGet,
} from "./client/sdk.gen";
import type { Turn } from "./client/types.gen";

const API_VERSION = import.meta.env.VITE_GH_TAP_API_VERSION || "v1";
const API_URL_BASE =
  import.meta.env.VITE_GH_TAP_API_URL_BASE || "http://localhost:8000";

// Create configured client
const apiClient = createClient(
  createConfig({
    baseUrl: `${API_URL_BASE}/api/${API_VERSION}`,
  }),
);

// API Client wrapper
export const GhTapApiClient = {
  // Health check
  async checkHealth(): Promise<any> {
    const response = await healthCheckHealthGet({ client: apiClient });
    return response.data;
  },

  // Get all turns
  async getTurns(): Promise<Turn[]> {
    const response = await getTurnsTurnsGet({ client: apiClient });
    return response.data as Turn[];
  },

  // Create a new turn
  async createTurn(turnData: Omit<Turn, "id">): Promise<Turn> {
    const response = await createTurnTurnsPost({
      client: apiClient,
      body: turnData,
    });
    return (response.data as any).turn;
  },

  // Delete a turn by ID
  async deleteTurn(turnId: number): Promise<void> {
    await deleteTurnTurnsTurnIdDelete({
      client: apiClient,
      path: { turn_id: turnId },
    });
  },

  // Clear all turns
  async clearAllTurns(): Promise<void> {
    await clearTurnsTurnsDelete({ client: apiClient });
  },
};
