import * as LucideIcons from 'lucide-react';
import type { ComponentType } from 'react';

const IconMap: Record<string, ComponentType<{ className?: string }>> = {
  'users': LucideIcons.Users,
  'rocket': LucideIcons.Rocket,
  'shield': LucideIcons.ShieldCheck,
  'layout': LucideIcons.Layout,
  'server': LucideIcons.Database,
};

export const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = IconMap[name] || LucideIcons.Star;
  return <Icon className={className} />;
};
