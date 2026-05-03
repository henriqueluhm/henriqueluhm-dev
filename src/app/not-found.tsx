import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SnakeGame from "@/components/snake-game";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as motion from "motion/react-client";

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
    <div className="flex flex-col min-h-screen items-center gap-3 justify-center bg-background text-foreground px-2">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="shrink-0 relative flex flex-col items-center justify-center w-full gap-6 mt-auto"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center flex-col md:flex-row justify-center text-lg gap-6 text-center md:text-start">
              <span className="text-muted-foreground font-mono">404</span>
              <span className="hidden md:block h-6 w-px bg-border" />
              <span>{t("notFound.message")}</span>
            </div>
          </div>
        </div>

        <SnakeGame />
      </motion.div>

      <div className="h-fit shrink-0 mt-auto mb-24 md:mb-10">
        <BackButton label={t("notFound.back")} />
      </div>
    </div>
  );
}
