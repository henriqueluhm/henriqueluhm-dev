import * as motion from "motion/react-client";
import type { ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  delay?: number;
};

export function AccordionSection({
  id,
  title,
  children,
  delay = 0,
}: AccordionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      id={id}
      className="scroll-mt-24"
    >
      <AccordionItem value={id}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </motion.section>
  );
}
