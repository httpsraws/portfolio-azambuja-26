import React, { useState, useEffect, useCallback } from 'react';
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
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);

  // About modal / drawer state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Sync initial title
  useEffect(() => {
    const routeIndex = parseProjectIndexFromLocation();
    if (routeIndex !== null && PROJECTS[routeIndex]) {
      document.title = `${PROJECTS[routeIndex].title} — Azambuja`;
    } else {
      document.title = 'Stack Portfolio — Interactive Project Deck';
    }
  }, []);

  // Listen to browser Back/Forward (popstate) and hash changes to keep URL in sync
  useEffect(() => {
    const handleLocationChange = () => {
      const routeIndex = parseProjectIndexFromLocation();
      if (routeIndex !== null && PROJECTS[routeIndex]) {
        setCurrentIndex(routeIndex);
        setIsProjectPageOpen(true);
        setIsProjectInfoOpen(false);
        document.title = `${PROJECTS[routeIndex].title} — Azambuja`;
      } else {
        setIsProjectPageOpen(false);
        setIsProjectInfoOpen(false);
        document.title = 'Stack Portfolio — Interactive Project Deck';
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
  const handleOpenProjectPage = useCallback((index?: number) => {
    const targetIndex = typeof index === 'number' ? index : currentIndex;
    setCurrentIndex(targetIndex);
    setIsProjectPageOpen(true);
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
    setIsProjectPageOpen(false);
    setIsProjectInfoOpen(false);
    setIsAboutOpen(false);

    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState({}, '', '/');
    }
    document.title = 'Stack Portfolio — Interactive Project Deck';
  }, []);

  // Navigation handlers inside ProjectPage view
  const handleNextProjectPage = useCallback(() => {
    const nextIdx = (currentIndex + 1) % PROJECTS.length;
    handleOpenProjectPage(nextIdx);
  }, [currentIndex, handleOpenProjectPage]);

  const handlePrevProjectPage = useCallback(() => {
    const prevIdx = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    handleOpenProjectPage(prevIdx);
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
        backgroundColor: theme === 'dark' ? '#0d0d0d' : '#eeeeee',
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

      {/* Conditional View: Dedicated Project Page vs. 3D Card Stack View */}
      {isProjectPageOpen ? (
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
        />
      ) : (
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
    </div>
  );
}
