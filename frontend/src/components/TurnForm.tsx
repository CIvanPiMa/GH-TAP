import { useState, FormEvent } from "react";

export interface TurnFormData {
  player: string;
  action: string;
  initiative: number;
}

interface TurnFormProps {
  onSubmit: (turnData: TurnFormData) => Promise<void>;
}

export function TurnForm({ onSubmit }: TurnFormProps) {
  const [player, setPlayer] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [initiative, setInitiative] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!player || !action || !initiative) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        player,
        action,
        initiative: parseInt(initiative),
      });

      // Clear form on successful submission
      setPlayer("");
      setAction("");
      setInitiative("");
    } catch (error) {
      console.error("Error creating turn:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl mb-4 text-gloom-brown font-pirata">Add Turn</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="player" className="block mb-2 font-medium text-white">
            Player/Character:
          </label>
          <input
            id="player"
            type="text"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="Enter player name"
            required
            disabled={isSubmitting}
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:border-gloom-brown focus:bg-white/10 transition-all"
          />
        </div>
        <div>
          <label htmlFor="action" className="block mb-2 font-medium text-white">
            Action:
          </label>
          <input
            id="action"
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Enter action"
            required
            disabled={isSubmitting}
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:border-gloom-brown focus:bg-white/10 transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="initiative"
            className="block mb-2 font-medium text-white"
          >
            Initiative:
          </label>
          <input
            id="initiative"
            type="number"
            value={initiative}
            onChange={(e) => setInitiative(e.target.value)}
            placeholder="Enter initiative value"
            required
            min="1"
            max="99"
            disabled={isSubmitting}
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:outline-none focus:border-gloom-brown focus:bg-white/10 transition-all"
          />
        </div>
        <button
          type="submit"
          className={`btn-primary w-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Turn"}
        </button>
      </form>
    </div>
  );
}
