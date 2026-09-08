import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode, Language } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  language: Language;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onOpenAbout: () => void;
  isAboutOpen?: boolean;
  onGoHome?: () => void;
  isProjectOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  language,
  onToggleTheme,
  onToggleLanguage,
  onOpenAbout,
  isAboutOpen = false,
  onGoHome,
  isProjectOpen = false,
}) => {
  return (
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none transition-all duration-500">
      {/* Compact Floating Glassmorphism Navigation Bar */}
      <nav
        className="w-full max-w-[94vw] sm:max-w-[540px] pointer-events-auto flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 h-[44px] sm:h-[48px] rounded-lg sm:rounded-xl bg-white/50 dark:bg-[#141416]/65 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all duration-300"
        aria-label="Navegação principal"
      >
        {/* Left: Designer Name Only (clicking returns home if inside project) */}
        <div className="flex items-center select-none">
          <button
            type="button"
            onClick={() => {
              if (onGoHome) onGoHome();
            }}
            className="font-bold text-[11px] sm:text-xs tracking-[-0.02em] uppercase text-black dark:text-white cursor-pointer bg-transparent border-0 p-0 hover:opacity-75 transition-opacity"
            title="Azambuja"
          >
            AZAMBUJA
          </button>
        </div>

        {/* Center: Navigation Options WORK & ABOUT with dynamic font weight */}
        <div className="flex items-center gap-5 sm:gap-7 select-none">
          <button
            type="button"
            onClick={() => {
              if (isAboutOpen) {
                onOpenAbout();
              }
              if (isProjectOpen && onGoHome) {
                onGoHome();
              }
            }}
            className={`text-[11px] sm:text-xs uppercase tracking-[-0.01em] transition-all duration-200 cursor-pointer ${
              !isAboutOpen
                ? 'text-black dark:text-white font-bold opacity-100'
                : 'text-black/50 dark:text-white/50 font-normal hover:text-black dark:hover:text-white hover:opacity-85'
            }`}
          >
            {language === 'pt' ? 'TRABALHOS' : 'WORK'}
          </button>

          <button
            id="header-about-toggle-btn"
            type="button"
            onClick={onOpenAbout}
            className={`text-[11px] sm:text-xs uppercase tracking-[-0.01em] transition-all duration-200 cursor-pointer ${
              isAboutOpen
                ? 'text-black dark:text-white font-bold opacity-100'
                : 'text-black/50 dark:text-white/50 font-normal hover:text-black dark:hover:text-white hover:opacity-85'
            }`}
          >
            {language === 'pt' ? 'SOBRE' : 'ABOUT'}
          </button>
        </div>

        {/* Right: Language Switcher (EN / BR) & Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLanguage();
            }}
            className="h-7 sm:h-8 px-2 text-[11px] sm:text-xs font-normal tracking-tight uppercase flex items-center justify-center rounded-md text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer select-none border-0 bg-transparent"
            title={language === 'en' ? 'Mudar para Português (BR)' : 'Switch to English (EN)'}
            aria-label={language === 'en' ? 'Mudar idioma para Português (BR)' : 'Switch language to English (EN)'}
          >
            <span>{language === 'en' ? 'EN' : 'BR'}</span>
          </button>

          {/* Theme Toggle (Monochrome Icon on Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleTheme();
            }}
            id="theme-toggle-btn"
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 text-black dark:text-white opacity-70 hover:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer bg-transparent hover:bg-black/5 dark:hover:bg-white/10 rounded-lg active:scale-90 border-0"
            title={`Alternar para ${theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}`}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 stroke-[1.8] text-white" />
            ) : (
              <Moon className="w-4 h-4 stroke-[1.8] text-black" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};
