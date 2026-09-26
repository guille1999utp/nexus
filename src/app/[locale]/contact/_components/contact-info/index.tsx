import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy'
import AnimatedH1 from '@/components/global/AnimatedH1/AnimatedH1'
import AnimationContainer from '@/components/global/animation-container'
import { NexusMark } from '@/components/global/NexusLogo'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/data/socials'
import React from 'react'

const CONTACT_EMAIL = 'nexus.labs22@gmail.com'

function ContactInfo() {

 const t = useTranslations('Info');

  return (
    <div className="py-4 lg:py-6">
      <div className="mb-10 space-y-2">
        <AnimationContainer animation="fadeUp" className="mb-6">
          <NexusMark className="w-20 drop-shadow-[0_0_20px_rgba(110,57,253,0.5)] md:w-24" />
        </AnimationContainer>
        <AnimatedH1 className="text-3xl md:text-5xl xl:text-[3.4rem]">{t('title')}</AnimatedH1>
        <AnimatedH1 className="gradient-lines text-3xl md:text-5xl xl:text-[3.4rem]">{t('title2')}</AnimatedH1>
        <AnimatedCopy className="!mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
          {t('description')}
        </AnimatedCopy>
      </div>

      <div className="mb-8">
        <AnimatedCopy tag="h3" className="eyebrow text-brand-gold">
          {t('socialTitle')}
        </AnimatedCopy>
        <div className="mt-4 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-brand-lavender/50 hover:text-brand-lavender"
            >
              {social.label}
              <ArrowUpRight className="size-4 text-brand-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>

      <AnimationContainer animation="fadeUp" delay={0.5}>
        <div className="relative gradient-ring max-w-lg rounded-2xl bg-white/[0.03] p-5 backdrop-blur-md md:p-6">
          <p className="text-sm text-muted-foreground md:text-base">{t('HateForms')}</p>
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            className="group mt-3 inline-flex items-center gap-3 text-lg font-medium text-foreground md:text-xl"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-violet/20 text-brand-lavender">
              <Mail className="size-5" />
            </span>
            <span className="group-hover:underline">{CONTACT_EMAIL}</span>
          </Link>
        </div>
      </AnimationContainer>
    </div>
  )
}

export default ContactInfo
