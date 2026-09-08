import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor for devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${
          isClicked ? 0.8 : isPointer ? 1.4 : 1
        })`;
      }

      // Check if hovering an interactive / clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.closest('[data-clickable="true"]')
        );
        setIsPointer(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, isPointer, isClicked]);

  // Keep transform updated on state change
  useEffect(() => {
    if (cursorRef.current && isVisible) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${
        isClicked ? 0.8 : isPointer ? 1.4 : 1
      })`;
    }
  }, [isPointer, isClicked, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {/* Small Circle Cursor */}
      <div
        className={`w-2.5 h-2.5 rounded-full transition-[background-color,border-color,opacity] duration-200 shadow-sm ${
          isPointer
            ? 'bg-black dark:bg-white opacity-85 ring-2 ring-black/20 dark:ring-white/20'
            : 'bg-black dark:bg-white opacity-90'
        }`}
      />
    </div>
  );
};
