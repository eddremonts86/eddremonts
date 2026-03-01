import { personalInfo } from '@/data/cvData';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-default bg-surface text-center relative overflow-hidden">
      {/* Anime subtle footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[150px] bg-gradient-to-t from-primary/5 to-transparent rounded-[100%] blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center justify-center space-y-8"
        >
          <div className="flex gap-4">
            {personalInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-foreground/80 hover:text-primary hover:shadow-[0_8px_20px_rgba(0,229,255,0.15)] hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>

          <p className="text-foreground/60 text-sm font-medium tracking-tight">
            © {currentYear} {personalInfo.name}. {t('footer.inspired', 'Inspired by Apple. Powered by Anime.')}<br/>
            <span className="opacity-80 text-xs mt-2 block">{t('footer.tech', 'React 19 & Framer Motion')}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
