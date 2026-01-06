"use client";

import { motion } from "motion/react";
import { useSnakeGame } from "./snake-game/context";

export function NotFoundContent({
  notFoundMessage,
}: {
  notFoundMessage: string;
}) {
  const { isBoardActive } = useSnakeGame();

  return (
    <motion.div
      key="not-found-ui"
      layout
      animate={{
        y: isBoardActive ? -200 : 0,
        opacity: isBoardActive ? 0 : 1,
        filter: isBoardActive ? "blur(10px)" : undefined,
        transition: { duration: 0.4 },
      }}
      className="flex flex-col items-center justify-center gap-10 w-full z-10"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center flex-col md:flex-row justify-center text-lg gap-6 text-center md:text-start">
            <span className="text-muted-foreground font-mono">404</span>
            <span className="hidden md:block h-6 w-px bg-border" />
            <span>{notFoundMessage}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
