
'use client'

import Nav from '../(landing)/_components/Nav/Nav'
import Footer from '../(landing)/_components/Footer/Footer'
import AnimatedH1 from '@/components/global/AnimatedH1/AnimatedH1'
import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function TermsOfService() {
    const container = useRef<HTMLDivElement>(null);
  
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"],
    });
  
    const height = useTransform(scrollYProgress, [0, 1], [30, 0]);


  return (
    <main className="relative overflow-hidden">
      <Nav />
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-20 2xl:pt-40 lg:max-w-[55%] w-screen inset-0 flex flex-col justify-between md:w-[95%] overflow-x-hidden mx-auto px-5">
        <div className="p-2">
          <span className="eyebrow mb-4 block text-brand-gold-light">Nexus Labs</span>
          <AnimatedH1 delay={0} className="text-4xl md:text-6xl">Terms Of Service</AnimatedH1>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <AnimatedCopy>
              Al usar nuestros servicios de software, aceptas un pacto de
              innovación responsable. Desarrollamos herramientas tecnológicas
              bajo licencia de uso **no transferible**, donde tú conservas la
              propiedad absoluta de tus datos y nosotros la del código fuente.
              Nuestras soluciones se entregan &quot;en estado actual&quot;,
              optimizadas para evolucionar mediante actualizaciones continuas
              que despliegan inteligencia predictiva. Prohibimos explícitamente
              ingeniería inversa, redistribución no autorizada, o cualquier uso
              que comprometa la integridad de nuestros sistemas neuronales de
              aprendizaje automático.
            </AnimatedCopy>

            <AnimatedCopy delay={0.25}>
              Operamos bajo un modelo de responsabilidad compartida: nosotros
              garantizamos uptime 99.97% con SLA respaldado por infraestructura
              multi-cloud, tú eres responsable de gestionar accesos y cumplir
              regulaciones de tu industria. Los pagos recurrentes se ejecutan en
              entornos PCI-DSS certificados, con opción a pagos en cripto
              mediante smart contracts. Ofrecemos ventanas de reversión de 72h
              para transacciones disputadas y migración gratuita de datos si
              cancelas. Las suscripciones incluyen créditos flexibles para API
              calls + overages facturados con predictores de uso en tiempo real.
            </AnimatedCopy>

            <AnimatedCopy delay={0.5}>
              Limitamos nuestra responsabilidad a 12x el monto pagado en los
              últimos 6 meses, excluyendo daños consecuentes o pérdida de datos
              por mal uso. Controversias se resolverán en arbitraje binding bajo
              reglas CCI con sede en [tu país]. Nos reservamos el derecho de
              terminar cuentas que detectemos en abuso sistémico, con
              notificación preventiva vía blockchain. Estos términos se rigen
              por nuestra Constitución Digital DAO (accesible en /gobernanza),
              donde los usuarios premium pueden proponer modificaciones votadas
              en cadena de bloques.
            </AnimatedCopy>
          </div>
        </div>
      </section>
      <motion.div
        style={{ height }}
        className="relative mt-[50px] md:mt-[100px]"
      >
      </motion.div>
      <Footer />
    </main>
  );
}

export default TermsOfService