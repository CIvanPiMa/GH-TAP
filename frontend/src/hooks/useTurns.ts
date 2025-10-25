import { useState, useEffect, useCallback } from "react";
import type { Turn } from "../client/types.gen";
import { client } from "../client";
import type { TurnFormData } from "../components/TurnForm";

export function useTurns() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTurns = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await client.turns.list();
      setTurns(data);
    } catch (error) {
      console.error("Error fetching turns:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTurn = useCallback(
    async (turnData: TurnFormData): Promise<void> => {
      try {
        await client.turns.update(turnData);
        await fetchTurns(); // Refresh the list
      } catch (error) {
        console.error("Error creating turn:", error);
        throw error; // Re-throw to let the component handle it
      }
    },
    [fetchTurns],
  );

  const deleteTurn = useCallback(
    async (turnId: number): Promise<void> => {
      try {
        await client.turns.delete(turnId);
        await fetchTurns(); // Refresh the list
      } catch (error) {
        console.error("Error deleting turn:", error);
        throw error;
      }
    },
    [fetchTurns],
  );

  const clearAllTurns = useCallback(async (): Promise<void> => {
    try {
      await client.turns.deleteAll();
      await fetchTurns(); // Refresh the list
    } catch (error) {
      console.error("Error clearing turns:", error);
      throw error;
    }
  }, [fetchTurns]);

  useEffect(() => {
    fetchTurns();
  }, [fetchTurns]);

  return {
    turns,
    isLoading,
    createTurn,
    deleteTurn,
    clearAllTurns,
    refetchTurns: fetchTurns,
  };
}
