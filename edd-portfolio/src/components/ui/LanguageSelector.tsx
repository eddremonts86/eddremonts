import { useClickOutside } from '@/hooks/useClickOutside';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'dk', label: 'Dansk' },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(dropdownRef, close);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    localStorage.setItem('edd-portfolio-lang', lng);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(l => l.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLangCode = languages[nextIndex].code;

    // Change language and immediately apply to document
    i18n.changeLanguage(nextLangCode);
    document.documentElement.lang = nextLangCode;
    localStorage.setItem('edd-portfolio-lang', nextLangCode);
  };

  const nextLang = languages[(languages.findIndex(l => l.code === i18n.language) + 1) % languages.length]?.code || 'en';

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={toggleLanguage}
        className="h-12 px-4 flex items-center justify-center border border-foreground/20 bg-background text-foreground font-bold tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-300 rounded-none shadow-sm min-w-[44px] min-h-[44px]"
        aria-label={`Current language: ${i18n.language}. Click to change to ${nextLang.toUpperCase()}`}
      >
        <span className="uppercase">{i18n.language}</span>
      </button>

    </div>
  );
};
