export const GAME_CONFIG = {
  COLS: 17,
  ROWS: 15,
  CELL_SIZE_PX: 18,
  GAME_SPEED_MS: 150,
} as const;

export const GRID_COLORS = {
  even: {
    light: "bg-emerald-100",
    dark: "dark:bg-lime-950",
  },
  odd: {
    light: "bg-green-200",
    dark: "dark:bg-emerald-950",
  },
} as const;

export function gridToPixel(
  gridX: number,
  gridY: number,
): { x: number; y: number } {
  return {
    x: gridX * GAME_CONFIG.CELL_SIZE_PX + GAME_CONFIG.CELL_SIZE_PX / 2,
    y: gridY * GAME_CONFIG.CELL_SIZE_PX + GAME_CONFIG.CELL_SIZE_PX / 2,
  };
}

export function pixelToGrid(
  pixelX: number,
  pixelY: number,
): { x: number; y: number } {
  return {
    x: Math.floor(pixelX / GAME_CONFIG.CELL_SIZE_PX),
    y: Math.floor(pixelY / GAME_CONFIG.CELL_SIZE_PX),
  };
}
