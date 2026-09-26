"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { ProjectGallery } from "@/types";
import Link from "next/link";

// Alternating frames echo the logo sweep: violet → blue and gold → violet.
const FRAMES = [
  "bg-linear-to-br from-brand-lavender/90 via-brand-violet to-brand-blue",
  "bg-linear-to-br from-brand-gold via-brand-violet/80 to-brand-indigo",
];

function ProjectCard({
  data: project,
  index,
}: {
  data: ProjectGallery;
  index: number;
}) {
  const getSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "lg:h-[330px]";
      case "medium":
        return "lg:h-[400px]";
      case "large":
        return "lg:h-[500px]";
      case "extralarge":
        return "lg:h-[700px]";
      default:
        return "lg:h-[400px]";
    }
  };

  const href = `/projects/${project.slug}`;

  return (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`mb-4 w-full break-inside-avoid ${getSizeClass(project.size)}`}
    >
      <div
        className={`group h-full w-full rounded-3xl p-1.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(110,57,253,0.7)] ${FRAMES[index % 2]}`}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-space-900">
          {/* Mobile / tablet header */}
          <div className="flex flex-col gap-2 p-4 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold tracking-wide text-white">{project.companyName}</h3>
              <Link
                href={href}
                aria-label={project.title}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-space-900 transition-transform duration-300 hover:scale-110"
              >
                <ArrowUpRight className="size-5" />
              </Link>
            </div>
            <h2 className="text-xl leading-tight md:text-2xl">{project.title}</h2>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-3 right-3 ml-2 flex flex-wrap justify-end gap-2 lg:hidden">
              {project.categories.map((category, i) => (
                <Badge key={i} variant="secondary">
                  {category.replace("_", " ")}
                </Badge>
              ))}
            </div>

            {/* Desktop hover overlay */}
            <div className="absolute inset-0 hidden bg-linear-to-t from-space-950/95 via-space-950/60 to-space-950/20 opacity-0 backdrop-blur-[3px] transition-opacity duration-300 group-hover:opacity-100 lg:block">
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.categories.map((category, i) => (
                    <Badge key={i} variant={i === 0 ? "gold" : "secondary"}>
                      {category.replace("_", " ")}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                <p className="line-clamp-2 text-sm text-white/80">{project.description}</p>
              </div>
            </div>
            <h3 className="absolute left-5 top-5 hidden text-2xl font-bold tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
              {project.companyName}
            </h3>
            <div className="absolute right-4 top-4 hidden lg:block">
              <Link
                href={href}
                aria-label={project.title}
                className="flex size-11 items-center justify-center rounded-full bg-brand-gold text-space-900 opacity-0 shadow-[0_10px_30px_-10px_rgba(231,179,119,0.9)] transition-all duration-300 hover:scale-110 group-hover:opacity-100"
              >
                <ArrowUpRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
