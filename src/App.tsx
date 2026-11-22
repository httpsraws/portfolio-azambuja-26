import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useIsPresent, usePresenceData } from 'motion/react';
import { Info, X } from 'lucide-react';
import { HOME_PROJECTS, PROJECTS } from './data/projects';
import { ThemeMode, Language } from './types';
import { Header } from './components/Header';
import { FishEyeGrid, WorkView } from './components/FishEyeGrid';
import { ProjectPage } from './components/ProjectPage';
import { AboutPage } from './components/AboutPage';
import { MotionPage } from './components/MotionPage';

type SitePage = 'work' | 'about' | 'motion';

const HOME_TITLE = 'Ricardo Azambuja | Creative Art Director';
const PAGE_TITLES: Record<SitePage, string> = {
  work: HOME_TITLE,
  about: 'About — Azambuja',
  motion: 'Motion — Azambuja',
};
const PAGE_PATHS: Record<Exclude<SitePage, 'work'>, string> = {
  about: '/about',
  motion: '/motion',
};

/** Reads the top-level page from the URL: /about (/sobre), /motion, otherwise work */
const getRoutePage = (): SitePage => {
  if (typeof window === 'undefined') return 'work';
  const path = window.location.pathname;
  if (/^\/(about|sobre)\/?$/i.test(path)) return 'about';
  if (/^\/motion\/?$/i.test(path)) return 'motion';
  return 'work';
};
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
        // Next (direction > 0): new page enters from the right; Previous: from the left
        enter: (data: ProjectPagePresenceData) => ({ x: data.direction > 0 ? '100vw' : '-100vw' }),
        center: { x: 0 },
        exit: (data: ProjectPagePresenceData) => ({
          // Next: current page leaves to the left; Previous: to the right
          x: data.animate ? (data.direction > 0 ? '-100vw' : '100vw') : 0,
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
    return initialRouteIndex !== null
      ? initialRouteIndex
      : PROJECTS.findIndex((project) => project.id === HOME_PROJECTS[0].id);
  });

  // Work view: freeview (fish-eye orbit), organic grid or list — remembered per browser
  const [workView, setWorkView] = useState<WorkView>(() => {
    try {
      const saved = localStorage.getItem('rico-portfolio-work-view-v2');
      if (saved === 'freeview' || saved === 'grid' || saved === 'list') return saved;
    } catch { /* storage unavailable */ }
    return 'freeview';
  });
  useEffect(() => {
    try { localStorage.setItem('rico-portfolio-work-view-v2', workView); } catch { /* storage unavailable */ }
  }, [workView]);

  // Work page scroll container. Scroll position survives opening a project.
  const homeScrollRef = useRef<HTMLDivElement | null>(null);
  const homeScrollTopRef = useRef(0);
  const setHomeScrollRef = useCallback((el: HTMLDivElement | null) => {
    homeScrollRef.current = el;
    if (el) el.scrollTop = homeScrollTopRef.current;
  }, []);

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

  // Top-level page: work (home), about, motion
  const [sitePage, setSitePage] = useState<SitePage>(() => getRoutePage());
  const isScrollPage = isProjectPageOpen || sitePage !== 'work';

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
      document.title = PAGE_TITLES[getRoutePage()];
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
        setSitePage('work');
        setIsProjectInfoOpen(false);
        document.title = `${PROJECTS[routeIndex].title} — Azambuja`;
      } else {
        const page = getRoutePage();
        setIsProjectPageOpen(false);
        setSitePage(page);
        setIsProjectInfoOpen(false);
        document.title = PAGE_TITLES[page];
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Manage window scrolling based on whether a project / about page is open
  useEffect(() => {
    if (isScrollPage) {
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
  }, [isScrollPage, sitePage]);

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
        } else if (sitePage !== 'work' || isProjectPageOpen) {
          handleCloseProjectPage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProjectInfoOpen, sitePage, isProjectPageOpen]);

  const handleToggleTheme = () => {
    playClickSound(soundEnabled);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleLanguage = () => {
    playClickSound(soundEnabled);
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  // Opens one of the top-level pages (About / Motion). Clicking the active one returns to Work.
  const handleOpenPage = (page: Exclude<SitePage, 'work'>) => {
    if (sitePage === page && !isProjectPageOpen) {
      handleCloseProjectPage();
      return;
    }
    setShouldAnimateProjectNavigation(false);
    setIsPageTransitioning(false);
    setIsProjectPageOpen(false);
    setIsProjectInfoOpen(false);
    setSitePage(page);
    if (window.location.pathname !== PAGE_PATHS[page]) {
      window.history.pushState({ page }, '', PAGE_PATHS[page]);
    }
    document.title = PAGE_TITLES[page];
  };

  // Back to Work, optionally switching the view (freeview / grid / list)
  const handleGoToWork = (view?: WorkView) => {
    if (view) setWorkView(view);
    homeScrollTopRef.current = 0;
    handleCloseProjectPage();
  };

  const handleToggleProjectInfo = () => {
    setIsProjectInfoOpen((prev) => !prev);
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
    setSitePage('work');

    const slug = getProjectSlug(targetIndex);
    const targetPath = `/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ projectIndex: targetIndex }, '', targetPath);
    }
    if (PROJECTS[targetIndex]) {
      document.title = `${PROJECTS[targetIndex].title} — Azambuja`;
    }
  }, [currentIndex]);

  const handleOpenProjectById = useCallback((projectId: string) => {
    const index = PROJECTS.findIndex((project) => project.id === projectId);
    if (index >= 0) handleOpenProjectPage(index);
  }, [handleOpenProjectPage]);

  // Closes project page and updates URL to /
  const handleCloseProjectPage = useCallback(() => {
    setShouldAnimateProjectNavigation(false);
    setIsProjectPageOpen(false);
    setIsProjectInfoOpen(false);
    setSitePage('work');

    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState({}, '', '/');
    }
    document.title = 'Ricardo Azambuja | Creative Art Director';
  }, []);

  // Navigation inside ProjectPage follows the site numbering (HOME_PROJECTS: 01 … 11),
  // not the internal order of the PROJECTS data array.
  const homePosition = Math.max(0, HOME_PROJECTS.findIndex((p) => p.id === PROJECTS[currentIndex]?.id));
  const neighbourIndex = (offset: number) => {
    const target = HOME_PROJECTS[(homePosition + offset + HOME_PROJECTS.length) % HOME_PROJECTS.length];
    return PROJECTS.findIndex((p) => p.id === target.id);
  };

  const handleNextProjectPage = useCallback(() => {
    handleOpenProjectPage(neighbourIndex(1), false, 1);
  }, [homePosition, handleOpenProjectPage]);

  const handlePrevProjectPage = useCallback(() => {
    handleOpenProjectPage(neighbourIndex(-1), false, -1);
  }, [homePosition, handleOpenProjectPage]);

  const currentProject = PROJECTS[currentIndex];
  const nextProject = PROJECTS[neighbourIndex(1)];
  const prevProject = PROJECTS[neighbourIndex(-1)];
  return (
    <div
      className={`relative w-full transition-colors duration-500 ${
        isScrollPage
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
        activePage={isProjectPageOpen ? 'work' : sitePage}
        onOpenAbout={() => handleOpenPage('about')}
        onOpenMotion={() => handleOpenPage('motion')}
        onGoHome={() => handleGoToWork()}
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
          isAboutOpen={false}
          onToggleInfo={handleToggleProjectInfo}
          projectIndex={currentIndex}
          showInfoToggle={false}
          showProjectNavigation={!isPageTransitioning}
        />
        </ProjectPageTransitionLayer>
      )}
      </AnimatePresence>
      {isInitialLoadingComplete && ((!isProjectPageOpen && sitePage === 'work') || isPageTransitioning) && (
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
          {/* Work page: freeview / grid / list */}
          <div
            ref={setHomeScrollRef}
            onScroll={(e) => { homeScrollTopRef.current = e.currentTarget.scrollTop; }}
            className="home-scroll absolute inset-0 overflow-y-auto overflow-x-hidden"
          >
            <FishEyeGrid
              projects={HOME_PROJECTS}
              language={language}
              onOpenProject={handleOpenProjectById}
              scrollContainer={homeScrollRef}
              view={workView}
              onChangeView={setWorkView}
            />
          </div>
        </motion.div>
      )}

      {/* About & Motion pages */}
      {isInitialLoadingComplete && sitePage !== 'work' && !isProjectPageOpen && (
        <motion.div
          key={sitePage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-10"
        >
          {sitePage === 'about' ? (
            <AboutPage language={language} />
          ) : (
            <MotionPage
              language={language}
              onOpenProject={(projectId) => {
                const index = PROJECTS.findIndex((project) => project.id === projectId);
                if (index >= 0) handleOpenProjectPage(index, false);
              }}
            />
          )}
        </motion.div>
      )}

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
