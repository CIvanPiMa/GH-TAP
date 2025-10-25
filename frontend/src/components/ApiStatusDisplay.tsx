import { ApiStatus } from "../types";

interface ApiStatusDisplayProps {
  status: ApiStatus;
}

export function ApiStatusDisplay({ status }: ApiStatusDisplayProps) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl lg:text-3xl mb-2 text-gloom-brown font-pirata">
        🎲 GloomHaven Turn Assistant
      </h2>
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          status === "connected"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        API: {status}
      </span>
    </div>
  );
}
