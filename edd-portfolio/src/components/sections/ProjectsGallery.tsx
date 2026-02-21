import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { projects } from '@/data/cvData';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const categories = ["All", "Frontend", "Full Stack"];
const categoryKeys: Record<string, string> = {
  "All": "all",
  "Frontend": "frontend",
  "Full Stack": "fullStack",
};

// ... TiltCard implementation remains identical ...
// 3D Tilt Card Sub-component
const TiltCard = ({ project }: { project: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for realistic physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const brightness = useTransform(y, [-0.5, 0.5], [1.2, 0.8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Normalize mouse position between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group relative rounded-[2rem] overflow-hidden bg-surface border border-black/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,229,255,0.12)] transition-shadow duration-500 will-change-transform"
    >
      <motion.div
        style={{ filter: `brightness(${brightness})`, transform: "translateZ(30px)" }}
        className="aspect-[4/3] w-full overflow-hidden bg-black/5 relative"
      >
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {/* Lift the content off the card slightly to accentuate 3D */}
      <div
        className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 apple-glass border-t border-white/50 m-4 rounded-[1.5rem]"
        style={{ transform: "translateZ(50px) translateY(0px)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-foreground shadow-sm hover:text-primary hover:scale-110 transition-transform duration-300"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <h3 className="text-xl font-bold text-foreground font-display tracking-tight">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
};

export const ProjectsGallery = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-32 bg-background relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tighter">
              {t('projects.title')} <span className="text-gradient-anime">{t('projects.titleAccent')}</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl font-body">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-2 p-1.5 apple-glass rounded-2xl overflow-x-auto w-full md:w-auto shadow-sm"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                  activeCategory === cat
                    ? "bg-white text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] scale-100"
                    : "text-foreground/80 hover:text-foreground hover:bg-black/[0.02]"
                }`}
              >
                {t(`projects.filters.${categoryKeys[cat]}`)}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative" style={{ perspective: "1200px" }}>
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <TiltCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
