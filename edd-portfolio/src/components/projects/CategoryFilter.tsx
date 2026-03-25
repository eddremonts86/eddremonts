import { useTranslation } from 'react-i18next';

const categories = ["All", "Frontend", "Full Stack"];
const categoryKeys: Record<string, string> = {
  "All": "all",
  "Frontend": "frontend",
  "Full Stack": "fullStack",
};

export const CategoryFilter = ({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (cat: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 hide-scrollbar mt-8 md:mt-0">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          aria-pressed={active === cat}
          className={`px-6 py-2 uppercase font-mono tracking-widest text-[11px] transition-all whitespace-nowrap min-h-[44px] rounded-full border ${
            active === cat
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-foreground/50 border-subtle hover:text-foreground hover:border-foreground/30"
          }`}
        >
          {t(`projects.filters.${categoryKeys[cat]}`)}
        </button>
      ))}
    </div>
  );
};
