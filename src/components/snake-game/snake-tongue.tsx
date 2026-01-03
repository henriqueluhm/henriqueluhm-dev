"use client";

import { useTranslations } from "next-intl";

export function SnakeTongue() {
  const t = useTranslations("snake");

  return (
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
  );
}
