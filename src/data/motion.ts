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
    id: 'plz-come-back',
    title: 'Plz plz come back',
    titleEn: 'Plz plz come back',
    year: '2026',
    kind: 'motion',
    ratio: '1 / 1',
    src: '/motion/plz-come-back.mp4',
  },
  {
    id: 'mascot-portrait',
    title: 'Mascote — Retrato',
    titleEn: 'Mascot — Portrait',
    year: '2026',
    kind: 'ai',
    ratio: '9 / 16',
    src: '/motion/mascot-portrait.mp4',
  },
  {
    id: 'athens-instagram',
    title: 'Instagram x Athens',
    titleEn: 'Instagram x Athens',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    src: '/motion/instagram-athens.mp4',
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
    id: 'athens-twitch',
    title: 'Twitch x Athens',
    titleEn: 'Twitch x Athens',
    year: '2026',
    kind: 'motion',
    ratio: '1 / 1',
    src: '/motion/twitch-athens.mp4',
  },
  {
    id: 'motion-transition',
    title: 'Transition',
    titleEn: 'Transition',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    src: '/motion/transition.mp4',
  },
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
    id: 'mascot-football',
    title: 'Italakinho — Embaixadinha',
    titleEn: 'Italakinho — Keepy-uppy',
    year: '2026',
    kind: 'ai',
    ratio: '9 / 16',
    src: '/motion/italakinho-embaixadinha.mp4',
  },
  {
    id: 'logo-nova',
    title: 'Logo Nova',
    titleEn: 'New Logo',
    year: '2026',
    kind: 'motion',
    ratio: '9 / 16',
    src: '/motion/logo-nova.mp4',
  },
  {
    id: 'reuniao-story',
    title: 'Reunião — Story',
    titleEn: 'Meeting — Story',
    year: '2026',
    kind: 'motion',
    ratio: '9 / 16',
    src: '/motion/reuniao-story.mp4',
  },
  {
    id: 'betspeed-screen-3',
    title: 'Betspeed — Tela 3',
    titleEn: 'Betspeed — Screen 3',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    src: '/motion/betspeed-screen-3.mp4',
  },
  {
    id: 'bacio-copinho',
    title: 'Bacio di Latte — Copinho',
    titleEn: 'Bacio di Latte — Cup',
    year: '2026',
    kind: 'motion',
    ratio: '9 / 16',
    src: '/motion/bacio-copinho.mp4',
  },
  {
    id: 'gold-rays-01',
    title: 'Raios dourados — 01',
    titleEn: 'Golden rays — 01',
    year: '2026',
    kind: 'motion',
    ratio: '4 / 5',
    src: '/motion/gold-rays-01.mp4',
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
  {
    id: 'times-squares-dupla',
    title: 'Times Squares — Dupla',
    titleEn: 'Times Squares — Duo',
    year: '2026',
    kind: 'motion',
    ratio: '1 / 1',
    src: '/motion/times-squares-dupla.mp4',
  },
  {
    id: 'mascot-phone',
    title: 'Italakinho — Celular',
    titleEn: 'Italakinho — Phone',
    year: '2026',
    kind: 'ai',
    ratio: '9 / 16',
    src: '/motion/italakinho-celular.mp4',
  },
  {
    id: 'sextou',
    title: 'Sextou',
    titleEn: 'Friday mood',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    src: '/motion/sextou.mp4',
  },
  {
    id: 'reuniao',
    title: 'Reunião',
    titleEn: 'Meeting',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    src: '/motion/reuniao.mp4',
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
    id: 'flamengo-logo-reveal',
    title: 'Flamengo — Logo Reveal',
    titleEn: 'Flamengo — Logo Reveal',
    year: '2026',
    kind: 'motion',
    ratio: '16 / 9',
    src: '/motion/flamengo-logo-reveal.mp4',
  },
  {
    id: 'mascot-skate',
    title: 'Italakinho — Skate',
    titleEn: 'Italakinho — Skate',
    year: '2026',
    kind: 'ai',
    ratio: '9 / 16',
    src: '/motion/italakinho-skate.mp4',
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
    id: 'gold-rays-02',
    title: 'Raios dourados — 02',
    titleEn: 'Golden rays — 02',
    year: '2026',
    kind: 'motion',
    ratio: '4 / 5',
    src: '/motion/gold-rays-02.mp4',
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

];
