import type { LucideIcon } from 'lucide-react';

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

/** Icon + label + value row used in the Contact section. */
export const ContactInfoItem = ({ icon: Icon, label, value, href }: ContactInfoItemProps) => {
  const content = (
    <>
      <div className="flex items-center justify-center transition-colors duration-300 rounded-full w-14 h-14 bg-background/5 group-hover:bg-primary">
        <Icon className="w-6 h-6 transition-colors duration-300 text-background group-hover:text-white" />
      </div>
      <div>
        <span className="block mb-1 text-xs font-bold tracking-widest uppercase opacity-50">{label}</span>
        <span className="text-xl font-black tracking-wide transition-colors md:text-2xl group-hover:text-primary">
          {value}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-6 group w-fit">
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-6 cursor-default w-fit">
      {content}
    </div>
  );
};
