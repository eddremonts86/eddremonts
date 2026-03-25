import { projects } from '@/data/cvData';
import { useMousePosition } from '@/hooks/useMousePosition';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { FloatingImagePreview } from './FloatingImagePreview';
import { ProjectListItem } from './ProjectListItem';

type Project = (typeof projects)[number];

export const ProjectsGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { springX: cursorX, springY: cursorY } = useMousePosition();

  const filteredProjects = useMemo(
    () => projects.filter(
      (project) => activeCategory === "All" || project.category === activeCategory,
    ),
    [activeCategory],
  );

  return (
    <section id="projects" className="py-24 md:py-40 bg-background relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 border-b border-subtle pb-12">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
            SELECTED
            <span className="block font-serif italic text-primary mt-2">works</span>
          </h2>

          <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        </div>

        {/* Interactive List */}
        <div className="relative border-t border-subtle">
          <AnimatePresence mode='wait'>
            {filteredProjects.map((project, index) => (
              <ProjectListItem
                key={project.id}
                project={project}
                index={index}
                onHover={setHoveredProject}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <FloatingImagePreview project={hoveredProject} cursorX={cursorX} cursorY={cursorY} />
    </section>
  );
};
