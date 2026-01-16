import * as motion from "motion/react-client";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function Introduction() {
  const t = await getTranslations("home");

  return (
    <div
      id="introduction"
      className="flex flex-col sm:flex-row gap-6 items-center scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="shrink-0"
      >
        <Image
          src="/me.jpeg"
          width={150}
          height={150}
          alt={t("img")}
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
        <h2 className="text-lg text-muted-foreground leading-relaxed">
          {t("description")}
        </h2>
      </motion.div>
    </div>
  );
}
