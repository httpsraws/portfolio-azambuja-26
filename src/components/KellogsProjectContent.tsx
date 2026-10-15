import React from 'react';
import { Language } from '../types';

interface KellogsProjectContentProps {
  language: Language;
}

const media = [
  {
    src: '/projects/kellogs-figma/media-01-light.png',
    alt: 'Criança assistindo à televisão durante a campanha Volte a Ser Criança',
    altEn: 'Child watching television in the Volte a Ser Criança campaign',
  },
  {
    src: '/projects/kellogs-figma/media-02-light.png',
    alt: 'Criança em uma chamada de vídeo durante a campanha Volte a Ser Criança',
    altEn: 'Child on a video call in the Volte a Ser Criança campaign',
  },
];

export const KellogsProjectContent: React.FC<KellogsProjectContentProps> = ({ language }) => {
  const isPortuguese = language === 'pt';

  return (
    <article className="w-full overflow-hidden bg-white text-[#0d0d0d] dark:bg-[#0d0d0d] dark:text-white">
      <figure className="aspect-[16/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
        <img
          src="/projects/kellogs-figma/hero-light.png"
          alt={isPortuguese ? 'Criança tomando Sucrilhos, campanha Volte a Ser Criança' : 'Child eating Sucrilhos, Volte a Ser Criança campaign'}
          fetchPriority="high"
          className="h-full w-full object-cover dark:hidden"
        />
        <img
          src="/projects/kellogs-figma/hero-dark.png"
          alt=""
          aria-hidden="true"
          className="hidden h-full w-full object-cover dark:block"
        />
      </figure>

      <section className="flex flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-12 lg:gap-[53px] lg:p-16">
        <h1 className="max-w-[979px] text-[clamp(2.5rem,5.56vw,5rem)] leading-[0.9] tracking-[-0.045em]">
          {isPortuguese ? (
            <>Uma tigela de Sucrilhos,<br />e a infância volta com tudo.</>
          ) : (
            <>One bowl of Sucrilhos,<br />and childhood comes<br />rushing back.</>
          )}
        </h1>

        <div className="grid grid-cols-1 gap-8 text-[15px] leading-[1.45] sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16 lg:text-base">
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">[INSIGHT]</h2>
            <p>
              {isPortuguese
                ? 'Crescer traz responsabilidades, rotinas e expectativas. Mas, lá no fundo, ainda existe uma criança dentro de cada um de nós.'
                : 'Growing up comes with responsibilities, routines, and expectations. But deep down, we all still have a child inside us.'}
            </p>
          </section>
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">{isPortuguese ? '[IDEIA]' : '[IDEA]'}</h2>
            <p>
              {isPortuguese
                ? 'Uma campanha impressa retratando crianças vestidas como adultos e assumindo atividades do dia a dia. Porque basta uma tigela de Sucrilhos Kellogg’s para despertar a criança que existe em você.'
                : 'A print campaign portraying children dressed as adults, taking on everyday grown-up activities. Because one bowl of Kellogg’s Sucrilhos is all it takes to bring out the kid in you.'}
            </p>
          </section>
        </div>
      </section>

      {media.map((item, index) => (
        <figure key={item.src} className="aspect-[16/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
          <img
            src={item.src}
            alt={isPortuguese ? item.alt : item.altEn}
            loading="lazy"
            className="h-full w-full object-cover dark:hidden"
          />
          <img
            src={`/projects/kellogs-figma/media-0${index + 1}-dark.png`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="hidden h-full w-full object-cover dark:block"
          />
        </figure>
      ))}
    </article>
  );
};
