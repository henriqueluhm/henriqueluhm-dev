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
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function AccordionSection({
  id,
  title,
  icon,
  children,
  delay = 0,
  className,
}: AccordionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      id={id}
      className="scroll-mt-24"
    >
      <AccordionItem value={id}>
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={className}
          >
            {children}
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </motion.section>
  );
}
