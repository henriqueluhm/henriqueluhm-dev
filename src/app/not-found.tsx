import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found/not-found-content";
import { GameWrapper } from "@/components/snake-game/game-wrapper";
import { Snake } from "@/components/snake-game/snake";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SnakeGameProvider } from "@/components/snake-game/context";

function NotFoundMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center flex-col md:flex-row justify-center text-lg gap-6 text-center md:text-start">
      <span className="text-muted-foreground font-mono">404</span>
      <span className="hidden md:block h-6 w-px bg-border" />
      <span>{message}</span>
    </div>
  );
}

function BackButton({ label }: { label: string }) {
  return (
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
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <SnakeGameProvider>
      <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground px-2">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <NotFoundContent>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <NotFoundMessage message={t("notFound.message")} />
                <Snake />
              </div>
              <BackButton label={t("notFound.back")} />
            </div>
          </NotFoundContent>

          <GameWrapper />
        </div>
      </div>
    </SnakeGameProvider>
  );
}
