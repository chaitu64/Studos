"use client";

import React, { useRef, useState, useCallback } from 'react';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  depth?: boolean;
}

export function Card3D({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  depth = true,
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coordinates (-1 to 1)
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    const rotateY = (mouseX - 0.5) * (maxTilt * 2);
    const rotateX = -(mouseY - 0.5) * (maxTilt * 2);

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glare) {
      setGlarePosition({
        x: mouseX * 100,
        y: mouseY * 100,
        opacity: 0.25,
      });
    }
  }, [maxTilt, scale, glare]);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: depth ? 'preserve-3d' : 'flat',
        transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease',
      }}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {/* Dynamic Specular Hologram Glare */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle 240px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(6, 182, 212, 0.25) 30%, rgba(147, 51, 234, 0.15) 55%, transparent 80%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      {children}
    </div>
  );
}

export default Card3D;
