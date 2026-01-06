"use client";

import { motion } from "motion/react";
import { GAME_CONFIG, gridToPixel } from "./constants";
import { useSnakeGame } from "./context";

export function Apple() {
  const { apple } = useSnakeGame();

  if (!apple) return null;

  const pixelPos = gridToPixel(apple.x, apple.y);

  return (
    <motion.div
      key={`apple-${apple.x}-${apple.y}`}
      initial={{ scale: 0 }}
      animate={{
        x: pixelPos.x,
        y: pixelPos.y,
        scale: 1,
      }}
      transition={{
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", stiffness: 500, damping: 25 },
      }}
      className="absolute"
      style={{
        width: GAME_CONFIG.CELL_SIZE_PX - 4,
        height: GAME_CONFIG.CELL_SIZE_PX - 4,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full h-full bg-red-500 rounded-full shadow-xl" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-green-600" />
      </div>
    </motion.div>
  );
}
