"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setLocale as setLocaleAction } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";

export function LanguageToggle() {
  const router = useRouter();
  const t = useTranslations("language");
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setMounted(true);

    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="));

    if (match) {
      setLocale(match.split("=")[1] as Locale);
    }
  }, []);

  if (!mounted) return null;

  async function toggleLanguage() {
    const nextLocale: Locale = locale === "en" ? "pt" : "en";

    await setLocaleAction(nextLocale);
    setLocale(nextLocale);
    router.refresh();
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("aria")}
              className="border-0"
              onClick={toggleLanguage}
            >
              {locale}
            </Button>
          }
        />

        <TooltipContent side="bottom" align="center">
          <span className="text-xs">
            {t("current", { language: t(`name.${locale}`) })}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
