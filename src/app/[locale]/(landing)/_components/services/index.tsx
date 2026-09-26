"use client";

import AnimationContainer from "@/components/global/animation-container";
import ScrollFloat from "@/components/global/scrol-float";
import SectionLabel from "@/components/global/SectionLabel";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import useIsIphoneOrSafari from "@/hooks/useIsIphoneOrSafari";
import { useTranslations } from "next-intl";
import { Service } from "@/types";

interface AnimatedSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageFromRight?: boolean;
  imageFromLeft?: boolean;
  index: number;
}

// Alternating frames echo the logo sweep: violet → blue and gold → violet.
const FRAMES = [
  "bg-linear-to-br from-brand-lavender via-brand-violet to-brand-blue",
  "bg-linear-to-bl from-brand-gold via-brand-violet/80 to-brand-indigo",
];

export function AnimatedSection({
  title,
  index,
  description,
  imageSrc,
  imageAlt,
  imageFromRight,
  imageFromLeft,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const words = title.split(" ");
  const lastWord = words.pop();
  const titleWithoutLastWord = words.join(" ");

  const imageX = useTransform(
    scrollYProgress,
    [0, isMobile ? 0.4 : 0.5],
    imageFromRight ? [250, 0] : imageFromLeft ? [-250, 0] : [0, 0]
  );
  const imageRotate = useTransform(scrollYProgress, [0, 0.4], [imageFromRight ? 20 : -20, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

  const textY = useTransform(scrollYProgress, isMobile ? [0, 0.4] : [0.4, 0.5], [150, -10]);
  const textOpacity = useTransform(scrollYProgress, isMobile ? [0.2, 0.4] : [0.2, 0.5], [0, 1]);

  const number = String(index + 1).padStart(2, "0");

  const renderText = (align: "left" | "right") => (
    <motion.div
      className={`md:w-1/2 flex flex-col px-5 md:px-10 z-0 ${
        align === "right" ? "items-end text-right" : "items-start text-left order-1 md:order-2"
      }`}
      style={{ y: textY, opacity: textOpacity }}
    >
      <span className="font-display text-sm font-semibold tracking-[0.25em] text-brand-gold">
        {number}
      </span>
      <h3 className="mt-3 mb-3 text-2xl font-bold leading-[1.15] md:mb-5 md:text-[2.8vw]">
        {titleWithoutLastWord} {lastWord && <span className="brand-gradient-text">{lastWord}</span>}
      </h3>
      <p className="max-w-md text-sm text-muted-foreground sm:text-base xl:text-lg">{description}</p>
    </motion.div>
  );

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center justify-between py-10 md:py-14">
      {!imageFromLeft && renderText("right")}
      <motion.div
        className="md:w-full xl:w-[80%] 2xl:w-[100%] order-2 md:order-1 mx-4 md:mx-0 z-10"
        style={{
          x: imageX,
          rotate: imageRotate,
          scale: imageScale,
        }}
      >
        <AnimationContainer
          animation="fadeUp"
          className={`${FRAMES[index % 2]} rounded-2xl p-1 md:rounded-3xl md:p-2 shadow-[0_30px_70px_-25px_rgba(110,57,253,0.55)]`}
          delay={0.5}
        >
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={960}
            height={540}
            loading="lazy"
            placeholder="blur"
            blurDataURL={imageSrc}
            className={`w-[80rem] z-30 rounded-xl object-cover md:rounded-2xl lg:h-[25rem] xl:h-[27rem] 2xl:h-[35rem] ${
              index === 0 ? "" : "[object-position:50%_30%]"
            }`}
          />
        </AnimationContainer>
      </motion.div>
      {imageFromLeft && renderText("left")}
    </div>
  );
}

export default function ServicesSection() {
  const isIphoneOrSafari = useIsIphoneOrSafari();
  const t = useTranslations("Services");
  const tSections = useTranslations("Sections");
  const sections = t.raw("sections") as Service[];

  return (
    <div className="relative w-full overflow-hidden bg-background pt-24 sm:pt-28 lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-10 size-[520px] rounded-full bg-brand-violet/15 blur-[150px]"
      />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-end gap-2 px-5 text-right md:px-10">
        <SectionLabel index="(02)" align="right">
          {tSections("services")}
        </SectionLabel>
        <ScrollFloat
          animationDuration={1.3}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=60%"
          stagger={0.07}
          textClassName={`pt-3 ${isIphoneOrSafari ? "text-[10vw]" : "text-[10.5vw]"} md:text-[6.5vw] lg:text-[5vw]`}
        >
          {t("title")}
        </ScrollFloat>
        <ScrollFloat
          animationDuration={1.3}
          ease="back.inOut(2)"
          scrollStart="center bottom+=80%"
          scrollEnd="bottom bottom-=60%"
          stagger={0.07}
          gradient
          textClassName={`${isIphoneOrSafari ? "text-[10vw]" : "text-[10.5vw]"} md:text-[7vw] lg:text-[5.6vw]`}
        >
          {t("title2")}
        </ScrollFloat>
      </div>

      <div className="max-w-[105rem] mx-auto pt-10 md:pt-14">
        {sections.map((feature, index) => (
          <AnimatedSection
            key={index}
            index={index}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.image}
            imageAlt={feature.title}
            imageFromRight={index % 2 === 0}
            imageFromLeft={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}
