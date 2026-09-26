import Orbit from '@/components/global/Orbit';
import ScrollFloat from '@/components/global/scrol-float';
import { useTranslations } from 'next-intl';

function Phrase() {
  const t = useTranslations();
  // Quotes are drawn as a decorative glyph, so strip them from the copy.
  const phrase = t('Phrase').replace(/^["“]|["”]$/g, '');

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-violet/70 to-transparent"
      />
      <Orbit
        className="absolute -left-[22vw] top-1/2 size-[62vw] -translate-y-1/2"
        duration={110}
        opacity={0.3}
      />
      <Orbit
        className="absolute -right-[18vw] -bottom-[30vw] size-[48vw]"
        duration={90}
        reverse
        orbs={false}
        opacity={0.2}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pt-24 pb-16 text-center md:pt-40 md:pb-32">
        <span
          aria-hidden="true"
          className="font-display text-7xl font-bold leading-none brand-gradient-text md:text-9xl"
        >
          &ldquo;
        </span>
        <ScrollFloat
          animationDuration={1.3}
          ease="back.inOut(2)"
          scrollStart="center bottom+=20%"
          scrollEnd="bottom bottom-=45%"
          stagger={0.07}
          gradient
          containerClassName="mt-2"
          textClassName="text-[7vw] leading-[1.25] sm:text-[5vw] md:text-[3.6vw] xl:text-[3.2vw]"
        >
          {phrase}
        </ScrollFloat>
      </div>
    </section>
  );
}

export default Phrase
