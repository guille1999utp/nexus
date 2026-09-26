"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PROJECT_CATEGORIES, ProjectCategory, ProjectGallery } from "@/types";
import ProjectCard from "./projectCard";
import { useTranslations } from "next-intl";

export default function ProjectsGallery() {
  const t = useTranslations();

  // Obtener proyectos traducidos y asegurarse de que sea un array
  const projectsData = t.raw("ProjectsDone");
  const projects = Array.isArray(projectsData) ? (projectsData as ProjectGallery[]) : [];

  // Estado para la categoría activa
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("ALL");

  // Filtrar proyectos según la categoría activa
  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <>
      <div className="mb-8 mt-6 md:mt-10">
        {/* Botones de filtro */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
          {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => (
            <Button
              key={key}
              variant={activeFilter === key ? "default" : "outline"}
              onClick={() => setActiveFilter(key as ProjectCategory)}
              className="h-10 px-5 text-xs md:h-11 md:px-6 md:text-sm uppercase tracking-[0.18em]"
            >
              {category === "all"
                ? "All"
                : category.replace("_", " ").toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de proyectos */}
      <AnimatePresence>
        <div className="columns-1 sm:columns-2 md:columns-3 overflow-y-hidden">
          {filteredProjects.map((project, index) => (
            <ProjectCard data={project} key={project.id} index={index} />
          ))}
        </div>
      </AnimatePresence>
    </>
  );
}
