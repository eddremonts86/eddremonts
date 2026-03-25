import { TechBadge } from '@/components/ui/badges/TechBadge';
import { skills } from '@/data/cvData';
import { useTranslation } from 'react-i18next';

export const TechArsenal = () => {
  const { t } = useTranslation();

  return (
    <div className="sticky top-32">
      <h3 className="text-sm font-mono tracking-widest uppercase text-foreground/50 mb-8 border-b border-subtle pb-4">
        {t('experience.techArsenal')}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <TechBadge key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};
