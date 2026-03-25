import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center text-center py-16 space-y-6"
  >
    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
      <CheckCircle2 className="w-10 h-10 text-green-500" />
    </div>
    <h4 className="text-3xl font-black uppercase tracking-tighter">Message Sent</h4>
    <p className="text-base opacity-70 font-body">Thanks for reaching out! I'll get back to you as soon as possible.</p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 px-8 py-3 bg-foreground text-background uppercase font-bold tracking-widest text-xs hover:bg-primary transition-colors rounded-full"
    >
      Send Another
    </button>
  </motion.div>
);
