import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project, Language } from '../types';
import { ProjectInfoPanel } from './ProjectInfoPanel';

interface ProjectPageProps {
  project: Project;
  language: Language;
  onBack: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  nextProject?: Project;
  prevProject?: Project;
  isInfoOpen: boolean;
  onToggleInfo: () => void;
  isAboutOpen?: boolean;
  projectIndex?: number;
}

interface MediaItemProps {
  image: {
    id: string;
    url: string;
    caption?: string;
    alt: string;
    embedHTML?: string;
  };
  index: number;
  projectTitle: string;
}

const MediaItem: React.FC<MediaItemProps> = ({ image, index, projectTitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'iframe'>('image');
  const [aspectRatio, setAspectRatio] = useState<'landscape' | 'portrait' | 'square'>('landscape');

  // Detect if this is an iframe embed
  const isIframe = image.embedHTML && image.embedHTML.includes('iframe');

  // Detect media type and generate candidate paths
  const srcCandidates = useMemo(() => {
    if (isIframe) {
      setMediaType('iframe');
      return [];
    }
    
    const original = image.url;
    const isVideo = original.endsWith('.mp4');
    setMediaType(isVideo ? 'video' : 'image');
    
    if (isVideo) {
      return [original];
    }
    
    // Image fallback candidates
    const match = original.match(/^(\/projects\/[^.]+)(\..+)?$/);
    if (match) {
      const basePath = match[1];
      const exts = ['.jpg', '.png', '.webp', '.jpeg', '.gif'];
      const ext = match[2] || '';
      const remaining = exts.filter((e) => e !== ext);
      return [original, ...remaining.map((e) => `${basePath}${e}`)];
    }
    return [original];
  }, [image.url, isIframe]);

  const currentSrc = srcCandidates[candidateIdx] || image.url;

  const handleError = () => {
    if (candidateIdx < srcCandidates.length - 1) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    
    if (ratio > 1.3) {
      setAspectRatio('landscape');
    } else if (ratio < 0.8) {
      setAspectRatio('portrait');
    } else {
      setAspectRatio('square');
    }
    setIsLoaded(true);
  };

  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const ratio = video.videoWidth / video.videoHeight;
    
    if (ratio > 1.3) {
      setAspectRatio('landscape');
    } else if (ratio < 0.8) {
      setAspectRatio('portrait');
    } else {
      setAspectRatio('square');
    }
    setIsLoaded(true);
  };

  // Set loaded state for iframes immediately
  useEffect(() => {
    if (isIframe) {
      setIsLoaded(true);
      setAspectRatio('landscape');
    }
  }, [isIframe]);

  // Scroll-triggered animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.15,
    restDelta: 0.0005,
  });

  const scale = useTransform(
    smoothProgress,
    index === 0
      ? [0, 0.45, 0.85, 1]
      : [0, 0.4, 0.58, 0.88],
    index === 0
      ? [1, 1, 0.93, 0.93]
      : [0.92, 1, 1, 0.92]
  );

  const opacity = useTransform(
    smoothProgress,
    index === 0
      ? [0, 0.45, 0.82, 1]
      : [0, 0.38, 0.58, 0.85],
    index === 0
      ? [1, 1, 0, 0]
      : [0.1, 1, 1, 0]
  );

  // Size classes based on aspect ratio
  const sizeClasses = {
    landscape: 'w-full',
    portrait: 'max-w-md',
    square: 'max-w-2xl'
  };

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center ${index === 0 ? 'pt-0 pb-1 sm:pb-2' : 'py-1 sm:py-2'}`}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: 'center center',
        }}
        className={`will-change-transform transform-gpu ${sizeClasses[aspectRatio]}`}
      >
        {/* Adaptive container that preserves aspect ratio */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-200/70 dark:bg-neutral-900/80">
          {/* Skeleton loading animation */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/10 to-black/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 animate-pulse flex items-center justify-center">
              <span className="text-xs font-mono tracking-wider opacity-30 uppercase">
                {mediaType === 'video' ? 'Video' : mediaType === 'iframe' ? 'Embedded' : 'Image'} · {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Error fallback */}
          {hasError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center bg-neutral-100 dark:bg-neutral-900/90 border border-dashed border-black/15 dark:border-white/15 rounded-xl sm:rounded-2xl min-h-[300px]">
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-black/70 dark:text-white/70">
                {image.url.replace(/^\//, '')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-black/40 dark:text-white/40 mt-1">
                {projectTitle} · {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ) : mediaType === 'iframe' ? (
            <div className="w-full bg-black flex items-center justify-center">
              <div
                className="w-full max-w-4xl aspect-video"
                dangerouslySetInnerHTML={{ __html: image.embedHTML || '' }}
              />
            </div>
          ) : mediaType === 'video' ? (
            <video
              src={currentSrc}
              controls
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={handleVideoMetadata}
              onError={handleError}
              className="w-full h-auto select-none opacity-100"
            />
          ) : (
            <img
              src={currentSrc}
              alt={image.alt}
              referrerPolicy="no-referrer"
              loading={index < 2 ? 'eager' : 'lazy'}
              onLoad={handleImageLoad}
              onError={handleError}
              className="w-full h-auto select-none opacity-100"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectPage: React.FC<ProjectPageProps> = ({
  project,
  language,
  onBack: _onBack,
  onNextProject,
  onPrevProject,
  nextProject,
  prevProject,
  isInfoOpen,
  onToggleInfo,
  isAboutOpen = false,
  projectIndex = 0,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPanelOpen = isInfoOpen || isAboutOpen;

  const shiftX = isPanelOpen
    ? windowWidth < 640
      ? 0
      : windowWidth < 1024
      ? -160
      : -260
    : 0;

  // Keyboard navigation between projects with Left/Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        if (onPrevProject) onPrevProject();
      } else if (e.key === 'ArrowRight') {
        if (onNextProject) onNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevProject, onNextProject]);

  // Reset window scroll position on mount or project switch
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [project.id]);

  return (
    <div className="relative min-h-screen w-full bg-[#f6f6f7] dark:bg-[#0c0c0e] text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Top Right Corner: Floating Info Toggle Button (No border, no drop shadow) */}
      <div className="fixed top-2.5 sm:top-4 right-3 sm:right-6 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={onToggleInfo}
          className={`h-[44px] sm:h-[48px] px-3.5 sm:px-4 rounded-lg sm:rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer select-none active:scale-95 border-0 shadow-none ${
            isInfoOpen
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-white/80 dark:bg-[#141416]/80 backdrop-blur-2xl text-black dark:text-white hover:bg-white/95 dark:hover:bg-[#1c1c20]'
          }`}
          title={language === 'pt' ? 'Informações e créditos' : 'Info & Credits'}
          aria-label={language === 'pt' ? 'Alternar informações e créditos' : 'Toggle info & credits'}
          aria-expanded={isInfoOpen}
        >
          <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-tight hidden xs:inline">
            INFO
          </span>
        </button>
      </div>

      {/* Slide-out Description & Credits Panel */}
      <ProjectInfoPanel
        project={project}
        isOpen={isInfoOpen}
        onClose={onToggleInfo}
        language={language}
        projectIndex={projectIndex}
      />

      {/* Main Image Gallery Stream: 1 Image per line in 16:9, tight spacing, smooth scroll transitions */}
      <motion.main
        animate={{
          x: shiftX,
        }}
        transition={{
          duration: 0.55,
          ease: [0.32, 0.72, 0, 1],
        }}
        className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-24 sm:pb-32 will-change-transform"
      >
        <section
          aria-label={language === 'pt' ? 'Galeria de imagens' : 'Image gallery'}
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          {project.images && project.images.length > 0 ? (
            project.images.map((img, idx) => (
              <MediaItem
                key={img.id || `${project.id}-${idx}`}
                image={img}
                index={idx}
                projectTitle={project.title}
              />
            ))
          ) : (
            <div className="w-full aspect-[16/9] rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <span className="text-sm opacity-60">Carregando imagens...</span>
            </div>
          )}
        </section>
      </motion.main>

      {/* Fixed Glassmorphism Centered Footer Navigation (Accompanying Scroll) */}
      <footer className="fixed bottom-3.5 sm:bottom-6 left-0 right-0 z-40 px-3 sm:px-6 flex justify-center pointer-events-none">
        <motion.nav
          animate={{
            x: shiftX,
          }}
          transition={{
            duration: 0.55,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="pointer-events-auto flex items-center justify-center gap-5 sm:gap-7 px-5 sm:px-6 h-[44px] sm:h-[48px] rounded-lg sm:rounded-xl bg-white/50 dark:bg-[#141416]/65 backdrop-blur-2xl backdrop-saturate-150 shadow-none select-none transition-all duration-300"
          aria-label={language === 'pt' ? 'Navegação entre projetos' : 'Project navigation'}
        >
          {onPrevProject && (
            <button
              type="button"
              onClick={onPrevProject}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[-0.01em] text-black/65 dark:text-white/65 hover:text-black dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 active:scale-95 bg-transparent border-0 p-0"
              title={prevProject ? prevProject.title : (language === 'pt' ? 'Projeto anterior' : 'Previous project')}
              aria-label={language === 'pt' ? 'Projeto anterior' : 'Previous project'}
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>{language === 'pt' ? 'ANTERIOR' : 'PREV'}</span>
            </button>
          )}

          <span className="w-px h-3.5 bg-black/15 dark:bg-white/15" aria-hidden="true" />

          {onNextProject && (
            <button
              type="button"
              onClick={onNextProject}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[-0.01em] text-black/65 dark:text-white/65 hover:text-black dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 active:scale-95 bg-transparent border-0 p-0"
              title={nextProject ? nextProject.title : (language === 'pt' ? 'Próximo projeto' : 'Next project')}
              aria-label={language === 'pt' ? 'Próximo projeto' : 'Next project'}
            >
              <span>{language === 'pt' ? 'PRÓXIMO' : 'NEXT'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          )}
        </motion.nav>
      </footer>
    </div>
  );
};
