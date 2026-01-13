"use client";
import { XIcon } from "@phosphor-icons/react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type TimelineCheckpointProps = {
  title: ReactNode;
  period: string;
  intiallyExpanded?: boolean;
  children?: ReactNode;
};

function TimelineCheckpoint({
  children,
  title,
  period,
  intiallyExpanded = false,
}: TimelineCheckpointProps) {
  const [expanded, setExpanded] = useState(intiallyExpanded);

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div
        className={cn("flex items-start sm:items-center justify-between", {
          "ml-3.75 pl-2 border-l border-muted-foreground":
            children === undefined,
        })}
      >
        <div className="flex items-start sm:items-center gap-2">
          {children !== undefined && (
            <Button
              variant="ghost"
              size="icon"
              className="border-transparent shrink-0"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={expanded ? "Collapse section" : "Expand section"}
            >
              <motion.span
                animate={{ rotate: expanded ? 0 : -45 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <XIcon className="size-3" />
              </motion.span>
            </Button>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5">
            <h5 className="font-medium -mt-0.5 sm:mt-0">{title}</h5>
            <div className="text-muted-foreground font-semibold text-xs sm:hidden sm:mt-0 -mt-1">
              {period}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground font-semibold hidden sm:block">
          {period}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-l border-muted-foreground ml-3.75 px-2 pt-1 pb-2 font-light">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type TimelineProps = {
  title: string;
  children: ReactNode;
};

function Timeline({ title, children }: TimelineProps) {
  return (
    <div className="flex flex-col gap-1 pl-2">
      <h4 className="font-medium">{title}</h4>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export { Timeline, TimelineCheckpoint };
