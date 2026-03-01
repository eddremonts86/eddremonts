import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  children?: ReactNode;
}

export const SectionHeader = ({
  title,
  titleAccent,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-3xl'} mb-20 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tighter">
        {title}{' '}
        {titleAccent && <span className="text-gradient-anime">{titleAccent}</span>}
      </h2>
      {subtitle && (
        <p className="text-xl text-foreground/80 font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
