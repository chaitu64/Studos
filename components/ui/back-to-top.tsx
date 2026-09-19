'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#1E74FD] hover:bg-blue-500 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}
