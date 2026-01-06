import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";
import { SnakeGameProvider } from "@/components/snake-game/context";
import { GameWrapper } from "@/components/snake-game/game-wrapper";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function BackButton({ label }: { label: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
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
      <div className="flex flex-col min-h-screen items-center gap-3 justify-center bg-background text-foreground px-2">
        <div className="relative flex flex-col items-center justify-center w-full gap-6 mt-auto">
          <NotFoundContent
            notFoundMessage={t("notFound.message", { breakline: "<br />" })}
          />

          <GameWrapper />
        </div>

        <div className="h-fit shrink-0 mt-auto mb-24 md:mb-10">
          <BackButton label={t("notFound.back")} />
        </div>
      </div>
    </SnakeGameProvider>
  );
}
