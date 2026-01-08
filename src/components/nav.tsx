import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./mode-toggle";

export function Nav() {
  return (
    <nav
      className="
        fixed inset-x-0 z-50
        bottom-0 md:top-0 md:bottom-auto
        h-(--nav-height)
        px-4
        flex justify-end items-center gap-2
        bg-background/50 backdrop-blur
        border-t md:border-t-0 md:border-b
      "
    >
      <LanguageToggle />
      <ModeToggle />
    </nav>
  );
}
