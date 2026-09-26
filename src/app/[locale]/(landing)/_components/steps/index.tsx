import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { useMediaQuery } from 'react-responsive'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Project } from '@/types'
import AnimationContainer from '@/components/global/animation-container'
import AnimatedH1 from '@/components/global/AnimatedH1/AnimatedH1'
import SectionLabel from '@/components/global/SectionLabel'

function Steps() {
  const stickySectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const countContainerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const headerContainerRef = useRef<HTMLDivElement>(null);

   const t = useTranslations('Projects');
   const projects =  t.raw('projects') as Project[];
   const tSections = useTranslations('Sections');


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  
    // Configurar Lenis
    lenisRef.current = new Lenis()
    const lenis = lenisRef.current
  
    lenis.on('scroll', ScrollTrigger.update)
  
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  
    // Configurar ScrollTrigger
    const stickySection = stickySectionRef.current
    if (!stickySection) return
  
    const stickyHeight = window.innerHeight * (isMobile ?  2: 2.5)
    const cards = cardsRef.current
    const totalCards = cards.length
  
    const getRadius = () => {
      return window.innerWidth < 900
        ? window.innerWidth * 7.5
        : window.innerWidth * 2.5
    }
  
    const arcAngle = Math.PI * 0.3
    const startAngle = Math.PI / 2 - arcAngle / 2
  
    const positionCards = (progress = 0) => {
      const radius = getRadius()
  // Reducir el totalTravel para una transición más rápida
  const totalTravel = 1 + totalCards / 3.5
  // Ajustar la progresión para que empiece antes
  const adjustedProgress = (progress * totalTravel - 0.5) * 0.75
  
      cards.forEach((card, i) => {
        if (!card) return
        
        const normalizedProgress = (totalCards - 1 - i) / totalCards
        const cardProgress = normalizedProgress + adjustedProgress
        const angle = startAngle + arcAngle * cardProgress
  
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI)
  
        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        })
      })
    }
  
    const scrollTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top", // Inicia cuando el borde superior está al 60% del viewport
      end: `+=${stickyHeight }px`, // Reduce la distancia total del scroll
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positionCards(self.progress)
      },
    })
  
    positionCards(0)
  
    // Animación de salida del encabezado
     const headerAnimation = gsap.timeline({ paused: true })
    // headerAnimation.to(headerContainerRef.current, {
    //   yPercent: -120,
    //   opacity: 0,
    //   duration: 0.8,
    //   ease: "power2.inOut"
    // })
  
    ScrollTrigger.create({
        trigger: stickySection,
        start: `+=${stickyHeight}px`, // Inicia después del scroll de las cards
        end: "+=10%", // 30% del viewport adicional
        animation: headerAnimation,
        scrub: 1, // Scroll-linked animation
        onLeaveBack: () => headerAnimation.reverse()
      })

    ScrollTrigger.create({
      trigger: stickySection,
      start: `top 0%`, // Inicia antes
      end: "top 0%",
      animation: headerAnimation,
      scrub: true,
    })
  
    // Intersection Observer
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0% 0% -30% 0%",
      threshold: 0.2,
    }
  
    let currentCardIndex = 0
    const observer = new IntersectionObserver((entries) => {
        if (!countContainerRef.current) return;
        
        const totalCounts = countContainerRef.current.children.length;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = cards.findIndex(card => card === entry.target);
            
            if (cardIndex < 0 || cardIndex >= totalCounts) return;
            
            currentCardIndex = Math.min(cardIndex, totalCounts);
            
            if (countContainerRef.current) {
                const firstNumber = countContainerRef.current.children[0] as HTMLElement;
                const numberHeight = firstNumber.getBoundingClientRect().height;
                
                const targetY = -currentCardIndex * (numberHeight * 1);
                const maxY = -(countContainerRef.current.children.length - 1) * numberHeight;
              
                gsap.to(countContainerRef.current, {
                  y: isMobile ? Math.max(targetY, maxY) : 150 - currentCardIndex * 160,
                  duration: 0.2,
                  ease: "power1.out",
                });
              }
          }
        });
      }, options);
      
      cards.forEach((card, index) => {
        if (card && countContainerRef.current && index < countContainerRef.current.children.length) {
          observer.observe(card);
        }
      });
  
    // Event listeners
    const handleResize = () => positionCards(0)
    window.addEventListener('resize', handleResize)
  
    // Cleanup
    return () => {
      lenis.destroy()
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(() => lenis.raf(0))
    }
  }, [])

  const counters = ["01", "02", "03", "04", "05", ...(isMobile ? [] : ["06"])];

  return (
    <div className="relative h-full w-full overflow-hidden p-5">
      <section className="steps" ref={stickySectionRef}>
        <div
          className="absolute z-[2] flex flex-col m-[4em_2em_2em_0] md:m-[5em_2em_2em_1em] will-change-transform"
          ref={headerContainerRef}
          style={{ transform: "translateY(0)" }}
        >
          <SectionLabel index="(03)">{tSections("projects")}</SectionLabel>
          <div className="relative mt-3 w-[1200px] h-[17vw] md:h-[11vw] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] overflow-hidden">
            <AnimatedH1
              delay={0}
              className="w-full relative inline-block text-[11vw] md:text-[7vw] leading-[1.1] will-change-transform"
            >
              {t("title")}
            </AnimatedH1>
          </div>
          <AnimationContainer animation="fadeUp" delay={0.4}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-brand-lavender transition-colors hover:text-brand-gold md:text-base"
            >
              {t("LinkText")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 md:size-5" />
            </Link>
          </AnimationContainer>
          <div className="relative w-[1200px] h-[150px] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] overflow-hidden md:left-[-6px]">
            <div
              className="relative translate-y-[170px] will-change-transform"
              ref={countContainerRef}
            >
              {counters.map((n) => (
                <h2
                  key={n}
                  className="w-fit brand-gradient-text text-[100px] md:text-[150px] leading-[150px] pt-[10px] font-bold tracking-tight"
                >
                  {n}
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-[50%] left-1/2 -translate-y-1/2 w-[130vw] h-[600px] will-change-transform md:top-[50%] mt-[90%] sm:mt-[12%]">
          {projects.map((step, i) => (
            <div
              className={`absolute w-[70vw] md:w-[90vw] h-[90vw] p-1.5 md:p-2 rounded-3xl left-1/2 top-1/2 -ml-[250px] flex flex-col will-change-transform md:w-[450px] xl:w-[350px] 2xl:w-[450px] md:h-[62vh] 2xl:h-[60vh] shadow-[0_40px_80px_-30px_rgba(2,5,26,0.95)] ${
                i % 2 === 0
                  ? "bg-linear-to-br from-brand-lavender via-brand-violet to-brand-blue"
                  : "bg-linear-to-br from-brand-gold via-brand-violet/80 to-brand-indigo"
              }`}
              key={i}
              ref={(el) => {
                if (el) {
                  cardsRef.current[i] = el;
                }
              }}
            >
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.25rem] bg-space-900 p-3 md:p-4">
                <div className="relative flex-1 overflow-hidden rounded-xl">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 70vw, 450px"
                    className="object-cover [object-position:50%_30%]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-space-900/70 via-transparent to-transparent" />
                  <span className="eyebrow glass-panel absolute left-3 top-3 rounded-full px-3 py-1 text-[0.6rem] text-brand-gold-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="w-full">
                  <h3 className="mb-1.5 text-left text-[6vw] leading-[1.15] md:text-[2.8vw] xl:text-[1.6vw]">
                    {step.title}
                  </h3>
                  <p className="text-left text-[3.5vw] leading-snug text-muted-foreground md:text-[1.8vw] xl:text-[0.95vw]">
                    {step.description}
                  </p>
                  <Button asChild variant="secondary" size="sm" className="group mt-4">
                    <Link href="/projects">
                      {t("button")}
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {[...Array(isMobile ? 1 : 2)].map((_, i) => (
            <div
              className="absolute w-[500px] h-[550px] left-1/2 top-1/2 -ml-[250px] flex flex-col gap-4 will-change-transform opacity-0"
              key={i + 5}
              ref={(el) => {
                if (el) {
                  cardsRef.current[i + 5] = el;
                }
              }}
            >
              <p>EMPTY</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Steps
