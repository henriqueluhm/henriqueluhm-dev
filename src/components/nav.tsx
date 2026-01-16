import {
  AtIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./mode-toggle";

export function Nav() {
  return (
    <TooltipProvider>
      <nav
        className="
          fixed inset-x-0 z-50
          bottom-0 md:top-0 md:bottom-auto
          h-(--nav-height)
          px-4
          flex items-center
          bg-transparent backdrop-blur
          border-t md:border-t-0 md:border-b
        "
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://github.com/henriqueluhm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:opacity-80 transition-opacity size-8 flex items-center justify-center"
                  >
                    <GithubLogoIcon size={20} />
                  </a>
                }
              />
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://www.linkedin.com/in/henrique-luhm-a319a71b0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:opacity-80 transition-opacity size-8 flex items-center justify-center"
                  >
                    <LinkedinLogoIcon size={20} />
                  </a>
                }
              />
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="mailto:henriqueluhmwork@gmail.com"
                    aria-label="Email"
                    className="hover:opacity-80 transition-opacity size-8 flex items-center justify-center"
                  >
                    <AtIcon size={20} />
                  </a>
                }
              />
              <TooltipContent>henriqueluhmwork@gmail.com</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex gap-2">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
