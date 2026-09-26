"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Orbit from "@/components/global/Orbit";
import { NexusLogo } from "@/components/global/NexusLogo";
import GalaxyBackground from "@/components/global/GalaxyBackground";

gsap.registerPlugin(ScrollTrigger);

// Alternating frames echo the logo sweep: violet → blue and gold → violet.
const FRAMES = [
  "bg-linear-to-br from-brand-lavender via-brand-violet to-brand-blue",
  "bg-linear-to-br from-brand-gold via-brand-violet/80 to-brand-indigo",
];

export default function CTA() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const scrollTriggerSettings = {
      trigger: ".main",
      start: isMobile ? "top 20%" : "top 30%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -600];
    const rightXValues = [800, 900, 500];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".cta-row").forEach((row, index) => {
      const cardLeft = (row as HTMLElement).querySelector(".card-left");
      const cardRight = (row as HTMLElement).querySelector(".card-right");

      if (cardLeft && cardRight) {
        gsap.to(cardLeft, {
          x: leftXValues[index],
          scrollTrigger: {
            trigger: ".main",
            start: isMobile ? "top 35%" : "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              (cardLeft as HTMLElement).style.transform = `translateX(${
                progress * leftXValues[index]
              }px) translateY(${progress * yValues[index]}px) rotate(${
                progress * leftRotationValues[index]
              }deg)`;
              (cardRight as HTMLElement).style.transform = `translateX(${
                progress * rightXValues[index]
              }px) translateY(${progress * yValues[index]}px) rotate(${
                progress * rightRotationValues[index]
              }deg)`;
            },
          },
        });
      }
    });

    gsap.to(".cta-logo", {
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.6)",
      scrollTrigger: scrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];

    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div
          className="cta-row relative w-full my-2 md:my-4 flex justify-center gap-4 md:gap-8"
          key={i}
        >
          <div
            className={`card card-left relative h-[220px] sm:h-[250px] md:h-[310px] xl:h-[360px] 2xl:h-[410px] overflow-hidden will-change-transform w-[90%] sm:w-[80%] md:w-[70%] xl:w-[43%] 2xl:w-[36%] rounded-2xl md:rounded-3xl p-1.5 md:p-2 shadow-[0_30px_60px_-20px_rgba(2,5,26,0.9)] ${FRAMES[(i + 1) % 2]}`}
          >
            <Image
              src={`/landing/landing-${2 * i - 1}.webp`}
              alt=""
              className="h-full w-full rounded-xl md:rounded-2xl object-cover"
              width={1000}
              height={1000}
            />
          </div>
          <div
            className={`card card-right hidden md:block relative h-[270px] sm:h-[250px] md:h-[310px] xl:h-[360px] 2xl:h-[410px] overflow-hidden will-change-transform w-[90%] sm:w-[80%] md:w-[70%] xl:w-[43%] 2xl:w-[36%] rounded-2xl md:rounded-3xl p-1.5 md:p-2 shadow-[0_30px_60px_-20px_rgba(2,5,26,0.9)] ${FRAMES[i % 2]}`}
          >
            <Image
              src={`/landing/landing-${2 * i}.webp`}
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full rounded-xl md:rounded-2xl object-cover"
            />
          </div>
        </div>
      );
    }

    return rows;
  };

  return (
    <section className="main relative flex w-screen flex-col items-center justify-center overflow-hidden bg-background">
      <GalaxyBackground variant="section" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[45%] size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/20 blur-[140px]"
      />

      <div className="main-content absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-4">
        <div className="cta-logo relative w-[80vw] max-w-[540px] md:w-[40vw] scale-0">
          <Orbit className="absolute inset-[-16%]" duration={50} opacity={0.4} orbs={false} />
          <NexusLogo sizes="(max-width: 768px) 80vw, 40vw" className="drop-shadow-[0_0_60px_rgba(110,57,253,0.4)]" />
        </div>
      </div>

      {generateRows()}
    </section>
  );
}
