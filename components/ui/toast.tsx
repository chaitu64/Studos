'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface ToastState {
  id: number;
  message: string;
}

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const push = useCallback((message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2400);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      {/* Toast viewport */}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 space-y-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-fade-up pointer-events-auto flex items-center gap-2"
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}