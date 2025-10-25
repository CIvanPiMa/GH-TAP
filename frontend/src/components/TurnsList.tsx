import type { Turn } from "../client/types.gen";
import { TurnCard } from "./TurnCard";

interface TurnsListProps {
  turns: Turn[];
  onDeleteTurn: (turnId: number) => Promise<void>;
  onClearAll: () => Promise<void>;
}

export function TurnsList({ turns, onDeleteTurn, onClearAll }: TurnsListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl text-gloom-brown font-pirata">Turn Order</h3>
        {turns.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 bg-gray-200 text-red-400 border border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition-all text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {turns.length === 0 ? (
        <p className="text-center text-white/50 py-8">
          No turns yet. Add a turn to get started!
        </p>
      ) : (
        <div className="space-y-4">
          {turns.map((turn: Turn) => (
            <TurnCard key={turn.id} turn={turn} onDelete={onDeleteTurn} />
          ))}
        </div>
      )}
    </div>
  );
}
