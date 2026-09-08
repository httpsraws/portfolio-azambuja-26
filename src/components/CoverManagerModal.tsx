import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, RotateCcw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Project, Language } from '../types';
import { getAllStoredCovers, setStoredCover, removeStoredCover } from '../utils/coverStorage';

interface CoverManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  language: Language;
}

export const CoverManagerModal: React.FC<CoverManagerModalProps> = ({
  isOpen,
  onClose,
  projects,
  language,
}) => {
  const [storedCovers, setStoredCovers] = useState<Record<string, string>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getAllStoredCovers().then(setStoredCovers);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (projectId: string) => {
    setTargetProjectId(projectId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetProjectId) return;

    setUploadingId(targetProjectId);
    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        await setStoredCover(targetProjectId, reader.result);
        const updated = await getAllStoredCovers();
        setStoredCovers(updated);
      }
      setUploadingId(null);
      setTargetProjectId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCover = async (projectId: string) => {
    await removeStoredCover(projectId);
    const updated = await getAllStoredCovers();
    setStoredCovers(updated);
  };

  const isPt = language === 'pt';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.gif,.png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Modal Card */}
      <div
        id="cover-manager-modal"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#121216] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                {isPt ? 'Gerenciador de Capas dos Projetos' : 'Project Covers Manager'}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isPt
                  ? 'Personalize as capas da home com suporte nativo a .GIF animados, PNG, JPG e WEBP'
                  : 'Customize home covers with native support for animated .GIF, PNG, JPG, and WEBP'}
              </p>
            </div>
          </div>
          <button
            id="close-cover-manager-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative Banner about .GIF and File Explorer */}
        <div className="px-6 py-3.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/70 dark:border-amber-900/50 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1 leading-relaxed">
            <p className="font-semibold">
              {isPt ? '💡 Dúvida sobre arquivos .GIF:' : '💡 Note about .GIF files:'}
            </p>
            <p>
              {isPt
                ? 'O chat de texto da IA bloqueia arquivos .gif nos anexos do prompt. Porém, você pode adicioná-los diretamente aqui pelo botão "Upload .GIF / Imagem" ou soltando os arquivos na pasta '
                : 'The AI text chat blocks .gif files in prompt attachments. However, you can add them directly here via the "Upload .GIF / Image" button or by placing files in '}
              <code className="px-1.5 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/60 font-mono text-[11px]">
                public/covers/
              </code>
              {isPt
                ? ' do editor de código (ex: 01_Capa_Bacio.gif, 05_Capa_Nike.png).'
                : ' in the code editor (e.g. 01_Capa_Bacio.gif, 05_Capa_Nike.png).'}
            </p>
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {projects.map((project, index) => {
            const padNum = String(index + 1).padStart(2, '0');
            const customCover = storedCovers[project.id];
            const defaultCover = project.coverImage;
            const activeCover = customCover || defaultCover;
            const isUploading = uploadingId === project.id;

            return (
              <div
                key={project.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Info & Thumbnail */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Thumbnail / Status */}
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                    {activeCover ? (
                      <img
                        src={activeCover}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to background color placeholder
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold uppercase opacity-80"
                      style={{
                        backgroundColor: project.bgColor,
                        color: project.textColor === 'light' ? '#fff' : '#000',
                        display: activeCover ? 'none' : 'flex',
                      }}
                    >
                      {padNum}
                    </div>
                  </div>

                  {/* Title & Client */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-neutral-400 dark:text-neutral-500">
                        {padNum}
                      </span>
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                        {project.title}
                      </h3>
                      {customCover && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <Check className="w-3 h-3" />
                          {isPt ? 'Personalizada' : 'Custom'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {project.client} · {project.cardType}
                    </p>
                    {defaultCover && !customCover && (
                      <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 truncate block">
                        {defaultCover}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {customCover && (
                    <button
                      id={`reset-cover-${project.id}`}
                      onClick={() => handleRemoveCover(project.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-colors"
                      title={isPt ? 'Restaurar padrão' : 'Restore default'}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isPt ? 'Restaurar' : 'Reset'}</span>
                    </button>
                  )}
                  <button
                    id={`upload-cover-${project.id}`}
                    onClick={() => handleFileSelect(project.id)}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {isUploading
                        ? isPt
                          ? 'Enviando...'
                          : 'Uploading...'
                        : customCover
                        ? isPt
                          ? 'Trocar Capa'
                          : 'Replace Cover'
                        : isPt
                        ? 'Upload .GIF / Imagem'
                        : 'Upload .GIF / Image'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {isPt
              ? 'As capas enviadas são salvas e persistidas no seu navegador.'
              : 'Uploaded covers are saved and persisted in your browser.'}
          </span>
          <button
            id="done-cover-manager-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            {isPt ? 'Concluir' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
