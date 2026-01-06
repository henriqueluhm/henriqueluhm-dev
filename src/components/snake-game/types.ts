export interface GridCellType {
  id: string;
  isEven: boolean;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface Position {
  x: number;
  y: number;
}

export interface SnakeGameContextValue {
  isBoardActive: boolean;
  isGameStarted: boolean;
  isGameOver: boolean;
  score: number;
  snake: Position[];
  apple: Position | null;
  direction: Direction;
  startGame: () => void;
  openBoard: () => void;
  closeBoard: () => void;
  changeDirection: (dir: Direction) => void;
  resetGame: () => void;
}
