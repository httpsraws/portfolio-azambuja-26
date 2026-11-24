import React from 'react';
import { Project, Language } from '../types';

interface ProjectCreditsProps {
  project: Project;
  language: Language;
}

type TeamKey = 'creative' | 'art' | 'copy' | 'edit';

interface CreditEntry {
  role: string;
  value: string;
  team?: TeamKey;
}

// Team roles always share one row, in this order.
const TEAM_ORDER: TeamKey[] = ['creative', 'art', 'copy', 'edit'];

const getTeamKey = (role: string, roleEn?: string): TeamKey | undefined => {
  const text = `${role} ${roleEn ?? ''}`.toLowerCase();
  if (text.includes('direção criativa') || text.includes('creative direct')) return 'creative';
  if (text.includes('direção de arte') || text.includes('art direct')) return 'art';
  if (text.includes('redação') || text.includes('copywrit')) return 'copy';
  if (text.includes('edição') || text.includes('editing') || text.includes('video edit')) return 'edit';
  return undefined;
};

const getCredits = (project: Project, language: Language): CreditEntry[] => {
  const isPt = language === 'pt';

  if (project.credits && project.credits.length > 0) {
    return project.credits.map((credit) => {
      const isCategory =
        credit.role.toLowerCase().includes('categoria') ||
        Boolean(credit.roleEn && credit.roleEn.toLowerCase().includes('category'));
      const isScope =
        credit.role.toLowerCase().includes('escopo') ||
        Boolean(credit.roleEn && credit.roleEn.toLowerCase().includes('scope'));

      let value = credit.name;
      if (!isPt) {
        if (credit.nameEn) value = credit.nameEn;
        else if (isCategory && project.categoryEn) value = project.categoryEn;
        else if (isScope && project.scopeEn) value = project.scopeEn;
      }

      return {
        role: !isPt && credit.roleEn ? credit.roleEn : credit.role,
        value,
        team: getTeamKey(credit.role, credit.roleEn),
      };
    });
  }

  // Fallback structured credits
  const entries: (CreditEntry | null)[] = [
    { role: isPt ? 'CLIENTE' : 'CLIENT', value: project.client },
    project.agency ? { role: isPt ? 'AGÊNCIA' : 'AGENCY', value: project.agency } : null,
    project.creativeDirection
      ? { role: isPt ? 'DIREÇÃO CRIATIVA' : 'CREATIVE DIRECTION', value: project.creativeDirection, team: 'creative' }
      : null,
    project.artDirection
      ? { role: isPt ? 'DIREÇÃO DE ARTE' : 'ART DIRECTION', value: project.artDirection, team: 'art' }
      : null,
    project.copywriting
      ? { role: isPt ? 'REDAÇÃO' : 'COPYWRITING', value: project.copywriting, team: 'copy' }
      : null,
    { role: isPt ? 'ANO' : 'YEAR', value: String(project.year) },
    {
      role: isPt ? 'CATEGORIA' : 'CATEGORY',
      value: !isPt && project.categoryEn ? project.categoryEn : project.category,
    },
    {
      role: isPt ? 'ESCOPO' : 'SCOPE',
      value: !isPt && project.scopeEn ? project.scopeEn : (project.scope || project.category),
    },
  ];

  return entries.filter((entry): entry is CreditEntry => Boolean(entry && entry.value));
};

const CreditItem: React.FC<{ credit: CreditEntry; className?: string }> = ({ credit, className }) => (
  <div className={`flex min-w-0 flex-col ${className ?? ''}`}>
    <dt className="text-[10px] uppercase tracking-wide opacity-50">{credit.role}</dt>
    <dd className="mt-1 text-[12px] sm:text-sm font-medium leading-snug break-words">{credit.value}</dd>
  </div>
);

/** Project description and credits, rendered at the end of each project page. */
export const ProjectCredits: React.FC<ProjectCreditsProps> = ({ project, language }) => {
  const isPt = language === 'pt';
  const description = !isPt && project.descriptionEn ? project.descriptionEn : project.description;
  const credits = getCredits(project, language);
  const team = TEAM_ORDER.map((key) => credits.find((credit) => credit.team === key)).filter(
    (credit): credit is CreditEntry => Boolean(credit)
  );
  const details = credits.filter((credit) => !team.includes(credit));

  if (!description && credits.length === 0) return null;

  return (
    <section
      aria-label={isPt ? 'Informações e créditos do projeto' : 'Project information and credits'}
      className="w-full px-5 pt-10 pb-28 sm:px-8 sm:pt-12 sm:pb-32 lg:px-16 lg:pt-16 lg:pb-36 select-text space-y-10 sm:space-y-12"
    >
      {description && (
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">
            {isPt ? '[DESCRIÇÃO]' : '[DESCRIPTION]'}
          </h2>
          <p className="max-w-[760px] text-[15px] leading-[1.55] lg:text-base whitespace-pre-line">{description}</p>
        </div>
      )}

      {credits.length > 0 && (
        <div>
          <h2 className="mb-6 sm:mb-8 text-xs font-bold uppercase tracking-wide">
            {isPt ? '[CRÉDITOS]' : '[CREDITS]'}
          </h2>
          {/* One shared grid so every row lines up on the same columns.
              The team (creative direction, art direction, copywriting) starts its own row
              and always stays on a single line (4 columns at every width when the team has 4 people). */}
          <dl
            className={`grid gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 ${
              team.length > 3 ? 'grid-cols-4' : 'grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {details.map((credit, idx) => <CreditItem key={`d-${idx}`} credit={credit} />)}
            {team.map((credit, idx) => (
              <CreditItem key={`t-${idx}`} credit={credit} className={idx === 0 ? 'col-start-1' : undefined} />
            ))}
          </dl>
        </div>
      )}
    </section>
  );
};
