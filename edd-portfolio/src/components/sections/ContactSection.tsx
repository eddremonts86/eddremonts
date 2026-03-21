import { personalInfo } from '@/data/cvData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const floatingShapes = [
  { size: 64, color: 'var(--primary)', top: '15%', left: '5%', delay: 0 },
  { size: 40, color: 'var(--secondary)', top: '70%', right: '8%', delay: 1.5 },
  { size: 28, color: 'var(--accent)', bottom: '20%', left: '12%', delay: 3 },
  { size: 48, color: 'var(--primary)', top: '30%', right: '3%', delay: 2 },
  { size: 20, color: 'var(--secondary)', top: '80%', left: '60%', delay: 4 },
];

export const ContactSection = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xgonbeaj', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-surface overflow-hidden">
      {/* Background Anime Blurs on pure white */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating decorative shapes */}
      {floatingShapes.map((shape, i) => (
        <div
          key={i}
          className="floating-shape opacity-10"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            animationDelay: `${shape.delay}s`,
            filter: 'blur(1px)',
          }}
          aria-hidden="true"
        />
      ))}

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
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="lg:col-span-2 space-y-8 h-full"
          >
            <div className="bg-surface p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-subtle h-full relative overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150 pointer-events-none" />

              <h3 className="text-2xl font-black text-foreground mb-10 tracking-tight font-display">{t('contact.info.title')}</h3>

              <ul className="space-y-8 flex-grow relative z-10">
                <li className="flex items-center gap-5 text-foreground/70 hover:text-foreground transition-colors group/link">
                  <div className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-primary group-hover/link:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <a href={`mailto:${personalInfo.email}`} className="text-lg font-medium tracking-tight truncate min-h-[44px] flex items-center">{personalInfo.email}</a>
                </li>
                <li className="flex items-center gap-5 text-foreground/80 hover:text-foreground transition-colors group/link">
                  <div className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-secondary group-hover/link:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <a href={`tel:${personalInfo.phone}`} className="text-lg font-medium tracking-tight min-h-[44px] flex items-center">{personalInfo.phone}</a>
                </li>
                <li className="flex items-center gap-5 text-foreground/80 group/link">
                  <div className="w-14 h-14 rounded-2xl bg-surface shadow-sm border border-subtle flex items-center justify-center text-accent group-hover/link:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">{personalInfo.location}</span>
                </li>
              </ul>

              {/* Option C: Direct CTA */}
              <div className="mt-10 pt-8 border-t border-subtle relative z-10">
                <p className="text-sm text-foreground/70 mb-4 font-medium">¿Prefieres contacto directo?</p>
                <a
                  href={`mailto:${personalInfo.email}?subject=Propuesta%20de%20Proyecto`}
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors group/btn min-h-[44px]"
                >
                  <span className="font-semibold">Escríbeme un email</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
            className="lg:col-span-3"
          >
            <form className="bg-surface p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-subtle space-y-6" onSubmit={handleSubmit}>
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">¡Mensaje Enviado!</h4>
                  <p className="text-foreground/70">Gracias por escribirme. Te responderé lo antes posible a {personalInfo.email}.</p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 px-6 py-3 bg-surface border border-subtle rounded-xl text-foreground font-medium hover:bg-foreground/5 transition-colors min-h-[44px]"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground/80 mb-2 uppercase tracking-wide">{t('contact.form.name')}</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-surface border border-subtle shadow-sm rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all min-h-[44px]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground/80 mb-2 uppercase tracking-wide">{t('contact.form.email')}</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="w-full bg-surface border border-subtle shadow-sm rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all min-h-[44px]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground/80 mb-2 uppercase tracking-wide">{t('contact.form.message')}</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-surface border border-subtle shadow-sm rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                      placeholder={t('contact.form.message')}
                    />
                  </div>

                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Hubo un error al enviar el mensaje. Por favor, asegúrate de haber configurado tu ID de Formspree o usa el botón de contacto directo.</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group relative w-full sm:w-auto px-10 py-4 bg-foreground text-background rounded-2xl font-medium tracking-wide overflow-hidden transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(255,42,133,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed min-h-[44px]"
                    >
                      <span className="relative z-10 text-sm">
                        {formStatus === 'submitting' ? 'Enviando...' : t('contact.form.send')}
                      </span>
                      {formStatus === 'submitting' ? (
                        <div className="relative z-10 w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      ) : (
                        <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      )}
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};