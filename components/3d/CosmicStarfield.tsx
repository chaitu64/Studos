"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  colorTail: string;
  alpha: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export function CosmicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();

    // Particle count scaled to screen size
    const PARTICLE_COUNT = Math.min(130, Math.max(55, Math.floor(width / 13)));
    const particles: Particle[] = [];

    // Spider-Man theme palette: Crimson, Cobalt, Royal Blue, Platinum Silver (No blinding neon)
    const SPIDER_COLORS = [
      'rgba(225, 29, 72, 0.85)',   // Spider Crimson
      'rgba(37, 99, 235, 0.85)',   // Web Cobalt
      'rgba(29, 78, 216, 0.8)',    // Deep Royal Blue
      'rgba(220, 38, 38, 0.8)',    // Deep Scarlet
      'rgba(248, 250, 252, 0.9)',  // Starlight Platinum White
      'rgba(148, 163, 184, 0.7)',  // Web Filament Silver
    ];

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 1.8 + 0.8,
        color: SPIDER_COLORS[Math.floor(Math.random() * SPIDER_COLORS.length)],
        baseAlpha: Math.random() * 0.4 + 0.45,
      });
    }

    // Shooting comets/tracers
    const comets: Comet[] = [];
    let frameCount = 0;

    const spawnComet = () => {
      // Spawn from top or top-left
      const fromTop = Math.random() > 0.4;
      const startX = fromTop ? Math.random() * width : -20;
      const startY = fromTop ? -20 : Math.random() * (height * 0.6);
      const speed = Math.random() * 8 + 11;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25; // ~45 deg diagonal
      const isRed = Math.random() > 0.45;

      comets.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 140 + 90,
        colorTail: isRed ? '#E11D48' : '#2563EB', // Spider-Man palette
        alpha: 0.9,
        life: 0,
        maxLife: Math.floor(Math.random() * 45 + 35),
        size: Math.random() * 1.5 + 1.8,
      });
    };

    // Initial batch of comets
    setTimeout(spawnComet, 200);
    setTimeout(spawnComet, 900);

    // Expanding radar ripples (Spider-Sense waves)
    const ripples: Ripple[] = [];
    const triggerRipple = (x: number, y: number, color = 'rgba(225, 29, 72, 0.4)') => {
      ripples.push({
        x,
        y,
        radius: 10,
        maxRadius: Math.min(width, height) * 0.38,
        alpha: 0.5,
        color,
      });
    };

    // Periodic ambient pulse
    let lastRippleTime = Date.now();

    // Mouse tracking for interactive spider-web filaments
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      triggerRipple(e.clientX, e.clientY, Math.random() > 0.5 ? 'rgba(225, 29, 72, 0.5)' : 'rgba(37, 99, 235, 0.5)');
    };

    const handleResize = () => {
      setupCanvasSize();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Perspective grid offset & spider-web pulse
    let gridOffset = 0;
    let webPulse = 0;

    // Render loop
    const render = () => {
      frameCount++;
      gridOffset = (gridOffset + 0.65) % 36;
      webPulse += 0.015;

      // Spawn tracers frequently so background always feels active
      if (frameCount % 75 === 0 || (frameCount % 140 === 0 && comets.length < 3)) {
        spawnComet();
      }

      // Trigger subtle spider-sense radar wave every ~6 seconds
      const now = Date.now();
      if (now - lastRippleTime > 6000) {
        lastRippleTime = now;
        triggerRipple(width * 0.5, height * 0.38, 'rgba(37, 99, 235, 0.3)');
      }

      // 1. Deep Space Noir Canvas Clear
      ctx.fillStyle = '#06080F';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric radial depth (Crimson & Cobalt ambient pockets)
      const gradLeft = ctx.createRadialGradient(width * 0.25, height * 0.2, 20, width * 0.25, height * 0.2, width * 0.55);
      gradLeft.addColorStop(0, 'rgba(225, 29, 72, 0.07)');
      gradLeft.addColorStop(1, 'rgba(6, 8, 15, 0)');
      ctx.fillStyle = gradLeft;
      ctx.fillRect(0, 0, width, height);

      const gradRight = ctx.createRadialGradient(width * 0.78, height * 0.45, 20, width * 0.78, height * 0.45, width * 0.55);
      gradRight.addColorStop(0, 'rgba(37, 99, 235, 0.08)');
      gradRight.addColorStop(1, 'rgba(6, 8, 15, 0)');
      ctx.fillStyle = gradRight;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated 3D Cyber Horizon Floor Grid (Bottom half of Viewport)
      const horizonY = height * 0.62;
      const floorHeight = height - horizonY;

      ctx.save();
      // Horizon soft glow
      const horizonGlow = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 60);
      horizonGlow.addColorStop(0, 'rgba(37, 99, 235, 0)');
      horizonGlow.addColorStop(0.5, 'rgba(225, 29, 72, 0.2)');
      horizonGlow.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 40, width, 100);

      // Perspective vertical rays radiating from horizon center
      ctx.lineWidth = 1;
      const cx = width / 2;
      const rayCount = 28;
      for (let i = -rayCount; i <= rayCount; i++) {
        const bottomX = cx + i * (width / (rayCount * 0.68));
        const rayAlpha = Math.max(0, 0.2 - Math.abs(i) * 0.005);
        ctx.strokeStyle = `rgba(37, 99, 235, ${rayAlpha})`;
        ctx.beginPath();
        ctx.moveTo(cx + i * 14, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Perspective horizontal moving grid lines
      const horizontalLineCount = 14;
      for (let i = 0; i < horizontalLineCount; i++) {
        const progress = ((i * 26 + gridOffset) % (horizontalLineCount * 26)) / (horizontalLineCount * 26);
        const y = horizonY + Math.pow(progress, 2.1) * floorHeight;
        const lineAlpha = progress * 0.28;
        ctx.strokeStyle = `rgba(225, 29, 72, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Subtle Spider-Web Geometric Background Lattice (Hero Area)
      ctx.save();
      const webCenterY = height * 0.38;
      const maxWebR = Math.min(width, height) * 0.48;
      const ringCount = 5;

      // Rotating spider-web spokes
      const spokeCount = 12;
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      for (let s = 0; s < spokeCount; s++) {
        const angle = (s * (Math.PI * 2) / spokeCount) + webPulse * 0.2;
        ctx.beginPath();
        ctx.moveTo(cx, webCenterY);
        ctx.lineTo(cx + Math.cos(angle) * maxWebR, webCenterY + Math.sin(angle) * maxWebR);
        ctx.stroke();
      }

      // Concentric polygon web rings
      for (let r = 1; r <= ringCount; r++) {
        const rRadius = (r / ringCount) * maxWebR * (1 + Math.sin(webPulse + r) * 0.03);
        const rAlpha = (1 - (r / ringCount) * 0.6) * 0.12;
        ctx.strokeStyle = r % 2 === 0 ? `rgba(225, 29, 72, ${rAlpha})` : `rgba(37, 99, 235, ${rAlpha})`;
        ctx.beginPath();
        for (let s = 0; s <= spokeCount; s++) {
          const angle = (s * (Math.PI * 2) / spokeCount) + webPulse * 0.2;
          const px = cx + Math.cos(angle) * rRadius;
          const py = webCenterY + Math.sin(angle) * rRadius;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // 4. Draw Expanding Spider-Sense Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 2.2;
        rip.alpha *= 0.97;

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = rip.color.replace(/[\d.]+\)$/, `${rip.alpha})`);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Update & Draw Constellation Spider-Web Network
      const maxDist = 135;
      const maxDistSq = maxDist * maxDist;
      const mouseDist = 180;
      const mouseDistSq = mouseDist * mouseDist;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary bounce
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        // Connect nearby nodes with delicate spider-web filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const lineAlpha = (1 - distSq / maxDistSq) * 0.28;
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Interactive mouse webbing: tether nearby particles to cursor
        if (mouseActive) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseDistSq) {
            const mFactor = 1 - mDistSq / mouseDistSq;
            const strandAlpha = mFactor * 0.55;

            // Spider Crimson & Cobalt strand gradient
            const strandGrad = ctx.createLinearGradient(p.x, p.y, mouseX, mouseY);
            strandGrad.addColorStop(0, p.color);
            strandGrad.addColorStop(1, '#2563EB');

            ctx.strokeStyle = strandGrad;
            ctx.lineWidth = 1.2 * mFactor + 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();

            // Subtle magnetic elastic pull toward cursor
            p.x -= mdx * 0.015 * mFactor;
            p.y -= mdy * 0.015 * mFactor;
          }
        }

        // Particle node render
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 6. Update & Draw Shooting Comets (Spider-Man Tracers)
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life++;

        const lifeRatio = c.life / c.maxLife;
        const currentAlpha = (1 - lifeRatio) * c.alpha;

        if (c.life >= c.maxLife || c.x > width + 150 || c.y > height + 150) {
          comets.splice(i, 1);
          continue;
        }

        // Calculate tail position
        const mag = Math.hypot(c.vx, c.vy);
        const tailX = c.x - (c.vx / mag) * c.length;
        const tailY = c.y - (c.vy / mag) * c.length;

        // Gradient stream: bright white head, vibrant crimson/cobalt tail fading into void
        const cometGrad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        cometGrad.addColorStop(0.25, c.colorTail);
        cometGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = c.size;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Starlight tip
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}

export default CosmicStarfield;
