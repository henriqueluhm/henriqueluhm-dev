"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSnakeGame } from "../snake-game/context";

export function NotFoundContent({ children }: { children: React.ReactNode }) {
  const { isBoardActive } = useSnakeGame();

  return (
    <AnimatePresence mode="popLayout">
      {!isBoardActive && (
        <motion.div
          key="not-found-ui"
          layout
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center gap-10 w-full z-10"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
