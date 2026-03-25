import { IconComponent } from '@/components/ui/media/IconComponent';
import { fadeInView } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const FeatureCard = ({ icon, index }: { icon: string; index: number }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      {...fadeInView({ delay: index * 0.15 })}
      className="group relative flex flex-col sm:flex-row gap-6 md:gap-12 items-start"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-foreground/50 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-700">
          <IconComponent
            name={icon}
            className="w-5 h-5 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="relative z-10 flex-1 border-b border-subtle pb-12 md:pb-16 group-hover:border-foreground/20 transition-colors duration-700">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-xs font-mono text-foreground/30 group-hover:text-primary transition-colors duration-700">
            0{index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
            {t(`about.features.${index}.title`)}
          </h3>
        </div>
        <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-light max-w-2xl">
          {t(`about.features.${index}.description`)}
        </p>
      </div>
    </motion.div>
  );
};
