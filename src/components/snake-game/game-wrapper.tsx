"use client";

import { motion } from "motion/react";
import { GAME_CONFIG } from "./constants";
import { useSnakeGame } from "./context";
import { GameGrid } from "./game-grid";
import { GameHeader } from "./game-header";
import { GameHint } from "./game-hint";
import { Snake } from "./snake";

export function GameWrapper() {
  const { isBoardActive } = useSnakeGame();

  if (!isBoardActive) return null;

  return (
    <motion.div
      key="game-container"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-2 items-center z-20"
    >
      <GameHeader />

      <motion.div
        layout
        style={{
          width: GAME_CONFIG.COLS * GAME_CONFIG.CELL_SIZE_PX,
          height: GAME_CONFIG.ROWS * GAME_CONFIG.CELL_SIZE_PX,
        }}
        className="relative overflow-hidden shadow-2xl"
      >
        <GameGrid />

        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${GAME_CONFIG.COLS}, 1fr)`,
            gridTemplateRows: `repeat(${GAME_CONFIG.ROWS}, 1fr)`,
          }}
        >
          <div className="col-start-8 col-span-3 row-start-8 flex items-center justify-center z-20">
            <Snake />
          </div>
        </div>

        <GameHint />
      </motion.div>
    </motion.div>
  );
}
