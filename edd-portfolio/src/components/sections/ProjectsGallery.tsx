import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { projects } from '@/data/cvData';
import { AnimatePresence, motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Project = (typeof projects)[number];

const categories = ["All", "Frontend", "Full Stack"];
const categoryKeys: Record<string, string> = {
  "All": "all",
  "Frontend": "frontend",
  "Full Stack": "fullStack",
};

export const ProjectsGallery = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Floating Image State
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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

          <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 hide-scrollbar mt-8 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-6 py-2 uppercase font-mono tracking-widest text-[11px] transition-all whitespace-nowrap min-h-[44px] rounded-full border ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/50 border-subtle hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {t(`projects.filters.${categoryKeys[cat]}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Elegant Interactive List */}
        <div className="relative border-t border-subtle">
          <AnimatePresence mode='wait'>
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
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
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Image Reveal (Desktop Only) */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[320px] pointer-events-none z-[100] hidden lg:block overflow-hidden rounded-xl shadow-2xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: hoveredProject ? 1 : 0,
          scale: hoveredProject ? 1 : 0.95,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <OptimizedImage
                src={`/projects/${hoveredProject.id}-md.webp`}
                alt={hoveredProject.title}
                fallbackSrc={hoveredProject.image}
                className="w-full h-full object-cover grayscale-0"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
