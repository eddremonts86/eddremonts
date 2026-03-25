import { m } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
  <m.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center space-y-6 py-16 text-center"
  >
    <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
      <CheckCircle2 className="h-10 w-10 text-green-500" />
    </div>
    <h4 className="text-3xl font-black uppercase tracking-tighter">Message Sent</h4>
    <p className="font-body text-base opacity-70">
      Thanks for reaching out! I'll get back to you as soon as possible.
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 rounded-full bg-foreground px-8 py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary"
    >
      Send Another
    </button>
  </m.div>
);
