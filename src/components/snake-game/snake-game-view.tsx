"use client";

import { AnimatePresence, motion } from "motion/react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { Snake } from "./snake";
import { SnakeControlsHint } from "./snake-controls-hint";
import { useSnakeGame } from "./snake-game-context";
import { Button } from "../ui/button";
import { XIcon } from "@phosphor-icons/react";

const COLS = 17;
const ROWS = 15;
const CELL_SIZE_PX = 18;

export function SnakeGameView({ children }: { children: React.ReactNode }) {
  const { isBoardActive, closeBoard } = useSnakeGame();

  const gridCells = useMemo(() => {
    return Array.from({ length: COLS * ROWS }).map((_, i) => ({
      id: nanoid(),
      isEven: (Math.floor(i / COLS) + (i % COLS)) % 2 === 0,
    }));
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-100 w-full">
      <AnimatePresence mode="popLayout">
        {!isBoardActive && (
          <motion.div
            key="not-found-ui"
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {isBoardActive && (
        <motion.div
          key="game-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2 items-center"
        >
          <div className="flex w-full items-center justify-between">
            <SnakeControlsHint />

            <Button
              size="icon"
              variant="ghost"
              className="border-0"
              onClick={closeBoard}
            >
              <XIcon />
            </Button>
          </div>

          <motion.div
            layout
            style={{
              width: COLS * CELL_SIZE_PX,
              height: ROWS * CELL_SIZE_PX,
            }}
            className="relative overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              }}
            >
              {gridCells.map((cell) => (
                <div
                  key={cell.id}
                  className={
                    cell.isEven
                      ? "bg-emerald-100 dark:bg-lime-950"
                      : "bg-green-200 dark:bg-emerald-950"
                  }
                />
              ))}
            </div>

            <div
              className="absolute inset-0 grid"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              }}
            >
              <div className="col-start-8 col-span-3 row-start-8 flex items-center justify-center z-20">
                <Snake />
              </div>
            </div>

            <div className="absolute bottom-2 w-full text-center text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">
              Use arrow keys to start
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
