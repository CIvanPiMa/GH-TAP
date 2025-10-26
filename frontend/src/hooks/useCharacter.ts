import { useState, useEffect } from "react";
import { client } from "../client";
import type { Character } from "../client/types.gen";

export const useCharacter = (characterId: string | null) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId) {
      setCharacter(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const character = await client.characters.get(characterId);
        setCharacter(character);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch character",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  return { character, loading, error };
};
