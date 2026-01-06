"use client";

import { useEffect } from "react";
import { useSnakeGame } from "./context";
import type { Direction } from "./types";

export function GameControls() {
  const { changeDirection, isGameStarted, startGame, isGameOver } =
    useSnakeGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;

      if (
        !isGameStarted &&
        (e.key.startsWith("Arrow") ||
          ["w", "a", "s", "d"].includes(e.key.toLowerCase()))
      ) {
        startGame();
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
      };

      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        changeDirection(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, isGameStarted, startGame, isGameOver]);

  return null;
}
