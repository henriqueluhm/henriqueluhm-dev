"use client";

// WIP

import { motion } from "motion/react";
import { GAME_CONFIG, gridToPixel } from "./constants";
import { useSnakeGame } from "./context";

type SnakeSegmentProps = {
  x: number;
  y: number;
  isHead?: boolean;
};

function SnakeSegment({ x, y, isHead }: SnakeSegmentProps) {
  const pixelPos = gridToPixel(x, y);

  return (
    <motion.div
      animate={{
        x: pixelPos.x,
        y: pixelPos.y,
      }}
      transition={{
        duration: GAME_CONFIG.GAME_SPEED_MS / 1000,
        ease: "linear",
      }}
      className="absolute"
      style={{
        width: GAME_CONFIG.CELL_SIZE_PX - 2,
        height: GAME_CONFIG.CELL_SIZE_PX - 2,
        transform: "translate(-50%, -50%)",
      }}
    >
      {isHead ? (
        <div className="w-full h-full bg-foreground rounded-full shadow-lg flex items-center justify-center">
          <div className="flex flex-col gap-0.5">
            <div className="size-1 bg-background rounded-full" />
            <div className="size-1 bg-background rounded-full" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-foreground rounded shadow-md" />
      )}
    </motion.div>
  );
}

export function GameSnake() {
  const { snake } = useSnakeGame();

  return (
    <>
      {snake.map((segment, index) => (
        <SnakeSegment
          key={`segment-${index.toString()}`}
          x={segment.x}
          y={segment.y}
          isHead={index === 0}
        />
      ))}
    </>
  );
}
