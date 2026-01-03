export interface GridCellType {
  id: string;
  isEven: boolean;
}

export interface SnakeGameContextValue {
  isBoardActive: boolean;
  openBoard: () => void;
  closeBoard: () => void;
}
