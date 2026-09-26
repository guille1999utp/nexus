'use client'

import Nav from '../(landing)/_components/Nav/Nav'
import Footer from '../(landing)/_components/Footer/Footer'
import AnimatedH1 from '@/components/global/AnimatedH1/AnimatedH1'
import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy'
import Orbit from '@/components/global/Orbit'
import SectionLabel from '@/components/global/SectionLabel'
import ProjectsGallery from './_components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollToTopButton from '@/components/global/top-button'
import { useTranslations } from 'next-intl'


function Projects() {

  const t = useTranslations("ProjectPage");
  const tSections = useTranslations("Sections");

  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <main className="relative overflow-hidden" ref={container}>
      <Nav />
      <div className="relative cosmos-bg">
        <div aria-hidden="true" className="starfield absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="absolute -left-40 -top-40 size-[560px] rounded-full bg-brand-indigo/25 blur-[150px]" />
        <Orbit className="absolute -right-[30vw] -top-[18vw] size-[70vw] lg:-right-[14vw] lg:size-[46vw]" duration={110} opacity={0.35} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
        <section className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between overflow-x-hidden px-5 pt-28 md:px-10 md:pt-36">
          <div className="mb-8 space-y-3 lg:max-w-[70%]">
            <SectionLabel>{tSections("projects")}</SectionLabel>
            <AnimatedH1 delay={0} className="text-3xl md:text-5xl xl:text-6xl">{t("title")}</AnimatedH1>
            <AnimatedCopy className="!mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              {t("description")}
            </AnimatedCopy>
          </div>
          <ProjectsGallery />
        </section>
      </div>
      <ScrollToTopButton />
      <motion.div
        style={{ height }}
        className="bg-background relative mt-[50px] md:mt-[100px]"
      >
        <div className="h-[600%] w-[120%] left-[-10%] rounded-b-[50%] bg-background absolute z-[1] shadow-[0_60px_60px_rgba(2,5,26,0.85)] border-b border-brand-violet/20" />
      </motion.div>
      <Footer />
    </main>
  );
}

export default Projects
