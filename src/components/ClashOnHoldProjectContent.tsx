import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';

interface ClashOnHoldProjectContentProps {
  language: Language;
}

const mediaPath = '/projects/clash-on-hold-figma';

const campaignBoards = [
  ['09-03-builders-busy.png', '03 — Builders Busy', '03 — Construtores ocupados'],
  ['10-02-some-constructions.png', '02 — Some Constructions', '02 — Algumas obras'],
  ['11-04-loading.png', '04 — Loading', '04 — Em construção'],
  ['12-05-episodes.png', '05 — 32 Episodes', '05 — 32 episódios'],
  ['13-01-builder-book.png', '01 — Builder Book', '01 — Manual do construtor'],
] as const;

const campaignMedia = [
  ['barbarian-16-9.mp4', 'Barbarian protesting unfinished roadworks', 'Bárbaro protestando contra obras inacabadas'],
  ['giant-16-9.mp4', 'Giant speaking in a campaign interview', 'Gigante falando em entrevista da campanha'],
  ['invasion-16-9.mp4', 'Clash of Clans characters invading a construction site', 'Personagens de Clash of Clans invadindo um canteiro de obras'],
  ['builder-16-9.mp4', 'Builder interviewed at the construction site', 'Construtor entrevistado no canteiro de obras'],
] as const;

export const ClashOnHoldProjectContent: React.FC<ClashOnHoldProjectContentProps> = ({ language }) => {
  const isPortuguese = language === 'pt';
  const archerRef = useRef<HTMLDivElement>(null);
  const [isArcherMuted, setIsArcherMuted] = useState(true);
  const [isArcherInView, setIsArcherInView] = useState(false);
  const [hasInteractedWithArcher, setHasInteractedWithArcher] = useState(false);

  useEffect(() => {
    const archerElement = archerRef.current;
    if (!archerElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsArcherInView(entry.isIntersecting);
    }, { threshold: 0.01 });

    observer.observe(archerElement);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="w-full bg-white text-[#0d0d0d] transition-colors duration-500 dark:bg-[#0d0d0d] dark:text-[#a8a8a8]">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/fw-HeOdCrwo?si=DDTLCmglc52zL2vP"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <section className="flex min-h-[473px] flex-col gap-[53px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
        <h1 className="max-w-[836px] text-[clamp(44px,5.56vw,80px)] font-normal leading-[0.9] tracking-[-0.055em]">
          {isPortuguese ? (
            <>Clash chegou às cidades<br />e deixou recados para<br />as autoridades.</>
          ) : (
            <>Clash went to the cities<br />and left messages for<br />the authorities.</>
          )}
        </h1>

        <div className="flex flex-col justify-start gap-8 xl:flex-row xl:items-center xl:gap-8">
          <div className="w-full max-w-[624px]">
            <h2 className="mb-4 text-xs font-bold leading-none">[INSIGHT]</h2>
            <p className="text-base leading-normal">
              {isPortuguese
                ? 'Grande parte do apelo de Clash of Clans está em construir. Pense em obras reais que parecem nunca sair do papel. E se trouxéssemos essa ideia — a de obras que nunca terminam — para promover o jogo?'
                : 'Much of Clash of Clans’ appeal revolves around building. Think about real-life projects that feel like they’re perpetually under construction. What if we surface that idea, this endless building, to promote our game?'}
            </p>
          </div>
          <div className="w-full max-w-[624px]">
            <h2 className="mb-4 text-xs font-bold leading-none">[{isPortuguese ? 'IDEIA' : 'IDEA'}]</h2>
            <p className="text-base leading-normal">
              {isPortuguese
                ? 'Vamos instalar outdoors diante de obras inacabadas com anúncios de Clash of Clans. A ideia é provocar sutilmente as autoridades para concluírem esses projetos, enquanto promovemos o jogo.'
                : 'We will put billboards in front of unfinished construction sites with Clash of Clans ads. The idea is to subtly provoke public authorities to finish these projects, all while promoting our game.'}
            </p>
          </div>
        </div>
      </section>

      <video
        src={`${mediaPath}/logo-16-9.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label={isPortuguese ? 'Animação em loop da assinatura SUP BRO ELL' : 'Looping animation of the SUP BRO ELL wordmark'}
        className="block h-auto w-full"
      />
      <div
        ref={archerRef}
        role="button"
        tabIndex={0}
        aria-label={isPortuguese ? 'Clique para ativar ou desativar o som' : 'Click to unmute or mute'}
        aria-pressed={!isArcherMuted}
        onClick={() => {
          setIsArcherMuted((muted) => !muted);
          setHasInteractedWithArcher(true);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsArcherMuted((muted) => !muted);
            setHasInteractedWithArcher(true);
          }
        }}
        className="group relative w-full cursor-pointer overflow-hidden bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
      >
        <video
          src={`${mediaPath}/archer-16-9.mp4`}
          autoPlay
          loop
          muted={isArcherMuted}
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="pointer-events-none block h-auto w-full"
        />
        <span
          className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-opacity duration-500 ${isArcherInView && !hasInteractedWithArcher ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          Click to unmute
        </span>
      </div>

      <section className="flex min-h-[376px] flex-col justify-center gap-12 px-6 py-10 sm:px-10 sm:py-12 lg:h-[376px] lg:overflow-hidden lg:px-16 lg:py-16">
        <p className="w-full text-[clamp(27px,2.78vw,40px)] leading-normal">
          {isPortuguese
            ? 'Para traduzir a frustração com obras que nunca terminam, demos vida aos personagens de Clash of Clans com animações geradas por IA no videocase da campanha. Tudo foi criado com IA usando VEO3, Kling, Nano Banana, Magnific e Eleven Labs.'
            : 'To convey the frustration over unfinished roadworks, the Clash of Clans characters were brought to life through AI-generated animations, featured in the campaign’s videocase. Created entirely with AI using VEO3, Kling, Nano Banana, Magnific, and Eleven Labs.'}
        </p>
      </section>

      <section aria-label={isPortuguese ? 'Imagens da campanha' : 'Campaign images'} className="grid w-full grid-cols-1 sm:grid-cols-2">
        {campaignMedia.map(([file, altEn, altPt], index) => (
          <div key={file} className="aspect-video w-full overflow-hidden">
            <video
              src={`${mediaPath}/${file}`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={isPortuguese ? altPt : altEn}
              className={`block h-full w-full object-cover ${index === 0 ? 'scale-[1.16]' : ''}`}
            />
          </div>
        ))}
      </section>

      <section aria-label={isPortuguese ? 'Peças da campanha' : 'Campaign artwork'} className="flex flex-col gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12 lg:gap-16 lg:px-16 lg:py-16">
        {campaignBoards.map(([file, altEn, altPt]) => (
          <img key={file} src={`${mediaPath}/${file}`} alt={isPortuguese ? altPt : altEn} className="block h-auto w-full" loading="lazy" />
        ))}
      </section>

      <video
        src={`${mediaPath}/signature-16-9.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={isPortuguese ? 'Animação em loop da assinatura de Clash of Clans' : 'Looping animation of the Clash of Clans signature'}
        className="block h-auto w-full"
      />
    </article>
  );
};
