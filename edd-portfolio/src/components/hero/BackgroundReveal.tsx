import { APPLE_EASE } from '@/lib/motion';
import { m } from 'framer-motion';

export const BackgroundReveal = ({ src }: { src: string }) => (
  <m.div
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 1.2, ease: APPLE_EASE }}
    className="absolute inset-0 z-0 pointer-events-none"
  >
    <div className="absolute inset-0 z-10 transition-opacity duration-1000 bg-black/20" />
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/60 mix-blend-multiply" />
    <img
      src={src}
      alt="Edd Portrait Background"
      className="w-full h-full object-cover object-[center_15%] grayscale contrast-125"
    />
  </m.div>
);
