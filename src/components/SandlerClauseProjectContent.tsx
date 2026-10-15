import React from 'react';
import { Language } from '../types';

interface SandlerClauseProjectContentProps {
  language: Language;
}

const media = [
  {
    src: '/projects/the-sandler-clause-figma/media-01.png',
    alt: 'Peça de mídia exterior da campanha The Sandler Clause',
    altEn: 'The Sandler Clause out-of-home campaign creative',
  },
  {
    src: '/projects/the-sandler-clause-figma/media-02.png',
    alt: 'Anúncio da Verizon com Adam Sandler em um painel de mídia exterior',
    altEn: 'Verizon ad featuring Adam Sandler on an out-of-home display',
  },
];

export const SandlerClauseProjectContent: React.FC<SandlerClauseProjectContentProps> = ({ language }) => {
  const isPortuguese = language === 'pt';

  return (
    <article className="w-full overflow-hidden bg-white text-[#0d0d0d] dark:bg-[#0d0d0d] dark:text-[#eee]">
      <div className="relative aspect-[1061/595] w-full overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/IbGMgpVfGJ8?si=Jq7bVCE3IBjetJ0V"
          title="The Sandler Clause — Verizon"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <section className="flex flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-12 lg:gap-[53px] lg:p-16">
        <h1 className="max-w-[927px] text-[clamp(2.5rem,5.56vw,5rem)] leading-[0.95] tracking-[-0.045em]">
          {isPortuguese
            ? 'Se Adam Sandler mudar, o plano da Verizon sai de graça.'
            : 'If Adam Sandler changes, the Verizon plan is free.'}
        </h1>

        <div className="grid grid-cols-1 gap-8 text-[15px] leading-[1.45] sm:gap-10 lg:grid-cols-2 lg:gap-16 lg:text-base">
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">{isPortuguese ? '[INSIGHT]' : '[INSIGHT]'}</h2>
            {isPortuguese ? (
              <div className="space-y-4">
                <p>A Geração Z deixou de acreditar nas promessas das operadoras há muito tempo. Melhor plano, melhor preço: tudo soa como ruído. O padrão nunca muda. Os preços sobem sem aviso, os contratos vêm cheios de letras miúdas e sempre há uma surpresa desagradável mais adiante.</p>
                <p>Se ninguém mais confia em contratos, talvez confie em alguém famoso por nunca mudar.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Gen Z stopped believing carrier promises a long time ago. Best plan, best price: background noise. The pattern never changes. Prices climb out of nowhere, contracts come full of fine print, and an unpleasant surprise waits somewhere down the line.</p>
                <p>If nobody trusts a contract anymore, maybe they will trust someone famous for never changing.</p>
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wide">{isPortuguese ? '[IDEIA]' : '[IDEA]'}</h2>
            {isPortuguese ? (
              <div className="space-y-4">
                <p>Transformamos Adam Sandler em uma cláusula contratual. A Verizon incluiu a Sandler Clause em seus planos: enquanto Adam Sandler continuar sendo Adam Sandler — mesmo moletom, mesma bermuda, mesma atitude e essência — o plano também não muda.</p>
                <p>E, no dia em que ele mudar, o plano sai de graça.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>We turned Adam Sandler into a contractual clause. Verizon wrote the Sandler Clause into its plans: as long as Adam Sandler stays Adam Sandler, same hoodie, same shorts, same attitude, same essence, the plan does not change either.</p>
                <p>And the day he changes, the plan is free.</p>
              </div>
            )}
          </section>
        </div>
      </section>

      <figure className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src="/projects/the-sandler-clause-figma/logo-16-9.png"
          alt={isPortuguese ? 'Anúncio da Verizon com a cláusula de Adam Sandler' : 'Verizon ad featuring the Adam Sandler Clause'}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </figure>

      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:p-16">
        <p className="text-[clamp(1.5rem,2.78vw,2.5rem)] leading-[1.2] tracking-[-0.025em]">
          {isPortuguese
            ? 'Para ampliar o alcance da campanha e se conectar com mais pessoas, The Sandler Clause ocupará estações de metrô, cinemas e outros locais estratégicos da cidade com uma estratégia de mídia exterior.'
            : 'To expand the campaign’s reach and connect with more people, The Sandler Clause will take over subway stations, cinemas, and other key locations across the city through an out-of-home media strategy.'}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-0">
        {media.map((item) => (
          <figure key={`feature-${item.src}`} className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <img
              src={item.src}
              alt={isPortuguese ? item.alt : item.altEn}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>

      <div className="aspect-video w-full overflow-hidden bg-[#ee0000]">
        <img
          src="/projects/the-sandler-clause-figma/signature-16-9.png"
          alt={isPortuguese ? 'Assinatura visual da Verizon' : 'Verizon brand signature'}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  );
};
