export interface HoverColors {
  bgColor: string;
  textColor: string;
  mutedTextColor: string;
  sublineTextColor: string;
  borderColor: string;
  buttonHover: string;
  isDarkHover: boolean;
  isLightHover: boolean;
}

export function getHoverColors(isHovered: boolean, resolvedTheme: string): HoverColors {
  const isDarkHover = isHovered && resolvedTheme === 'dark';
  const isLightHover = isHovered && resolvedTheme === 'light';

  return {
    isDarkHover,
    isLightHover,
    bgColor: isDarkHover ? 'bg-black' : isLightHover ? 'bg-white' : 'bg-background',
    textColor: isDarkHover ? 'text-white' : isLightHover ? 'text-black' : 'text-foreground',
    mutedTextColor: isDarkHover
      ? 'text-white/80'
      : isLightHover
        ? 'text-black/80'
        : 'text-foreground/80',
    sublineTextColor: isDarkHover
      ? 'text-white/60'
      : isLightHover
        ? 'text-black/60'
        : 'text-foreground/60',
    borderColor: isDarkHover
      ? 'border-white/20'
      : isLightHover
        ? 'border-black/20'
        : 'border-foreground/20',
    buttonHover: isDarkHover
      ? 'hover:bg-white hover:text-black'
      : isLightHover
        ? 'hover:bg-black hover:text-white'
        : 'hover:bg-foreground hover:text-background',
  };
}
