import { useState, useEffect } from "react";
import { client } from "../client";
import type { Scenario } from "../client/types.gen";

export const useScenarios = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setLoading(true);
        setError(null);

        const scenariosData = await client.scenarios.list();
        setScenarios(scenariosData);
      } catch (err) {
        console.error("Failed to fetch scenarios:", err);
        setError("Failed to load scenarios");
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  return { scenarios, loading, error };
};
