import * as motion from "motion/react-client";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Page() {
  const t = await getTranslations();

  return (
    <main className="mb-(--nav-height) md:mt-(--nav-height) flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-160">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
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

          <Accordion
            multiple
            defaultValue={["experience", "education", "personalProjects"]}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <AccordionItem value="experience">
                <AccordionTrigger>{t("home.experience")}</AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    experience here
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <AccordionItem value="education">
                <AccordionTrigger>{t("home.education")}</AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    education here
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <AccordionItem value="personalProjects">
                <AccordionTrigger>
                  {t("home.personalProjects")}
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    projects here
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
