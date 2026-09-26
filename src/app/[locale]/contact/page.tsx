'use client'

import React, { useEffect, useRef, useState } from 'react'
import ContactForm from './_components/form/indexs';
import ContactInfo from './_components/contact-info';
import { motion, useScroll, useTransform } from 'framer-motion';
import Orbit from '@/components/global/Orbit';

function ContactPage() {

  const container = useRef<HTMLDivElement>(null);
  const [isOutside, setIsOutside] = useState(true);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], [30, 0]);
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

  return (
      <div ref={container} className={`relative ${isOutside ? "overflow-hidden" : ""}`}>
        <Orbit className="absolute -left-[30vw] top-[10%] size-[70vw] lg:-left-[18vw] lg:size-[48vw]" duration={110} opacity={0.35} />
        <section className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between overflow-x-hidden px-5 pt-28 md:px-10 md:pt-32 2xl:pt-40">
          <div className="grid grid-cols-1 gap-10 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>
        <motion.div
          style={{ height }}
          className="relative mt-[50px] md:mt-[100px]"
        >
        </motion.div>
      </div>
  );
}

export default ContactPage
