import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { nanoid } from "nanoid";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AccordionSection } from "@/components/accordion-section";
import { Timeline, TimelineCheckpoint } from "@/components/timeline";

const linkClass =
  "underline underline-offset-2 decoration-muted-foreground hover:decoration-foreground";

export async function Experience() {
  const t = await getTranslations("home.experience");

  const companyLink = (href: string) => (chunks: ReactNode) => (
    <a
      href={href}
      className={linkClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );

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
      <div className="flex flex-col gap-8">
        <Timeline
          title={t.rich("certta", {
            company: companyLink("https://www.certta.ai/"),
          })}
        >
          <TimelineCheckpoint
            intiallyExpanded
            title={t("certtaRoles.fullstack.title")}
            period={t("certtaRoles.fullstack.period")}
          >
            {renderDescription(t("certtaRoles.fullstack.description"))}
          </TimelineCheckpoint>
        </Timeline>

        <Timeline
          title={t.rich("medcloud", {
            company: companyLink("https://medcloud.link/"),
          })}
        >
          <TimelineCheckpoint
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
      </div>
    </AccordionSection>
  );
}
