import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '@/data/cvData';
import { techIconMap } from '@/data/techIcons';

// Triple the skills for seamless infinite loop
const tripled = [...skills, ...skills, ...skills];

export const SkillsMarquee = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-8 bg-background overflow-hidden border-y border-subtle relative" aria-label="Technology skills">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 items-center whitespace-nowrap"
        animate={reduceMotion ? {} : { x: ['0%', '-33.333%'] }}
        transition={{
          x: {
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {tripled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex items-center gap-2.5 text-foreground/60 text-sm font-medium tracking-wide shrink-0 select-none"
          >
            {techIconMap[skill] && (
              <img
                src={techIconMap[skill]}
                alt=""
                aria-hidden="true"
                className="w-5 h-5"
                loading="lazy"
              />
            )}
            <span>{skill}</span>
            <span className="text-primary/40 ml-4" aria-hidden="true">•</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};
