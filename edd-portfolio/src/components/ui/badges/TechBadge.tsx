import { techIconMap } from '@/data/techIcons';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  skill: string;
  index?: number;
}

/** Animated skill pill with optional tech icon. */
export const TechBadge = ({ skill, index = 0 }: TechBadgeProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05, ease: APPLE_EASE }}
    className="px-4 py-2 bg-surface text-xs font-mono rounded-full border border-subtle text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all duration-300 flex items-center gap-2"
  >
    {techIconMap[skill] && (
      <img
        src={techIconMap[skill]}
        alt={skill}
        loading="lazy"
        className="w-3.5 h-3.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
      />
    )}
    <span>{skill}</span>
  </motion.span>
);
