import { m, useReducedMotion } from 'framer-motion';
import { skills } from '@/data/cvData';
import { techIconMap } from '@/data/techIcons';

// Triple the skills for seamless infinite loop
const tripled = [...skills, ...skills, ...skills];

export const SkillsMarquee = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-12 bg-surface border-y border-subtle overflow-hidden relative z-20" aria-label="Technology skills">
      <m.div
        className="flex gap-12 items-center whitespace-nowrap"
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
            className="flex items-center gap-4 text-2xl md:text-3xl font-serif italic tracking-tight shrink-0 select-none opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default text-foreground"
          >
            {techIconMap[skill] && (
              <img
                src={techIconMap[skill]}
                alt=""
                aria-hidden="true"
                className="w-6 h-6 md:w-8 md:h-8 grayscale opacity-70"
                loading="lazy"
              />
            )}
            <span>{skill}</span>
            <span className="text-foreground/20 ml-6 text-xl" aria-hidden="true">•</span>
          </span>
        ))}
      </m.div>
    </section>
  );
};
