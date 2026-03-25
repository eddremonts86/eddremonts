interface StatusBadgeProps {
  label: string;
  className?: string;
}

/** Pulsing availability dot + label — shared by Hero & Contact sections. */
export const StatusBadge = ({ label, className = '' }: StatusBadgeProps) => (
  <div
    className={`inline-flex items-center gap-3 px-4 py-2 border border-current/20 bg-current/5 rounded-full backdrop-blur-sm ${className}`}
  >
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] font-medium">
      {label}
    </span>
  </div>
);
