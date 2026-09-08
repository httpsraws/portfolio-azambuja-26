import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { Project, Language } from '../types';
import { CardCover } from './CardCover';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalProjects: number;
  language?: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalProjects,
  language = 'pt',
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
          >
            {/* Modal Header Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {language === 'en' && project.categoryEn ? project.categoryEn : project.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onPrev}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  title={language === 'pt' ? 'Anterior' : 'Previous'}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={onNext}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  title={language === 'pt' ? 'Próximo' : 'Next'}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  title={language === 'pt' ? 'Fechar (Esc)' : 'Close (Esc)'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Project Card Showcase */}
              <div className="w-full max-w-lg mx-auto aspect-[1.52/1] rounded-[22px] overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                <CardCover project={project} isFront={true} mousePos={{ x: 0.5, y: 0.5 }} />
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {language === 'en' && project.categoryEn ? project.categoryEn : project.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" /> {project.year}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Building className="w-3.5 h-3.5" /> {project.client}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                  {project.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                  {project.subtitle}
                </p>
              </div>

              {/* Summary Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-base leading-relaxed">
                {project.summary}
              </div>

              {/* Case Study Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                  {language === 'pt' ? 'Visão Geral & Desafio' : 'Overview & Challenge'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Key Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col"
                    >
                      <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">
                        {metric.label}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display mt-1">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Deliverables */}
              {project.deliverables && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                    {language === 'pt' ? 'Entregáveis do Projeto' : 'Project Deliverables'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                  {language === 'pt' ? 'Tecnologias & Especialidades' : 'Technologies & Disciplines'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {project.externalUrl && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>{language === 'pt' ? 'Explorar Projeto Completo' : 'Explore Full Project'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
