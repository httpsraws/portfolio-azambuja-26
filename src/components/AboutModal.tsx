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
              {language === 'pt' ? (
                <>
                  <p>
                    Ricardo Azambuja é designer gráfico e diretor de arte com sólida formação em motion design, modelagem 3D e animação. Atualmente, possui as 16 insígnias das regiões de Kanto e Johto e foi campeão da Liga Pokémon.
                  </p>
                  <p>
                    Com oito anos de experiência em direção de arte, branding e comunicação visual, especializou-se em Advertising &amp; Branding na Miami Ad School e está concluindo graduação em Desenho Industrial (Design de Produto) na Universidade Federal Fluminense. Ao longo de sua trajetória, conduziu projetos criativos para grandes marcas como Bacio di Latte, Italac, USP (Universidade de São Paulo), Estácio, Damásio e outras. Sua atuação abrange criação de key visuals, motion design, UI/UX design e a integração de inteligência artificial no processo criativo.
                  </p>
                  <p>
                    Atualmente atua como Diretor de Arte na Duuna, desenvolvendo key visuals e conceitos criativos para campanhas publicitárias, filmes e ativações de marca. Anteriormente, como Diretor de Arte na Quest Edu, liderou grandes iniciativas de branding, rebranding e design system para instituições como USP, Damásio e Estácio, impulsionando resultados recordes de vendas e crescimento de receita. Desde 2018, entrega soluções de design, estratégia de marca e UI/UX para uma base diversificada de clientes em educação, esportes, tecnologia e entretenimento.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Ricardo Azambuja is a graphic designer &amp; art director with strong background in motion design, 3D modeling &amp; animation. Actually, he owns the 16 badges from Kanto and Johto regions and won the Pokémon League.
                  </p>
                  <p>
                    With eight years of experience in art direction, branding and visual communication. He specialized in Advertising &amp; Branding at Miami Ad School and is completing a degree in Product Design at Universidade Federal Fluminense. Over the course of his career, he has led creative work for major brands including Bacio di Latte, Italac, USP (Universidade de São Paulo), Estácio, Damásio and others. His expertise spans key visual creation, motion design, UI/UX design, and, more recently, the integration of artificial intelligence into the creative process.
                  </p>
                  <p>
                    Currently working as an Art Director at Duuna, Ricardo develops key visuals and creative ideas for advertising campaigns, films and brand activations. Prior to this, as Art Director at Quest Edu, he led major branding &amp; rebranding and design system initiatives for institutions like USP, Damásio and Estácio, contributing to record-breaking sales results and significant revenue growth. Throughout his career since 2018, he has delivered brand design &amp; strategy and UI/UX solutions for a diverse client base, merging strategic thinking with strong visual craft across education, sports, tech and entertainment sectors.
                  </p>
                </>
              )}
            </div>

            {/* Minimalist Divider */}
            <div className="w-full h-px bg-black/15 dark:bg-white/15 my-6" />

            {/* Career Experience Section in All-Caps */}
            <div className="uppercase tracking-[0]">
              <h3 className="font-bold text-[11px] sm:text-[12px] text-black dark:text-white mb-4">
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
                {language === 'pt' ? 'VAMOS CONVERSAR:' : 'TRY TO SCAM (OR HIRE) ME HERE:'}
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
