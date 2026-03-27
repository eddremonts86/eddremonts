import { projects } from '@/data/cvData';
import { DEFAULT_CATEGORY } from '@/data/projectCategories';
import { useMemo, useState } from 'react';

type Project = (typeof projects)[number];

interface UseProjectFilterReturn {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredProjects: Project[];
  hoveredProject: Project | null;
  setHoveredProject: (project: Project | null) => void;
}

export function useProjectFilter(): UseProjectFilterReturn {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory],
  );

  return { activeCategory, setActiveCategory, filteredProjects, hoveredProject, setHoveredProject };
}
