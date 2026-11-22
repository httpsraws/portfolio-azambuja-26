import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Language } from '../types';

interface AboutPageProps {
  language: Language;
}

const EMAIL = 'ricardoazambujan@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/ricardo-azambuja/';
const EDITION = '2027';

const EXPERIENCES = [
  { company: 'Duuna', period: '2026 — Now' },
  { company: 'Quest Edu', period: '2024—26' },
  { company: 'Layer Up', period: '2024' },
  { company: 'Betspeed', period: '2023—24' },
  { company: 'Good To Game', period: '2022' },
  { company: 'Integra.md', period: '2021' },
  { company: 'INTZ A2E', period: '2020—21' },
  { company: 'Flamengo Imperadores', period: '2020' },
];

/** Brands named in the statement under the portrait */
const STATEMENT_BRANDS = [
  'Bacio di Latte', 'Italac', 'USP', 'Estácio', 'Damásio', 'Ofner', 'Alife Nino', 'Smartfit',
  'Som Livre', 'Flamengo', 'MEG', 'Autokraft', 'Grupo SOMOS',
];

const CLIENTS = [
  'Bacio di Latte', 'Italac', 'USP', 'Estácio', 'Damásio', 'Ofner', 'Alife Nino', 'Smartfit',
  'Som Livre', 'Flamengo', 'MEG', 'Autokraft', 'Grupo SOMOS',
];

/** "Listening now" column — swap the song here */
const NOW_PLAYING = {
  title: 'Family & Friends',
  artist: "Arm's Length",
  url: 'https://open.spotify.com/intl-pt/track/3vqncwFkp7HynTUnsLxqWw?si=70cc49a63e4f476a',
};

const TOOLS = ['Adobe Creative Suite', 'Figma', 'Blender', 'Seedance', 'Kling', 'Nano Banana', 'Claude'];

/**
 * Statement text rendered grey; each word lights up (black / white) under the cursor
 * and fades back slowly, leaving a short trail.
 */
const HoverWords: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="ab-word">{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </>
  );
};

/**
 * The page's comic relief: a handheld-RPG style dialogue box that types itself out,
 * with the blinking ▼ "press A" cursor. Clicking it replays the text.
 */
const DialogBox: React.FC<{ text: string }> = ({ text }) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? text.length : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    let timer = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, text[i - 1] === ',' ? 160 : 28);
    };
    timer = window.setTimeout(tick, run === 0 ? 900 : 120);
    return () => window.clearTimeout(timer);
  }, [text, run, reduceMotion]);

  const done = count >= text.length;

  return (
    <button type="button" className="ab-dialog" onClick={() => setRun((r) => r + 1)} aria-label={text}>
      <span className="ab-dialog__text" aria-hidden="true">
        {text.slice(0, count)}
        <span className="ab-dialog__ghost">{text.slice(count)}</span>
      </span>
      <span className={`ab-dialog__next ${done ? 'is-done' : ''}`} aria-hidden="true">▼</span>
    </button>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const isPt = language === 'pt';
  const t = (pt: string, en: string) => (isPt ? pt : en);
  const [photoOk, setPhotoOk] = useState(true);
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const services = isPt
    ? ['Direção criativa', 'Direção de arte', 'Branding & identidade', 'Campanhas', 'Design systems & Design Ops', 'Motion', 'IA criativa']
    : ['Creative direction', 'Art direction', 'Branding & identity', 'Campaigns', 'Design systems & Design Ops', 'Motion', 'AI creative'];

  const brands = STATEMENT_BRANDS.join(', ');

  return (
    <div className="about-root relative w-full overflow-x-hidden select-text">
      {/* Statement — portrait — statement */}
      <section className="ab-stage">
        <motion.p className="ab-big" {...fade(0)}>
          <HoverWords
            text={t(
              'Ricardo Azambuja é diretor de arte e designer baseado em Niterói, Brasil.',
              'Ricardo Azambuja is an art director and designer based in Niterói, Brazil.'
            )}
          />
        </motion.p>

        <motion.figure className="ab-photo" {...fade(0.12)}>
          {photoOk ? (
            <img src="/assets/ricardo-photo.webp" alt="Ricardo Azambuja" onError={() => setPhotoOk(false)} draggable={false} />
          ) : (
            <span className="ab-photo__none">Ricardo Azambuja</span>
          )}
        </motion.figure>

        <motion.p className="ab-big" {...fade(0.24)}>
          <HoverWords
            text={t(
              `Desenvolve ideias do conceito à entrega para marcas como ${brands}.`,
              `He leads ideas from concept to delivery for brands such as ${brands}.`
            )}
          />
        </motion.p>

        <motion.div {...fade(0.34)}>
          <DialogBox
            text={t(
              'E sim, ele também tem todas as 16 insígnias de Kanto e Johto e venceu a Liga Pokémon.',
              'And yes, he also has all 16 Kanto & Johto badges and won the Pokémon League.'
            )}
          />
        </motion.div>
      </section>

      {/* Details */}
      <section className="ab-details" aria-label={t('Detalhes', 'Details')}>
        <div className="ab-col">
          <h2>{t('Experiência', 'Experience')}</h2>
          <ul>
            {EXPERIENCES.map((item) => (
              <li key={item.company} className="ab-row">
                <span>{item.company}</span>
                <span className="ab-dim">{item.period}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ab-col">
          <h2>{t('Serviços', 'Services')}</h2>
          <ul>{services.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div className="ab-col">
          <h2>{t('Ferramentas', 'Tools')}</h2>
          <ul>{TOOLS.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>
        <div className="ab-col">
          <h2>{t('Marcas', 'Clients')}</h2>
          <p>{CLIENTS.join(', ')}</p>
        </div>
        <div className="ab-col">
          <h2>{t('Contato', 'Contact')}</h2>
          <ul>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          </ul>
          <p className="ab-dim ab-copy">©{EDITION}</p>
        </div>
        <div className="ab-col">
          <h2 className="ab-listening">
            {t('Ouvindo agora', 'Listening now')}
            <span className="ab-eq" aria-hidden="true"><i /><i /><i /></span>
          </h2>
          <ul>
            <li>
              <a href={NOW_PLAYING.url} target="_blank" rel="noopener noreferrer" className="ab-song">
                {NOW_PLAYING.title} ↗
              </a>
            </li>
            <li>{NOW_PLAYING.artist}</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
