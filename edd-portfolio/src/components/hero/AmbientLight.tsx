import { motion } from 'framer-motion';

export const AmbientLight = ({ hidden }: { hidden: boolean }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen dark:mix-blend-lighten transition-opacity duration-1000 ${hidden ? 'opacity-0' : 'opacity-40 dark:opacity-20'}`}>
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[120px]"
    />
    <motion.div
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-secondary/10 blur-[100px]"
    />
  </div>
);
