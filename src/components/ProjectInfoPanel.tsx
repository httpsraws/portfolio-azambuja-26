import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Language } from '../types';

interface ProjectInfoPanelProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  projectIndex?: number;
}

export const ProjectInfoPanel: React.FC<ProjectInfoPanelProps> = ({
  project,
  isOpen,
  onClose,
  language = 'pt',
  projectIndex: _projectIndex = 0,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] sm:hidden"
            aria-hidden="true"
          />

          {/* Right Lateral Info Drawer */}
          <motion.aside
            id="project-info-drawer"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-3 sm:right-6 top-[68px] sm:top-[82px] z-50 w-[calc(100vw-24px)] sm:w-[360px] md:w-[400px] max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain select-text p-5 sm:p-0 rounded-2xl sm:rounded-none bg-white/95 dark:bg-[#111113]/95 sm:bg-transparent sm:dark:bg-transparent backdrop-blur-xl sm:backdrop-blur-none shadow-2xl sm:shadow-none border border-black/5 dark:border-white/10 sm:border-0 [scrollbar-width:thin] [scrollbar-color:rgba(128,128,128,0.25)_transparent] space-y-6"
            aria-label={language === 'pt' ? 'Informações e créditos do projeto' : 'Project information and credits'}
          >
            {/* Header with Project Title: regular weight, capitalized, subtly larger, no bold, no all-caps */}
            <div>
              <h2 className="text-lg sm:text-xl font-normal text-black dark:text-white leading-tight tracking-[-0.01em]">
                {project.title}
              </h2>
            </div>

            {/* Project Description Header: "INFO" (No divider, no quotes) */}
            <div>
              <h3 className="font-bold text-[10.5px] sm:text-[11px] uppercase tracking-wider text-black/50 dark:text-white/50 mb-2.5">
                INFO
              </h3>
              <p className="text-[12px] sm:text-[12.5px] leading-[1.7] text-black/85 dark:text-white/85 font-normal whitespace-pre-line">
                {language === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
              </p>
            </div>

            {/* Project Credits (No divider) */}
            <div className="space-y-4">
              <h3 className="font-bold text-[10.5px] sm:text-[11px] uppercase tracking-wider text-black/50 dark:text-white/50">
                {language === 'pt' ? 'CRÉDITOS' : 'CREDITS'}
              </h3>

              <div className="space-y-3">
                {project.credits && project.credits.length > 0 ? (
                  project.credits.map((credit, idx) => {
                    const isCategory =
                      credit.role.toLowerCase().includes('categoria') ||
                      (credit.roleEn && credit.roleEn.toLowerCase().includes('category'));
                    const isScope =
                      credit.role.toLowerCase().includes('escopo') ||
                      (credit.roleEn && credit.roleEn.toLowerCase().includes('scope'));

                    let creditValue = credit.name;
                    if (language === 'en') {
                      if (credit.nameEn) {
                        creditValue = credit.nameEn;
                      } else if (isCategory && project.categoryEn) {
                        creditValue = project.categoryEn;
                      } else if (isScope && project.scopeEn) {
                        creditValue = project.scopeEn;
                      }
                    }

                    return (
                      <div key={idx} className="flex flex-col text-[11.5px] sm:text-[12px]">
                        <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                          {language === 'en' && credit.roleEn ? credit.roleEn : credit.role}
                        </span>
                        <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                          {creditValue}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    {/* Fallback structured credits */}
                    <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                      <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                        {language === 'pt' ? 'CLIENTE' : 'CLIENT'}
                      </span>
                      <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                        {project.client}
                      </span>
                    </div>
                    {project.agency && (
                      <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                        <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                          {language === 'pt' ? 'AGÊNCIA' : 'AGENCY'}
                        </span>
                        <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                          {project.agency}
                        </span>
                      </div>
                    )}
                    {project.creativeDirection && (
                      <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                        <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                          {language === 'pt' ? 'DIREÇÃO CRIATIVA' : 'CREATIVE DIRECTION'}
                        </span>
                        <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                          {project.creativeDirection}
                        </span>
                      </div>
                    )}
                    {project.artDirection && (
                      <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                        <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                          {language === 'pt' ? 'DIREÇÃO DE ARTE' : 'ART DIRECTION'}
                        </span>
                        <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                          {project.artDirection}
                        </span>
                      </div>
                    )}
                    {project.copywriting && (
                      <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                        <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                          {language === 'pt' ? 'REDAÇÃO' : 'COPYWRITING'}
                        </span>
                        <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                          {project.copywriting}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                      <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                        {language === 'pt' ? 'ANO' : 'YEAR'}
                      </span>
                      <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                      <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                        {language === 'pt' ? 'CATEGORIA' : 'CATEGORY'}
                      </span>
                      <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                        {language === 'en' && project.categoryEn ? project.categoryEn : project.category}
                      </span>
                    </div>
                    <div className="flex flex-col text-[11.5px] sm:text-[12px]">
                      <span className="text-[10px] uppercase text-black/50 dark:text-white/50">
                        {language === 'pt' ? 'ESCOPO' : 'SCOPE'}
                      </span>
                      <span className="font-medium text-black/90 dark:text-white/90 mt-0.5">
                        {language === 'en' && project.scopeEn ? project.scopeEn : (project.scope || project.category)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
