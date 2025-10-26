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

export const useScenario = (scenarioId: string | null) => {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scenarioId) {
      setScenario(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchScenario = async () => {
      setLoading(true);
      setError(null);
      try {
        const scenario = await client.scenarios.get(scenarioId);
        setScenario(scenario);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch scenario",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScenario();
  }, [scenarioId]);

  return { scenario, loading, error };
};
