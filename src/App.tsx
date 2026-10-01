import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useIsPresent, usePresenceData } from 'motion/react';
import { Info, X } from 'lucide-react';
import { PROJECTS } from './data/projects';
import { ThemeMode, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CardStack } from './components/CardStack';
import { ProjectPage } from './components/ProjectPage';
import { AboutModal } from './components/AboutModal';
import { CustomCursor } from './components/CustomCursor';
import { playClickSound } from './utils/sound';
import { getProjectSlug, parseProjectIndexFromLocation } from './utils/routes';

interface ProjectPageTransitionLayerProps {
  projectId: string;
  direction: number;
  shouldAnimate: boolean;
  children: React.ReactNode;
}

interface ProjectPagePresenceData {
  direction: number;
  animate: boolean;
}

const ProjectPageTransitionLayer: React.FC<ProjectPageTransitionLayerProps> = ({
  projectId,
  direction,
  shouldAnimate,
  children,
}) => {
  const isPresent = useIsPresent();
  const presenceData = usePresenceData() as ProjectPagePresenceData | undefined;
  const currentDirection = presenceData?.direction ?? direction;
  const shouldAnimateTransition = presenceData?.animate ?? shouldAnimate;

  return (
    <motion.div
      key={projectId}
      custom={presenceData ?? { direction: currentDirection, animate: shouldAnimateTransition }}
      variants={{
        enter: (data: ProjectPagePresenceData) => ({ x: data.direction > 0 ? '-100vw' : '100vw' }),
        center: { x: 0 },
        exit: (data: ProjectPagePresenceData) => ({
          x: data.animate ? (data.direction > 0 ? '100vw' : '-100vw') : 0,
          transition: { duration: data.animate ? 0.72 : 0 },
        }),
      }}
      initial={shouldAnimate ? 'enter' : false}
      animate="center"
      exit="exit"
      transition={{ duration: 0.72, ease: [0.42, 0, 1, 1] }}
      className={isPresent
        ? 'relative z-10'
        : 'pointer-events-none absolute left-0 top-0 z-0 w-full'}
      aria-hidden={!isPresent}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  // Theme state with localStorage persistence - strictly defaults to 'light'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rico-portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Language state (defaults to 'en' - English)
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rico-portfolio-lang');
      if (saved === 'pt' || saved === 'en') return saved;
    }
    return 'en';
  });

  // Sound feedback preference
  const [soundEnabled] = useState<boolean>(false);

  // Initial routing detection: supports direct link landing e.g. /01, /02, ...
  const initialRouteIndex = typeof window !== 'undefined' ? parseProjectIndexFromLocation() : null;

  // Active Project & Navigation Direction (dir=2 means reset loop from top-down)
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return initialRouteIndex !== null ? initialRouteIndex : 0;
  });
  const [direction, setDirection] = useState(1);
  const [resetKey, setResetKey] = useState(0);

  // Dedicated Project Page View state - initialized from URL path
  const [isProjectPageOpen, setIsProjectPageOpen] = useState<boolean>(() => {
    return initialRouteIndex !== null;
  });
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [projectPageDirection, setProjectPageDirection] = useState(1);
  const [shouldAnimateProjectNavigation, setShouldAnimateProjectNavigation] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInitialLoadingComplete, setIsInitialLoadingComplete] = useState(false);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);

  // About modal / drawer state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Preload the animated project covers and use their completion as the initial loading progress.
  useEffect(() => {
    let isActive = true;
    let completed = 0;
    const covers = PROJECTS.map((project) => project.coverImage).filter(
      (cover): cover is string => Boolean(cover)
    );
    const finishCover = () => {
      if (!isActive) return;
      completed += 1;
      setLoadingProgress(Math.round((completed / covers.length) * 100));
      if (completed === covers.length) setIsInitialLoadingComplete(true);
    };

    if (covers.length === 0) {
      setLoadingProgress(100);
      setIsInitialLoadingComplete(true);
      return () => { isActive = false; };
    }

    const coverImages = covers.map((src) => {
      const image = new Image();
      let isFinished = false;
      const finishOnce = () => {
        if (isFinished) return;
        isFinished = true;
        finishCover();
      };
      image.onload = finishOnce;
      image.onerror = finishOnce;
      image.src = src;
      if (image.complete) finishOnce();
      return image;
    });

    return () => {
      isActive = false;
      coverImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  // Sync initial title
  useEffect(() => {
    const routeIndex = parseProjectIndexFromLocation();
    if (routeIndex !== null && PROJECTS[routeIndex]) {
      document.title = `${PROJECTS[routeIndex].title} — Azambuja`;
    } else {
      document.title = 'Ricardo Azambuja | Creative Art Director';
    }
  }, []);

  // Listen to browser Back/Forward (popstate) and hash changes to keep URL in sync
  useEffect(() => {
    const handleLocationChange = () => {
      setShouldAnimateProjectNavigation(false);
      const routeIndex = parseProjectIndexFromLocation();
      if (routeIndex !== null && PROJECTS[routeIndex]) {
        setCurrentIndex(routeIndex);
        setIsProjectPageOpen(true);
        setIsProjectInfoOpen(false);
        document.title = `${PROJECTS[routeIndex].title} — Azambuja`;
      } else {
        setIsProjectPageOpen(false);
        setIsProjectInfoOpen(false);
        document.title = 'Ricardo Azambuja | Creative Art Director';
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Manage window scrolling based on whether project page is open
  useEffect(() => {
    if (isProjectPageOpen) {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isProjectPageOpen]);

  // Sync theme with HTML document class and data-theme attribute
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('rico-portfolio-theme', theme);
  }, [theme]);

  // Sync language to localStorage
  useEffect(() => {
    localStorage.setItem('rico-portfolio-lang', language);
  }, [language]);

  // Handle ESC key to exit project page or close info drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isProjectInfoOpen) {
          setIsProjectInfoOpen(false);
        } else if (isAboutOpen) {
          setIsAboutOpen(false);
        } else if (isProjectPageOpen) {
          handleCloseProjectPage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProjectInfoOpen, isAboutOpen, isProjectPageOpen]);

  const handleToggleTheme = () => {
    playClickSound(soundEnabled);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleLanguage = () => {
    playClickSound(soundEnabled);
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const handleSelectProject = (index: number, dir?: number) => {
    if (dir === 2 || (currentIndex === PROJECTS.length - 1 && index === 0)) {
      setDirection(2);
      setResetKey((prev) => prev + 1);
      setCurrentIndex(0);
    } else {
      setDirection(dir ?? (index >= currentIndex ? 1 : -1));
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleSelectProject(currentIndex - 1, -1);
    } else {
      handleSelectProject(PROJECTS.length - 1, -1);
    }
  };

  const handleNext = () => {
    if (currentIndex === PROJECTS.length - 1) {
      handleSelectProject(0, 2);
    } else {
      handleSelectProject(currentIndex + 1, 1);
    }
  };

  const handleToggleAbout = () => {
    setIsAboutOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsProjectInfoOpen(false);
      }
      return next;
    });
  };

  const handleToggleProjectInfo = () => {
    setIsProjectInfoOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsAboutOpen(false);
      }
      return next;
    });
  };

  // Opens project page and updates the URL to /01, /02, ...
  const handleOpenProjectPage = useCallback((index?: number, animateFromHome = true, navigationDirection?: number) => {
    const targetIndex = typeof index === 'number' ? index : currentIndex;
    setShouldAnimateProjectNavigation(Boolean(navigationDirection));
    if (navigationDirection) setProjectPageDirection(navigationDirection);
    setCurrentIndex(targetIndex);
    setIsProjectPageOpen(true);
    setIsPageTransitioning(animateFromHome);
    setIsProjectInfoOpen(false);
    setIsAboutOpen(false);

    const slug = getProjectSlug(targetIndex);
    const targetPath = `/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ projectIndex: targetIndex }, '', targetPath);
    }
    if (PROJECTS[targetIndex]) {
      document.title = `${PROJECTS[targetIndex].title} — Azambuja`;
    }
  }, [currentIndex]);

  // Closes project page and updates URL to /
  const handleCloseProjectPage = useCallback(() => {
    setShouldAnimateProjectNavigation(false);
    setIsProjectPageOpen(false);
    setIsProjectInfoOpen(false);
    setIsAboutOpen(false);

    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState({}, '', '/');
    }
    document.title = 'Ricardo Azambuja | Creative Art Director';
  }, []);

  // Navigation handlers inside ProjectPage view
  const handleNextProjectPage = useCallback(() => {
    const nextIdx = (currentIndex + 1) % PROJECTS.length;
    handleOpenProjectPage(nextIdx, false, 1);
  }, [currentIndex, handleOpenProjectPage]);

  const handlePrevProjectPage = useCallback(() => {
    const prevIdx = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    handleOpenProjectPage(prevIdx, false, -1);
  }, [currentIndex, handleOpenProjectPage]);

  const currentProject = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const sidePanelShiftX = isProjectPageOpen && (isProjectInfoOpen || isAboutOpen)
    ? windowWidth < 640
      ? 0
      : windowWidth < 1024
      ? -160
      : -260
    : 0;

  return (
    <div
      className={`relative w-full transition-colors duration-500 ${
        isProjectPageOpen
          ? 'min-h-screen overflow-x-hidden overflow-y-visible'
          : 'w-screen h-screen overflow-hidden select-none'
      }`}
      style={{
        backgroundColor: isProjectPageOpen
          ? theme === 'dark' ? '#0c0c0e' : '#f6f6f7'
          : theme === 'dark' ? '#0d0d0d' : '#eeeeee',
        color: theme === 'dark' ? '#f8fafc' : '#0f172a',
      }}
    >
      {/* Main Header Navigation - Always Fixed at the Top */}
      <Header
        theme={theme}
        language={language}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={handleToggleLanguage}
        onOpenAbout={handleToggleAbout}
        isAboutOpen={isAboutOpen}
        onGoHome={handleCloseProjectPage}
        isProjectOpen={isProjectPageOpen}
      />

      {isInitialLoadingComplete && isProjectPageOpen && (
        <div className="fixed top-[58px] sm:top-4 right-3 sm:right-6 z-[55] pointer-events-auto">
          <button
            type="button"
            onClick={handleToggleProjectInfo}
            className={`group h-[44px] sm:h-[48px] px-3 sm:px-3.5 rounded-lg sm:rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-95 border-0 shadow-none ${
              isProjectInfoOpen
                ? 'bg-white/50 text-black dark:bg-[#141416]/65 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-2xl backdrop-saturate-150'
                : 'bg-white/80 dark:bg-[#141416]/80 backdrop-blur-2xl text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            aria-label={isProjectInfoOpen
              ? (language === 'pt' ? 'Fechar informações e créditos' : 'Close info and credits')
              : (language === 'pt' ? 'Informações do projeto' : 'Project info')}
            aria-expanded={isProjectInfoOpen}
          >
            {isProjectInfoOpen ? <X className="w-4 h-4 stroke-[2]" /> : <Info className="w-4 h-4 stroke-[2]" />}
            <span className="text-[11px] sm:text-xs font-bold tracking-tight uppercase text-black/65 dark:text-white/65">
              {isProjectInfoOpen
                ? (language === 'pt' ? 'FECHAR' : 'CLOSE')
                : (language === 'pt' ? 'INFO DO PROJETO' : 'PROJECT INFO')}
            </span>
          </button>
        </div>
      )}

      {/* Conditional View: Dedicated Project Page vs. 3D Card Stack View */}
      <AnimatePresence
        initial={false}
        custom={{ direction: projectPageDirection, animate: shouldAnimateProjectNavigation }}
      >
      {isInitialLoadingComplete && (isProjectPageOpen || isPageTransitioning) && (
        <ProjectPageTransitionLayer
          key={currentProject.id}
          projectId={currentProject.id}
          direction={projectPageDirection}
          shouldAnimate={shouldAnimateProjectNavigation}
        >
        <ProjectPage
          project={currentProject}
          language={language}
          onBack={handleCloseProjectPage}
          onNextProject={handleNextProjectPage}
          onPrevProject={handlePrevProjectPage}
          nextProject={nextProject}
          prevProject={prevProject}
          isInfoOpen={isProjectInfoOpen}
          isAboutOpen={isAboutOpen}
          onToggleInfo={handleToggleProjectInfo}
          projectIndex={currentIndex}
          showInfoToggle={false}
          showProjectNavigation={!isPageTransitioning}
        />
        </ProjectPageTransitionLayer>
      )}
      </AnimatePresence>
      {isInitialLoadingComplete && (!isProjectPageOpen || isPageTransitioning) && (
        <motion.div
          initial={false}
          animate={isPageTransitioning ? { scale: [1, 0.88, 0.88], y: ['0vh', '0vh', '-110vh'] } : { scale: 1, y: '0vh' }}
          transition={isPageTransitioning ? { duration: 0.9, times: [0, 0.38, 1], ease: [0.32, 0.72, 0, 1] } : { duration: 0 }}
          onAnimationComplete={() => { if (isPageTransitioning) setIsPageTransitioning(false); }}
          className={`absolute inset-0 z-10 w-full h-screen overflow-hidden ${isPageTransitioning ? 'pointer-events-none' : ''}`}
          style={{
            transformOrigin: 'center center',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#eeeeee',
          }}
        >
        <>
          {/* 3D Stacked Deck Canvas */}
          <CardStack
            projects={PROJECTS}
            currentIndex={currentIndex}
            direction={direction}
            resetKey={resetKey}
            onSelectProject={handleSelectProject}
            onOpenDetail={() => handleOpenProjectPage()}
            soundEnabled={soundEnabled}
            isInfoOpen={isAboutOpen}
          />

          {/* Footer Controls & São Paulo Breathing Clock */}
          <Footer
            currentIndex={currentIndex}
            totalProjects={PROJECTS.length}
            currentProject={currentProject}
            language={language}
            onPrev={handlePrev}
            onNext={handleNext}
            onOpenDetail={() => handleOpenProjectPage()}
            isAboutOpen={isAboutOpen}
          />
        </>
        </motion.div>
      )}

      {/* Designer Info / Right Lateral Drawer */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        language={language}
        isOutsideHome={isProjectPageOpen}
      />

      {/* Minimal Circle Mouse Cursor */}
      <CustomCursor />

      {!isInitialLoadingComplete && (
        <div
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ backgroundColor: theme === 'dark' ? '#0d0d0d' : '#eeeeee' }}
          role="status"
          aria-live="polite"
          aria-label={`Generating chunks ${loadingProgress}%`}
        >
          <div className="mb-3 h-[2px] w-48 overflow-hidden bg-black/15 dark:bg-white/15">
            <motion.div
              className="h-full bg-black/45 dark:bg-white/45"
              initial={{ width: '0%' }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs tracking-wide text-black/50 dark:text-white/50">Generating chunks</p>
        </div>
      )}
    </div>
  );
}
