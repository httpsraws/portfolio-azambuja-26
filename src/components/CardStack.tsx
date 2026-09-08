import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Project } from '../types';
import { CardCover } from './CardCover';
import { playClickSound, playSwooshSound } from '../utils/sound';

interface CardStackProps {
  projects: Project[];
  currentIndex: number;
  direction: number;
  resetKey?: number;
  onSelectProject: (index: number, dir?: number) => void;
  onOpenDetail: () => void;
  soundEnabled: boolean;
  isInfoOpen?: boolean;
}

export const CardStack: React.FC<CardStackProps> = ({
  projects,
  currentIndex,
  direction,
  resetKey = 0,
  onSelectProject,
  onOpenDetail,
  soundEnabled,
  isInfoOpen = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef(0);
  const lastDeltaRef = useRef(0);
  const lastDirectionRef = useRef(0);

  // Mouse Parallax Motion Values
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);

  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Reset animation state for top-to-bottom re-emergence
  const [isResetting, setIsResetting] = useState(false);
  const [exitingCard, setExitingCard] = useState<{ project: Project; id: string } | null>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  // React pattern to sync resetKey state synchronously during render without layout flickers
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setCycleKey((k) => k + 1);
    setIsResetting(true);
    const lastProject = projects[projects.length - 1];
    setExitingCard({
      project: lastProject,
      id: `${lastProject.id}-exit-${resetKey}-${Date.now()}`,
    });
  }

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setIsResetting(false);
        setExitingCard(null);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [isResetting, cycleKey]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const infoShiftX = isInfoOpen
    ? windowWidth < 640
      ? 0
      : windowWidth < 1024
      ? -140
      : -220
    : 0;

  // Spring smoothed values for natural physical inertia
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // 3D rotations from mouse
  const tiltRotateX = useTransform(smoothMouseY, [0, 1], [12, -12]);
  const tiltRotateY = useTransform(smoothMouseX, [0, 1], [-14, 14]);
  const tiltTranslateX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const tiltTranslateY = useTransform(smoothMouseY, [0, 1], [-16, 16]);

  // Track global mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      rawMouseX.set(normX);
      rawMouseY.set(normY);
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  // Wheel Scroll Handling with acceleration & micro-jitter rejection
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // If About menu is open or stack is currently in reset animation, ignore
      if (isInfoOpen || isResetting) {
        if (isInfoOpen) {
          const aboutContainer = document.getElementById('about-scroll-container');
          if (aboutContainer && !aboutContainer.contains(e.target as Node)) {
            aboutContainer.scrollTop += e.deltaY;
          }
        }
        return;
      }

      e.preventDefault();

      const now = performance.now();
      const delta = e.deltaY;
      const absDelta = Math.abs(delta);

      // Filter out micro-jitter
      if (absDelta < 12) {
        lastDeltaRef.current = delta;
        return;
      }

      const wheelDir = delta > 0 ? 1 : -1;
      const timeSinceLast = now - lastScrollTimeRef.current;
      const prevDelta = Math.abs(lastDeltaRef.current);
      const isOppositeDirection = wheelDir !== lastDirectionRef.current;

      const canTrigger =
        timeSinceLast > 240 ||
        (isOppositeDirection && timeSinceLast > 140) ||
        (timeSinceLast > 170 && absDelta > prevDelta * 1.25);

      lastDeltaRef.current = delta;

      if (!canTrigger) return;

      lastScrollTimeRef.current = now;
      lastDirectionRef.current = wheelDir;

      if (wheelDir > 0) {
        // Scroll Down -> Next project (or loop reset if on the last project)
        if (currentIndex < projects.length - 1) {
          playSwooshSound(soundEnabled);
          onSelectProject(currentIndex + 1, 1);
        } else {
          // Restart project stack order from beginning: smooth infinite loop
          playSwooshSound(soundEnabled);
          onSelectProject(0, 2);
        }
      } else {
        // Scroll Up -> Previous project
        if (currentIndex > 0) {
          playSwooshSound(soundEnabled);
          onSelectProject(currentIndex - 1, -1);
        }
      }
    },
    [currentIndex, projects.length, onSelectProject, soundEnabled, isInfoOpen, isResetting]
  );

  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      handleWheel(e);
    };

    window.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
    };
  }, [handleWheel]);

  // Touch Swipe / Drag Handling
  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (isInfoOpen || isResetting) return;

    const threshold = 35;
    const velocityThreshold = 0.25;

    if (info.offset.y > threshold || info.velocity.y > velocityThreshold) {
      // Swiped Down -> Next Card (or restart from top if at end)
      if (currentIndex < projects.length - 1) {
        playSwooshSound(soundEnabled);
        onSelectProject(currentIndex + 1, 1);
      } else {
        playSwooshSound(soundEnabled);
        onSelectProject(0, 2);
      }
    } else if (info.offset.y < -threshold || info.velocity.y < -velocityThreshold) {
      // Swiped Up -> Previous Card
      if (currentIndex > 0) {
        playSwooshSound(soundEnabled);
        onSelectProject(currentIndex - 1, -1);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInfoOpen || isResetting) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < projects.length - 1) {
          playSwooshSound(soundEnabled);
          onSelectProject(currentIndex + 1, 1);
        } else {
          playSwooshSound(soundEnabled);
          onSelectProject(0, 2);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          playSwooshSound(soundEnabled);
          onSelectProject(currentIndex - 1, -1);
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playClickSound(soundEnabled);
        onOpenDetail();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, projects.length, onSelectProject, onOpenDetail, soundEnabled, isInfoOpen, isResetting]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-[1400px]"
    >
      <motion.div
        animate={{
          x: infoShiftX,
        }}
        transition={{
          duration: 0.75,
          ease: [0.32, 0.72, 0, 1],
        }}
        className="relative w-full flex items-center justify-center"
      >
        {/* Static Anchor for measuring resting card bottom without 3D tilt perturbation */}
        <div
          id="card-stack-anchor"
          className="absolute w-full max-w-[94vw] sm:max-w-[740px] md:max-w-[820px] lg:max-w-[900px] xl:max-w-[1000px] aspect-[16/9] pointer-events-none opacity-0 select-none"
          aria-hidden="true"
        />

        {/* 3D Motion Stage */}
        <motion.div
          className="relative flex items-center justify-center w-full max-w-4xl px-3 sm:px-6 preserve-3d"
          animate={{
            opacity: isInfoOpen && windowWidth < 640 ? 0.35 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{
            rotateX: tiltRotateX,
            rotateY: tiltRotateY,
            x: tiltTranslateX,
            y: tiltTranslateY,
          }}
        >
          {/* Layered Card Stack (16:9 Cinematic Aspect Ratio) */}
          <div className="relative w-full max-w-[94vw] sm:max-w-[740px] md:max-w-[820px] lg:max-w-[900px] xl:max-w-[1000px] aspect-[16/9] flex items-center justify-center touch-pan-y">
            {/* Exiting Last Card Overlay: Drops smoothly down to y: 850 in front during loop reset */}
            {exitingCard && (
              <motion.div
                key={exitingCard.id}
                initial={{ y: 0, scale: 1, opacity: 1 }}
                animate={{ y: 850, scale: 1.34, opacity: 0.95 }}
                transition={{
                  duration: 0.92,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="absolute inset-0 w-full h-full rounded-[22px] ring-1 ring-black/10 dark:ring-0 pointer-events-none z-[65]"
                style={{
                  transformOrigin: 'top center',
                }}
              >
                <CardCover project={exitingCard.project} isFront={true} />
              </motion.div>
            )}

            {projects.map((project, index) => {
              const isFront = index === currentIndex;
              const isPassed = index < currentIndex;
              const isBehind = index > currentIndex;
              const offset = index - currentIndex;
              const visibleOffset = Math.min(offset, 4);

              // Stacking geometry:
              // Passed cards (index < currentIndex): dropped down below view with expanded scale
              // Front card (index === currentIndex): centered at y: 0, scale: 1
              // Behind cards (index > currentIndex): stepped up behind proportionally
              const cardStep = windowWidth < 640 ? 24 : 38;
              let targetY = 0;
              let targetScale = 1;
              let targetZIndex = 50;

              if (isPassed) {
                targetY = 850;
                targetScale = 1.34;
                targetZIndex = 60 + index;
              } else if (isFront) {
                targetY = 0;
                targetScale = 1;
                targetZIndex = 50;
              } else {
                targetY = -visibleOffset * cardStep;
                targetScale = 1 - visibleOffset * 0.058;
                targetZIndex = 50 - offset * 5;
              }

              return (
                <motion.div
                  key={`${project.id}-cycle-${cycleKey}`}
                  initial={
                    isResetting
                      ? {
                          y: -850 - index * 18,
                          scale: 0.94,
                          opacity: 0.25,
                        }
                      : false
                  }
                  animate={{
                    y: targetY,
                    scale: targetScale,
                    opacity: 1,
                    zIndex: targetZIndex,
                  }}
                  transition={
                    isResetting
                      ? {
                          duration: 0.92,
                          delay: 0.05 + index * 0.048,
                          ease: [0.32, 0.72, 0, 1],
                        }
                      : {
                          duration: 0.92,
                          ease: [0.32, 0.72, 0, 1],
                        }
                  }
                  drag={isFront && !isResetting ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.4}
                  onDragEnd={isFront && !isResetting ? handleDragEnd : undefined}
                  onClick={() => {
                    if (isResetting) return;
                    if (isFront) {
                      playClickSound(soundEnabled);
                      onOpenDetail();
                    } else if (isBehind && offset <= 4) {
                      playSwooshSound(soundEnabled);
                      onSelectProject(index, 1);
                    }
                  }}
                  className={`absolute inset-0 w-full h-full rounded-[22px] ring-1 ring-black/10 dark:ring-0 ${
                    isFront && !isResetting
                      ? 'cursor-pointer pointer-events-auto'
                      : isBehind && offset <= 4 && !isResetting
                      ? 'cursor-pointer pointer-events-auto'
                      : 'pointer-events-none'
                  }`}
                  style={{
                    transformOrigin: 'top center',
                  }}
                >
                  <CardCover project={project} isFront={isFront} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
