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
  | { kind: 'statement'; text: Copy; align?: 'left' | 'center' }
  | { kind: 'gallery'; layout: 'stack' | 'padded' | 'grid2' | 'grid3' | 'flush2'; items: CaseMedia[] };

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

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const pad = (n: number) => String(n).padStart(2, '0');

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

  /* 07 — Cartela Brahmiada */
  'cartela-brahmiada': {
    hero: img('/covers/02_Capa_Alife.gif', 'Cartela Brahmiada, campanha da Copa do Mundo 2026', 'Cartela Brahmiada, 2026 World Cup campaign', { ratio: '16 / 9' }),
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
      { kind: 'media', media: img('/projects/05 - Nike/02_Nike.png', 'Peça 02 da campanha playOffs 2K23', 'playOffs 2K23 piece 02') },
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
        items: range(3, 5).map((n) => img(`/projects/05 - Nike/${pad(n)}_Nike.png`, `Peça ${pad(n)} da campanha playOffs 2K23`, `playOffs 2K23 piece ${pad(n)}`)),
      },
      {
        kind: 'gallery',
        layout: 'stack',
        items: range(6, 10).map((n) => img(`/projects/05 - Nike/${pad(n)}_Nike.png`, `Peça ${pad(n)} da campanha playOffs 2K23`, `playOffs 2K23 piece ${pad(n)}`)),
      },
    ],
  },

  /* 09 — Casa Santa */
  'casa-santa': {
    hero: img('/projects/09 - Casa Santa/01_CasaSanta.gif', 'Identidade animada da Casa Santa', 'Casa Santa animated identity'),
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
      { kind: 'media', media: img('/projects/09 - Casa Santa/02_CasaSanta.png', 'Apresentação da marca Casa Santa', 'Casa Santa brand presentation') },
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
        items: range(3, 22).map((n) => img(`/projects/09 - Casa Santa/${pad(n)}_CasaSanta.png`, `Casa Santa — peça ${pad(n)}`, `Casa Santa — piece ${pad(n)}`)),
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
