
import ScrollFloat from "@/components/global/scrol-float";
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useIsIphoneOrSafari from "@/hooks/useIsIphoneOrSafari";
import Marquee from "@/components/ui/marquee";
import AnimationContainer from "@/components/global/animation-container";
import SectionLabel from "@/components/global/SectionLabel";
import { useTranslations } from "next-intl";
import GalaxyBackground from "@/components/global/GalaxyBackground";

export default function Brands() {
const container = useRef<HTMLDivElement>(null);
const [isOutside, setIsOutside] = useState(true);
const isIphoneOrSafari = useIsIphoneOrSafari();
const t = useTranslations("Stack");
const tSections = useTranslations("Sections");

const { scrollYProgress } = useScroll({
  target: container,
  offset: ["start end", "end start"],
});

useEffect(() => {
  const handleScroll = () => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    setIsOutside(!isVisible);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Ejecutar en el primer render

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


const listLogos = Array.from({ length: 24 }, (_, index) => {
  const logoNumber = index + 1;
  const hasDarkVersion = [1, 12, 16, 17,18, 20, 21, 22, 23, 24].includes(logoNumber);

  // Definir tamaños personalizados
  const customSizes: Record<number, string> = {
    1:  "w-[9vh] md:w-[12vh]",
    3:  "w-[6vh] md:w-[8vh]",
    4:  "w-[6vh] md:w-[8vh]",
    5:  "w-[7vh] md:w-[8vh]",
    6:  "w-[7vh] md:w-[8vh]",
    7:  "w-[7vh] md:w-[8vh]",
    8:  "w-[5vh] md:w-[7vh]",
    9:  "w-[8vh] md:w-[8vh]",
    10: "w-[8vh] md:w-[8vh]",
    12: "w-[8vh] md:w-[11vh]",
    14: "w-[8vh] md:w-[9vh]",
    15: "w-[8vh] md:w-[10vh]",
    19: "w-[13vh] md:w-[17vh]",
    23: "w-[13vh] md:w-[17vh]",
    };

  return {
    light: `${logoNumber}.svg`,
    dark: hasDarkVersion ? `${logoNumber}_dark.svg` : `${logoNumber}.svg`,
    size: customSizes[logoNumber] || "md:w-[13vh]", // Usa el personalizado o el default
  };
});


  // Separar en dos grupos
  const firstHalf = listLogos.slice(0, 8);
  const secondHalf = listLogos.slice(8, 16);
  const thirdHalf = listLogos.slice(16, 24);


  
  const height = useTransform(scrollYProgress, [0, 1], [30, 0]);
    return (
      <section
        ref={container}
        className={`relative mt-10 md:mt-20 ${isOutside ? "overflow-hidden" : ""}`}
      >
        <GalaxyBackground variant="section" />
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 size-[480px] rounded-full bg-brand-indigo/15 blur-[140px]"
        />
        <div className="relative mx-auto mb-10 max-w-[1440px] px-5 sm:mb-14 md:mb-20 md:px-10">
          <SectionLabel index="(04)">{tSections("stack")}</SectionLabel>
          <ScrollFloat
            animationDuration={1.3}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=60%"
            stagger={0.07}
            textClassName="pt-3 text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.4vw]"
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
            textClassName={`${isIphoneOrSafari ? "text-[10vw]" : "text-[11vw]"} md:text-[7vw] lg:text-[5.6vw]`}
          >
            {t("title2")}
          </ScrollFloat>
          <AnimationContainer animation="fadeUp" delay={0.4}>
            <p className="mt-5 max-w-3xl text-start text-base text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </AnimationContainer>
        </div>

        <div className="w-full relative -rotate-[4deg] md:-rotate-3 overflow-hidden top-[2.4rem] md:top-auto">
          <Marquee
            className="[--duration:30s] select-none [--gap:1.2rem] md:[--gap:1.5rem] lg:[--gap:3.2rem] border-y border-white/10 bg-white/[0.02] backdrop-blur-md h-[95px] md:h-[120px]"
            reverse
          >
            {firstHalf.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-white h-10 md:h-14"
              >
                <Image
                  alt={`Logo ${index + 1}`}
                  width={100}
                  height={100}
                  loading="lazy"
                  src={`/brands/${logo.dark}`}
                  className={`object-cover ${logo.size}`}
                />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 -right-1 w-[10%] bg-linear-to-l from-background z-40"></div>
          <div className="pointer-events-none absolute inset-y-0 -left-1 w-[10%] bg-linear-to-r from-background z-40"></div>
        </div>

        <div className="w-full relative rotate-[2deg] top-9 md:top-0 overflow-hidden sm:-left-2">
          <Marquee className="[--duration:30s] select-none [--gap:1.2rem] md:[--gap:1.5rem] lg:[--gap:3.2rem] border-y border-brand-violet/40 bg-linear-to-r from-brand-violet/25 via-brand-blue/15 to-brand-gold/20 backdrop-blur-md h-[95px] md:h-[120px]">
            {secondHalf.map((logo, index) => (
              <div
                key={index + 12}
                className="flex items-center justify-center text-white h-10 md:h-14"
              >
                <div className="relative">
                  <Image
                    alt={`Logo ${index + 9}`}
                    width={100}
                    height={100}
                    loading="lazy"
                    src={`/brands/${logo.dark}`}
                    className={`object-cover ${logo.size}`}
                  />
                </div>
              </div>
            ))}
          </Marquee>
          <div className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-linear-to-r from-transparent via-brand-gold/70 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 -right-1 w-[10%] bg-linear-to-l from-background z-40"></div>
          <div className="pointer-events-none absolute inset-y-0 -left-1 w-[10%] bg-linear-to-r from-background z-40"></div>
        </div>

        <div className="w-full relative -rotate-[4deg] md:-rotate-3 overflow-hidden top-[2.4rem] md:top-auto">
          <Marquee
            className="[--duration:20s] select-none [--gap:1.2rem] md:[--gap:1.5rem] lg:[--gap:3.2rem] border-y border-white/10 bg-white/[0.02] backdrop-blur-md h-[95px] md:h-[120px]"
            reverse
          >
            {thirdHalf.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-white h-10 md:h-14"
              >
                <Image
                  alt={`Logo ${index + 17}`}
                  width={100}
                  height={100}
                  loading="lazy"
                  src={`/brands/${logo.dark}`}
                  className={`object-cover ${logo.size}`}
                />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 -right-1 w-[10%] bg-linear-to-l from-background z-40"></div>
          <div className="pointer-events-none absolute inset-y-0 -left-1 w-[10%] bg-linear-to-r from-background z-40"></div>
        </div>
        {/* Curved edge into the next section */}
        <motion.div
          style={{ height }}
          className="bg-background relative mt-[50px] md:mt-[100px]"
        >
          <div className="h-[1550%] w-[120%] left-[-10%] rounded-b-[50%] bg-background absolute z-[1] shadow-[0_60px_60px_rgba(2,5,26,0.85)] border-b border-brand-violet/20" />
        </motion.div>
      </section>
    );
}
