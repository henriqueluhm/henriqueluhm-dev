export const GAME_CONFIG = {
  COLS: 17,
  ROWS: 15,
  CELL_SIZE_PX: 18,
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
