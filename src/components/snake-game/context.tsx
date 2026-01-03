"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { SnakeGameContextValue } from "./types";

const SnakeGameContext = createContext<SnakeGameContextValue>({
  isBoardActive: false,
  openBoard: () => {},
  closeBoard: () => {},
});

export function SnakeGameProvider({ children }: { children: ReactNode }) {
  const [isBoardActive, setIsBoardActive] = useState(false);

  const value: SnakeGameContextValue = {
    isBoardActive,
    openBoard: () => setIsBoardActive(true),
    closeBoard: () => setIsBoardActive(false),
  };

  return (
    <SnakeGameContext.Provider value={value}>
      {children}
    </SnakeGameContext.Provider>
  );
}

export const useSnakeGame = () => useContext(SnakeGameContext);
