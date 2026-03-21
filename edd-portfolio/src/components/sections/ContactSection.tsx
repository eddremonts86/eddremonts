import { personalInfo } from '@/data/cvData';
import { APPLE_EASE } from '@/lib/motion';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
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
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-foreground text-background overflow-hidden">
      {/* Abstract massive background text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-5">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-none">
          LET'S TALK LET'S TALK LET'S TALK
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-[1600px]">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="flex flex-col h-full justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-primary/30 bg-primary/10 text-primary rounded-none mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase">
                  LIMITED AVAILABILITY FOR 2026
                </span>
              </div>
              <h2 className="text-[14vw] md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85] break-words">
                INITIATE<br/>
                <span className="text-primary">PROTOCOL</span>
              </h2>
              <p className="text-xl md:text-2xl font-body opacity-70 max-w-md leading-relaxed mb-16">
                Only accepting projects that push boundaries. Tell me what we're building.
              </p>
            </div>

            <div className="space-y-8 font-display break-all md:break-normal">
              <a href={`mailto:${personalInfo.email}`} className="block group">
                <span className="text-sm font-bold tracking-widest uppercase opacity-50 block mb-2">Email</span>
                <span className="text-[7vw] md:text-4xl lg:text-5xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                  {personalInfo.email}
                </span>
              </a>
              <div className="block">
                <span className="text-sm font-bold tracking-widest uppercase opacity-50 block mb-2">Location</span>
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: APPLE_EASE }}
            className="bg-background text-foreground p-10 md:p-16 rounded-none shadow-2xl"
          >
            <form className="space-y-12" onSubmit={handleSubmit}>
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 space-y-6"
                >
                  <CheckCircle2 className="w-24 h-24 text-primary mb-4" />
                  <h4 className="text-4xl font-black uppercase tracking-tighter">Message Sent</h4>
                  <p className="text-lg opacity-70 font-body">Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 px-8 py-4 bg-foreground text-background uppercase font-bold tracking-widest text-sm hover:bg-primary transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-10">
                    <div className="relative group">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-transparent border-b-2 border-foreground/20 px-0 py-4 text-2xl font-display uppercase tracking-tight focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                        placeholder="John Doe"
                      />
                      <label htmlFor="contact-name" className="absolute left-0 top-4 text-xl uppercase tracking-tight opacity-40 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-primary peer-focus:opacity-100 peer-valid:-top-6 peer-valid:text-sm peer-valid:opacity-100 cursor-text">
                        {t('contact.form.name')}
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="w-full bg-transparent border-b-2 border-foreground/20 px-0 py-4 text-2xl font-display uppercase tracking-tight focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                        placeholder="john@example.com"
                      />
                      <label htmlFor="contact-email" className="absolute left-0 top-4 text-xl uppercase tracking-tight opacity-40 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-primary peer-focus:opacity-100 peer-valid:-top-6 peer-valid:text-sm peer-valid:opacity-100 cursor-text">
                        {t('contact.form.email')}
                      </label>
                    </div>

                    <div className="relative group pt-4">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        className="w-full bg-transparent border-b-2 border-foreground/20 px-0 py-4 text-xl font-body focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none"
                        placeholder={t('contact.form.message')}
                      />
                      <label htmlFor="contact-message" className="absolute left-0 top-8 text-xl uppercase tracking-tight opacity-40 transition-all peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:opacity-100 peer-valid:-top-2 peer-valid:text-sm peer-valid:opacity-100 cursor-text">
                        {t('contact.form.message')}
                      </label>
                    </div>
                  </div>

                  {formStatus === 'error' && (
                    <div className="flex items-center gap-4 text-red-500 bg-red-500/10 p-6 border-l-4 border-red-500">
                      <AlertCircle className="w-6 h-6 flex-shrink-0" />
                      <span className="text-sm font-bold uppercase tracking-wider">Error sending message. Try emailing directly.</span>
                    </div>
                  )}

                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group relative w-full flex items-center justify-between px-8 py-6 bg-primary text-background uppercase font-black tracking-widest text-xl overflow-hidden transition-all hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {formStatus === 'submitting' ? 'SECURE SPOT...' : 'SUBMIT PROPOSAL'}
                      </span>
                      {formStatus === 'submitting' ? (
                        <div className="relative z-10 w-6 h-6 border-4 border-background/30 border-t-background rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="relative z-10 w-8 h-8 group-hover:translate-x-2 transition-transform" />
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