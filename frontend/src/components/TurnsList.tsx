import type { Turn } from "../client/types.gen";
import { TurnCard } from "./TurnCard";

interface TurnsListProps {
  turns: Turn[];
  onDeleteTurn: (turnId: number) => Promise<void>;
  onClearAll: () => Promise<void>;
}

export function TurnsList({ turns, onDeleteTurn, onClearAll }: TurnsListProps) {
  return (
    <div className="turns-section">
      <div className="turns-header">
        <h2>Turn Order</h2>
        {turns.length > 0 && (
          <button onClick={onClearAll} className="btn btn-danger">
            Clear All
          </button>
        )}
      </div>

      {turns.length === 0 ? (
        <p className="empty-message">
          No turns yet. Add a turn to get started!
        </p>
      ) : (
        <div className="turns-list">
          {turns.map((turn: Turn) => (
            <TurnCard key={turn.id} turn={turn} onDelete={onDeleteTurn} />
          ))}
        </div>
      )}
    </div>
  );
}
