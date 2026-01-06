"use client";

import { motion } from "motion/react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useSnakeGame } from "./context";
import { SnakeTongue } from "./snake-tongue";

function SnakeEye() {
  return (
    <div className="size-1 rounded-full bg-background animate-snake-blink" />
  );
}

function SnakeTail() {
  return <div className="size-2.25 bg-foreground rounded-l shadow-md" />;
}

function SnakeSegments({ segmentCount }: { segmentCount: number }) {
  const bodyParts = useMemo(() => {
    return Array.from({ length: Math.max(0, segmentCount - 2) }).map((_) => (
      <div
        key={`body-${nanoid()}`}
        className="size-2.25 bg-foreground shadow-md"
      />
    ));
  }, [segmentCount]);

  return (
    <>
      <SnakeTail />
      {bodyParts}
    </>
  );
}

export function SnakeHead() {
  return (
    <div className="relative w-3.5 h-2.75 bg-foreground rounded-r-full rounded-l-sm flex flex-col items-center justify-center gap-px pl-0.5 z-10 shadow-md">
      <SnakeEye />
      <SnakeEye />
      <SnakeTongue />
    </div>
  );
}

export function Snake() {
  const { openBoard, snake } = useSnakeGame();

  return (
    <motion.button
      layoutId="snake-element"
      className={cn(
        "flex items-center gap-px cursor-pointer hover:scale-110 active:scale-95 focus:outline-none relative z-30",
      )}
      onClick={openBoard}
    >
      <SnakeSegments segmentCount={snake.length} />
      <SnakeHead />
    </motion.button>
  );
}
