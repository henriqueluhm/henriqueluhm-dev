"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-6", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:ring-ring/50 focus-visible:border-ring **:data-[slot=accordion-trigger-icon]:text-foreground rounded-none py-2.5 text-left font-medium text-xl focus-visible:ring-1 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-center justify-between transition-all outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          className,
        )}
        {...props}
      >
        <h3 className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-100 after:ease-out group-hover/accordion-trigger:after:w-full">
          {children}
        </h3>
        <CaretDownIcon
          data-slot="accordion-trigger-icon"
          className="
    pointer-events-none shrink-0 ml-auto size-4
    transition-all duration-200 ease-out
    opacity-100 rotate-0
    group-aria-expanded/accordion-trigger:opacity-0
    group-aria-expanded/accordion-trigger:-rotate-90
  "
        />

        <CaretUpIcon
          data-slot="accordion-trigger-icon"
          className="
    pointer-events-none absolute right-0 size-4
    transition-all duration-200 ease-out
    opacity-0 rotate-90
    group-aria-expanded/accordion-trigger:opacity-100
    group-aria-expanded/accordion-trigger:rotate-0
  "
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-2.5 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
