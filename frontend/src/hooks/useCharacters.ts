import { useState, useEffect } from "react";
import { client } from "../client";
import type { Character } from "../client/types.gen";
import { getCharacterIconPath } from "../utils/assetsGetter";

interface CharacterWithIcon extends Character {
  iconPath: string;
}

export const useCharacters = () => {
  const [characters, setCharacters] = useState<CharacterWithIcon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const charactersData = await client.characters.list();

        // Map API characters to include icon paths
        const charactersWithIcons: CharacterWithIcon[] = charactersData.map(
          (character) => ({
            ...character,
            iconPath: getCharacterIconPath(character.id), // Uses centralized config
          }),
        );

        setCharacters(charactersWithIcons);
      } catch (err) {
        console.error("Failed to fetch characters:", err);
        setError("Failed to load characters");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};
