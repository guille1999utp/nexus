"use client";

import AnimatedH1 from "@/components/global/AnimatedH1/AnimatedH1";
import AnimatedCopy from "@/components/global/AnimatedCopy/AnimatedCopy";
import AnimationContainer from "@/components/global/animation-container";
import Orbit from "@/components/global/Orbit";
import { NexusLogo } from "@/components/global/NexusLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { HeroStat } from "@/types";

export default function Hero() {
  const t = useTranslations("Hero");
  const stats = t.raw("stats") as HeroStat[];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Deep-space backdrop */}

      <div className="relative z-[1] mx-auto grid min-h-[100svh] w-full max-w-[1440px] items-center gap-4 px-5 pt-24 pb-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-24">
        {/* Logo with orbits */}
        <div className="relative order-1 mx-auto flex aspect-square w-[68vw] max-w-[340px] items-center justify-center sm:max-w-[420px] lg:order-2 lg:w-full lg:max-w-[580px]">
          <Orbit className="absolute inset-[-12%]" duration={80} opacity={0.5} />
          <Orbit className="absolute inset-[-30%]" duration={120} reverse orbs={false} opacity={0.2} />
          <div
            aria-hidden="true"
            className="absolute inset-[16%] rounded-full bg-brand-violet/25 blur-[80px] animate-glow-pulse"
          />
          <AnimationContainer animation="scaleUp" delay={1} className="relative w-full">
            <div className="animate-float-y">
              <NexusLogo
                priority
                sizes="(max-width: 1024px) 68vw, 40vw"
                className="drop-shadow-[0_0_50px_rgba(110,57,253,0.35)]"
              />
            </div>
          </AnimationContainer>
        </div>

        {/* Copy */}
        <div className="relative order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <AnimationContainer animation="fadeUp" delay={0.5}>
            <span className="eyebrow glass-panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-[0.65rem] text-brand-gold-light md:text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-gold opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-gold" />
              </span>
              {t("eyebrow")}
            </span>
          </AnimationContainer>

          <div className="mt-6 w-full md:mt-8">
            <AnimatedH1
              delay={0.1}
              className="text-[1.7rem] sm:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.4rem]"
            >
              {t("title")}
            </AnimatedH1>
            <AnimatedH1
              delay={0.25}
              className="gradient-lines text-[1.7rem] sm:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.4rem]"
            >
              {t("title2")}
            </AnimatedH1>
          </div>

          <AnimatedCopy
            delay={0.4}
            animateOnScroll={false}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            {t("description")}
          </AnimatedCopy>

          <AnimationContainer
            animation="fadeUp"
            delay={2}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:justify-start"
          >
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                {t("button")}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href="/projects">
                {t("secondaryButton")}
                <ArrowUpRight className="size-5 text-brand-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </AnimationContainer>

          <AnimationContainer
            animation="fadeUp"
            delay={3}
            className="mt-10 grid w-full max-w-xl grid-cols-3 gap-2.5 md:mt-14 md:gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative gradient-ring rounded-2xl bg-white/[0.03] px-3 py-4 text-left backdrop-blur-md md:px-5 md:py-5"
              >
                <p className="font-display text-2xl font-bold brand-gradient-text md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.62rem] uppercase leading-snug tracking-[0.16em] text-muted-foreground md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </AnimationContainer>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-[1] hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-[0.65rem] text-muted-foreground">{t("scroll")}</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent via-brand-lavender to-transparent animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
