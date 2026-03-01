import { personalInfo } from '@/data/cvData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-32 relative bg-surface overflow-hidden">
      {/* Background Anime Blurs on pure white */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <SectionHeader
          title={t('contact.title')}
          titleAccent={t('contact.titleAccent')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-surface p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-subtle h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150 pointer-events-none" />

              <h3 className="text-2xl font-black text-foreground mb-10 tracking-tight font-display">{t('contact.info.title')}</h3>

              <ul className="space-y-8">
                <li className="flex items-center gap-5 text-foreground/70 hover:text-foreground transition-colors group/link">
                  <div className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-primary group-hover/link:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <a href={`mailto:${personalInfo.email}`} className="text-lg font-medium tracking-tight truncate">{personalInfo.email}</a>
                </li>
                <li className="flex items-center gap-5 text-foreground/80 hover:text-foreground transition-colors group/link">
                  <div className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-secondary group-hover/link:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <a href={`tel:${personalInfo.phone}`} className="text-lg font-medium tracking-tight">{personalInfo.phone}</a>
                </li>
                <li className="flex items-center gap-5 text-foreground/80 group/link">
                  <div className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-accent group-hover/link:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">{personalInfo.location}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form className="bg-surface p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-subtle space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground/80 mb-2 uppercase tracking-wide">{t('contact.form.name')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full bg-surface border border-subtle shadow-sm rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground/80 mb-2 uppercase tracking-wide">{t('contact.form.email')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full bg-surface border border-subtle shadow-sm rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground/80 mb-2 uppercase tracking-wide">{t('contact.form.message')}</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className="w-full bg-surface border border-subtle shadow-sm rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                  placeholder={t('contact.form.message')}
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="group relative w-full sm:w-auto px-10 py-4 bg-foreground text-background rounded-2xl font-medium tracking-wide overflow-hidden transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(255,42,133,0.3)]"
                >
                  <span className="relative z-10 text-sm">{t('contact.form.send')}</span>
                  <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
