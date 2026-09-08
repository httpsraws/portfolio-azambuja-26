import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Project, Language } from '../types';

interface FooterProps {
  currentIndex: number;
  totalProjects: number;
  currentProject: Project;
  language?: Language;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetail: () => void;
  isAboutOpen?: boolean;
}

const getSaoPauloTime = () => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
};

export const Footer: React.FC<FooterProps> = ({
  currentIndex,
  totalProjects,
  language = 'pt',
  onPrev,
  onNext,
  isAboutOpen = false,
}) => {
  const [time, setTime] = useState(getSaoPauloTime);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const clockRef = useRef<HTMLDivElement>(null);
  const [midpointY, setMidpointY] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getSaoPauloTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute exact equidistant midpoint between the bottom of the card cover and top of the clock
  useEffect(() => {
    const computeMidpoint = () => {
      const cardEl =
        document.getElementById('card-stack-anchor') ||
        document.getElementById('main-card-stack-deck');
      const clockEl = clockRef.current;
      if (!cardEl || !clockEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const clockRect = clockEl.getBoundingClientRect();

      if (cardRect.bottom > 0 && clockRect.top > 0) {
        // Exact vertical midpoint between card bottom and clock top
        setMidpointY((cardRect.bottom + clockRect.top) / 2);
      }
    };

    computeMidpoint();
    const rafId = requestAnimationFrame(computeMidpoint);
    const timeoutId = setTimeout(computeMidpoint, 120);

    window.addEventListener('resize', computeMidpoint);
    window.addEventListener('orientationchange', computeMidpoint);

    let ro: ResizeObserver | null = null;
    const cardEl = document.getElementById('card-stack-anchor');
    if (cardEl && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(computeMidpoint);
      ro.observe(cardEl);
      if (clockRef.current) ro.observe(clockRef.current);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', computeMidpoint);
      window.removeEventListener('orientationchange', computeMidpoint);
      if (ro) ro.disconnect();
    };
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const homeShiftX = isAboutOpen
    ? windowWidth < 640
      ? 0
      : windowWidth < 1024
      ? -140
      : -220
    : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none transition-colors duration-500">
      {/* Navigation Arrows: Exactly equidistant between the project card cover and the clock */}
      <motion.div
        animate={{ x: homeShiftX }}
        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto select-none flex items-center gap-1 sm:gap-2 z-40 transition-[top] duration-150 ease-out"
        style={
          midpointY !== null
            ? { top: `${midpointY}px` }
            : { bottom: '5rem' }
        }
      >
        {/* Left Arrow: Up (Previous project) */}
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-black dark:text-white opacity-60 hover:opacity-100 disabled:opacity-20 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed bg-transparent border-0 active:scale-90"
          title={language === 'pt' ? 'Projeto anterior (cima)' : 'Previous project (up)'}
          aria-label={language === 'pt' ? 'Projeto anterior' : 'Previous project'}
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
        </button>

        {/* Right Arrow: Down (Next project) */}
        <button
          type="button"
          onClick={onNext}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-black dark:text-white opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer bg-transparent border-0 active:scale-90"
          title={
            currentIndex === totalProjects - 1
              ? language === 'pt'
                ? 'Reiniciar projetos (baixo)'
                : 'Restart projects (down)'
              : language === 'pt'
              ? 'Próximo projeto (baixo)'
              : 'Next project (down)'
          }
          aria-label={
            currentIndex === totalProjects - 1
              ? language === 'pt'
                ? 'Reiniciar projetos'
                : 'Restart projects'
              : language === 'pt'
              ? 'Próximo projeto'
              : 'Next project'
          }
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
        </button>
      </motion.div>

      {/* Center São Paulo Clock with Organic Breathing Blue Dot */}
      <div
        ref={clockRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-7 pointer-events-auto select-none flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] text-black/80 dark:text-white/80 tracking-[0] tabular-nums"
        title={language === 'pt' ? 'Horário de São Paulo (GMT-3)' : 'São Paulo Time (GMT-3)'}
      >
        {/* Breathing Blue Dot: 100% vanishes to 0, with extended hold & ease-in return */}
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#0066ee] dark:bg-[#60a5fa] shrink-0"
          animate={{
            opacity: [1, 1, 0, 0, 1],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            times: [0, 0.45, 0.72, 0.8, 1],
            ease: ['linear', 'easeOut', 'linear', [0.4, 0, 0.2, 1]],
          }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="font-normal">{time}</span>
          <span className="font-normal uppercase">GMT-3</span>
        </div>
      </div>
    </footer>
  );
};
