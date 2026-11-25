/**
 * Case-study content for projects rendered with the shared presentation pattern
 * (same structure as The Sandler Clause, Clash On Hold, Open Up and Volte a Ser Criança):
 *
 *   hero media → headline → [INSIGHT] / [IDEA] → blocks (media, statement, galleries…)
 *
 * Copy is condensed from each project's original description in projects.ts.
 */

export interface Copy {
  pt: string;
  en: string;
}

export type CaseMedia =
  | { type: 'image'; src: string; alt: Copy; ratio?: string; bg?: string }
  | { type: 'video'; src: string; alt: Copy; ratio?: string; bg?: string }
  | { type: 'embed'; provider: 'vimeo' | 'youtube'; id: string; title: string; ratio: string; bg?: string };

export type CaseBlock =
  | { kind: 'media'; media: CaseMedia }
  | { kind: 'statement'; text: Copy; align?: 'left' | 'center'; spacing?: 'spacious' }
  /** Chapter opener: eyebrow + gradient title + body on a dark band */
  | { kind: 'chapter'; eyebrow: Copy; title: Copy; text: Copy; gradient: [string, string] }
  | { kind: 'gallery'; layout: 'stack' | 'padded' | 'grid2' | 'grid3' | 'flush2' | 'compare'; items: CaseMedia[]; /** Constrain grid width (e.g. pairs of vertical stories) */ narrow?: boolean }
  /** Email marketing sequences: each inner array is one email (header → body → footer) stacked seamlessly */
  | { kind: 'emails'; emails: CaseMedia[][] };

export interface CaseStudy {
  hero: CaseMedia;
  headline: Copy;
  insight: { pt: string[]; en: string[] };
  idea: { pt: string[]; en: string[] };
  /** Relative widths of the INSIGHT / IDEA columns on desktop */
  columns?: [number, number];
  blocks: CaseBlock[];
}

const img = (src: string, pt: string, en: string, extra: Partial<Extract<CaseMedia, { type: 'image' }>> = {}): CaseMedia => ({
  type: 'image',
  src,
  alt: { pt, en },
  ...extra,
});

const video = (src: string, pt: string, en: string): CaseMedia => ({
  type: 'video',
  src,
  alt: { pt, en },
});

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const pad = (n: number) => String(n).padStart(2, '0');

const RIR = '/projects/13 - Bacio Rock in Rio';
const EST = '/projects/14 - Estacio Academias';
/** Estácio email footers kept as PNG (flat logos, tiny files); headers and bodies are JPG. */
const EST_PNG = new Set([13, 16, 19, 22, 25, 28, 31, 34, 41]);

/**
 * Digital media kit exported from Figma for one academy:
 * h = 1200×668 banners, s = 1200×1200 posts, p = 960×1200 posts, v = 1080×1920 stories.
 */
const estacioMediaKit = (prefix: 'ama' | 'arh' | 'aia', pt: string, en: string): CaseBlock[] => {
  const piece = (id: string, kindPt: string, kindEn: string) =>
    img(`${EST}/midia_${prefix}_${id}.jpg`, `${kindPt} da ${pt}`, `${en} ${kindEn}`);
  const banners = range(1, 5).map((n) => piece(`h${n}`, 'Banner digital', 'digital banner'));
  const squares = range(1, 5).map((n) => piece(`s${n}`, 'Post quadrado', 'square post'));
  const portraits = range(1, 3).map((n) => piece(`p${n}`, 'Post vertical', 'portrait post'));
  const stories = range(1, 2).map((n) => piece(`v${n}`, 'Story', 'story'));
  return [
    { kind: 'gallery', layout: 'grid3', items: banners.slice(0, 3) },
    { kind: 'gallery', layout: 'grid2', items: banners.slice(3) },
    { kind: 'gallery', layout: 'grid3', items: squares.slice(0, 3) },
    { kind: 'gallery', layout: 'grid2', items: squares.slice(3) },
    { kind: 'gallery', layout: 'grid3', items: portraits },
    { kind: 'gallery', layout: 'grid2', items: stories, narrow: true },
  ];
};

/** Casa Santa pieces kept as PNG (already smaller than JPG); the rest are JPG. */
const CASA_SANTA_PNG = new Set([3, 4, 5, 6, 7, 8, 9, 12]);

export const CASE_STUDIES: Record<string, CaseStudy> = {
  /* 05 — Aprender Sem Fritar */
  'aprender-sem-fritar': {
    hero: img('/projects/11 - Philips/01_Philips.jpg', 'Campanha Aprender Sem Fritar, Philips Walita × Duolingo', 'Aprender Sem Fritar campaign, Philips Walita × Duolingo'),
    headline: {
      pt: 'Cozinhar e aprender não precisam fritar a cabeça de ninguém.',
      en: "Cooking and learning don't have to fry anyone's brain.",
    },
    insight: {
      pt: ['A nova Airfryer Philips Walita chega com as funções tecnológicas como grande destaque. Mas, para a Geração Z, tecnologia nova também pode soar como mais uma coisa para aprender.'],
      en: ['The new Philips Walita Airfryer launches with its smart features as the headline. But for Gen Z, new technology can also feel like one more thing to learn.'],
    },
    idea: {
      pt: ['Uma collab inusitada com o Duolingo, com tom divertido e de conscientização: mostrar que cozinhar pratos saudáveis e aprender coisas novas não precisam fritar a cabeça de ninguém.'],
      en: ["An unexpected collab with Duolingo, witty and awareness-driven: showing that cooking healthy meals and learning new things doesn't have to fry anyone's brain."],
    },
    blocks: [
      { kind: 'media', media: img('/projects/11 - Philips/02_Philips.jpg', 'Peça da campanha Aprender Sem Fritar', 'Aprender Sem Fritar campaign piece') },
      {
        kind: 'statement',
        text: {
          pt: 'A Airfryer e o Duolingo dividem a cena para lançar as funções tecnológicas do produto de um jeito leve, divertido e feito para a Geração Z.',
          en: "The Airfryer and Duolingo share the stage to launch the product's smart features in a light, playful way, built for Gen Z.",
        },
      },
      {
        kind: 'gallery',
        layout: 'stack',
        items: range(3, 5).map((n) => img(`/projects/11 - Philips/${pad(n)}_Philips.jpg`, `Peça ${pad(n)} da campanha Aprender Sem Fritar`, `Aprender Sem Fritar campaign piece ${pad(n)}`)),
      },
    ],
  },

  /* 06 — Bacio Zero */
  'bacio-zero': {
    hero: { type: 'embed', provider: 'vimeo', id: '1213313203', title: 'Bacio Zero | Bacio di Latte', ratio: '9 / 16', bg: '#f5f0eb' },
    headline: {
      pt: 'Zero açúcar.\n100% da experiência.',
      en: 'Zero sugar.\n100% of the experience.',
    },
    insight: {
      pt: ['Quem escolhe uma opção zero não quer abrir mão do prazer. O desafio era provar que o autêntico gelato italiano continua indulgente, mesmo sem açúcar.'],
      en: ['Choosing a zero-sugar option should not mean giving up pleasure. The challenge was to prove that authentic Italian gelato stays indulgent, even without sugar.'],
    },
    idea: {
      pt: ['Uma campanha de lançamento com elegância, frescor e sofisticação artesanal, que destaca a pureza dos ingredientes e o sabor inconfundível do gelato da Bacio di Latte.'],
      en: ["A launch campaign with elegance, freshness and artisanal sophistication, spotlighting pure ingredients and the unmistakable taste of Bacio di Latte's gelato."],
    },
    blocks: [
      {
        kind: 'gallery',
        layout: 'flush2',
        items: [
          img('/projects/01 - Bacio Zero/02_Bacio.jpg', 'Textura do gelato Bacio Zero', 'Bacio Zero gelato texture'),
          img('/projects/01 - Bacio Zero/03_Bacio.jpg', 'Fotografia de produto Bacio Zero', 'Bacio Zero product photography'),
        ],
      },
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'Zero açúcar mantém 100% da experiência indulgente.',
          en: 'Zero sugar preserves 100% of the indulgent experience.',
        },
      },
    ],
  },

  /* Picolé Oficial — Bacio di Latte × Rock in Rio */
  'picole-oficial-rock-in-rio': {
    hero: img(`${RIR}/01_BacioRockInRio.jpg`, 'Key visual Picolé Oficial: roqueira com guitarra segurando um picolé Bacio di Latte', 'Picolé Oficial key visual: rocker with a guitar holding a Bacio di Latte popsicle', { ratio: '16 / 9', bg: '#c8811f' }),
    headline: {
      pt: 'Dois clássicos.\nO mesmo palco.',
      en: 'Two classics.\nOne stage.',
    },
    insight: {
      pt: ['Todo Rock in Rio tem seus clássicos: o riff que o público inteiro canta junto, a pulseira no braço, o ingresso guardado de lembrança. São esses detalhes que transformam cada edição em memória.'],
      en: ['Every Rock in Rio has its classics: the riff the whole crowd sings along to, the wristband on your arm, the ticket kept as a souvenir. Those details are what turn each edition into a memory.'],
    },
    idea: {
      pt: ['Apresentar a Bacio di Latte como picolé oficial do Rock in Rio Brasil 2026 tratando o picolé como mais um desses clássicos, unindo a elegância do gelato italiano à atitude do festival.'],
      en: ["Introduce Bacio di Latte as the official popsicle of Rock in Rio Brasil 2026 by treating it as one more of those classics, pairing the elegance of Italian gelato with the festival's attitude."],
    },
    blocks: [
      { kind: 'media', media: img(`${RIR}/02_BacioRockInRio.jpg`, 'Três cartazes da campanha: “Toda edição tem seu clássico”, “Picolé Oficial” e “Dois clássicos. O mesmo palco.”', 'Three campaign posters: “Every edition has its classic”, “Picolé Oficial” and “Two classics. One stage.”') },
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'Toda edição tem seu clássico.',
          en: 'Every edition has its classic.',
        },
      },
      { kind: 'media', media: img(`${RIR}/03_BacioRockInRio.jpg`, 'Grid do sistema visual da campanha, com fotografia, tipografia e ilustrações', 'Campaign visual system grid with photography, typography and illustrations') },
      {
        kind: 'gallery',
        layout: 'padded',
        items: [video(`${RIR}/Take01.mp4`, 'Vídeo Take 01 da campanha Bacio di Latte × Rock in Rio', 'Take 01 video from the Bacio di Latte × Rock in Rio campaign')],
      },
      {
        kind: 'media',
        media: video(`${RIR}/Take02.mp4`, 'Vídeo Take 02 da campanha Bacio di Latte × Rock in Rio', 'Take 02 video from the Bacio di Latte × Rock in Rio campaign'),
      },
      {
        kind: 'statement',
        spacing: 'spacious',
        text: {
          pt: 'Da estação de trem ao telão do festival, o picolé ganha as ruas antes de subir ao palco.',
          en: 'From the train platform to the festival screen, the popsicle hits the streets before it takes the stage.',
        },
      },
      { kind: 'media', media: img(`${RIR}/06_BacioRockInRio.jpg`, 'Cartaz Picolé Oficial em uma estação de trem', 'Picolé Oficial poster at a train station') },
      {
        kind: 'media',
        media: video(`${RIR}/Take04.mp4`, 'Vídeo Take 04 da campanha Bacio di Latte × Rock in Rio', 'Take 04 video from the Bacio di Latte × Rock in Rio campaign'),
      },
      {
        kind: 'gallery',
        layout: 'flush2',
        items: [
          img(`${RIR}/07_BacioRockInRio.jpg`, 'Painel de LED com o key visual ao entardecer', 'LED billboard with the key visual at dusk'),
          img(`${RIR}/08_BacioRockInRio.jpg`, 'Painel com o key visual acima de uma escada rolante do metrô', 'Key visual panel above a subway escalator'),
        ],
      },
      {
        kind: 'media',
        media: video(`${RIR}/Take05.mp4`, 'Vídeo Take 05 da campanha Bacio di Latte × Rock in Rio', 'Take 05 video from the Bacio di Latte × Rock in Rio campaign'),
      },
      {
        kind: 'statement',
        align: 'center',
        spacing: 'spacious',
        text: {
          pt: 'Nas redes, cada sabor entra em cena com o selo de picolé oficial.',
          en: 'On social, every flavor takes the stage with the official popsicle seal.',
        },
      },
      {
        kind: 'gallery',
        layout: 'grid2',
        items: [
          img(`${RIR}/10_BacioRockInRio.jpg`, 'Key visual Picolé Oficial Rock in Rio Brasil 2026', 'Picolé Oficial Rock in Rio Brasil 2026 key visual'),
          img(`${RIR}/11_BacioRockInRio.jpg`, 'Mão tatuada segurando o picolé com ingresso e pulseira do festival', 'Tattooed hand holding the popsicle with a festival ticket and wristband'),
          img(`${RIR}/12_BacioRockInRio.jpg`, 'Três picolés Bacio di Latte erguidos contra o céu', 'Three Bacio di Latte popsicles raised against the sky'),
          img(`${RIR}/13_BacioRockInRio.jpg`, 'Dois amigos sorrindo com picolés de doce de leite e chocolate', 'Two friends smiling with dulce de leche and chocolate popsicles'),
        ],
      },
      {
        kind: 'gallery',
        layout: 'flush2',
        items: [
          img(`${RIR}/04_BacioRockInRio.jpg`, 'Embalagem do Picolé Oficial com selo Rock in Rio', 'Picolé Oficial packaging with the Rock in Rio seal'),
          img(`${RIR}/05_BacioRockInRio.jpg`, 'Caixa ilustrada do picolé com cenas de show', 'Illustrated popsicle box with concert scenes'),
        ],
      },
      {
        kind: 'media',
        media: video(`${RIR}/Take06.mp4`, 'Vídeo Take 06 da campanha Bacio di Latte × Rock in Rio', 'Take 06 video from the Bacio di Latte × Rock in Rio campaign'),
      },
    ],
  },

  /* Estácio Academias — umbrella brand + three academies */
  'estacio-academias': {
    hero: img(`${EST}/01_Estacio.gif`, 'Animação do símbolo da Estácio Academias: losango com gradiente cônico metálico', 'Estácio Academias symbol animation: diamond with a metallic conic gradient', { ratio: '16 / 9', bg: '#11141b' }),
    headline: {
      pt: 'Uma marca.\nTrês academias.',
      en: 'One brand.\nThree academies.',
    },
    insight: {
      pt: ['O mercado muda rápido, e quem quer sair na frente precisa de formação prática e atualizada. A Estácio queria reunir seus cursos livres em academias temáticas, cada uma com personalidade própria, sem perder a força de uma única marca.'],
      en: ['The market moves fast, and anyone who wants to get ahead needs hands-on, up-to-date training. Estácio wanted to bring its professional courses together into themed academies, each with its own personality, without losing the strength of a single brand.'],
    },
    idea: {
      pt: ['Uma marca guarda-chuva construída sobre um único símbolo: um losango com gradiente cônico de aspecto metálico. Ele ganha uma combinação de cores própria em cada academia, assim cada submarca se diferencia e todas continuam parte da mesma família.'],
      en: ['An umbrella brand built on a single symbol: a diamond with a metallic conic gradient. It takes on its own color pairing in each academy, so every sub-brand stands apart while still belonging to the same family.'],
    },
    blocks: [
      /* Master brand */
      { kind: 'media', media: img(`${EST}/04_Estacio.png`, 'Logotipo Estácio Escolas & Academias', 'Estácio Escolas & Academias logo') },
      { kind: 'media', media: img(`${EST}/03_Estacio.png`, 'Atributos da marca: versátil, disruptivo, moderno e profissional', 'Brand attributes: versatile, disruptive, modern and professional') },
      { kind: 'media', media: img(`${EST}/05_Estacio.png`, 'Os três símbolos das academias, cada um com sua combinação de cores', 'The three academy symbols, each with its own color pairing') },
      {
        kind: 'statement',
        text: {
          pt: 'O mesmo símbolo, três paletas. Cada academia assume sua cor e mantém a assinatura da marca-mãe.',
          en: 'One symbol, three palettes. Each academy takes on its own color while keeping the master brand signature.',
        },
      },
      { kind: 'media', media: img(`${EST}/02_Estacio.png`, 'Assinaturas das três submarcas: Marketing Analítico, Inteligência Artificial e Recursos Humanos', 'Lockups of the three sub-brands: Analytical Marketing, Artificial Intelligence and Human Resources') },

      /* Academia de Marketing Analítico */
      {
        kind: 'chapter',
        eyebrow: { pt: 'Academia de', en: 'Academy of' },
        title: { pt: 'Marketing Analítico', en: 'Analytical Marketing' },
        gradient: ['#1f2bff', '#4ee8f5'],
        text: {
          pt: '79% dos profissionais de marketing dizem ter dificuldade em trabalhar com métricas. A academia nasce para quem quer coletar e interpretar os KPIs que importam, transformar insights em estratégia e medir resultados com precisão.',
          en: '79% of marketing professionals say they struggle to work with metrics. The academy is built for people who want to collect and read the KPIs that matter, turn insights into strategy and measure results with precision.',
        },
      },
      {
        kind: 'gallery',
        layout: 'flush2',
        items: [
          img(`${EST}/06_Estacio.jpg`, 'Cartaz da Academia de Marketing Analítico no metrô: 86% dos consumidores estão dispostos a pagar mais por uma experiência superior', 'Analytical Marketing Academy subway poster: 86% of consumers are willing to pay more for a better experience'),
          img(`${EST}/07_Estacio.jpg`, 'Cartaz da Academia de Marketing Analítico no metrô: 79% dos profissionais de marketing alegam ter desafios em trabalhar com métricas', 'Analytical Marketing Academy subway poster: 79% of marketing professionals struggle to work with metrics'),
        ],
      },
      { kind: 'media', media: img(`${EST}/10_Estacio.jpg`, 'Landing page da Academia de Marketing Analítico em um notebook', 'Analytical Marketing Academy landing page on a laptop') },
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'Dados que geram resultados. Nas mídias digitais, a academia apresenta as ferramentas do dia a dia do profissional: GA4, Power BI, Tag Manager e dashboards.',
          en: 'Data that drives results. Across digital media, the academy showcases the everyday tools of the trade: GA4, Power BI, Tag Manager and dashboards.',
        },
      },
      ...estacioMediaKit('ama', 'Academia de Marketing Analítico', 'Analytical Marketing Academy'),
      {
        kind: 'statement',
        text: {
          pt: 'Em parceria com a Métricas Boss, são cerca de 120 horas de aulas com especialistas reconhecidos pelo mercado, acesso ilimitado por 18 meses e certificação. A régua de CRM apresenta a academia, mostra o que se aprende e quem ensina, e fecha com a oferta de matrícula.',
          en: 'In partnership with Métricas Boss, it offers around 120 hours of classes with recognized industry experts, 18 months of unlimited access and certification. The CRM sequence introduces the academy, shows what you learn and who teaches it, and closes with the enrollment offer.',
        },
      },
      {
        kind: 'emails',
        emails: [
          [11, 12, 13],
          [14, 15, 16],
          [17, 18, 19],
          [20, 21, 22],
        ].map((parts, i) =>
          parts.map((n) => img(`${EST}/${pad(n)}_Estacio.${EST_PNG.has(n) ? 'png' : 'jpg'}`, `E-mail ${i + 1} da régua da Academia de Marketing Analítico`, `Analytical Marketing Academy email ${i + 1} of the sequence`))
        ),
      },

      /* Academia de Recursos Humanos */
      {
        kind: 'chapter',
        eyebrow: { pt: 'Academia de', en: 'Academy of' },
        title: { pt: 'Recursos Humanos', en: 'Human Resources' },
        gradient: ['#00b2ff', '#a98bff'],
        text: {
          pt: 'O mundo do trabalho está cada vez mais dinâmico e humanizado, e quem souber liderar pessoas e processos sai na frente. Do básico ao avançado, a jornada passa por cultura organizacional, recrutamento com IA, desempenho, diversidade, liderança e saúde mental, com mentoras que somam quase 40 anos em gestão de pessoas.',
          en: 'The world of work is becoming more dynamic and human, and those who know how to lead people and processes get ahead. From basic to advanced, the journey covers organizational culture, AI-assisted recruiting, performance, diversity, leadership and mental health, guided by mentors with nearly 40 years of combined experience in people management.',
        },
      },
      ...estacioMediaKit('arh', 'Academia de Recursos Humanos', 'Human Resources Academy'),
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'Por e-mail, a régua apresenta a academia, a ementa, as mentoras e a oferta para novas matrículas.',
          en: 'By email, the sequence introduces the academy, the syllabus, the mentors and the offer for new enrollments.',
        },
      },
      {
        kind: 'emails',
        emails: [
          [23, 24, 25],
          [26, 27, 28],
          [29, 30, 31],
          [32, 33, 34],
        ].map((parts, i) =>
          parts.map((n) => img(`${EST}/${pad(n)}_Estacio.${EST_PNG.has(n) ? 'png' : 'jpg'}`, `E-mail ${i + 1} da régua da Academia de Recursos Humanos`, `Human Resources Academy email ${i + 1} of the sequence`))
        ),
      },

      /* Academia de Inteligência Artificial */
      {
        kind: 'chapter',
        eyebrow: { pt: 'Academia de', en: 'Academy of' },
        title: { pt: 'Inteligência Artificial', en: 'Artificial Intelligence' },
        gradient: ['#2a3cff', '#c6f121'],
        text: {
          pt: 'Uma jornada de 12 meses para aprender IA do zero ao avançado, com conteúdo atualizado todo mês. Tecnologia, modernidade, disrupção e autoridade guiam uma linguagem feita para quem quer dominar o futuro e impulsionar a carreira.',
          en: 'A 12-month journey to learn AI from zero to advanced, with content updated every month. Technology, modernity, disruption and authority guide a language made for people who want to master the future and boost their careers.',
        },
      },
      { kind: 'media', media: img(`${EST}/35_Estacio.png`, 'Atributos da Academia de Inteligência Artificial: tecnologia, modernidade, disrupção e autoridade', 'Artificial Intelligence Academy attributes: technology, modernity, disruption and authority') },
      { kind: 'media', media: img(`${EST}/36_Estacio.png`, 'Iconografia da Academia de Inteligência Artificial sobre fundo verde-limão', 'Artificial Intelligence Academy iconography on a lime green background') },
      {
        kind: 'gallery',
        layout: 'compare',
        items: [
          img(`${EST}/09_Estacio.jpg`, 'Landing page da Academia de Inteligência Artificial com a identidade anterior', 'Artificial Intelligence Academy landing page with the previous identity'),
          img(`${EST}/08_Estacio.jpg`, 'Landing page da Academia de Inteligência Artificial com a nova identidade', 'Artificial Intelligence Academy landing page with the new identity'),
        ],
      },
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'IA não é o futuro, é o agora. Os anúncios convidam a dominar ChatGPT, DeepSeek, Midjourney e outras ferramentas, do zero ao pro.',
          en: 'AI is not the future, it is now. The ads invite people to master ChatGPT, DeepSeek, Midjourney and other tools, from zero to pro.',
        },
      },
      ...estacioMediaKit('aia', 'Academia de Inteligência Artificial', 'Artificial Intelligence Academy'),
      {
        kind: 'statement',
        text: {
          pt: 'A nova identidade também reorganiza peças de evento, como a masterclass gratuita no YouTube: o grafismo da academia substitui a rede de pontos genérica e o verde-limão ganha protagonismo.',
          en: 'The new identity also reshapes event pieces, such as the free masterclass on YouTube: the academy pattern replaces the generic dot network, and lime green takes center stage.',
        },
      },
      {
        kind: 'gallery',
        layout: 'compare',
        items: [
          img(`${EST}/43_Estacio.jpg`, 'Post da masterclass de Inteligência Artificial com a identidade anterior', 'Artificial Intelligence masterclass post with the previous identity'),
          img(`${EST}/42_Estacio.jpg`, 'Post da masterclass de Inteligência Artificial com a nova identidade', 'Artificial Intelligence masterclass post with the new identity'),
        ],
      },
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'Nas redes, a jornada Especialista em IA convida para três aulas ao vivo, com a linguagem de código da marca.',
          en: 'On social, the AI Specialist journey invites people to three live classes, using the brand’s code-inspired language.',
        },
      },
      { kind: 'media', media: img(`${EST}/37_Estacio.jpg`, 'Posts da jornada Especialista em IA: informações, convite e datas das aulas', 'AI Specialist journey posts: info, invitation and class dates') },
      {
        kind: 'statement',
        text: {
          pt: 'Para quem já é aluno, a régua de CRM traz o calendário de lives da turma, com temas que vão da IA na sociedade contemporânea à análise de dados e geração de imagens com ChatGPT.',
          en: 'For enrolled students, the CRM sequence shares the class live-session calendar, with topics ranging from AI in contemporary society to data analysis and image generation with ChatGPT.',
        },
      },
      {
        kind: 'emails',
        emails: [
          [39, 40, 41],
          [44, 40, 41],
        ].map((parts, i) =>
          parts.map((n) => img(`${EST}/${pad(n)}_Estacio.${EST_PNG.has(n) ? 'png' : 'jpg'}`, `E-mail ${i + 1} da régua da Academia de Inteligência Artificial`, `Artificial Intelligence Academy email ${i + 1} of the sequence`))
        ),
      },
    ],
  },

  /* 07 — Cartela Brahmiada */
  'cartela-brahmiada': {
    hero: img('/covers/02_Capa_Alife.webp', 'Cartela Brahmiada, campanha da Copa do Mundo 2026', 'Cartela Brahmiada, 2026 World Cup campaign', { ratio: '16 / 9' }),
    headline: {
      pt: 'A Copa do Mundo,\nvista da mesa do bar.',
      en: 'The World Cup,\nseen from the bar table.',
    },
    insight: {
      pt: ['Em dia de jogo, a vibração mais genuína do torcedor brasileiro está na mesa de bar: futebol, chopp trincando e o calor dos botecos tradicionais.'],
      en: ['On match day, the most genuine energy of Brazilian fans lives at the bar table: soccer, ice-cold draft beer and the warmth of traditional botecos.'],
    },
    idea: {
      pt: ['Cartela Brahmiada: uma parceria dos botecos Boa Praça e Tatu Bola com a Ambev durante a Copa do Mundo de 2026, celebrando os torcedores reunidos no boteco.'],
      en: ['Cartela Brahmiada: a partnership between the Boa Praça and Tatu Bola bars and Ambev during the 2026 World Cup, celebrating fans gathered at the boteco.'],
    },
    blocks: [
      {
        kind: 'statement',
        align: 'center',
        text: {
          pt: 'Dois filmes para a Copa: o clima de boteco em dia de jogo e o chopp gelado servido com colarinho perfeito.',
          en: 'Two films for the World Cup: boteco atmosphere on match day and ice-cold draft beer with the perfect foam collar.',
        },
      },
      {
        kind: 'gallery',
        layout: 'grid2',
        items: [
          { type: 'embed', provider: 'vimeo', id: '1213318809', title: 'Cartela Brahmiada — 01', ratio: '9 / 16' },
          { type: 'embed', provider: 'vimeo', id: '1213318103', title: 'Cartela Brahmiada — 02', ratio: '9 / 16' },
        ],
      },
    ],
  },

  /* 08 — playOffs 2K23 */
  'playoffs-2k23': {
    hero: img('/projects/05 - Nike/01_Nike.gif', 'Animação 8-bit da campanha playOffs 2K23', 'playOffs 2K23 8-bit animation'),
    headline: {
      pt: 'Os playoffs da NBA em 8-bit.',
      en: 'The NBA playoffs in 8-bit.',
    },
    insight: {
      pt: [
        'Em um mundo cheio de visuais modernos e complexos, o basquete é uma válvula de escape: o respiro de quem só quer chegar em casa e ver seu time jogar.',
        'E boa parte dos fãs da NBA cresceu jogando games retrô, hoje conectados à liga por jogos como o NBA 2K.',
      ],
      en: [
        'In a world full of modern, complex visuals, basketball is an escape valve: a breath of fresh air for anyone who just wants to come home and watch their team play.',
        'And many NBA fans grew up playing retro games, now connected to the league through titles like NBA 2K.',
      ],
    },
    idea: {
      pt: ['Usar a estética 8-bit e o pixel art como linguagem da campanha: leveza que diferencia, nostalgia que conecta e uma experiência imediata e memorável para torcedores e jogadores.'],
      en: ['Use 8-bit and pixel art as the campaign language: lightness that stands out, nostalgia that connects, and an immediate, memorable experience for fans and gamers.'],
    },
    blocks: [
      { kind: 'media', media: img('/projects/05 - Nike/02_Nike.jpg', 'Peça 02 da campanha playOffs 2K23', 'playOffs 2K23 piece 02') },
      {
        kind: 'statement',
        text: {
          pt: 'O pixel art remete às origens dos videogames e cria uma conexão emocional imediata com quem vive o basquete dentro e fora das telas.',
          en: 'Pixel art harks back to the origins of video games, creating an immediate emotional connection with people who live basketball on and off screen.',
        },
      },
      {
        kind: 'gallery',
        layout: 'grid3',
        items: range(3, 5).map((n) => img(`/projects/05 - Nike/${pad(n)}_Nike.jpg`, `Peça ${pad(n)} da campanha playOffs 2K23`, `playOffs 2K23 piece ${pad(n)}`)),
      },
      {
        kind: 'gallery',
        layout: 'stack',
        items: range(6, 10).map((n) => img(`/projects/05 - Nike/${pad(n)}_Nike.jpg`, `Peça ${pad(n)} da campanha playOffs 2K23`, `playOffs 2K23 piece ${pad(n)}`)),
      },
    ],
  },

  /* 09 — Casa Santa */
  'casa-santa': {
    hero: img('/projects/09 - Casa Santa/01_CasaSanta.webp', 'Identidade animada da Casa Santa', 'Casa Santa animated identity'),
    headline: {
      pt: '“Tá fazendo arte, menino?”',
      en: '“Are you making art, kid?”',
    },
    insight: {
      pt: ['Cultura ainda é vista como algo tradicional, chato e quadrado. Mas, no Rio, a arte pulsa em qualquer lugar: das telas aos postes.'],
      en: ['Culture is still seen as rigid, traditional and boring. But in Rio, art lives everywhere: from canvas to lampposts.'],
    },
    idea: {
      pt: ['Uma identidade para o centro cultural e botânico de Santa Teresa, construída sobre três pilares — descontração, desmistificar e divertir — para viver a arte com a naturalidade de quem bebe um copo d’água na cozinha.'],
      en: ["An identity for Santa Teresa's cultural and botanical center, built on three pillars — relaxation, demystifying and entertaining — so art is lived as naturally as having a glass of water in your own kitchen."],
    },
    columns: [1, 1.15],
    blocks: [
      { kind: 'media', media: img('/projects/09 - Casa Santa/02_CasaSanta.jpg', 'Apresentação da marca Casa Santa', 'Casa Santa brand presentation') },
      {
        kind: 'statement',
        text: {
          pt: 'A Casa Santa nasce para ser a referência cultural de Santa Teresa — das artes plásticas ao quintal botânico — trazendo a essência carioca para dentro de casa.',
          en: "Casa Santa is born to be Santa Teresa's cultural hub — from fine arts to a botanical garden — bringing the Carioca spirit home.",
        },
      },
      {
        kind: 'gallery',
        layout: 'padded',
        items: range(3, 22).map((n) => img(`/projects/09 - Casa Santa/${pad(n)}_CasaSanta.${CASA_SANTA_PNG.has(n) ? 'png' : 'jpg'}`, `Casa Santa — peça ${pad(n)}`, `Casa Santa — piece ${pad(n)}`)),
      },
    ],
  },

  /* 10 — Ler para Crer */
  'ler-para-crer': {
    hero: img('/projects/10 - Estadao/01_Estadao.jpg', 'Campanha Ler para Crer, Estadão', 'Ler para Crer campaign, Estadão'),
    headline: {
      pt: 'Credibilidade é tudo.',
      en: 'Credibility is everything.',
    },
    insight: {
      pt: ['Em uma era de polarização digital e excesso de desinformação, narrativas vazias se espalham com facilidade.'],
      en: ['In an era of digital polarization and rampant misinformation, baseless narratives spread with ease.'],
    },
    idea: {
      pt: ['Uma campanha de mídia exterior que valoriza a imprensa investigativa e a profundidade analítica do Estadão, transformando a leitura fundamentada na única barreira sólida contra narrativas vazias.'],
      en: ["An out-of-home campaign celebrating Estadão's investigative journalism and analytical depth, turning well-founded reading into the only solid barrier against baseless narratives."],
    },
    blocks: [
      { kind: 'media', media: img('/projects/10 - Estadao/02_Estadao.jpg', 'Peça 02 da campanha Ler para Crer', 'Ler para Crer piece 02') },
      {
        kind: 'statement',
        text: {
          pt: 'Ler para crer: a campanha leva às ruas a força de um dos jornais mais tradicionais do país.',
          en: "Ler para Crer (Read to Believe): the campaign takes one of the country's most traditional newspapers to the streets.",
        },
      },
      {
        kind: 'gallery',
        layout: 'stack',
        items: range(3, 6).map((n) => img(`/projects/10 - Estadao/${pad(n)}_Estadao.jpg`, `Peça ${pad(n)} da campanha Ler para Crer`, `Ler para Crer piece ${pad(n)}`)),
      },
    ],
  },

  /* 11 — Autoria Feminina */
  'autoria-feminina': {
    hero: img('/projects/12 - Autoria Feminina/01_AutoriaFeminina.jpg', 'Campanha Autoria Feminina, Damásio', 'Autoria Feminina campaign, Damásio'),
    headline: {
      pt: 'O Direito brasileiro tem autoria feminina.',
      en: 'Brazilian law has female authorship.',
    },
    insight: {
      pt: [
        'Por muito tempo, o Direito brasileiro foi escrito sem mulheres — e contra elas. Trabalhar, votar, constituir família ou viver sem violência precisaram ser criados, disputados e institucionalizados.',
        'Mulheres transformaram vivências em leis que hoje sustentam a vida de milhões, mas esses feitos ainda são pouco conhecidos.',
      ],
      en: [
        'For a long time, Brazilian law was written without women — and against them. Working, voting, raising a family or living free from violence had to be created, fought for and institutionalized.',
        'Women turned lived experience into laws that support millions of lives today, yet these achievements remain largely unknown.',
      ],
    },
    idea: {
      pt: ['O Damásio transforma essas conquistas jurídicas em mensagens públicas de agradecimento às mulheres que as conquistaram, mostrando o quanto do Direito brasileiro tem autoria feminina.'],
      en: ['Damásio turns these legal milestones into public thank-you messages to the women who achieved them, showing how much of Brazilian law has female authorship.'],
    },
    columns: [1.3, 1],
    blocks: [
      {
        kind: 'statement',
        text: {
          pt: 'Cada construção e avanço nas leis foi resultado de mulheres dentro do sistema jurídico e político.',
          en: 'Every landmark and advancement in the law was driven by women within the legal and political spheres.',
        },
      },
      {
        kind: 'gallery',
        layout: 'stack',
        items: range(2, 3).map((n) => img(`/projects/12 - Autoria Feminina/${pad(n)}_AutoriaFeminina.png`, `Peça ${pad(n)} da campanha Autoria Feminina`, `Autoria Feminina piece ${pad(n)}`)),
      },
    ],
  },
};
