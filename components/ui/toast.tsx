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
        className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 space-y-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="surface-2 px-4 py-2.5 text-sm text-fg shadow-lg animate-fade-up border-borderline"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}