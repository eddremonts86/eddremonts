import { projects } from '@/data/cvData';
import { fadeInView } from '@/lib/motion';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Project = (typeof projects)[number];

export const ProjectListItem = ({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover: (p: Project | null) => void;
}) => {
  const { t } = useTranslation();

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      {...fadeInView({ delay: index * 0.1 })}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-12 border-b border-subtle hover:bg-surface transition-colors duration-500 px-4 rounded-xl -mx-4 cursor-pointer relative z-10"
    >
      <div className="flex flex-col mb-4 md:mb-0">
        <span className="text-[11px] font-mono tracking-widest opacity-50 mb-3 text-primary">
          0{index + 1} // {project.category}
        </span>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight group-hover:pl-4 transition-all duration-500">
          {project.title}
        </h3>
      </div>
      
      <div className="flex items-center gap-6 shrink-0 mt-4 md:mt-0">
        <span className="hidden md:block text-sm font-mono uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
          {t('projects.view', 'View Project')}
        </span>
        <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </motion.a>
  );
};
