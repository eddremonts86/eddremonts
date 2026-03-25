import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'dk', label: 'Dansk' },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex((l) => l.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLangCode = languages[nextIndex].code;

    // Change language and immediately apply to document
    i18n.changeLanguage(nextLangCode);
    document.documentElement.lang = nextLangCode;
    localStorage.setItem('edd-portfolio-lang', nextLangCode);
  };

  const nextLang =
    languages[(languages.findIndex((l) => l.code === i18n.language) + 1) % languages.length]
      ?.code || 'en';

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={toggleLanguage}
        className="border-foreground/10 flex h-10 min-w-[44px] items-center justify-center rounded-full border bg-transparent px-4 text-[10px] font-medium tracking-widest text-foreground shadow-sm transition-colors duration-500 hover:bg-foreground hover:text-background"
        aria-label={`Current language: ${i18n.language}. Click to change to ${nextLang.toUpperCase()}`}
      >
        <span className="uppercase">{i18n.language}</span>
      </button>
    </div>
  );
};
