import { m } from 'framer-motion';

export const ScrollIndicator = ({ label, isHovered }: { label: string; isHovered: boolean }) => {
  const trackColor = isHovered ? 'bg-white/20' : 'bg-foreground/20';
  const thumbColor = isHovered ? 'bg-white' : 'bg-foreground';

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className={`absolute bottom-8 left-6 flex items-center gap-4 transition-colors duration-700 md:left-12 ${isHovered ? 'text-white/60' : 'text-foreground/60'}`}
    >
      <span
        className="rotate-180 text-xs font-bold uppercase tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
      >
        {label}
      </span>
      <div className={`h-16 w-[1px] overflow-hidden transition-colors duration-700 ${trackColor}`}>
        <m.div
          className={`h-1/2 w-full transition-colors duration-700 ${thumbColor}`}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </m.div>
  );
};
