

'use client'

import Nav from '../(landing)/_components/Nav/Nav'
import Footer from '../(landing)/_components/Footer/Footer'
import AnimatedH1 from '@/components/global/AnimatedH1/AnimatedH1'
import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy'
import AnimationContainer from '@/components/global/animation-container';
import { motion, useScroll, useTransform } from 'framer-motion';
import {  useRef } from 'react';
import GalaxyBackground from "@/components/global/GalaxyBackground";

function PrivacyPolicy() {

    const container = useRef<HTMLDivElement>(null);
  
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"],
    });
  
    const height = useTransform(scrollYProgress, [0, 1], [30, 0]);
   
    

  return (
    <main ref={container} className="relative overflow-hidden cosmos-bg">
      <GalaxyBackground variant="quiet" className="h-[120vh]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-brand-indigo/25 blur-[150px]" />
      <Nav />
      <section className="relative pt-28 md:pt-36 2xl:pt-40 lg:max-w-[55%] w-screen inset-0 flex flex-col justify-between md:w-[95%] overflow-x-hidden mx-auto px-5">
        <div className="p-2">
          <AnimationContainer animation="fadeUp" delay={0}>
            <span className="eyebrow mb-4 block text-brand-gold-light">Nexus Labs</span>
            <AnimatedH1 delay={0} className="text-4xl md:text-6xl">Privacy Policy</AnimatedH1>
          </AnimationContainer>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <AnimationContainer animation="fadeUp" delay={0}>
              <AnimatedCopy>
                En Nexus Labs, la privacidad es el cimiento de nuestra
                relación digital. Somos guardianes de la confianza que depositas
                en nosotros, protegiendo tus datos con estándares industriales
                líderes y transparencia radical. Cada byte de información que
                compartes se gestiona bajo principios éticos de minimización de
                datos, almacenando solo lo esencial para entregarte experiencias
                tecnológicas personalizadas y seguras. Nuestro compromiso: tus
                datos nunca se comercializan, y cada proceso sigue rigurosos
                protocolos GDPR y CCPA.
              </AnimatedCopy>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0}>
              <AnimatedCopy delay={0.25}>
                Recopilamos información estratégica para potenciar tu
                experiencia: datos de uso en tiempo real, patrones de
                interacción con nuestro software, y métricas de rendimiento
                técnico. Estos insumos se transforman en innovación mediante
                análisis con IA ética y modelos de aprendizaje automático no
                invasivos. Nuestro ecosistema de seguridad incluye cifrado
                cuántico, auditorías pentesting trimestrales, y arquitectura
                Zero-Trust. Los datos fluyen en una red privada blockchain para
                trazabilidad absoluta, garantizando que cada modificación queda
                registrada en un ledger inmutable.
              </AnimatedCopy>
            </AnimationContainer>
            <AnimationContainer animation="fadeUp" delay={0}>
              <AnimatedCopy delay={0.5}>
                Tu control es primordial. A través de nuestro Security
                Dashboard, puedes: 1) Ejercer derechos ARCO (Acceso,
                Rectificación, Cancelación, Oposición) en 1 clic, 2) Gestionar
                preferencias de recopilación en tiempo real, 3) Descargar tu
                huella digital completa en formato abierto. Actualizamos
                nuestras políticas con un sistema de gobernanza colaborativa -
                cada cambio se somete a votación comunitaria en nuestra
                plataforma DAO, asegurando que evolucionamos junto a tus
                expectativas de privacidad.
              </AnimatedCopy>
            </AnimationContainer>
          </div>
        </div>
      </section>
      <motion.div
        style={{ height }}
        className="bg-background relative mt-[50px] md:mt-[100px]"
      >
        <div className="h-[500%] w-[120%] left-[-10%] rounded-b-[50%] bg-background absolute z-[1] shadow-[0_60px_60px_rgba(2,5,26,0.85)] border-b border-brand-violet/20" />
      </motion.div>
      <Footer />
    </main>
  );
}

export default PrivacyPolicy