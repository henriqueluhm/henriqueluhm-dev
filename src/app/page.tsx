import * as motion from "motion/react-client";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return (
    <main className="pb-(--nav-height) md:mt-(--nav-height) flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-160">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="shrink-0"
            >
              <Image
                src="/me.jpeg"
                width={150}
                height={150}
                alt={t("home.img")}
                className="rounded-full ring-2 ring-foreground"
                priority
              />
            </motion.div>
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="text-3xl text-center sm:text-start font-bold tracking-tight">
                Henrique Luhm
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("home.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
