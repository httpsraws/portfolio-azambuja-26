import React from 'react';
import { Language } from '../types';
import { CaseBlock, CaseMedia, CaseStudy } from '../data/caseStudies';

interface CaseStudyContentProps {
  study: CaseStudy;
  language: Language;
}

const embedSrc = (provider: 'vimeo' | 'youtube', id: string) =>
  provider === 'vimeo'
    ? `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&badge=0&autopause=0`
    : `https://www.youtube.com/embed/${id}?rel=0`;

/** '9 / 16' → 0.5625 */
const ratioValue = (ratio: string) => {
  const [w, h] = ratio.split('/').map((n) => parseFloat(n));
  return w && h ? w / h : 16 / 9;
};
const isPortrait = (ratio: string) => ratioValue(ratio) < 1;

/** A single media item, edge-to-edge unless it's a portrait film (then framed and centred). */
const Media: React.FC<{ media: CaseMedia; isPt: boolean; inGrid?: boolean }> = ({ media, isPt, inGrid = false }) => {
  if (media.type === 'embed') {
    const portrait = isPortrait(media.ratio);
    const frame = (
      <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: media.ratio }}>
        <iframe
          src={embedSrc(media.provider, media.id)}
          title={media.title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
    if (!portrait || inGrid) return frame;
    return (
      <div
        className="flex w-full justify-center bg-neutral-100 px-5 py-10 sm:px-8 sm:py-12 lg:p-16 dark:bg-neutral-900"
        style={media.bg ? { backgroundColor: media.bg } : undefined}
      >
        <div className="w-full" style={{ maxWidth: `calc(min(78vh, 900px) * ${ratioValue(media.ratio).toFixed(4)})` }}>
          {frame}
        </div>
      </div>
    );
  }

  const alt = isPt ? media.alt.pt : media.alt.en;
  const wrapStyle: React.CSSProperties = {
    ...(media.ratio ? { aspectRatio: media.ratio } : {}),
    ...(media.bg ? { backgroundColor: media.bg } : {}),
  };
  const fill = media.ratio ? 'h-full w-full object-cover' : 'block h-auto w-full';

  return (
    <figure className="w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900" style={wrapStyle}>
      {media.type === 'video' ? (
        <video src={media.src} autoPlay loop muted playsInline preload="metadata" aria-label={alt} className={fill} />
      ) : (
        <img src={media.src} alt={alt} loading="lazy" className={fill} />
      )}
    </figure>
  );
};

const Block: React.FC<{ block: CaseBlock; isPt: boolean }> = ({ block, isPt }) => {
  if (block.kind === 'media') return <Media media={block.media} isPt={isPt} />;

  if (block.kind === 'statement') {
    const centered = block.align === 'center';
    return (
      <section className={`px-5 ${block.spacing === 'spacious' ? 'py-16 sm:px-8 sm:py-20 lg:p-24' : 'py-10 sm:px-8 sm:py-12 lg:p-16'} ${centered ? 'flex justify-center' : ''}`}>
        <p
          className={`text-[clamp(1.5rem,2.78vw,2.5rem)] leading-[1.2] tracking-[-0.025em] ${
            centered ? 'max-w-[1137px] text-center' : ''
          }`}
        >
          {isPt ? block.text.pt : block.text.en}
        </p>
      </section>
    );
  }

  // Galleries
  if (block.layout === 'stack') {
    return (
      <div className="grid grid-cols-1 gap-0">
        {block.items.map((item, i) => <Media key={i} media={item} isPt={isPt} />)}
      </div>
    );
  }
  if (block.layout === 'padded') {
    return (
      <section className="flex flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-12 lg:gap-16 lg:p-16">
        {block.items.map((item, i) => <Media key={i} media={item} isPt={isPt} />)}
      </section>
    );
  }
  if (block.layout === 'flush2') {
    // Side by side, no gap, equal height (cover-cropped to the taller one's box)
    return (
      <div className="grid grid-cols-2 gap-0">
        {block.items.map((item, i) =>
          item.type === 'image' ? (
            <figure key={i} className="h-full w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img src={item.src} alt={isPt ? item.alt.pt : item.alt.en} loading="lazy" className="block h-full w-full object-cover" />
            </figure>
          ) : (
            <Media key={i} media={item} isPt={isPt} inGrid />
          )
        )}
      </div>
    );
  }
  const cols = block.layout === 'grid3' ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  const hasPortraitFilms = block.items.some((item) => item.type === 'embed' && isPortrait(item.ratio));
  return (
    <section className="flex justify-center px-5 pb-10 sm:px-8 sm:pb-12 lg:px-16 lg:pb-16">
      <div className={`grid w-full grid-cols-1 items-start gap-5 sm:gap-[29px] ${cols} ${hasPortraitFilms ? 'max-w-[1024px]' : ''}`}>
        {block.items.map((item, i) => <Media key={i} media={item} isPt={isPt} inGrid />)}
      </div>
    </section>
  );
};

/**
 * Shared project presentation pattern:
 * hero media → headline → [INSIGHT] / [IDEA] → content blocks.
 */
export const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ study, language }) => {
  const isPt = language === 'pt';
  const [a, b] = study.columns ?? [1, 1];
  const insight = isPt ? study.insight.pt : study.insight.en;
  const idea = isPt ? study.idea.pt : study.idea.en;

  return (
    <article className="w-full overflow-hidden bg-white text-[#0d0d0d] dark:bg-[#0d0d0d] dark:text-white">
      <Media media={study.hero} isPt={isPt} />

      <section className="flex flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-12 lg:gap-[53px] lg:p-16">
        <h1 className="max-w-[979px] text-[clamp(2.5rem,5.56vw,5rem)] leading-[0.9] tracking-[-0.045em]">
          {(isPt ? study.headline.pt : study.headline.en).split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>

        <div
          className="grid grid-cols-1 gap-8 text-[15px] leading-[1.45] sm:gap-10 lg:gap-16 lg:text-base lg:[grid-template-columns:var(--cs-cols)]"
          style={{ '--cs-cols': `minmax(0, ${a}fr) minmax(0, ${b}fr)` } as React.CSSProperties}
        >
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">[INSIGHT]</h2>
            <div className="space-y-4">{insight.map((p, i) => <p key={i}>{p}</p>)}</div>
          </section>
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">{isPt ? '[IDEIA]' : '[IDEA]'}</h2>
            <div className="space-y-4">{idea.map((p, i) => <p key={i}>{p}</p>)}</div>
          </section>
        </div>
      </section>

      {study.blocks.map((block, i) => <Block key={i} block={block} isPt={isPt} />)}
    </article>
  );
};
