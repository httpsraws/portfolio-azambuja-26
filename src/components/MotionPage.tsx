import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { Language } from '../types';
import { MOTION_ITEMS, MotionItem } from '../data/motion';

interface MotionPageProps {
  language: Language;
  onOpenProject: (projectId: string) => void;
}

type Filter = 'all' | 'ai' | 'motion';

const isVideoFile = (src?: string) => Boolean(src && /\.(mp4|webm|mov)$/i.test(src));

const embedUrl = (provider: 'vimeo' | 'youtube', id: string) =>
  provider === 'vimeo'
    ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&badge=0`
    : `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

/** Muted looping video that only plays while on screen */
const InViewVideo: React.FC<{ src: string; className?: string; onEnded?: () => void; loop?: boolean }> = ({
  src,
  className,
  onEnded,
  loop = true,
}) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop={loop}
      playsInline
      preload="metadata"
      onEnded={onEnded}
    />
  );
};

export const MotionPage: React.FC<MotionPageProps> = ({ language, onOpenProject }) => {
  const isPt = language === 'pt';
  const t = (pt: string, en: string) => (isPt ? pt : en);
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState<{ title: string; url: string; ratio: string } | null>(null);

  const items = useMemo(
    () => (filter === 'all' ? MOTION_ITEMS : MOTION_ITEMS.filter((item) => item.kind === filter)),
    [filter]
  );
  const counts = useMemo(
    () => ({
      all: MOTION_ITEMS.length,
      ai: MOTION_ITEMS.filter((i) => i.kind === 'ai').length,
      motion: MOTION_ITEMS.filter((i) => i.kind === 'motion').length,
    }),
    []
  );


  // ESC closes the player without leaving the page (capture phase, before the app-level handler)
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        setActive(null);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [active]);

  const cutsOf = (item: MotionItem) => (item.embed ? [item.embed, ...(item.moreEmbeds ?? [])] : []);

  const openItem = (item: MotionItem, cut = 0) => {
    const cuts = cutsOf(item);
    const embed = cuts[cut];
    if (!embed) return;
    const title = cuts.length > 1 ? `${item.title} — ${String(cut + 1).padStart(2, '0')}` : item.title;
    setActive({ title, url: embedUrl(embed.provider, embed.id), ratio: item.ratio });
  };

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('Tudo', 'All') },
    { id: 'ai', label: 'AI' },
    { id: 'motion', label: 'Motion' },
  ];

  return (
    <div className="mo-root">
      {/* Filters */}
      <nav className="mo-filters" aria-label={t('Filtrar', 'Filter')}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={filter === f.id ? 'is-active' : ''}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <span className="mo-dim">{counts[f.id]}</span>
          </button>
        ))}
      </nav>

      {/* Pieces */}
      <section className="mo-grid">
        {items.map((item, i) => {
          const subtitle = isPt ? item.subtitle : item.subtitleEn || item.subtitle;
          const isFilm = Boolean(item.embed);
          const title = isPt ? item.title : item.titleEn || item.title;
          return (
            <motion.article
              key={item.id}
              className="mo-item"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`mo-media ${isFilm ? 'is-film' : ''}`}
                style={{ aspectRatio: item.ratio }}
                onClick={() => openItem(item)}
                role={isFilm ? 'button' : undefined}
                tabIndex={isFilm ? 0 : undefined}
                aria-label={isFilm ? `${t('Assistir', 'Watch')} ${title}` : undefined}
                onKeyDown={(e) => {
                  if (isFilm && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    openItem(item);
                  }
                }}
              >
                {isVideoFile(item.src) ? (
                  <InViewVideo src={item.src as string} className="mo-media__el" />
                ) : (
                  <img src={item.src || item.poster} alt="" loading="lazy" className="mo-media__el" draggable={false} />
                )}
                {isFilm && <span className="mo-play">{t('Assistir', 'Play')}</span>}
              </div>
              <div className="mo-caption">
                <span className="mo-caption__title">{title}</span>
                <span className="mo-dim">{subtitle ? `${subtitle}, ` : ''}{item.year}</span>
                {cutsOf(item).length > 1 && (
                  <span className="mo-cuts">
                    {cutsOf(item).map((_, cut) => (
                      <button key={cut} type="button" onClick={() => openItem(item, cut)}>
                        {String(cut + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </span>
                )}
                {item.projectId && (
                  <button type="button" className="mo-caption__link" onClick={() => onOpenProject(item.projectId as string)}>
                    {t('Ver projeto', 'View project')} →
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Player */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="mo-player"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button type="button" className="mo-player__close" onClick={() => setActive(null)} aria-label={t('Fechar', 'Close')}>
              <X className="w-4 h-4" /> {t('Fechar', 'Close')}
            </button>
            <motion.div
              className="mo-player__frame"
              style={{ aspectRatio: active.ratio }}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={active.url}
                title={active.title}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            </motion.div>
            <p className="mo-player__title">{active.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
