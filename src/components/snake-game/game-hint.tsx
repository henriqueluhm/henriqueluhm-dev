"use client";

import { useTranslations } from "next-intl";

export function GameHint() {
  const t = useTranslations("snake");

  return (
    <div className="absolute bottom-2 w-full text-center text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
      <span className="hidden md:inline">{t("hint.desktop")}</span>
      <span className="md:hidden">{t("hint.mobile")}</span>
    </div>
  );
}
