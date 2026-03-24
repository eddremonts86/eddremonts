import { personalInfo } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-foreground text-background overflow-hidden selection:bg-primary selection:text-white">
      {/* Subtle Abstract Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          {t('nav.contact')}
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="flex flex-col justify-center"
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-background/20 bg-background/5 text-background rounded-full mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-background/80">
                  {t('hero.available', 'Available for new opportunities')}
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-tight">
                {t('contact.title')} <br/>
                <span className="text-primary">{t('contact.titleAccent')}</span>
              </h2>
              
              <p className="text-lg md:text-xl font-body opacity-80 max-w-md leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="space-y-8 font-display">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-6 group w-fit">
                <div className="w-14 h-14 rounded-full bg-background/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Mail className="w-6 h-6 text-background group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-1">Email</span>
                  <span className="text-xl md:text-2xl font-black tracking-wide group-hover:text-primary transition-colors">
                    {personalInfo.email}
                  </span>
                </div>
              </a>
              
              <div className="flex items-center gap-6 w-fit cursor-default">
                <div className="w-14 h-14 rounded-full bg-background/5 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase opacity-50 block mb-1">Location</span>
                  <span className="text-xl md:text-2xl font-black tracking-wide">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
            className="bg-background text-foreground p-8 md:p-12 lg:p-14 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Soft glow behind the form */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tighter">Message Sent</h4>
                  <p className="text-base opacity-70 font-body">Thanks for reaching out! I'll get back to you as soon as possible.</p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 px-8 py-3 bg-foreground text-background uppercase font-bold tracking-widest text-xs hover:bg-primary transition-colors rounded-full"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-6">
                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-sm font-bold uppercase tracking-wider opacity-70 ml-1">
                        {t('contact.form.name')}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-foreground/5 border-2 border-transparent focus:bg-transparent focus:border-primary px-5 py-4 text-lg font-body rounded-xl outline-none transition-all placeholder:text-foreground/30"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-sm font-bold uppercase tracking-wider opacity-70 ml-1">
                        {t('contact.form.email')}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="w-full bg-foreground/5 border-2 border-transparent focus:bg-transparent focus:border-primary px-5 py-4 text-lg font-body rounded-xl outline-none transition-all placeholder:text-foreground/30"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-sm font-bold uppercase tracking-wider opacity-70 ml-1">
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-foreground/5 border-2 border-transparent focus:bg-transparent focus:border-primary px-5 py-4 text-lg font-body rounded-xl outline-none transition-all placeholder:text-foreground/30 resize-none"
                        placeholder="..."
                      />
                    </div>
                  </div>

                  {formStatus === 'error' && (
                    <div className="flex items-center gap-4 text-red-600 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-bold tracking-wide">Error. Please try emailing me directly.</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-xl uppercase font-bold tracking-widest text-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {formStatus === 'submitting' ? t('contact.form.submitting', 'SENDING...') : t('contact.form.send', 'SEND MESSAGE')}
                      </span>
                      {formStatus === 'submitting' ? (
                        <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      )}
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