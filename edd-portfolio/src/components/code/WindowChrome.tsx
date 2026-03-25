import { tabs } from './codeBlockTokens';

export const WindowChrome = ({
  activeTab,
  onTabChange,
}: {
  activeTab: number;
  onTabChange: (idx: number) => void;
}) => (
  <div className="bg-[#151515] rounded-t-xl px-4 py-3 flex items-center gap-3 border-b border-white/[0.05]">
    {/* Traffic lights */}
    <div className="flex gap-2 shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>

    {/* File tabs */}
    <div className="flex gap-1 ml-4 overflow-x-auto scrollbar-none">
      {tabs.map((tab, idx) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(idx)}
          className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-mono tracking-wide rounded-md transition-all duration-300 whitespace-nowrap ${
            idx === activeTab
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-white/40 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <span className="text-[10px] opacity-70">{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </div>

    {/* Minimap dots (decorative) */}
    <div className="ml-auto flex gap-1 items-center opacity-20" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-1 h-3 rounded-sm bg-white/40" />
      ))}
    </div>
  </div>
);
