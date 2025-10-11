import { ApiStatus } from "../types";

interface ApiStatusDisplayProps {
  status: ApiStatus;
}

export function ApiStatusDisplay({ status }: ApiStatusDisplayProps) {
  return (
    <header>
      <h1>🎲 GloomHeaven Turn Assistant</h1>
      <p
        className={`status ${status === "connected" ? "connected" : "disconnected"}`}
      >
        API: {status}
      </p>
    </header>
  );
}
