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

export function SnakeControlsHint() {
  const t = useTranslations("snake.controls");

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={<QuestionIcon className="size-5 ml-2 hidden md:block" />}
          />

          <TooltipContent side="top" align="start">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-6 py-2 text-xs text-background items-center">
              <div className="flex flex-col items-center gap-1">
                <KbdGroup>
                  <Kbd>W</Kbd>
                  <Kbd>A</Kbd>
                  <Kbd>S</Kbd>
                  <Kbd>D</Kbd>
                </KbdGroup>
                <span className="opacity-60">{t("or")}</span>
                <KbdGroup>
                  <Kbd>↑</Kbd>
                  <Kbd>←</Kbd>
                  <Kbd>↓</Kbd>
                  <Kbd>→</Kbd>
                </KbdGroup>
              </div>
              <span className="self-center">{t("move")}</span>

              <div className="flex justify-center">
                <Kbd>Space</Kbd>
              </div>
              <span className="self-center">{t("start")}</span>

              <div className="flex justify-center">
                <Kbd>Esc</Kbd>
              </div>
              <span className="self-center">{t("exit")}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="md:hidden text-xs text-muted-foreground w-full text-center">
        {t("swipe")}
      </div>
    </>
  );
}
