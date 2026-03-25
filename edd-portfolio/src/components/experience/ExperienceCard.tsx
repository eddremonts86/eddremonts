import { experiences } from '@/data/cvData';
import { fadeInView } from '@/lib/motion';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ExperienceCardProps {
  exp: (typeof experiences)[number];
  index: number;
}

export const ExperienceCard = ({ exp, index }: ExperienceCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      {...fadeInView({ delay: index * 0.1 })}
      className="group relative flex flex-col md:flex-row justify-between py-10 border-b border-subtle hover:bg-surface transition-colors duration-500 cursor-default px-4 -mx-4 rounded-xl"
    >
      <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/3 md:pr-8">
        <span className="text-[11px] font-mono tracking-widest text-primary mb-2">
          {exp.period.replace('Present', t('experience.present') || 'Present')}
        </span>
        <h4 className="text-lg md:text-xl font-medium tracking-tight mb-1">{exp.company}</h4>
        <span className="text-xs text-foreground/40 font-mono uppercase tracking-wider">
          {exp.location}
        </span>
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-xl md:text-2xl font-serif text-foreground group-hover:text-primary transition-colors duration-500 break-words">
            {t(`experience.items.${exp.id}.role`, exp.role)}
          </h3>
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-500 text-primary hidden md:block shrink-0" />
        </div>
        <p className="text-sm md:text-base text-foreground/70 leading-relaxed font-light">
          {t(`experience.items.${exp.id}.description`, exp.description)}
        </p>
      </div>
    </motion.div>
  );
};
