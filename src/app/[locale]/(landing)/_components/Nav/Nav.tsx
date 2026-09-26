"use client";

import { MouseEvent as ReactMouseEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import Link from "next/link";
import useScrollLock from "@/hooks/useScrollLock";
import Noise from "@/components/global/Noise";
import Orbit from "@/components/global/Orbit";
import { NexusLockup, NexusLogo } from "@/components/global/NexusLogo";
import LanguageToggle from "@/components/global/LanguajeToggle";
import { useTranslations } from "next-intl";
import { Menu } from "@/types";
import { SOCIAL_LINKS } from "@/data/socials";
import GalaxyBackground from "@/components/global/GalaxyBackground";


const Nav = () => {
  
  const router = useRouter();
  const navRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuOverlayBarRef = useRef<HTMLDivElement>(null);
  const menuOpenBtnRef = useRef<HTMLDivElement>(null);
  const menuCloseBtnRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);
  const { lockScroll, unlockScroll } = useScrollLock();

  const t = useTranslations('Menu');
  const tFooter = useTranslations('Footer');
   const options =  t.raw('options') as Menu[];

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)",
        },
        {
          opacity: 0.4,
          transform: "scale(0.5)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleCloseMenu = () => {
    if (
      !menuOverlayBarRef.current ||
      !menuCloseBtnRef.current ||
      !navRef.current ||
      !menuOpenBtnRef.current ||
      !menuOverlayRef.current ||
      !menuFooterRef.current
    ) {
      return;
    }

    gsap.to(
      [
        (menuOverlayBarRef.current as HTMLElement).querySelector("a"),
        menuCloseBtnRef.current.querySelector("p"),
        menuFooterRef.current.querySelector(".showreel a"),
        ...menuFooterRef.current.querySelectorAll(".media-link a"),
      ],
      {
        y: -50,
        duration: 1,
        stagger: 0.1,
        ease: CustomEase.create("", ".76,0,.2,1"),
        onComplete: () => {
          if (menuOverlayBarRef.current) {
            gsap.set(menuOverlayBarRef.current.querySelector("a"), { y: 50 });
          }
          if (menuCloseBtnRef.current) {
            gsap.set(menuCloseBtnRef.current.querySelector("p"), { y: 50 });
          }
          if (menuFooterRef.current) {
            gsap.set(menuFooterRef.current.querySelector(".showreel a"), {
            });
          }
          if (menuFooterRef.current) {
            gsap.set(menuFooterRef.current.querySelectorAll(".media-link a"), {
              y: 50,
            });
          }
        },
      }
    );

    gsap.to(".menu-link a", {
      y: "-100%",
      duration: 0.75,
      stagger: 0.05,
      ease: "power4.in",
      onComplete: () => {
        gsap.set(".menu-link a", { y: "100%" });
      },
    });

    gsap.to(menuOverlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      delay: 0.5,
      ease: CustomEase.create("", ".76,0,.2,1"),
      onComplete: () => {
        gsap.set(navRef.current, { pointerEvents: "all" });
        gsap.set(menuOverlayRef.current, {
          pointerEvents: "none",
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
      },
    });

    gsap.to(
      [
        (navRef.current as HTMLElement).querySelector("a"),
        (navRef.current as HTMLElement).querySelector("button"),
        menuOpenBtnRef.current.querySelector("p"),
      ],
      {
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
        ease: CustomEase.create("", ".76,0,.2,1"),
      }
    );
    unlockScroll();
  //   // Remover clases
  // (document.body as HTMLElement).classList.remove('body-modal-open');
  
  // // Restaurar posición
  // document.documentElement.style.removeProperty('--scroll-top');
  // window.scrollTo(0, scrollPosition);
  
  // // Restaurar padding
  // document.body.style.paddingRight = '';
  };

  const handleOpenMenu = () => {
    if (
      !navRef.current ||
      !menuOpenBtnRef.current ||
      !menuOverlayRef.current ||
      !menuOverlayBarRef.current ||
      !menuCloseBtnRef.current ||
      !menuFooterRef.current
    ) {
      return;
    }

    gsap.to(
      [
        (navRef.current as HTMLElement).querySelector("a"),
        (navRef.current as HTMLElement).querySelector("button"),
        menuOpenBtnRef.current.querySelector("p"),
      ],
      {
        y: -50,
        duration: 1,
        stagger: 0.1,
        ease: CustomEase.create("", ".76,0,.2,1"),
        onComplete: () => {
          if (navRef.current) {
            if (navRef.current) {
              gsap.set((navRef.current as HTMLElement).querySelector("a"), { y: 50 });
              gsap.set((navRef.current as HTMLElement).querySelector("button"), { y: 50 });
            }
          }
          if (menuOpenBtnRef.current) {
            gsap.set(menuOpenBtnRef.current.querySelector("p"), { y: 50 });
          }
        },
      }
    );

    gsap.to(menuOverlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: CustomEase.create("", ".76,0,.2,1"),
      onComplete: () => {
        gsap.set(navRef.current, { pointerEvents: "none" });
        gsap.set(menuOverlayRef.current, { pointerEvents: "all" });
      },
    });

    gsap.to(".menu-link a", {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(
      [
        menuOverlayBarRef.current.querySelector("a"),
        menuCloseBtnRef.current.querySelector("p"),
        menuFooterRef.current.querySelector(".showreel a"),
        ...menuFooterRef.current.querySelectorAll(".media-link a"),
      ],
      {
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
        ease: CustomEase.create("", ".76,0,.2,1"),
      }
    );

    setTimeout(() => {
      lockScroll();
    }, 1000);
    // scrollPosition = window.scrollY;
  
    // // Aplicar estilos
    // document.documentElement.style.setProperty('--scroll-top', `-${scrollPosition}px`);
    // (document.body as HTMLElement).classList.add('body-modal-open');
    
    // // Compensar scrollbar
    // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  useEffect(() => {
    gsap.registerPlugin(CustomEase);

    if (menuOpenBtnRef.current) {
      menuOpenBtnRef.current.addEventListener("click", handleOpenMenu);
    }

    if (menuCloseBtnRef.current) {
      menuCloseBtnRef.current.addEventListener("click", handleCloseMenu);
    }

    // router.events.on('routeChangeStart', handleCloseMenu);

    return () => {
      if (menuOpenBtnRef.current) {
        menuOpenBtnRef.current.removeEventListener("click", handleOpenMenu);
      }

      if (menuCloseBtnRef.current) {
        menuCloseBtnRef.current.removeEventListener("click", handleCloseMenu);
      }

      // router.events.off('routeChangeStart', handleCloseMenu);
    };
  }, [router]);

  const handleNavigation = (e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    e.preventDefault();

    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";

    if (currentPath === path) {
      handleCloseMenu();
      return;
    }

    router.push(path);
    slideInOut(); // Si no es compatible, se ejecuta inmediatamente
    handleCloseMenu();
    // setTimeout(() => {
    //   if (document.startViewTransition) {
    //     document.startViewTransition(() => {
    //       router.push(path);
    //     }).finished.then(() => {
    //       slideInOut(); // Se ejecuta cuando la transición termina
    //     });
    //   } else {
    //     router.push(path);
    //     slideInOut(); // Si no es compatible, se ejecuta inmediatamente
    //   }
    // }, 200);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full px-4 md:px-8 py-3 md:py-5 flex justify-between items-center z-[60]"
      >
        <div className="relative w-max cursor-pointer [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]">
          <Link
            href="/"
            onClick={(e) => handleNavigation(e, "/")}
            aria-label="Nexus Labs"
            className="glass-panel relative flex h-10 md:h-12 items-center rounded-full pl-2 pr-4 md:pl-3 md:pr-5 will-change-transform select-none translate-y-0 transition-colors hover:bg-white/10"
          >
            <NexusLockup />
          </Link>
        </div>
        <div className="flex gap-2 md:gap-3 items-center justify-center">
          <LanguageToggle />
          <div
            className="relative w-max cursor-pointer [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
            ref={menuOpenBtnRef}
          >
            <p className="glass-panel relative flex h-10 md:h-12 items-center gap-2.5 rounded-full px-4 md:px-5 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-foreground will-change-transform select-none translate-y-0 transition-colors hover:bg-white/10">
              <span aria-hidden="true" className="flex flex-col items-end gap-[5px]">
                <span className="block h-px w-4 bg-foreground" />
                <span className="block h-px w-2.5 bg-brand-gold" />
              </span>
              {t("open")}
            </p>
          </div>
        </div>
      </nav>

      <div
        className="fixed top-0 left-0 w-screen h-[100svh] flex justify-center items-center overflow-hidden bg-fullscreen-nav cosmos-bg [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)] will-change-[clip-path] pointer-events-none z-[100]"
        ref={menuOverlayRef}
      >
        {/* Deep-space decoration */}
        <GalaxyBackground variant="section" />
        <div aria-hidden="true" className="absolute -left-40 -top-40 size-[520px] rounded-full bg-brand-indigo/25 blur-[140px]" />
        <div aria-hidden="true" className="absolute -right-32 -bottom-40 size-[480px] rounded-full bg-brand-gold/10 blur-[140px]" />
        <Orbit className="absolute left-1/2 top-1/2 size-[135vmin] -translate-x-1/2 -translate-y-1/2" duration={90} opacity={0.55} />
        <Orbit className="absolute left-1/2 top-1/2 size-[95vmin] -translate-x-1/2 -translate-y-1/2" duration={70} reverse orbs={false} opacity={0.25} />

        <div
          className="fixed top-0 left-0 w-screen px-4 md:px-8 py-3 md:py-5 flex justify-between items-center z-[10]"
          ref={menuOverlayBarRef}
        >
          <div className="relative w-max cursor-pointer [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]">
            <Link
              href="/"
              onClick={(e) => handleNavigation(e, "/")}
              aria-label="Nexus Labs"
              className="glass-panel relative flex h-10 md:h-12 items-center rounded-full pl-2 pr-4 md:pl-3 md:pr-5 will-change-transform select-none translate-y-0 transition-colors hover:bg-white/10"
            >
              <NexusLockup />
            </Link>
          </div>
          <div
            className="relative w-max cursor-pointer [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
            ref={menuCloseBtnRef}
          >
            <p className="glass-panel relative flex h-10 md:h-12 items-center gap-2.5 rounded-full px-4 md:px-5 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-nav will-change-transform select-none translate-y-5 transition-colors hover:bg-white/10">
              <span aria-hidden="true" className="relative block size-3">
                <span className="absolute left-0 top-1/2 block h-px w-3 rotate-45 bg-foreground" />
                <span className="absolute left-0 top-1/2 block h-px w-3 -rotate-45 bg-brand-gold" />
              </span>
              {t("close")}
            </p>
          </div>
        </div>

        <div
          className="fixed bottom-0 left-0 w-screen px-4 md:px-8 py-5 flex justify-between items-end z-[10]"
          ref={menuFooterRef}
        >
          <div className="showreel hidden md:block relative w-max [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]">
            <a className="eyebrow block text-muted-foreground will-change-transform">
              {tFooter("tagline")}
            </a>
          </div>
          <div className="flex gap-5 md:gap-6">
            {SOCIAL_LINKS.map((social) => (
              <div
                key={social.id}
                className="media-link relative w-max h-5 cursor-pointer [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow relative block text-nav will-change-transform select-none hover:text-brand-gold transition-colors"
                >
                  {social.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-[10] flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            {options.map((option, index) => (
              <div
                key={option.link}
                className="menu-link relative [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
              >
                <Link
                  href={option.link}
                  onClick={(e) => handleNavigation(e, option.link)}
                  className="group relative inline-flex items-start gap-3 md:gap-5 translate-y-full will-change-transform py-1"
                >
                  <span className="eyebrow mt-2 md:mt-4 text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[12vw] md:text-[6.5vw] font-bold leading-[1.1] tracking-tight text-nav transition-colors duration-300 group-hover:text-brand-lavender">
                    {option.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="hidden md:block w-[30vw] max-w-[420px] animate-float-y">
            <NexusLogo sizes="30vw" className="drop-shadow-[0_0_60px_rgba(110,57,253,0.35)]" />
          </div>
        </div>
        <Noise
          patternSize={250}
          patternScaleX={1.2}
          patternScaleY={1.2}
          patternRefreshInterval={2}
          patternAlpha={12}
        />
      </div>
    </>
  );
};

export default Nav;
