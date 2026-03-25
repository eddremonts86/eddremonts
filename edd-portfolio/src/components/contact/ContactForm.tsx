import { AlertCircle, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm = ({
  status,
  onSubmit,
}: {
  status: FormStatus;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <form className="space-y-8 relative z-10" onSubmit={onSubmit}>
      <div className="space-y-6">
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

      {status === 'error' && (
        <div className="flex items-center gap-4 text-red-600 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-bold tracking-wide">Error. Please try emailing me directly.</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-xl uppercase font-bold tracking-widest text-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {status === 'submitting' ? t('contact.form.submitting', 'SENDING...') : t('contact.form.send', 'SEND MESSAGE')}
          </span>
          {status === 'submitting' ? (
            <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
    </form>
  );
};
