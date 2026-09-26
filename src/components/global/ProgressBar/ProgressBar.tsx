"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
// import "./ProgressBar.css";

const ProgressBar = () => {
  const progressRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const animatingRef = useRef(false);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    const progressBar = progressRef.current;

    if (isFirstLoadRef.current) {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const initialProgress = scrollTop / (documentHeight - windowHeight);
      gsap.set(progressBar, { scaleX: initialProgress });
      isFirstLoadRef.current = false;
    }

    const updateProgress = () => {
      if (animatingRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = scrollTop / (documentHeight - windowHeight);

      gsap.to(progressBar, {
        scaleX: progress,
        duration: 0.1,
        ease: "none",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar || isFirstLoadRef.current) return;

    const handleRouteChange = () => {
      animatingRef.current = true;

      gsap.to(progressBar, {
        scaleX: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          animatingRef.current = false;
        },
      });
    };

    handleRouteChange();
  }, [pathname, searchParams]);

  return <div ref={progressRef} className="fixed top-0 left-0 w-full h-[3px] md:h-[4px] bg-linear-to-r from-brand-violet via-brand-blue to-brand-gold shadow-[0_0_12px_rgba(110,57,253,0.8)] z-[100] will-change-transform origin-left scale-x-0"></div>;
};

export default ProgressBar;
