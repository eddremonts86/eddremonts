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
        }, 400);
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
        initial={{ y: 0 }}
        exit={{
          y: '-100vh',
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }}
        className="fixed inset-0 z-[99999] bg-foreground text-background flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
          className="container px-6 max-w-[1600px] w-full flex flex-col justify-between h-full py-12 md:py-24 relative z-10"
        >
          <div className="flex justify-between items-start w-full font-mono text-sm uppercase tracking-widest opacity-50">
            <span>System Initialization</span>
            <span>v.1.0.0</span>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <motion.div
              className="text-[20vw] md:text-[15vw] font-black uppercase tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {progress}%
            </motion.div>
            <div className="w-full max-w-md h-[2px] bg-background/20 mt-8 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-end w-full font-mono text-sm uppercase tracking-widest opacity-50">
            <span>Loading Assets</span>
            <span>Edd Remonts</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
