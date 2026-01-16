import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { AccordionSection } from "@/components/accordion-section";
import { Timeline, TimelineCheckpoint } from "@/components/timeline";

export async function Education() {
  const t = await getTranslations("home.education");

  return (
    <AccordionSection
      id="education"
      icon={<GraduationCapIcon />}
      title={t("education")}
      delay={0.5}
      className="flex flex-col gap-8"
    >
      <Timeline title={t("uepg")}>
        <TimelineCheckpoint title={t("bachelor")} period="2025 - 2025" />
      </Timeline>

      <Timeline title={t("santana")}>
        <TimelineCheckpoint title={t("highSchool")} period="2017 - 2019" />
      </Timeline>
    </AccordionSection>
  );
}
