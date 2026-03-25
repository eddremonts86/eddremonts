import { personalInfo } from '@/data/cvData';
import { fadeInView } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-24 border-t border-subtle bg-background relative overflow-hidden pb-[max(4rem,env(safe-area-inset-bottom))] md:pb-[max(6rem,env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <motion.div
           {...fadeInView()}
           className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* Logo / Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-light tracking-tight mb-2">
              EDD <span className="font-serif italic text-primary">REMONTS</span>
            </h2>
            <p className="text-foreground/40 text-[10px] font-mono tracking-widest uppercase">
              {t('footer.inspired', 'Crafted with intent.')}
            </p>
          </div>

          {/* Elegant Social Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {personalInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center text-foreground hover:bg-surface hover:text-primary transition-all duration-300 group shrink-0"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right font-mono text-[11px] opacity-50 uppercase tracking-widest mt-8 md:mt-0">
            <p>&copy; {currentYear} {personalInfo.name}.</p>
            <p className="mt-2 text-[10px]">{t('footer.rights', 'ALL RIGHTS RESERVED')}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
