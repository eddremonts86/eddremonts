import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);

        // Wait a tiny bit at 100% then trigger complete
        setTimeout(() => {
          onComplete();
          document.body.style.overflow = '';
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
        }}
        className="fixed inset-0 z-[99999] bg-background text-foreground flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="container px-6 max-w-[1400px] w-full flex flex-col justify-between h-full py-12 md:py-24 relative z-10"
        >
          <div className="flex justify-between items-start w-full font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>Loading experience</span>
            <span>2024</span>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <motion.div
              className="text-7xl md:text-[8rem] font-light tracking-tight leading-none font-serif text-foreground/80 lowercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {progress}%
            </motion.div>
            <div className="w-full max-w-xs h-[1px] bg-subtle mt-12 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-foreground"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-end w-full font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>Stand by</span>
            <span>Edd Remonts</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
