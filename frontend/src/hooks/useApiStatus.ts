import { useState, useEffect } from "react";
import { ApiStatus } from "../types";
import { client } from "../client";

export function useApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking...");

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        await client.checkHealth();
        setApiStatus("connected");
      } catch (error) {
        setApiStatus("disconnected");
      }
    };

    checkApiHealth();
  }, []);

  return apiStatus;
}
