import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose?: () => void;
  language?: Language;
  isOutsideHome?: boolean;
}

const EXPERIENCES = [
  { company: 'DUUNA', period: '2026 - NOW' },
  { company: 'QUEST EDU', period: '2024-2026' },
  { company: 'LAYER UP', period: '2024' },
  { company: 'BETSPEED', period: '2023-2024' },
  { company: 'GOOD TO GAME', period: '2022' },
  { company: 'INTEGRA.MD', period: '2021' },
  { company: 'INTZ A2E', period: '2020-2021' },
  { company: 'FLAMENGO IMPERADORES', period: '2020' },
];

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  language = 'pt',
  isOutsideHome = false,
}) => {
  const [photoSrc, setPhotoSrc] = useState('/assets/ricardo-photo.webp');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const rotatingPhrases = language === 'pt' ? ['identidades visuais', 'campanhas criativas', 'design systems'] : ['visual identities', 'creative campaigns', 'design systems'];


  useEffect(() => {
    const timer = window.setInterval(() => setPhraseIndex((index) => (index + 1) % rotatingPhrases.length), 3200);
    return () => window.clearInterval(timer);
  }, [rotatingPhrases.length]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close when user clicks anywhere outside the About panel (on any free/empty area of the site)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Click inside about modal container
      if (modalRef.current && modalRef.current.contains(target)) {
        return;
      }
      const aboutContainer = document.getElementById('about-scroll-container');
      if (aboutContainer && aboutContainer.contains(target)) {
        return;
      }

      // Click on the Header About toggle button
      const aboutToggleBtn = document.getElementById('header-about-toggle-btn');
      if (aboutToggleBtn && aboutToggleBtn.contains(target)) {
        return;
      }

      // User clicked on any free/empty area or outside element of the site
      if (onClose) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    // Attach after a short tick to avoid capturing the opening click
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }, 60);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Tap-to-Dismiss Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-45 bg-black/25 dark:bg-black/45 backdrop-blur-[2px] sm:hidden"
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            id="about-scroll-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-3 sm:right-6 top-[68px] sm:top-[82px] z-50 w-[calc(100vw-24px)] sm:w-[350px] md:w-[390px] max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain pointer-events-auto select-text [scrollbar-width:thin] [scrollbar-color:rgba(128,128,128,0.25)_transparent] p-5 sm:p-0 rounded-2xl sm:rounded-none bg-white/95 dark:bg-[#111113]/95 sm:bg-transparent sm:dark:bg-transparent backdrop-blur-xl sm:backdrop-blur-none shadow-2xl sm:shadow-none border border-black/5 dark:border-white/10 sm:border-0"
          >
            {/* 3x4 Portrait Photo */}
            <div className="mb-4">
              <img
                src={photoSrc}
                onError={() => {
                  if (photoSrc !== '/assets/ricardo-photo.webp') {
                    setPhotoSrc('/assets/ricardo-photo.webp');
                  }
                }}
                alt="Ricardo Azambuja"
                className="w-16 sm:w-20 aspect-[3/4] object-cover rounded-none grayscale contrast-105 shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Main Biography Section */}
            <div className="space-y-4 text-[12px] sm:text-[12.5px] md:text-[13px] leading-[1.7] font-normal text-black/85 dark:text-white/85 tracking-[-0.01em]">
              <>
                <p>
                  <strong className="font-bold capitalize text-black dark:text-white">Ricardo Azambuja</strong><br />
                  <span className="text-black/60 dark:text-white/60">{language === 'pt' ? 'Designer Gráfico & Diretor de Arte' : 'Graphic Designer & Art Director'}</span>
                </p>
                <p className="text-[21px] sm:text-[25px] md:text-[28px] leading-[1.12] tracking-[-0.045em] font-normal text-black/60 dark:text-white/60">
                  {language === 'pt' ? 'Crio' : 'I build'}{' '}
                  <span className="inline-grid overflow-hidden align-bottom text-black dark:text-white">
                    <AnimatePresence initial={false}>
                      <motion.span key={`${language}-${phraseIndex}`} initial={{ y: '-100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} exit={{ y: '100%', opacity: 0 }} transition={{ duration: 0.55, ease: [0.42, 0, 0.58, 1] }} className="col-start-1 row-start-1">
                        {rotatingPhrases[phraseIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </p>
                <p className="!mt-0">
                  <span className="about-marquee capitalize text-[14px] sm:text-[15px] text-black/60 dark:text-white/60" aria-label={language === 'pt' ? 'Direção de arte, Branding, Design Ops, Design gráfico, Motion, IA criativa' : 'Art direction, Branding, Design Ops, Graphic Design, Motion, AI Creative'}><span>{language === 'pt' ? 'Direção de arte · Branding · Design Ops · Design gráfico · Motion · IA criativa' : 'Art direction · Branding · Design Ops · Graphic Design · Motion · AI Creative'}&nbsp;&nbsp;·&nbsp;&nbsp;{language === 'pt' ? 'Direção de arte · Branding · Design Ops · Design gráfico · Motion · IA criativa' : 'Art direction · Branding · Design Ops · Graphic Design · Motion · AI Creative'}</span></span>
                </p>
                <p className="!mt-2">
                  <strong className="font-bold text-[10px] sm:text-[11px] text-black dark:text-white">{language === 'pt' ? 'MARCAS COM AS QUAIS TRABALHEI' : "BRANDS I'VE WORKED WITH"}</strong><br />
                  <span className="inline-flex flex-wrap gap-x-1">{['Bacio di Latte', 'Italac', 'USP', 'Estácio', 'Damásio', 'Ofner', 'Alife Nino', 'Smartfit', 'Som Livre', 'Flamengo', 'MEG', 'Autokraft', 'Grupo SOMOS', 'Yuzer'].map((brand, index, brands) => <span key={brand} className="whitespace-nowrap">{brand}{index < brands.length - 1 ? ' ·' : ''}</span>)}</span>
                </p>
                <p>
                  <strong className="font-bold text-[10px] sm:text-[11px] text-black dark:text-white">{language === 'pt' ? 'PRINCIPAIS FERRAMENTAS' : 'TOOLS'}</strong><br />
                  <span className="grid grid-cols-2 gap-x-2">{['Adobe Creative Suite', 'Figma', 'Blender', 'Seedance', 'Kling', 'Nano Banana', 'Claude'].map((tool, index) => <span key={tool} className={`flex items-center gap-1.5 ${index % 2 === 1 ? 'border-l border-black/15 dark:border-white/15 pl-2' : ''}`}><span className="text-[8px] leading-none">◆</span>{tool}</span>)}</span>
                </p>
                <p>
                  {language === 'pt'
                    ? 'E sim, também tenho todas as 16 insígnias de Kanto e Johto e venci a Liga Pokémon.'
                    : 'And yes, I also have all 16 Kanto & Johto badges and won the Pokémon League.'}
                </p>
              </>
            </div>

            {/* Minimalist Divider */}
            <div className="w-full h-px bg-black/15 dark:bg-white/15 my-6" />

            {/* Career Experience Section in All-Caps */}
            <div className="uppercase tracking-[0]">
              <h3 className="font-bold text-[10px] sm:text-[11px] text-black dark:text-white mb-4">
                {language === 'pt' ? 'EXPERIÊNCIA' : 'EXPERIENCE'}
              </h3>

              <div className="space-y-3.5">
                {EXPERIENCES.map((item) => (
                  <div key={`${item.company}-${item.period}`} className="flex flex-col">
                    <span className="font-medium text-[11px] sm:text-[11.5px] text-black/90 dark:text-white/90">
                      {item.company}
                    </span>
                    <span className="text-[10px] sm:text-[10.5px] text-black/50 dark:text-white/50 mt-0.5">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimalist Divider */}
            <div className="w-full h-px bg-black/15 dark:bg-white/15 my-6" />

            {/* Contact Information (Email & LinkedIn) */}
            <div>
              <h3 className="font-bold text-[11px] sm:text-[12px] uppercase text-black dark:text-white mb-3 tracking-[0]">
                {language === 'pt' ? 'VAMOS CONVERSAR:' : 'CONTACT ME HERE'}
              </h3>

              <div className="space-y-2 text-[11px] sm:text-[11.5px]">
                {/* Email */}
                <div>
                  <a
                    href="mailto:ricardoazambujan@gmail.com"
                    className="font-medium text-[11px] sm:text-[11.5px] text-black/90 dark:text-white/90 hover:opacity-60 transition-opacity inline-flex items-center gap-1 select-text"
                  >
                    <span>ricardoazambujan@gmail.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </div>

                {/* LinkedIn */}
                <div>
                  <a
                    href="https://www.linkedin.com/in/ricardo-azambuja/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[11px] sm:text-[11.5px] text-black/90 dark:text-white/90 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
