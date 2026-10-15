import React from 'react';
import { Language } from '../types';

interface TuborgProjectContentProps {
  language: Language;
}

const posters = [
  { src: '/projects/tuborg-figma/poster-01.png', alt: 'Cartaz da Tuborg para o jogo de pebolim', altEn: 'Tuborg foosball game poster' },
  { src: '/projects/tuborg-figma/poster-02.png', alt: 'Cartaz da Tuborg para uma partida de sinuca', altEn: 'Tuborg pool game poster' },
  { src: '/projects/tuborg-figma/poster-03.png', alt: 'Cartaz da Tuborg para uma partida de dardos', altEn: 'Tuborg darts game poster' },
  { src: '/projects/tuborg-figma/poster-04.png', alt: 'Cartaz da Tuborg para uma partida de pôquer', altEn: 'Tuborg poker game poster' },
];

export const TuborgProjectContent: React.FC<TuborgProjectContentProps> = ({ language }) => {
  const isPortuguese = language === 'pt';

  return (
    <article className="w-full overflow-hidden bg-white text-[#0d0d0d] dark:bg-[#0d0d0d] dark:text-white">
      <div className="relative aspect-[1061/595] w-full overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/myRKKr6G2eM?si=El3RyTP09wMd_HyF"
          title="Open Up — Tuborg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <section className="flex flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-12 lg:gap-[53px] lg:p-16">
        <h1 className="max-w-[979px] text-[clamp(2.5rem,5.56vw,5rem)] leading-[0.9] tracking-[-0.045em]">
          {isPortuguese
            ? 'A Tuborg transforma a tampinha em uma ficha universal para jogos em grupo nos bares.'
            : 'Tuborg turns its bottle cap into a universal game token for group games in bars.'}
        </h1>

        <div className="grid grid-cols-1 gap-8 text-[15px] leading-[1.45] sm:gap-10 lg:grid-cols-[minmax(0,2.16fr)_minmax(0,1fr)] lg:gap-16 lg:text-base">
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">[INSIGHT]</h2>
            {isPortuguese ? (
              <div className="space-y-4">
                <p>À medida que crescemos e a rotina vira uma questão de desempenho, a conexão social fica em segundo plano. Fazer amizades se torna mais difícil, e criar novos laços passa a depender de uma escolha ativa, em vez do acaso. A pressão para parecer completo e ter a vida resolvida tão cedo faz adultos sentirem que se abrir é sinal de fraqueza. Ao mesmo tempo, mais da metade dos adultos se sente só.</p>
                <p>A Tuborg acredita que não precisa ser assim. Se novos laços dependem de uma chance de aproximação, a Tuborg vai criá-la.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>As we grow and the routine becomes a matter of performance, social connection comes second. To develop friendships is more difficult and to form new bonds becomes dependent on an active choice rather than fate. The pressure to appear complete and have life settled so early and so undisputed makes grown-ups feel that opening up is a sign of weakness. At the same time, more than half of adults feel lonely.</p>
                <p>Tuborg believe they don't have to. If new bonds depend on a chance to approach, Tuborg will design it.</p>
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">{isPortuguese ? '[IDEIA]' : '[IDEA]'}</h2>
            <p>
              {isPortuguese
                ? 'Apresentamos Open Up: a tampinha reconstruída como uma ficha universal para jogos em grupo nos bares.'
                : 'We present “Open Up” — the bottlecap top rebuilt into a universal game token for group games at bars.'}
            </p>
          </section>
        </div>
      </section>

      <figure className="aspect-[16/9] w-full overflow-hidden bg-[#003b21]">
        <video
          src="/projects/tuborg-figma/comp-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label={isPortuguese ? 'Animação da tampinha Tuborg em loop' : 'Looping Tuborg bottle-cap animation'}
          className="h-full w-full object-cover"
        />
      </figure>

      <section className="flex items-center justify-center overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:p-16">
        <p className="max-w-[1137px] text-center text-[clamp(1.25rem,2.22vw,2rem)] leading-[1.2]">
          {isPortuguese
            ? 'Para ampliar o alcance da campanha e conectar mais pessoas, a Tuborg distribuirá cartazes em bares por meio de uma estratégia de mídia exterior.'
            : "To expand the campaign's reach and connect with more people, Tuborg will distribute posters in pubs, using an out-of-home media strategy."}
        </p>
      </section>

      <section className="flex justify-center px-5 pb-10 sm:px-8 sm:pb-12 lg:px-16 lg:pb-16" aria-label={isPortuguese ? 'Cartazes da campanha' : 'Campaign posters'}>
        <div className="grid w-full max-w-[1024px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-[29px]">
          {posters.map((poster) => (
            <figure key={poster.src} className="aspect-[497.577/704.486] w-full overflow-hidden bg-black">
              <img
                src={poster.src}
                alt={isPortuguese ? poster.alt : poster.altEn}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
};
