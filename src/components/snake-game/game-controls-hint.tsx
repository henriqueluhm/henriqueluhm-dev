"use client";

import { QuestionIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSnakeGame } from "./context";

function ControlRow({ keys, label }: { keys: string[]; label: string }) {
  return (
    <>
      <div className="flex justify-center">
        <KbdGroup>
          {keys.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </KbdGroup>
      </div>
      <span className="self-center">{label}</span>
    </>
  );
}

function MovementControls({ orLabel }: { orLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <KbdGroup>
        <Kbd>W</Kbd>
        <Kbd>A</Kbd>
        <Kbd>S</Kbd>
        <Kbd>D</Kbd>
      </KbdGroup>
      <span className="opacity-60">{orLabel}</span>
      <KbdGroup>
        <Kbd>↑</Kbd>
        <Kbd>←</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>→</Kbd>
      </KbdGroup>
    </div>
  );
}

export function SnakeControlsHint() {
  const { isBoardActive } = useSnakeGame();

  const t = useTranslations("snake.controls");

  return (
    <TooltipProvider>
      <Tooltip disabled={isBoardActive}>
        <TooltipTrigger
          render={<QuestionIcon className="size-4 hidden md:block" />}
        />
        <TooltipContent side="top" align="start">
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-6 py-2 text-xs text-background items-center">
            <MovementControls orLabel={t("or")} />
            <span className="self-center">{t("move")}</span>
            <ControlRow keys={["Space"]} label={t("start")} />
            <ControlRow keys={["Esc"]} label={t("exit")} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
