import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextScroll = ({ children, className = "", tag: Tag = "h1" }: { children: React.ReactNode, className?: string, tag?: React.ElementType }) => {
  const textRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(
    () => {
      if (!textRef.current) return;

      const text = new SplitType(textRef.current, {
        types: "chars",
        charClass: "animated-char",
      });

      gsap.set(".animated-char", {
        yPercent: 100,
        display: "inline-block",
      });

      gsap.to(".animated-char", {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: `top ${isMobile ? "65%" : "65%"}`,
          scrub: true,
        },
      });

      return () => {
        text.revert();
        ScrollTrigger.getAll()
          .filter((st) => st.vars.trigger === textRef.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: textRef }
  );

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

export default AnimatedTextScroll;
