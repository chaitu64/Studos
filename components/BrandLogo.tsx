'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function BrandLogo({ size = 'md', className = '', showText = true }: BrandLogoProps) {
  const sizeMap = {
    sm: { icon: 26, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 32, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 40, text: 'text-2xl', sub: 'text-[11px]' },
    xl: { icon: 48, text: 'text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp, Non-Neon Spider Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:scale-105"
        >
          {/* Outer Diamond Shield */}
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="#0B0F1A"
            stroke="#2563EB"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />

          {/* Spider Web Crosshairs */}
          <line x1="20" y1="2" x2="20" y2="38" stroke="#E11D48" strokeWidth="0.9" strokeOpacity="0.5" />
          <line x1="4" y1="20" x2="36" y2="20" stroke="#2563EB" strokeWidth="0.9" strokeOpacity="0.5" />

          {/* Upper Spider Chevron (Matte Crimson) */}
          <polygon
            points="20,7 28,13 20,18 12,13"
            fill="#DC2626"
          />

          {/* Lower Spider Chevron (Matte Cobalt) */}
          <polygon
            points="20,33 28,27 20,22 12,27"
            fill="#2563EB"
          />

          {/* White Center Diamond Core */}
          <polygon
            points="20,17 23,20 20,23 17,20"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center tracking-tight leading-none">
            <span className={`font-black text-white ${currentSize.text} tracking-wide`}>
              Stud
            </span>
            <span className={`font-black text-[#E11D48] ${currentSize.text} tracking-wide ml-0.5`}>
              OS
            </span>
          </div>
          <span className={`font-mono text-slate-400 font-medium uppercase tracking-[0.16em] ${currentSize.sub} leading-none mt-1`}>
            Student Operating System
          </span>
        </div>
      )}
    </div>
  );
}
