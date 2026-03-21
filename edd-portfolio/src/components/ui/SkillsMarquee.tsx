import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '@/data/cvData';
import { techIconMap } from '@/data/techIcons';

// Triple the skills for seamless infinite loop
const tripled = [...skills, ...skills, ...skills];

export const SkillsMarquee = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-primary text-background overflow-hidden relative rotate-2 scale-110 -my-12 z-20 shadow-2xl" aria-label="Technology skills">
      <motion.div
        className="flex gap-16 items-center whitespace-nowrap"
        animate={reduceMotion ? {} : { x: ['0%', '-33.333%'] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {tripled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex items-center gap-6 text-[4rem] md:text-[6rem] font-black uppercase tracking-tighter shrink-0 select-none opacity-90 hover:opacity-100 transition-opacity cursor-default mix-blend-difference text-foreground dark:text-white"
          >
            {techIconMap[skill] && (
              <img
                src={techIconMap[skill]}
                alt=""
                aria-hidden="true"
                className="w-16 h-16 md:w-24 md:h-24 filter dark:invert dark:brightness-0"
                loading="lazy"
              />
            )}
            <span>{skill}</span>
            <span className="text-background/30 ml-8 text-4xl" aria-hidden="true">/</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};