import { ContactInfoItem } from '@/components/ui/badges/ContactInfoItem';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { personalInfo } from '@/data/cvData';
import { fadeInView } from '@/lib/motion';
import { m } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from './ContactForm';
import { SuccessMessage } from './SuccessMessage';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactSection = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xgonbeaj', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
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
          <m.div
            {...fadeInView({ distance: 30, axis: 'x' })}
            className="flex flex-col justify-center"
          >
            <div className="mb-12">
              <StatusBadge
                label={t('hero.available', 'Available for new opportunities')}
                className="mb-8 border-background/20 bg-background/5 text-background/80"
              />
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-tight">
                {t('contact.title')} <br/>
                <span className="text-primary">{t('contact.titleAccent')}</span>
              </h2>
              
              <p className="text-lg md:text-xl font-body opacity-80 max-w-md leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="space-y-8 font-display">
              <ContactInfoItem
                icon={Mail}
                label="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactInfoItem
                icon={MapPin}
                label="Location"
                value={personalInfo.location}
              />
            </div>
          </m.div>

          {/* Right Column: Form */}
          <m.div
            {...fadeInView({ delay: 0.2 })}
            className="bg-background text-foreground p-8 md:p-12 lg:p-14 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            {formStatus === 'success' ? (
              <SuccessMessage onReset={() => setFormStatus('idle')} />
            ) : (
              <ContactForm status={formStatus} onSubmit={handleSubmit} />
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
};
