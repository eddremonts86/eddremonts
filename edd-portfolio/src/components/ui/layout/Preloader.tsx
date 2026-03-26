import { AnimatePresence, m } from 'framer-motion';
import { APPLE_EASE } from '@/lib/motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation();
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
      <m.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 1.2, ease: APPLE_EASE, delay: 0.2 },
        }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground"
      >
        <m.div
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: APPLE_EASE } }}
          className="container relative z-10 flex h-full w-full max-w-[1400px] flex-col justify-between px-6 py-12 md:py-24"
        >
          <div className="flex w-full items-start justify-between font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>{t('preloader.loading')}</span>
            <span>2026</span>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <m.div
              className="text-foreground/80 font-serif text-7xl font-light lowercase leading-none tracking-tight md:text-[8rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
            >
              {progress}%
            </m.div>
            <div className="bg-subtle relative mt-12 h-[1px] w-full max-w-xs overflow-hidden">
              <m.div
                className="absolute top-0 left-0 h-full bg-foreground"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex w-full items-end justify-between font-mono text-[11px] uppercase tracking-widest opacity-40">
            <span>{t('preloader.standby')}</span>
            <span className='text-primary'>Eduardo Inerarte</span>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};
