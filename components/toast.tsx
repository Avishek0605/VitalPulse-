'use client';

import { AnimatePresence, motion } from 'framer-motion';

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-teal/40 bg-navy px-4 py-2 text-sm text-white shadow-glow"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
