import { useTranslations } from "next-intl";
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./mode-toggle";

export function Nav() {
  const t = useTranslations("Home");

  return (
    <nav className="p-4 w-full flex justify-end">
      <LanguageToggle />
      <ModeToggle />

      {t("title")}
    </nav>
  );
}
