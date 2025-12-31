"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { setLocale as setLocaleAction } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";

export function LanguageToggle() {
  const router = useRouter();
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
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="font-mono text-xs"
    >
      {locale.toUpperCase()}
    </Button>
  );
}
