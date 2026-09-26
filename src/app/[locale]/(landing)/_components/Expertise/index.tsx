import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollFloat from '@/components/global/scrol-float'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useIsIphoneOrSafari from '@/hooks/useIsIphoneOrSafari';
import { useTranslations } from 'next-intl';
import { WhatWeDo } from '@/types';
import AnimationContainer from '@/components/global/animation-container';
import Orbit from '@/components/global/Orbit';
import SectionLabel from '@/components/global/SectionLabel';
import GalaxyBackground from "@/components/global/GalaxyBackground";

gsap.registerPlugin(ScrollTrigger);




function Expertise() {


  const isIphoneOrSafari = useIsIphoneOrSafari();
    const container = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState(0);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
 const t = useTranslations('WhatWeDo');
 const services =  t.raw('services') as WhatWeDo[];
 const tSections = useTranslations('Sections');

    useEffect(() => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    }, []);
  
    useGSAP(
      () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
  
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
  
        window.addEventListener("resize", handleResize);
  
        const timeoutId = setTimeout(() => {
          if (windowWidth > 900) {
            const expertiseSection = document.querySelector(".expertise");
            const expertiseHeader = document.querySelector(".expertise-header");
            const services = document.querySelector(".services");
  
            if (expertiseSection && expertiseHeader && services) {
              ScrollTrigger.refresh();
  
              scrollTriggerRef.current = ScrollTrigger.create({
                trigger: expertiseSection,
                start: "top top",
                endTrigger: services,
                end: "bottom 70%",
                pin: expertiseHeader,
                pinSpacing: false,
                onEnter: () => {
                  gsap.to(expertiseHeader, { duration: 0.1, ease: "power1.out" });
                },
              });
            }
          }
        }, 100);
  
        return () => {
          window.removeEventListener("resize", handleResize);
          clearTimeout(timeoutId);
  
          if (scrollTriggerRef.current) {
            scrollTriggerRef.current.kill();
          }
        };
      },
      { dependencies: [windowWidth], scope: container }
    );
  
    useEffect(() => {
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);
  
      return () => {
        clearTimeout(refreshTimeout);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, []);


  return (
    <div className="page" ref={container}>
      <section className="expertise relative w-screen h-full min-h-screen bg-background">
        <GalaxyBackground variant="section" />
        <div
          aria-hidden="true"
          className="absolute -left-40 top-24 size-[520px] rounded-full bg-brand-indigo/15 blur-[140px]"
        />

        <div className="expertise-header lg:absolute top-0 left-0 w-screen lg:h-screen pt-20 lg:pt-24 overflow-hidden">
          <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 md:px-10 lg:justify-center lg:pb-16">
            <div className="relative z-[1] lg:w-[46%]">
              <SectionLabel index="(01)">{tSections("expertise")}</SectionLabel>
              <ScrollFloat
                animationDuration={1.3}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=60%"
                stagger={0.07}
                textClassName="pt-4 text-[10vw] md:text-[6.5vw] lg:text-[4.2vw]"
              >
                {t("title")}
              </ScrollFloat>
              <ScrollFloat
                animationDuration={1.3}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=60%"
                stagger={0.07}
                gradient
                textClassName={`${isIphoneOrSafari ? "text-[11vw]" : "text-[12vw]"} md:text-[8vw] lg:text-[5.2vw]`}
              >
                {t("title2")}
              </ScrollFloat>
              <Button asChild size="lg" className="group mt-8">
                <Link href="/contact">
                  {t("button")}
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <Orbit
              className="absolute -bottom-[18vw] left-[4%] hidden size-[34vw] lg:block"
              duration={90}
              opacity={0.35}
            />
          </div>
        </div>

        <div className="services relative mx-auto flex w-full max-w-[1440px] px-5 pt-12 pb-4 md:px-10 lg:py-28 will-change-transform">
          <div className="hidden lg:block lg:w-1/2" />
          <div className="flex-1 space-y-5 md:space-y-6">
            {services.map((service) => (
              <AnimationContainer key={service.number} animation="fadeUp">
                <article className="service group relative overflow-hidden rounded-3xl gradient-ring bg-space-850/70 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 md:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 size-44 rounded-full bg-brand-violet/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
                  />
                  <div className="relative flex items-center gap-4">
                    <span className="font-display text-sm font-semibold tracking-[0.2em] text-brand-gold">
                      ({service.number})
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-brand-gold/40 to-transparent" />
                  </div>
                  <AnimatedCopy tag="h3" className="relative mt-4 text-xl md:text-2xl">
                    {service.title}
                  </AnimatedCopy>
                  <ul className="relative mt-5 space-y-3">
                    {service.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand-lavender shadow-[0_0_8px_rgba(169,150,255,0.9)]"
                        />
                        <span className="text-sm leading-relaxed md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimationContainer>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Expertise
