import { personalInfo } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 border-t border-foreground/10 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: APPLE_EASE }}
           className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* Logo / Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              EDD <span className="text-primary">REMONTS</span>
            </h2>
            <p className="text-foreground/50 text-xs font-bold tracking-widest uppercase">
              {t('footer.inspired', 'Engineered with Precision.')}
            </p>
          </div>

          {/* Massive Social Links */}
          <div className="flex gap-4">
            {personalInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-surface border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 group"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right font-mono text-sm opacity-60">
            <p>© {currentYear} {personalInfo.name}.</p>
            <p className="mt-2 text-xs">V.1.0.0 // STATUS: ONLINE</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};