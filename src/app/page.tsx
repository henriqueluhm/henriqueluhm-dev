import * as motion from "motion/react-client";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AccordionSection } from "@/components/accordion-section";
import { Timeline, TimelineTitle } from "@/components/timeline";
import { Accordion } from "@/components/ui/accordion";

export default async function Page() {
  const t = await getTranslations();

  return (
    <main className="mb-(--nav-height) md:mt-(--nav-height) flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-160">
        <div className="flex flex-col gap-10">
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
            <AccordionSection
              id="experience"
              title={t("home.experience")}
              delay={0.3}
            >
              <Timeline>
                <TimelineTitle>Medcloud</TimelineTitle>

                {/* <TimelineCheckpoint title={t()}>checkpoint 1</TimelineCheckpoint> */}
              </Timeline>
            </AccordionSection>

            <AccordionSection
              id="education"
              title={t("home.education")}
              delay={0.4}
            >
              education here
            </AccordionSection>

            <AccordionSection
              id="personalProjects"
              title={t("home.personalProjects")}
              delay={0.5}
            >
              projects here
            </AccordionSection>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
