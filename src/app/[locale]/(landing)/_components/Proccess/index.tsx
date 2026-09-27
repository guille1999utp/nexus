'use client'

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ScrollFloat from '@/components/global/scrol-float';
import { useMediaQuery } from "react-responsive"
import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy';
import Lenis from 'lenis';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Steps } from '@/types';
import SectionLabel from '@/components/global/SectionLabel';

const Proccess = () => {
  const stickyCardsRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [isSafariMobile, setIsSafariMobile] = useState(false);

   const isMobile = useMediaQuery({ maxWidth: 768 })
 const t = useTranslations('Steps');
 const steps =  t.raw('steps') as Steps[];
 const tSections = useTranslations('Sections');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = /^((?!chrome|android).)*safari/.test(userAgent);
    const isIPhone = /iphone/.test(userAgent);
    
    // Define un umbral basado en la altura en el que deseas aplicar el ajuste
    const widthThreshold = 430; // Ajusta este valor según tus pruebas

    if (isSafari && isIPhone && window.innerWidth <= widthThreshold) {
      setIsSafariMobile(true);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    const onTick = (time: number) => lenis.raf(time * 1000);
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const cards = Array.from(
      stickyCardsRef.current?.querySelectorAll('.card') || []
    ) as HTMLElement[];
    // A phone has no room for the desktop tilt: on a 412px screen a 12deg
    // rotation alone adds ~95px to the card's bounding width.
    const narrow = () => window.innerWidth < 768;
    const rotations = narrow()
      ? [-5, 4, -3, 3, -2, -1]
      : [-12, 10, -5, 5, -5, -2];
    const maxRotation = Math.max(...rotations.map(Math.abs));

    // How far a spent card may slide before its rotated corners leave the
    // viewport. Derived from the card's real size rather than guessed.
    const shiftLimit = () => {
      const card = cards[0];
      if (!card) return 0;
      const rad = (maxRotation * Math.PI) / 180;
      const boxWidth =
        card.offsetWidth * Math.cos(rad) + card.offsetHeight * Math.sin(rad);
      return Math.max(0, (window.innerWidth - boxWidth) / 2 - 8);
    };

    cards.forEach((card, index) => {
      gsap.set(card, {
        // Centring lives here, not in a Tailwind translate class: GSAP owns the
        // whole `transform`, so a class-based translate is raced away.
        xPercent: -50,
        yPercent: -50,
        y: window.innerHeight,
        rotate: rotations[index],
      });
    });

     // Detectar la aparición de la primera tarjeta
     const firstCardTrigger = ScrollTrigger.create({
      trigger: firstCardRef.current,
      start: 'top 70%',
      onEnter: () => setIsBlurred(true),
      onLeaveBack: () => setIsBlurred(false),
    });

    // Trigger para detectar cuando el título llega al top de la pantalla
    const titleTrigger = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 70%',
      onEnter: () => setCardsVisible(true),
      onLeaveBack: () => setCardsVisible(false),
    });

    let scrollTrigger: ScrollTrigger | null = null;

    // Solo activa la animación de las tarjetas cuando cardsVisible sea true
    if (cardsVisible) {
      scrollTrigger = ScrollTrigger.create({
        trigger: stickyCardsRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = cards.length;
          const progressPerCard = 1 / totalCards;

          cards.forEach((card, index) => {
            const cardStart = index * progressPerCard;
            let cardProgress = (progress - cardStart) / progressPerCard;
            cardProgress = Math.min(Math.max(cardProgress, 0), 1);

            let yPos = window.innerHeight * (1 - cardProgress);
            let xPos = 0;

            if (cardProgress === 1 && index < totalCards - 1) {
              const remainingProgress =
                (progress - (cardStart + progressPerCard)) / 
                (1 - (cardStart + progressPerCard));
              
              if (remainingProgress > 0) {
                const distanceMultiplier = 1 - index * 0.15;
                // Sideways room is what a phone lacks, so narrow screens send
                // the spent cards upward instead of out to the left.
                const ySpread = narrow() ? 0.22 : 0.3;
                const xTravel = Math.min(window.innerWidth * 0.3, shiftLimit());
                xPos = -xTravel * distanceMultiplier * remainingProgress;
                yPos = -window.innerHeight * ySpread * distanceMultiplier * remainingProgress;
              }
            }

            gsap.to(card, {
              y: yPos,
              x: xPos,
              duration: 0,
              ease: 'none',
            });
          });
        },
      });
    }

   

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      titleTrigger.kill();
      scrollTrigger?.kill();
      firstCardTrigger.kill();
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, [cardsVisible]);

  return (
    <>
      <section
        className="relative w-screen h-screen overflow-hidden max-sm:!pt-24"
        ref={stickyCardsRef}
      >
        <div
          className={`relative flex flex-col px-4 mx-auto max-w-[1800px] md:h-full pb-10 justify-center items-center text-center transition-all duration-500 ${
            isBlurred ? "blur-[6px]" : ""
          }`}
        >
          <SectionLabel index="(05)" align="center">
            {tSections("process")}
          </SectionLabel>
          <ScrollFloat
            animationDuration={1.3}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=60%"
            stagger={0.07}
            ref={isMobile ? titleRef : null}
            textClassName="pt-4 px-5 text-[12vw] md:text-[7vw] lg:text-[5.4vw]"
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
            ref={isMobile ? titleRef : null}
            textClassName="pb-3 px-5 text-[14vw] md:text-[9vw] lg:text-[7vw]"
          >
            {t("title2")}
          </ScrollFloat>

          <AnimatedCopy className="max-w-3xl mx-auto justify-center text-center text-muted-foreground text-base md:text-lg mb-6">
            {t("description")}
          </AnimatedCopy>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/contact">
              {t("buttonText")}
              <ArrowRight className="size-5 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {steps.map((step, index) => (
          <div
            ref={index === 0 ? firstCardRef : null}
            className={`card absolute overflow-hidden ${isSafariMobile ? "top-[30%]" : "top-[60%]"} md:top-[50%]
            left-1/2
            will-change-transform
            md:w-[45%] xl:w-1/4 h-1/2 xl:h-[60%] rounded-3xl p-1.5 md:p-2
            text-white max-md:w-[78%] max-md:max-w-[340px] max-md:h-[54vh]
            shadow-[0_40px_80px_-30px_rgba(2,5,26,0.95)]
            ${
              index % 2 === 0
                ? "bg-linear-to-br from-brand-lavender via-brand-violet to-brand-blue"
                : "bg-linear-to-br from-brand-gold via-brand-violet/80 to-brand-indigo"
            }`}
            key={index}
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem]">
              {/* Background image with a deep-space gradient */}
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={`${step.image}`}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 75vw, (max-width: 1280px) 45vw, 25vw"
                  className="object-cover object-[50%_28%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-space-950 from-5% via-space-950/60 via-35% to-transparent to-65%" />
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto p-5 md:p-6">
                <span className="font-display text-sm font-semibold tracking-[0.25em] text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-left text-[6.5vw] leading-[1.15] md:text-[3.6vw] xl:text-[2vw]">
                  {step.title}
                </h3>
                <p className="mt-3 text-left text-sm leading-relaxed text-white/80 md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Proccess;
