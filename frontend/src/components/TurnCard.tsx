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
    <div className="bg-gloom-brown/10 border border-gloom-brown/30 rounded-lg p-4 flex justify-between items-center transition-all hover:bg-gloom-brown/15 hover:border-gloom-brown/50 hover:translate-x-1">
      <div className="flex items-center gap-4 flex-1">
        <div className="bg-gloom-brown text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
          {turn.initiative}
        </div>
        <div className="flex-1 text-left">
          <h4 className="text-white text-lg mb-1 font-pirata">{turn.player}</h4>
          <p className="text-black text-base">{turn.action}</p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-gray-200 text-red-400 border border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition-all text-sm ml-4"
        disabled={!turn.id}
      >
        Delete
      </button>
    </div>
  );
}
