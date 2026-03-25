export const StatusBar = ({ lineCount }: { lineCount: number }) => (
  <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05] text-[10px] font-mono tracking-widest text-white/30 uppercase bg-[#0F0F0F]">
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
        TypeScript
      </span>
      <span>UTF-8</span>
    </div>
    <div className="flex items-center gap-4">
      <span>Ln {lineCount}, Col 1</span>
      <span>Spaces: 2</span>
    </div>
  </div>
);
