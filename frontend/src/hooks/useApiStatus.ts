import { useState, useEffect } from "react";
import { ApiStatus } from "../types";
import { GhTapApiClient } from "../client";

export function useApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking...");

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        await GhTapApiClient.checkHealth();
        setApiStatus("connected");
      } catch (error) {
        setApiStatus("disconnected");
      }
    };

    checkApiHealth();
  }, []);

  return apiStatus;
}
