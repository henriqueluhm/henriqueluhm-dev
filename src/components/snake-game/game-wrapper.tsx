"use client";

import { motion } from "motion/react";
import { Apple } from "./apple";
import { GAME_CONFIG } from "./constants";
import { useSnakeGame } from "./context";
import { GameControls } from "./game-controls";
import { GameGrid } from "./game-grid";
import { GameHeader } from "./game-header";
import { GameHint } from "./game-hint";
import { Snake } from "./snake";

export function GameWrapper() {
  const { isBoardActive } = useSnakeGame();
  return (
    <>
      <motion.div
        key="game-container"
        layout
        animate={{
          opacity: isBoardActive ? 1 : 0,
          transition: { duration: 0.4 },
        }}
        className="flex flex-col gap-2 items-center z-20 absolute"
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
            className="absolute inset-0 grid pointer-events-none"
            style={{
              gridTemplateColumns: `repeat(${GAME_CONFIG.COLS}, 1fr)`,
              gridTemplateRows: `repeat(${GAME_CONFIG.ROWS}, 1fr)`,
            }}
          >
            {isBoardActive && (
              <div className="col-start-8 col-span-3 flex items-center row-start-8 z-20">
                <Apple />
                <Snake />
              </div>
            )}
          </div>

          <GameHint />
        </motion.div>
        <GameControls />
      </motion.div>

      {!isBoardActive && <Snake />}
    </>
  );
}
