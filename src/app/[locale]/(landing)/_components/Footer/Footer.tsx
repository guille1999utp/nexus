"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedH1 from "@/components/global/AnimatedH1/AnimatedH1";
import AnimationContainer from "@/components/global/animation-container";
import Orbit from "@/components/global/Orbit";
import { NexusLogo } from "@/components/global/NexusLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import TikTokIcon from "@/components/icons/tiktok";
import { Menu } from "@/types";
import { SOCIAL_LINKS, SocialId } from "@/data/socials";
import type { ComponentType } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CONTACT_EMAIL = "nexus.labs22@gmail.com";

const SOCIAL_ICONS: Record<SocialId, ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: TikTokIcon,
};

const Footer = () => {
  const t = useTranslations("Footer");
  const tMenu = useTranslations("Menu");
  const solutions = t.raw("solutions") as string[];
  const menu = tMenu.raw("options") as Menu[];

  return (
    <footer className="footer relative w-full overflow-hidden rounded-t-[2rem] pt-16 md:rounded-t-[3rem] md:pt-24">
      {/* Deep-space decoration */}
      <Orbit
        className="absolute -right-[25vw] -top-[20vw] size-[70vw] md:-right-[15vw]"
        duration={120}
        opacity={0.3}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-violet/70 to-transparent"
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-16 px-5 md:gap-20 md:px-10">
        {/* CTA band */}
        <AnimationContainer animation="fadeUp">
          <div className="relative gradient-ring overflow-hidden rounded-3xl bg-white/[0.03] p-6 backdrop-blur-xl md:p-10 lg:p-14">
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow text-brand-gold-light">{t("tagline")}</span>
                <h2 className="mt-4 text-2xl md:text-4xl">{t("ctaTitle")}</h2>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  {t("ctaDescription")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <Button asChild size="lg" variant="gold" className="group">
                  <Link href="/contact">
                    {t("ctaButton")}
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                >
                  <Mail className="size-4 text-brand-lavender" />
                  <span className="group-hover:underline">{CONTACT_EMAIL}</span>
                </Link>
              </div>
            </div>
          </div>
        </AnimationContainer>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 flex flex-col items-center gap-4 md:col-span-4 md:items-start">
            <div className="w-44 md:w-52">
              <NexusLogo sizes="210px" />
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h3 className="eyebrow mb-5 text-brand-gold">{t("navigation")}</h3>
            <ul className="space-y-3">
              {menu.map((item) => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className="text-foreground/85 transition-colors hover:text-brand-lavender"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-foreground/85 transition-colors hover:text-brand-lavender"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-foreground/85 transition-colors hover:text-brand-lavender"
                >
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow mb-5 text-brand-gold">{t("solution")}</h3>
            <ul className="space-y-3 text-foreground/85">
              {solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <h3 className="eyebrow mb-5 text-brand-gold">{t("social")}</h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ id, label, href }) => {
                const Icon = SOCIAL_ICONS[id];
                return (
                <Link
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass-panel flex size-11 items-center justify-center rounded-full text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-brand-lavender/50 hover:text-brand-lavender"
                >
                  <Icon className="size-5" />
                </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="footer-logo -mb-[2vw] select-none text-center">
          <AnimatedH1
            animateOnScroll={true}
            scrollStart="top 98%"
            className="fade-lines text-[20vw] font-bold uppercase leading-[0.95] tracking-tight md:text-[11.5vw]"
          >
            {t("logoText1")} <span className="block md:inline">{t("logoText2")}</span>
          </AnimatedH1>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-10 md:pr-24 md:text-sm">
          <p>
            {t("logoTextComplete")} &copy;{new Date().getFullYear()}. {t("rights")}
          </p>
          <p className="eyebrow text-[0.65rem]">{t("by")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
