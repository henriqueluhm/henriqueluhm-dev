"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useSnakeGame } from "./snake-game-context";

export function Snake() {
  const t = useTranslations("snake");
  const { isBoardActive, openBoard } = useSnakeGame();

  return (
    <motion.button
      layoutId="easter-egg-snake"
      onClick={openBoard}
      disabled={isBoardActive}
      className={`flex items-center gap-px focus:outline-none ${
        !isBoardActive ? "cursor-pointer hover:scale-110 active:scale-95" : ""
      }`}
    >
      <div className="size-2.25 bg-foreground rounded-l" />
      <div className="size-2.25 bg-foreground" />
      <div className="size-2.25 bg-foreground" />

      <div className="relative w-3.5 h-2.75 bg-foreground rounded-r-full rounded-l-sm flex flex-col items-center justify-center gap-px pl-0.5 z-10">
        <div className="size-1 rounded-full bg-background animate-snake-blink" />
        <div className="size-1 rounded-full bg-background animate-snake-blink" />

        <div className="absolute left-full top-1.5 origin-left animate-snake-tongue">
          <svg
            width="10"
            height="4"
            viewBox="0 0 10 4"
            fill="none"
            role="img"
            aria-hidden
            className="text-red-500 fill-current"
          >
            <title>{t("tongue")}</title>
            <path
              d="M0 2H7L9 0.5M7 2L9 3.5"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
