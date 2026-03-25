import { motion } from 'framer-motion';

export const ScrollIndicator = ({ label, isHovered }: { label: string; isHovered: boolean }) => {
  const trackColor = isHovered ? 'bg-white/20' : 'bg-foreground/20';
  const thumbColor = isHovered ? 'bg-white' : 'bg-foreground';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className={`absolute bottom-8 left-6 md:left-12 flex items-center gap-4 transition-colors duration-700 ${isHovered ? 'text-white/60' : 'text-foreground/60'}`}
    >
      <span className="text-xs font-bold tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>{label}</span>
      <div className={`w-[1px] h-16 overflow-hidden transition-colors duration-700 ${trackColor}`}>
        <motion.div
          className={`w-full h-1/2 transition-colors duration-700 ${thumbColor}`}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};
