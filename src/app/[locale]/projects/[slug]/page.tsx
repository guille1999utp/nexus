'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import AnimatedH1 from '@/components/global/AnimatedH1/AnimatedH1';
import AnimatedCopy from '@/components/global/AnimatedCopy/AnimatedCopy';
import Image from 'next/image';
import { Timeline } from '@/components/global/Timeline';
import AnimationContainer from '@/components/global/animation-container';
import Orbit from '@/components/global/Orbit';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import ImageViewer from '../_components/ImageViewer';
import { ProjectGallery } from '@/types';

// Alternating frames echo the logo sweep: violet → blue and gold → violet.
const FRAMES = [
  "bg-linear-to-br from-brand-lavender/90 via-brand-violet to-brand-blue",
  "bg-linear-to-br from-brand-gold via-brand-violet/80 to-brand-indigo",
];

function Page() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const container = useRef<HTMLDivElement>(null);

    const t = useTranslations("Project");
    const tr = useTranslations();

    const projectsData = tr.raw("ProjectsDone");
    const projects = Array.isArray(projectsData) ? (projectsData as ProjectGallery[]) : [];

    const { slug } = useParams() || {};

    const project = projects.find(p => p.slug?.toLowerCase() === slug);

    const data = [
      {
        title: `${t("about")} ${project?.companyName || "la compañía"}`,
        content: (
          <div>
            {project?.about?.map((paragraph, index) => (
              <AnimatedCopy
                key={index}
                className="mb-4 text-base text-muted-foreground md:text-lg"
              >
                {paragraph}
              </AnimatedCopy>
            ))}
          </div>
        ),
      },
      {
        title: `${t("release")}`,
        content: (
          <AnimatedCopy className="font-display text-[8vw] font-bold leading-[1.1] text-foreground md:text-[6vw] xl:text-[5vw]">
            {project?.releaseDate || ""}
          </AnimatedCopy>
        ),
      },
      {
        title: `${t("solution")}`,
        content: (
          <div>
            {project?.solution?.map((paragraph, index) => (
              <AnimatedCopy
                key={index}
                className="mb-4 text-base text-muted-foreground md:text-lg"
              >
                {paragraph}
              </AnimatedCopy>
            ))}

            <div className="my-6 flex flex-wrap gap-3">
              {project?.features?.map((feature, index) => (
                <AnimationContainer
                  key={index}
                  animation="fadeUp"
                  delay={0.4 * index}
                >
                  <Badge
                    variant={index % 3 === 2 ? "gold" : "default"}
                    className="h-auto whitespace-normal rounded-xl px-4 py-2 text-left text-sm font-medium md:text-base"
                  >
                    {feature}
                  </Badge>
                </AnimationContainer>
              ))}
            </div>

            {project?.url && (
              <Button asChild size="lg" className="group mt-6">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("viewProject")}
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            )}
          </div>
        ),
      },
      {
        title: `${t("ourWork")}`,
        content: (
          <div className="grid gap-5 md:grid-cols-1">
            {project?.imageGallery?.map((image, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.4 * index}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`block w-full cursor-zoom-in rounded-3xl p-1.5 transition-transform duration-300 hover:scale-[0.98] ${FRAMES[index % 2]}`}
                >
                  <Image
                    src={image}
                    alt={project.title}
                    width={1200}
                    height={100}
                    loading='lazy'
                    className="w-full rounded-[1.25rem] object-cover"
                  />
                </button>
              </AnimationContainer>
            ))}
          </div>
        ),
      },
    ];

    return (
      <main ref={container} className="relative mb-20">
        <div className="relative overflow-hidden">
          <Orbit className="absolute -right-[30vw] -top-[20vw] size-[70vw] lg:-right-[14vw] lg:size-[44vw]" duration={110} opacity={0.35} />
          <section className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between px-6 pt-28 pb-6 md:px-10 md:pt-36">
            <AnimationContainer animation="fadeUp" delay={0.4}>
              <div className="mb-8 space-y-3 lg:max-w-[75%]">
                {project && (
                  <span className="eyebrow text-brand-gold-light">{project.companyName}</span>
                )}
                <AnimatedH1 delay={0} className="text-3xl md:text-5xl xl:text-6xl">
                  {project ? project.title : ""}
                </AnimatedH1>
                {project ? (
                  <AnimatedCopy className="!mt-5 max-w-2xl text-base text-muted-foreground md:text-xl">
                    {project.description}
                  </AnimatedCopy>
                ) : (
                  <AnimatedH1 delay={0} className="text-3xl md:text-5xl">
                    No se encontró información sobre este proyecto.
                  </AnimatedH1>
                )}
              </div>
            </AnimationContainer>
          </section>
        </div>
        {project && (
          <AnimationContainer animation="fadeUp" delay={1}>
            <Timeline data={data} />
          </AnimationContainer>
        )}
        <ImageViewer
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </main>
    );
}

export default Page;
