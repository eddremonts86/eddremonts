import { projects } from '@/data/cvData';
import { useMousePosition } from '@/hooks/useMousePosition';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { FloatingImagePreview } from './FloatingImagePreview';
import { ProjectListItem } from './ProjectListItem';

type Project = (typeof projects)[number];

export const ProjectsGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { springX: cursorX, springY: cursorY } = useMousePosition();

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory],
  );

  return (
    <section
      id="projects"
      className="relative z-10 bg-background py-24 md:py-40"
      ref={containerRef}
    >
      <div className="container mx-auto max-w-[1400px] px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 border-b border-subtle pb-12 md:flex-row md:items-end">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl lg:text-7xl">
            SELECTED
            <span className="mt-2 block font-serif italic text-primary">works</span>
          </h2>

          <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        </div>

        {/* Interactive List */}
        <div className="relative border-t border-subtle">
          <AnimatePresence mode="wait">
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
