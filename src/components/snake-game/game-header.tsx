"use client";

import { XIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { useSnakeGame } from "./context";
import { SnakeControlsHint } from "./game-controls-hint";

export function GameHeader() {
  const { closeBoard } = useSnakeGame();

  return (
    <div className="flex w-full items-center justify-between">
      <SnakeControlsHint />

      <Button
        size="icon"
        variant="ghost"
        className="border-0 ml-auto"
        onClick={closeBoard}
      >
        <XIcon />
      </Button>
    </div>
  );
}
