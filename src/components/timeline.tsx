import type { ReactNode } from "react";

type ChildrenProp = {
  children: ReactNode;
};

type TimelineCheckpointProps = ChildrenProp & {
  title: string;
  period: ReactNode;
};

function TimelineCheckpoint({
  children,
  title,
  period,
}: TimelineCheckpointProps) {
  return <div>{children}</div>;
}

function TimelineTitle({ children }: ChildrenProp) {
  return <div>{children}</div>;
}

function Timeline({ children }: ChildrenProp) {
  return <div className="flex flex-col">{children}</div>;
}

export { Timeline, TimelineTitle, TimelineCheckpoint };
