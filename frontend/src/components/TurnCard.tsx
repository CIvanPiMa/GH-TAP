import type { Turn } from "../client/types.gen";

interface TurnCardProps {
  turn: Turn;
  onDelete: (turnId: number) => Promise<void>;
}

export function TurnCard({ turn, onDelete }: TurnCardProps) {
  const handleDelete = () => {
    if (turn.id) {
      onDelete(turn.id);
    }
  };

  return (
    <div className="turn-card">
      <div className="turn-info">
        <div className="initiative-badge">{turn.initiative}</div>
        <div className="turn-details">
          <h3>{turn.player}</h3>
          <p>{turn.action}</p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="btn btn-delete"
        disabled={!turn.id}
      >
        Delete
      </button>
    </div>
  );
}
