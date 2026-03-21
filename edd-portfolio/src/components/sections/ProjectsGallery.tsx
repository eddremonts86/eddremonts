import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { projects } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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
    <section id="projects" className="py-32 bg-background relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8 border-b border-foreground/10 pb-12">
          <h2 className="text-[14vw] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] break-words">
            SELECTED<br/>
            <span className="font-serif italic lowercase font-light text-primary tracking-normal">works</span>
          </h2>

          <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 hide-scrollbar mt-8 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-8 py-4 uppercase font-bold tracking-widest text-sm transition-all whitespace-nowrap min-h-[44px] border ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/50 border-foreground/20 hover:text-foreground hover:border-foreground"
                }`}
              >
                {t(`projects.filters.${categoryKeys[cat]}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Huge Interactive List */}
        <div className="relative border-t border-foreground/10">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-16 border-b border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-500 px-4 md:px-8 cursor-pointer relative z-10"
              >
                <div className="flex flex-col mb-4 md:mb-0">
                  <span className="text-sm font-mono tracking-widest opacity-50 mb-2">
                    0{index + 1} // {project.category}
                  </span>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter group-hover:pl-8 transition-all duration-500">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-8">
                  <span className="hidden md:block text-lg font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Live
                  </span>
                  <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-background group-hover:text-foreground group-hover:border-background transition-all duration-500 transform group-hover:-rotate-45">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Image Reveal (Desktop Only) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-[100] hidden lg:block overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: hoveredProject ? 1 : 0,
          scale: hoveredProject ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: APPLE_EASE }}
      >
        <AnimatePresence mode="wait">
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5, ease: APPLE_EASE }}
              className="w-full h-full relative"
            >
              <OptimizedImage
                src={`/projects/${hoveredProject.id}-md.webp`}
                alt={hoveredProject.title}
                fallbackSrc={hoveredProject.image}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
