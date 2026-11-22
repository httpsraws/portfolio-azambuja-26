import React, { useEffect, useRef, useState } from 'react';

/**
 * Ring cursor (stroke only) with a "bubble" deformation:
 * it stretches along the direction of movement, proportionally to the pointer speed,
 * and wobbles back into a circle with a spring when the pointer slows down.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let visible = false;
    let isPointer = false;
    let isDown = false;
    let angle = 0;
    // Spring state for stretch amount and overall scale
    let stretch = 0;
    let stretchVel = 0;
    let scale = 1;
    let raf = 0;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = target.x;
        pos.y = target.y;
        wrap.style.opacity = '1';
      }
      const el = e.target as HTMLElement | null;
      isPointer = Boolean(
        el?.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-clickable="true"]')
      );
    };
    const onDown = () => { isDown = true; };
    const onUp = () => { isDown = false; };
    const onLeave = () => { visible = false; wrap.style.opacity = '0'; };

    const loop = (t: number) => {
      const dt = Math.min(48, t - lastT) / 16.67; // frames elapsed (60fps = 1)
      lastT = t;

      // Follow with a little lag so the bubble has inertia
      const follow = 1 - Math.pow(1 - 0.35, dt);
      const dx = (target.x - pos.x) * follow;
      const dy = (target.y - pos.y) * follow;
      pos.x += dx;
      pos.y += dy;

      const speed = Math.hypot(dx, dy) / Math.max(dt, 0.001); // px per frame
      if (speed > 0.4) angle = Math.atan2(dy, dx);

      // Spring towards a stretch proportional to speed (capped), overshooting slightly on stop
      const goal = reduced ? 0 : Math.min(speed / 38, 0.75);
      stretchVel += (goal - stretch) * 0.22 * dt;
      stretchVel *= Math.pow(0.72, dt);
      stretch += stretchVel * dt;

      const scaleGoal = isDown ? 0.8 : isPointer ? 1.4 : 1;
      scale += (scaleGoal - scale) * (1 - Math.pow(1 - 0.2, dt));

      const sx = 1 + stretch;
      const sy = 1 - stretch * 0.45;
      wrap.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      ring.style.transform = `rotate(${angle.toFixed(3)}rad) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform mix-blend-difference"
      style={{ opacity: 0, transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Stroke-only ring; difference blend keeps it visible on light and dark backgrounds */}
      <div
        ref={ringRef}
        className="w-9 h-9 rounded-full border-[1.5px] border-white bg-transparent will-change-transform"
      />
      {/* Centre dot for click precision — stays round while the ring deforms */}
      <span className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    </div>
  );
};
