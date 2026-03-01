import { motion } from 'framer-motion';
import { skills } from '@/data/cvData';

const techIconMap: Record<string, string> = {
  React: '/tech-icons/react.svg',
  Vuejs: '/tech-icons/vuedotjs.svg',
  NextJs: '/tech-icons/nextdotjs.svg',
  NuxtJs: '/tech-icons/nuxtjs.svg',
  TypeScript: '/tech-icons/typescript.svg',
  JavaScript: '/tech-icons/javascript.svg',
  'Tailwind CSS': '/tech-icons/tailwindcss.svg',
  HTML5: '/tech-icons/html5.svg',
  CSS3: '/tech-icons/css3.svg',
  SCSS: '/tech-icons/sass.svg',
  SASS: '/tech-icons/sass.svg',
  'Node js': '/tech-icons/nodedotjs.svg',
  PHP: '/tech-icons/php.svg',
  Laravel: '/tech-icons/laravel.svg',
  Symfony: '/tech-icons/symfony.svg',
  MySql: '/tech-icons/mysql.svg',
  PostgreSql: '/tech-icons/postgresql.svg',
  Git: '/tech-icons/git.svg',
  Docker: '/tech-icons/docker.svg',
  Linux: '/tech-icons/linux.svg',
  MacOS: '/tech-icons/apple.svg',
  'Framer Motion': '/tech-icons/framer.svg',
};

// Triple the skills for seamless infinite loop
const tripled = [...skills, ...skills, ...skills];

export const SkillsMarquee = () => {
  return (
    <section className="py-8 bg-background overflow-hidden border-y border-subtle relative" aria-label="Technology skills">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 items-center whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
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
