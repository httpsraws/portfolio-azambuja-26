/**
 * Motion page content.
 *
 * REEL — fill ONE of the fields to publish your reel:
 *   vimeoId:   '123456789'                (from https://vimeo.com/123456789)
 *   youtubeId: 'AbCdEfGhIjk'              (from https://youtu.be/AbCdEfGhIjk)
 *   src:       '/motion/reel-2027.mp4'    (file placed in /public/motion/)
 * While all are empty, the page shows a still "coming soon" frame (no clips repeated from the grid).
 */
export interface MotionReel {
  title: string;
  year: string;
  vimeoId?: string;
  youtubeId?: string;
  src?: string;
  poster?: string;
}

export const REEL: MotionReel = {
  title: 'Reel',
  year: '2027',
  vimeoId: '',
  youtubeId: '',
  src: '',
};

/** ai = AI-generated (Clash characters) · motion = motion design · film = hosted film (embed) */
export type MotionKind = 'ai' | 'motion' | 'film';

export interface MotionItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  year: string;
  kind: MotionKind;
  /** CSS aspect-ratio, e.g. '16 / 9' or '9 / 16' */
  ratio: string;
  /** Project to link to (PROJECTS id) */
  projectId?: string;
  /** Films: hosted embed */
  embed?: { provider: 'vimeo' | 'youtube'; id: string };
  /** Films: additional cuts of the same piece (shown as 01 · 02 … under the card) */
  moreEmbeds?: { provider: 'vimeo' | 'youtube'; id: string }[];
  /** Films: preview image/gif. Loops: the clip itself (mp4/webm/gif) */
  poster?: string;
  src?: string;
}

export const MOTION_ITEMS: MotionItem[] = [
  {
    id: 'clash-archer',
    title: 'Clash On Hold — Archer',
    subtitle: 'Personagem em IA',
    subtitleEn: 'AI character',
    year: '2026',
    kind: 'ai',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/archer-16-9.mp4',
  },
  {
    id: 'clash-logo',
    title: 'Clash On Hold — Logo',
    subtitle: 'Animação de logo',
    subtitleEn: 'Logo animation',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/logo-16-9.mp4',
  },
  {
    id: 'clash-giant',
    title: 'Clash On Hold — Giant',
    subtitle: 'Personagem em IA',
    subtitleEn: 'AI character',
    year: '2026',
    kind: 'ai',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/giant-16-9.mp4',
  },
  {
    id: 'tuborg-comp',
    title: 'Open Up — Composição',
    titleEn: 'Open Up — Composition',
    subtitle: 'Motion design',
    subtitleEn: 'Motion design',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    projectId: 'open-up',
    src: '/projects/tuborg-figma/comp-1.mp4',
  },
  {
    id: 'clash-barbarian',
    title: 'Clash On Hold — Barbarian',
    subtitle: 'Personagem em IA',
    subtitleEn: 'AI character',
    year: '2026',
    kind: 'ai',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/barbarian-16-9.mp4',
  },
  {
    id: 'clash-invasion',
    title: 'Clash On Hold — Invasion',
    subtitle: 'Personagens em IA',
    subtitleEn: 'AI characters',
    year: '2026',
    kind: 'ai',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/invasion-16-9.mp4',
  },
  {
    id: 'clash-signature',
    title: 'Clash On Hold — Assinatura',
    titleEn: 'Clash On Hold — End card',
    subtitle: 'Motion design',
    subtitleEn: 'Motion design',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/signature-16-9.mp4',
  },
  {
    id: 'clash-builder',
    title: 'Clash On Hold — Builder',
    subtitle: 'Personagem em IA',
    subtitleEn: 'AI character',
    year: '2026',
    kind: 'ai',
    ratio: '16 / 9',
    projectId: 'clash-on-hold',
    src: '/projects/clash-on-hold-figma/builder-16-9.mp4',
  },
];
