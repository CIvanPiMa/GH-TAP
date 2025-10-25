export interface GameData {
  gameId: string;
  scenario: {
    id: string;
    name: string;
    level: number;
  };
  difficulty: string;
  character: {
    id: string;
    name: string;
  };
  createdAt: string;
}
