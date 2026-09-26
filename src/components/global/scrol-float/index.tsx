import React, { useEffect, useMemo, useRef, forwardRef, useImperativeHandle, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  /** Colour each letter along the brand gradient (violet → blue → gold). */
  gradient?: boolean;
}

const GRADIENT_STOPS: [number, [number, number, number]][] = [
  [0, [184, 166, 255]],
  [0.32, [123, 92, 255]],
  [0.66, [79, 123, 255]],
  [1, [231, 179, 119]],
];

function gradientAt(t: number) {
  for (let i = 1; i < GRADIENT_STOPS.length; i++) {
    const [p1, c1] = GRADIENT_STOPS[i];
    const [p0, c0] = GRADIENT_STOPS[i - 1];
    if (t <= p1) {
      const k = (t - p0) / (p1 - p0 || 1);
      const c = c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    }
  }
  const last = GRADIENT_STOPS[GRADIENT_STOPS.length - 1][1];
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`;
}

const ScrollFloat = forwardRef<HTMLHeadingElement, ScrollFloatProps>(
  (
    {
      children,
      scrollContainerRef,
      containerClassName = "",
      textClassName = "",
      animationDuration = 1,
      ease = "back.inOut(2)",
      scrollStart = "center bottom+=50%",
      scrollEnd = "bottom bottom-=40%",
      stagger = 0.03,
      gradient = false,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useImperativeHandle(ref, () => containerRef.current as HTMLHeadingElement, [containerRef]);

    const splitText = useMemo(() => {
      const words = children.split(' ');
      const totalChars = Math.max(children.replace(/ /g, '').length - 1, 1);
      let charCount = 0;

      return words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {/* Contenedor de palabra con ajuste de espacio */}
          <span className="word-container inline-block  align-top">
            {word.split('').map((char, charIndex) => {
              const style = gradient ? { color: gradientAt(charCount / totalChars) } : undefined;
              charCount++;
              return (
                <span className="inline-block" key={charIndex} style={style}>
                  {char}
                </span>
              );
            })}
          </span>
          {wordIndex !== words.length - 1 && '\u00A0'}
        </React.Fragment>
      ));
    }, [children, gradient]);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const scroller = scrollContainerRef?.current || window;
      const charElements = el.querySelectorAll('.inline-block');

      gsap.fromTo(
        charElements,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 100,
          scaleY: 1.2,
          scaleX: 0.9,
          transformOrigin: "50% 100%",
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      );
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

    return (
      <h1 ref={containerRef} className={`overflow-hidden leading-[1.15] pb-[0.08em] ${containerClassName}`}>
        <span className={`inline-block font-display font-bold text-foreground ${textClassName}`}>
          {splitText}
        </span>
      </h1>
    );
  }
);

ScrollFloat.displayName = "ScrollFloat";

export default ScrollFloat;