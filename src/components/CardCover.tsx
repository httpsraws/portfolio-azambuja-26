import React, { useState, useMemo } from 'react';
import { Project } from '../types';

interface CardCoverProps {
  project: Project;
  isFront?: boolean;
}

export const CardCover: React.FC<CardCoverProps> = ({ project }) => {
  const [imgError, setImgError] = useState(false);
  const [candidateIdx, setCandidateIdx] = useState(0);

  // Candidate extensions for cover image (.gif, .png, .jpg, .jpeg, .webp)
  const coverCandidates = useMemo(() => {
    if (!project.coverImage) return [];
    const match = project.coverImage.match(/^(\/covers\/[^.]+)(\..+)?$/);
    if (match) {
      const basePath = match[1];
      const exts = ['.gif', '.png', '.jpg', '.jpeg', '.webp'];
      const ext = match[2] || '';
      const remaining = exts.filter((e) => e !== ext);
      return [project.coverImage, ...remaining.map((e) => `${basePath}${e}`)];
    }
    return [project.coverImage];
  }, [project.coverImage]);

  const currentCoverSrc = coverCandidates[candidateIdx] || project.coverImage;
  const hasValidImageCover = Boolean(currentCoverSrc && !imgError);

  const handleCoverError = () => {
    if (candidateIdx < coverCandidates.length - 1) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none rounded-[22px] flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-900"
      style={{
        backgroundColor: project.bgColor || undefined,
        color: project.textColor === 'light' ? '#ffffff' : '#0f172a',
      }}
    >
      {/* Real Cover Image / Animated GIF without any lighting or shadow overlays */}
      {hasValidImageCover ? (
        <img
          src={currentCoverSrc}
          alt={project.title}
          className="w-full h-full object-cover select-none"
          loading="eager"
          onError={handleCoverError}
        />
      ) : (
        /* Minimal clean placeholder when the local cover file has not been added to /covers/ yet */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border border-dashed border-black/20 dark:border-white/20 rounded-[22px]">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-black/70 dark:text-white/70">
            {project.coverImage ? project.coverImage.replace(/^\//, '') : project.title}
          </span>
          <span className="text-[11px] font-mono text-black/40 dark:text-white/40 mt-1.5">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
};
