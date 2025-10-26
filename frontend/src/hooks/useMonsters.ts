import { useState, useEffect } from "react";
import { client } from "../client";
import type { Monster } from "../client/types.gen";

export const useMonsters = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        setLoading(true);
        setError(null);

        const monstersData = await client.monsters.list();
        setMonsters(monstersData);
      } catch (err) {
        console.error("Failed to fetch monsters:", err);
        setError("Failed to load monsters");
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, []);

  return { monsters, loading, error };
};

export const useMonster = (monsterId: string | null) => {
  const [monster, setMonster] = useState<Monster | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!monsterId) {
      setMonster(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchMonster = async () => {
      setLoading(true);
      setError(null);
      try {
        const monster = await client.monsters.get(monsterId);
        setMonster(monster);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch monster",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMonster();
  }, [monsterId]);

  return { monster, loading, error };
};

export const useMonstersByIds = (monsterIds: string[]) => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (monsterIds.length === 0) {
      setMonsters([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchMonsters = async () => {
      setLoading(true);
      setError(null);
      try {
        const monsterPromises = monsterIds.map((id) => client.monsters.get(id));
        const fetchedMonsters = await Promise.all(monsterPromises);
        setMonsters(fetchedMonsters);
      } catch (err) {
        console.error("Failed to fetch monsters:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch monsters",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, [JSON.stringify(monsterIds)]); // Use JSON.stringify for accurate dependency tracking

  return { monsters, loading, error };
};
