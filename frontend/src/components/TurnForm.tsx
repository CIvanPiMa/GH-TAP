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
    <div className="add-turn-section">
      <h2>Add Turn</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="player">Player/Character:</label>
          <input
            id="player"
            type="text"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="Enter player name"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="action">Action:</label>
          <input
            id="action"
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Enter action"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="initiative">Initiative:</label>
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
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Turn"}
        </button>
      </form>
    </div>
  );
}
