"use client";

import { motion } from "motion/react";
import { useSnakeGame } from "./context";
import { SnakeTongue } from "./snake-tongue";

function SnakeBody() {
  return (
    <>
      <div className="size-2.25 bg-foreground rounded-l shadow-md" />
      <div className="size-2.25 bg-foreground shadow-md" />
      <div className="size-2.25 bg-foreground shadow-md" />
    </>
  );
}

function SnakeHead() {
  return (
    <div className="relative w-3.5 h-2.75 bg-foreground rounded-r-full rounded-l-sm flex flex-col items-center justify-center gap-px pl-0.5 z-10 shadow-md">
      <div className="size-1 rounded-full bg-background animate-snake-blink" />
      <div className="size-1 rounded-full bg-background animate-snake-blink" />
      <SnakeTongue />
    </div>
  );
}

export function Snake() {
  const { isBoardActive, openBoard } = useSnakeGame();

  const buttonClassName = `flex items-center gap-px focus:outline-none ${
    !isBoardActive ? "cursor-pointer hover:scale-110 active:scale-95" : ""
  }`;

  return (
    <motion.button
      layoutId="easter-egg-snake"
      onClick={openBoard}
      disabled={isBoardActive}
      className={buttonClassName}
    >
      <SnakeBody />
      <SnakeHead />
    </motion.button>
  );
}
