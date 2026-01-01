"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

const SnakeGameContext = createContext({
  isBoardActive: false,
  openBoard: () => {},
  closeBoard: () => {},
});

export function SnakeGameProvider({ children }: { children: ReactNode }) {
  const [isBoardActive, setIsBoardActive] = useState(false);

  return (
    <SnakeGameContext.Provider
      value={{
        isBoardActive,
        openBoard: () => setIsBoardActive(true),
        closeBoard: () => setIsBoardActive(false),
      }}
    >
      {children}
    </SnakeGameContext.Provider>
  );
}

export const useSnakeGame = () => useContext(SnakeGameContext);
