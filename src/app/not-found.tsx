import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Snake } from "@/components/snake-game/snake";
import { SnakeGameProvider } from "@/components/snake-game/snake-game-context";
import { SnakeGameView } from "@/components/snake-game/snake-game-view";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <SnakeGameProvider>
      <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground px-2">
        <SnakeGameView>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center flex-col md:flex-row justify-center text-lg gap-6 text-center md:text-start">
                <span className="text-muted-foreground font-mono">404</span>
                <span className="hidden md:block h-6 w-px bg-border" />{" "}
                <span>{t("message")}</span>
              </div>

              <Snake />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="self-center"
                      nativeButton={false}
                      render={
                        <Link href="/">
                          <ArrowLeftIcon size={20} />
                        </Link>
                      }
                    />
                  }
                />
                <TooltipContent>
                  <p>{t("back")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </SnakeGameView>
      </div>
    </SnakeGameProvider>
  );
}
