import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { nanoid } from "nanoid";
import { getTranslations } from "next-intl/server";
import { AccordionSection } from "@/components/accordion-section";
import { Timeline, TimelineCheckpoint } from "@/components/timeline";

export async function Experience() {
  const t = await getTranslations("home.experience");

  const renderDescription = (description: string) => {
    return description.split("\n\n").map((paragraph) => (
      <p key={nanoid()} className="indent-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <AccordionSection
      id="experience"
      icon={<ReadCvLogoIcon />}
      title={t("title")}
      delay={0.3}
    >
      <Timeline title={t("medcloud")}>
        <TimelineCheckpoint
          intiallyExpanded
          title={t("roles.fullstack.title")}
          period={t("roles.fullstack.period")}
        >
          {renderDescription(t("roles.fullstack.description"))}
        </TimelineCheckpoint>

        <TimelineCheckpoint
          title={t("roles.junior.title")}
          period={t("roles.junior.period")}
        >
          {renderDescription(t("roles.junior.description"))}
        </TimelineCheckpoint>

        <TimelineCheckpoint
          title={t("roles.intern.title")}
          period={t("roles.intern.period")}
        >
          <p className="whitespace-pre-line indent-4">
            {t("roles.intern.description")}
          </p>
        </TimelineCheckpoint>
      </Timeline>
    </AccordionSection>
  );
}
