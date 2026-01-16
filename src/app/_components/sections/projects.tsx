import { CodeIcon } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { AccordionSection } from "@/components/accordion-section";

export async function Projects() {
  const t = await getTranslations("home");

  return (
    <AccordionSection
      id="personalProjects"
      icon={<CodeIcon />}
      title={t("personalProjects")}
      delay={0.4}
    >
      projects here (placeholder)
    </AccordionSection>
  );
}
