import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Language, Project } from '../types';
import { CardCover } from './CardCover';

interface FishEyeGridProps {
  projects: Project[];
  language: Language;
  onOpenProject: (projectId: string) => void;
  scrollContainer: React.RefObject<HTMLDivElement | null>;
  view: WorkView;
  onChangeView: (view: WorkView) => void;
}

export type WorkView = 'freeview' | 'grid' | 'list';

const VIEWS: { id: WorkView; pt: string; en: string }[] = [
  { id: 'freeview', pt: 'Freeview', en: 'Freeview' },
  { id: 'grid', pt: 'Grid', en: 'Grid' },
  { id: 'list', pt: 'Lista', en: 'List' },
];

/**
 * Compact organic grid (12 columns desktop / 6 columns mobile).
 * Each row of three pieces fills the 12 columns; varied spans, ratios and small
 * vertical offsets keep it organic without big empty gaps. Repeats every 9 items.
 * c = start column, s = span, mt = vertical offset, ar = aspect ratio.
 */
const ORGANIC: { c: number; s: number; mt: string; ar: string; mc: number; ms: number }[] = [
  { c: 1, s: 5, mt: '0vw', ar: '4 / 5', mc: 1, ms: 6 },
  { c: 6, s: 4, mt: '2.5vw', ar: '1 / 1', mc: 1, ms: 3 },
  { c: 10, s: 3, mt: '1vw', ar: '3 / 4', mc: 4, ms: 3 },
  { c: 1, s: 3, mt: '1.5vw', ar: '3 / 4', mc: 1, ms: 3 },
  { c: 4, s: 5, mt: '0vw', ar: '16 / 11', mc: 4, ms: 3 },
  { c: 9, s: 4, mt: '2vw', ar: '4 / 5', mc: 1, ms: 6 },
  { c: 1, s: 4, mt: '0.5vw', ar: '1 / 1', mc: 1, ms: 3 },
  { c: 5, s: 4, mt: '2vw', ar: '3 / 4', mc: 4, ms: 3 },
  { c: 9, s: 4, mt: '0vw', ar: '3 / 2', mc: 1, ms: 6 },
];

/** Diagonal arrow used on the list rows */
const ArrowDownRight: React.FC = () => (
  <svg className="worklist-arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 5 L19 19 M19 7 L19 19 L7 19" />
  </svg>
);

/**
 * Editorial span pattern (desktop: 12 columns / mobile: 4 columns).
 * Repeats every 6 items so the grid keeps an irregular, collage-like rhythm.
 */
const PATTERN: { col: number; row: number; mCol: number; mRow: number }[] = [
  { col: 5, row: 2, mCol: 4, mRow: 2 },
  { col: 3, row: 1, mCol: 2, mRow: 1 },
  { col: 4, row: 2, mCol: 2, mRow: 2 },
  { col: 3, row: 2, mCol: 2, mRow: 1 },
  { col: 4, row: 1, mCol: 4, mRow: 2 },
  { col: 5, row: 2, mCol: 2, mRow: 2 },
];

const DRAG_THRESHOLD = 5;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const FishEyeGrid: React.FC<FishEyeGridProps> = ({
  projects,
  language,
  onOpenProject,
  scrollContainer,
  view,
  onChangeView,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isPt = language === 'pt';

  // Category filter (grid & list). Keyed by the English label, which is consistent across projects.
  const [category, setCategory] = useState<string>('all');
  const categoryKey = (p: Project) => p.categoryEn || p.category;
  const categories = useMemo(() => {
    const map = new Map<string, { key: string; en: string; pt: string; count: number }>();
    projects.forEach((p) => {
      const key = categoryKey(p);
      const entry = map.get(key);
      if (entry) entry.count += 1;
      else map.set(key, { key, en: key, pt: p.category, count: 1 });
    });
    return Array.from(map.values());
  }, [projects]);
  const visibleProjects = useMemo(
    () => (category === 'all' ? projects : projects.filter((p) => categoryKey(p) === category)),
    [projects, category]
  );

  useEffect(() => {
    if (view !== 'freeview') return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const panEl = panRef.current;
    if (!section || !stage || !panEl) return;

    const reduced = prefersReducedMotion();
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    const lens = { x: pointer.x, y: pointer.y };

    // Orbit / pan state: x pans the oversized canvas, y drives the page scroll
    const pan = { x: 0, vx: 0, vy: 0 };
    const drag = {
      id: -1,
      active: false,
      moved: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
      isTouch: false,
    };
    let suppressClick = false;
    let raf = 0;

    // Free orbit: the canvas can travel until its outermost cards sit at the centre of the screen
    const maxPanX = () => Math.max(0, panEl.offsetWidth / 2 - stage.clientWidth * 0.12);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
      }
      if (!drag.active || e.pointerId !== drag.id) return;

      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > DRAG_THRESHOLD) {
        drag.moved = true;
        section.classList.add('is-dragging');
      }
      if (!drag.moved) return;

      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT);

      // Rubber band beyond the canvas edges
      const limit = maxPanX();
      const over = Math.abs(pan.x) > limit;
      pan.x += over ? dx * 0.35 : dx;
      pan.vx = (dx / dt) * 16;

      // Touch keeps native vertical scrolling; mouse drives the scroll container
      if (!drag.isTouch && scrollContainer.current) {
        scrollContainer.current.scrollTop -= dy;
        pan.vy = (dy / dt) * 16;
      }

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.lastT = now;
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag.id = e.pointerId;
      drag.active = true;
      drag.moved = false;
      drag.isTouch = e.pointerType !== 'mouse';
      drag.startX = drag.lastX = e.clientX;
      drag.startY = drag.lastY = e.clientY;
      drag.lastT = performance.now();
      pan.vx = 0;
      pan.vy = 0;
    };

    const onUp = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.id) return;
      drag.active = false;
      if (drag.moved) suppressClick = true;
      section.classList.remove('is-dragging');
      // Reset in case the drag ended outside the stage and no click follows
      if (drag.moved) window.setTimeout(() => { suppressClick = false; }, 0);
    };

    // A drag must never open a project
    const onClickCapture = (e: MouseEvent) => {
      if (suppressClick) {
        e.stopPropagation();
        e.preventDefault();
        suppressClick = false;
      }
    };

    const onLeave = () => { pointer.active = false; };
    const preventNativeDrag = (e: DragEvent) => e.preventDefault();

    const loop = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Inertia + spring back into bounds
      if (!drag.active) {
        const limit = maxPanX();
        pan.x += pan.vx;
        pan.vx *= 0.93;
        if (pan.x > limit) { pan.x += (limit - pan.x) * 0.14; pan.vx *= 0.6; }
        if (pan.x < -limit) { pan.x += (-limit - pan.x) * 0.14; pan.vx *= 0.6; }
        if (Math.abs(pan.vx) < 0.01) pan.vx = 0;

        if (Math.abs(pan.vy) > 0.05 && scrollContainer.current) {
          scrollContainer.current.scrollTop -= pan.vy;
          pan.vy *= 0.93;
        } else {
          pan.vy = 0;
        }
      }
      panEl.style.transform = `translate3d(${pan.x.toFixed(2)}px, 0, 0)`;

      const sectionRect = section.getBoundingClientRect();
      const isVisible = sectionRect.bottom > 0 && sectionRect.top < vh;

      if (isVisible) {
        // Lens follows the mouse (inside the section) or rests at the viewport center
        const insideY = pointer.y > Math.max(0, sectionRect.top) && pointer.y < Math.min(vh, sectionRect.bottom);
        const tx = pointer.active && finePointer && insideY ? pointer.x : vw / 2;
        const ty = pointer.active && finePointer && insideY ? pointer.y : vh / 2;
        lens.x += (tx - lens.x) * 0.08;
        lens.y += (ty - lens.y) * 0.08;

        const isMobile = vw < 640;
        const radius = Math.max(vw, vh) * (isMobile ? 0.75 : 0.55);

        for (let i = 0; i < cellRefs.current.length; i += 1) {
          const cell = cellRefs.current[i];
          const card = cardRefs.current[i];
          if (!cell || !card) continue;
          const rect = cell.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (cx - lens.x) / radius;
          const dy = (cy - lens.y) / radius;
          const r2 = dx * dx + dy * dy;
          const r = Math.sqrt(r2);
          const focus = Math.exp(-r2 * 1.7); // 1 at lens center → 0 at the edges

          // Barrel distortion: magnify near the center, compress and curve away at the rim
          const scale = reduced ? 1 : 0.7 + focus * (isMobile ? 0.36 : 0.46);
          const push = reduced ? 0 : radius * 0.14 * r * Math.exp(-r2 * 0.9);
          const ux = r > 0.0001 ? dx / r : 0;
          const uy = r > 0.0001 ? dy / r : 0;
          const rotY = reduced ? 0 : Math.max(-1, Math.min(1, dx)) * -26;
          const rotX = reduced ? 0 : Math.max(-1, Math.min(1, dy)) * 22;

          card.style.transform =
            `translate3d(${(ux * push).toFixed(2)}px, ${(uy * push).toFixed(2)}px, 0) ` +
            `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          card.style.setProperty('--focus', focus.toFixed(3));
          cell.style.zIndex = String(Math.round(focus * 100));
        }

        // Overlay is sticky, so convert viewport coords into overlay-local coords
        const overlayRect = overlayRef.current?.getBoundingClientRect();
        const ox = lens.x - (overlayRect?.left ?? 0);
        const oy = lens.y - (overlayRect?.top ?? 0);
        section.style.setProperty('--lx', `${ox.toFixed(1)}px`);
        section.style.setProperty('--ly', `${oy.toFixed(1)}px`);
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('click', onClickCapture, true);
    stage.addEventListener('dragstart', preventNativeDrag);
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('click', onClickCapture, true);
      stage.removeEventListener('dragstart', preventNativeDrag);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [projects.length, scrollContainer, isPt, view]);

  return (
    <section
      ref={sectionRef}
      className={`fisheye-root relative w-full ${view === 'list' ? 'is-list' : ''}`}
      aria-label={isPt ? 'Trabalhos' : 'Work'}
    >
      {/* Lens overlay: vignette that follows the lens center (sticky to the viewport) */}
      {view === 'freeview' && (
        <div ref={overlayRef} className="fisheye-overlay" aria-hidden="true">
          <div className="fisheye-vignette" />
        </div>
      )}

      <header className="work-head relative z-[4]">
        <h1 className="work-head__title">
          {isPt ? 'Trabalhos selecionados' : 'Selected work'}
          <sup>{projects.length.toString().padStart(2, '0')}</sup>
        </h1>
        <div className="work-head__side">
          <nav className="view-menu" aria-label={isPt ? 'Visualização' : 'View'}>
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={view === v.id ? 'is-active' : ''}
                aria-pressed={view === v.id}
                onClick={() => onChangeView(v.id)}
              >
                {isPt ? v.pt : v.en}
              </button>
            ))}
          </nav>
          <p className="work-head__hint">
            {view === 'freeview' && (isPt ? 'Clique e arraste para orbitar' : 'Click & drag to orbit')}
          </p>
        </div>
      </header>

      {/* Category filter — grid & list only */}
      {view !== 'freeview' && (
        <nav className="work-filters" aria-label={isPt ? 'Filtrar por categoria' : 'Filter by category'}>
          <button
            type="button"
            className={category === 'all' ? 'is-active' : ''}
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            {isPt ? 'Todos' : 'All'} <span>{projects.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              className={category === c.key ? 'is-active' : ''}
              aria-pressed={category === c.key}
              onClick={() => setCategory(c.key)}
            >
              {isPt ? c.pt : c.en} <span>{c.count}</span>
            </button>
          ))}
        </nav>
      )}

      {view === 'grid' ? (
        <div className="organic" key={`grid-${category}`}>
          {visibleProjects.map((project, i) => {
            const p = ORGANIC[i % ORGANIC.length];
            const category = isPt ? project.category : project.categoryEn || project.category;
            return (
              <button
                key={project.id}
                type="button"
                className="organic__item"
                style={{
                  '--c': p.c,
                  '--s': p.s,
                  '--mt': p.mt,
                  '--ar': p.ar,
                  '--mc': p.mc,
                  '--ms': p.ms,
                } as React.CSSProperties}
                onClick={() => onOpenProject(project.id)}
                aria-label={`${project.title} — ${category}, ${project.year}`}
              >
                <span className="organic__media">
                  {project.coverImage && <img src={project.coverImage} alt="" loading="lazy" draggable={false} />}
                </span>
                <span className="organic__caption">
                  <span className="organic__index">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
                  <span className="organic__title">{project.title}</span>
                  <span className="organic__meta">{category}, {project.year}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : view === 'list' ? (
        <div className="worklist relative z-[1]">
          <ol className="worklist__rows">
            {visibleProjects.map((project) => {
              const category = isPt ? project.category : project.categoryEn || project.category;
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    className="worklist__row"
                    onClick={() => onOpenProject(project.id)}
                    aria-label={`${project.title} — ${category}, ${project.year}`}
                  >
                    <span className="worklist__title">
                      <sup className="worklist__index">{String(projects.indexOf(project) + 1).padStart(2, '0')}</sup>
                      <span className="worklist__name">{project.title}</span>
                    </span>
                    <span className="worklist__meta">{category} · {project.year}</span>
                    <span className="worklist__thumb">
                      {project.coverImage && <img src={project.coverImage} alt="" loading="lazy" draggable={false} />}
                    </span>
                    <ArrowDownRight />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
      <div ref={stageRef} className="fisheye-stage relative z-[1]">
        <div ref={panRef} className="fisheye-pan">
          <div className="fisheye-grid">
            {projects.map((project, i) => {
              const p = PATTERN[i % PATTERN.length];
              const category = isPt ? project.category : project.categoryEn || project.category;
              return (
                <div
                  key={project.id}
                  ref={(el) => { cellRefs.current[i] = el; }}
                  className="fisheye-cell"
                  style={{
                    '--col': p.col,
                    '--row': p.row,
                    '--mcol': p.mCol,
                    '--mrow': p.mRow,
                  } as React.CSSProperties}
                >
                  <div
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="fisheye-card"
                    role="button"
                    tabIndex={0}
                    data-clickable="true"
                    aria-label={`${project.title} — ${category}, ${project.year}`}
                    onClick={() => onOpenProject(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenProject(project.id);
                      }
                    }}
                  >
                    <div className="fisheye-media">
                      <CardCover project={project} />
                      <div className="fisheye-shade" />
                    </div>
                    <div className="fisheye-meta">
                      <span className="fisheye-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="fisheye-title">{project.title}</span>
                      <span className="fisheye-sub">{category} · {project.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}
    </section>
  );
};
