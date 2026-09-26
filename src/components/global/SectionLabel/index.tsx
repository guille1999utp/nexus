import { ReactNode } from "react";
import AnimationContainer from "@/components/global/animation-container";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

/** Small tracked label above section titles, styled like the logo tagline. */
export default function SectionLabel({ index, children, className, align = "left" }: SectionLabelProps) {
  return (
    <AnimationContainer
      animation="fadeUp"
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-transparent to-brand-gold md:w-12" />
      <span className="eyebrow text-brand-gold-light">
        {index && <span className="mr-2 text-brand-gold">{index}</span>}
        {children}
      </span>
    </AnimationContainer>
  );
}
