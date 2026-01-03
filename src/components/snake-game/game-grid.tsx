"use client";

import { nanoid } from "nanoid";
import { useMemo } from "react";
import { GAME_CONFIG, GRID_COLORS } from "./constants";
import type { GridCellType } from "./types";

function GridCell({ isEven }: { isEven: boolean }) {
  const colorClass = isEven
    ? `${GRID_COLORS.even.light} ${GRID_COLORS.even.dark}`
    : `${GRID_COLORS.odd.light} ${GRID_COLORS.odd.dark}`;

  return <div className={colorClass} />;
}

export function GameGrid() {
  const gridCells = useMemo<GridCellType[]>(() => {
    return Array.from({ length: GAME_CONFIG.COLS * GAME_CONFIG.ROWS }).map(
      (_, i) => ({
        id: nanoid(),
        isEven:
          (Math.floor(i / GAME_CONFIG.COLS) + (i % GAME_CONFIG.COLS)) % 2 === 0,
      }),
    );
  }, []);

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${GAME_CONFIG.COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GAME_CONFIG.ROWS}, 1fr)`,
      }}
    >
      {gridCells.map((cell) => (
        <GridCell key={cell.id} isEven={cell.isEven} />
      ))}
    </div>
  );
}
