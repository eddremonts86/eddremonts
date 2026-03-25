import { OptimizedImage } from '@/components/ui/media/OptimizedImage';
import { projects } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { AnimatePresence, motion, type MotionValue } from 'framer-motion';

type Project = (typeof projects)[number];

export const FloatingImagePreview = ({
  project,
  cursorX,
  cursorY,
}: {
  project: Project | null;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) => (
  <motion.div
    className="fixed top-0 left-0 w-[450px] h-[320px] pointer-events-none z-[100] hidden lg:block overflow-hidden rounded-xl shadow-2xl"
    style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: project ? 1 : 0, scale: project ? 1 : 0.95 }}
    transition={{ duration: 0.5, ease: APPLE_EASE }}
  >
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="w-full h-full relative"
        >
          <OptimizedImage
            src={`/projects/${project.id}-md.webp`}
            alt={project.title}
            fallbackSrc={project.image}
            className="w-full h-full object-cover grayscale-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
