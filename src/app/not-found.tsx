import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Snake } from "@/components/snake";
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
    <div className="flex flex-col min-h-screen px-2 items-center justify-center bg-background text-foreground gap-6">
      <div className="flex justify-center gap-10 flex-col">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-center text-lg gap-6">
            <span className="text-muted-foreground font-mono">404</span>
            <span className="h-6 w-px bg-border" /> <span>{t("message")}</span>
          </div>
          <div className="mt-0.5">
            <Snake />
          </div>
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
                      <ArrowLeftIcon />
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
    </div>
  );
}
