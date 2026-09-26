
import AnimationContainer from "@/components/global/animation-container";
import ScrollFloat from "@/components/global/scrol-float";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useIsIphoneOrSafari from "@/hooks/useIsIphoneOrSafari";
import { Faq } from "@/types";
import SectionLabel from "@/components/global/SectionLabel";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
import GalaxyBackground from "@/components/global/GalaxyBackground";

const FAQ = () => {
    const isIphoneOrSafari = useIsIphoneOrSafari();
const t = useTranslations('Faqs');
 const Faqs =  t.raw('faqs') as Faq[];
 const tSections = useTranslations('Sections');
    
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], [30, 0]);
    
    

    return (
     <section ref={container} className="relative">
        <GalaxyBackground variant="section" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-40 size-[520px] rounded-full bg-brand-violet/15 blur-[150px]"
        />
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pt-16 md:px-10 md:pt-24 lg:grid-cols-2 lg:gap-16 lg:pt-32">
          <div className="row flex flex-col">
            <div>
              <SectionLabel index="(06)">{tSections("faq")}</SectionLabel>
              <ScrollFloat
                animationDuration={1.3}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=60%"
                stagger={0.07}
                textClassName="pt-4 text-[10vw] md:text-[6vw] lg:text-[3.8vw]"
              >
                {t('title')}
              </ScrollFloat>
              <ScrollFloat
                animationDuration={1.3}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=60%"
                stagger={0.07}
                gradient
                textClassName={`${isIphoneOrSafari ? "text-[11vw]" : "text-[12vw]"} md:text-[7.5vw] lg:text-[5vw]`}
              >
                {t('title2')}
              </ScrollFloat>
              <AnimationContainer animation="fadeUp" delay={0.4}>
                <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
                  {t('description')}
                </p>
              </AnimationContainer>
            </div>
            <div>
              <Button asChild size="lg" className="group mt-8">
                <Link href="/contact">
                  {t('buttonText')}
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:pt-6">
            <Accordion type="single" collapsible className="w-full space-y-3 cursor-default">
              {Faqs.map((item, index) => (
                <AnimationContainer
                  key={index}
                  animation="fadeUp"
                  delay={0.5 + index * 0.1}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="glass-panel rounded-2xl px-5 md:px-6 cursor-pointer transition-colors duration-300 hover:border-white/15 data-[state=open]:border-brand-violet/40 data-[state=open]:bg-space-800/70"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-medium text-foreground hover:no-underline sm:py-5 md:text-lg">
                      <span className="flex items-start gap-4">
                        <span className="mt-1 font-display text-xs font-semibold tracking-[0.2em] text-brand-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9 text-left text-muted-foreground md:text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimationContainer>
              ))}
            </Accordion>
          </div>
        </div>
        <motion.div
          style={{ height }}
          className="bg-background relative mt-[50px] md:mt-[100px]"
        >
          <div className="h-[1400%] w-[120%] left-[-10%] rounded-b-[50%] bg-background absolute z-[1] shadow-[0_60px_60px_rgba(2,5,26,0.85)] border-b border-brand-violet/20" />
        </motion.div>
     </section>
    );
};

export default FAQ;
