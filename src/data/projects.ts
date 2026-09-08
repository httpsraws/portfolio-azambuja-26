import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'bacio-zero',
    title: 'Bacio Zero',
    subtitle: 'Campanha de lançamento Bacio di Latte',
    subtitleEn: 'Bacio di Latte Zero Launch Campaign',
    category: 'Filme Publicitário',
    categoryEn: 'Commercial Film',
    year: '2026',
    client: 'Bacio di Latte',
    agency: 'Duuna',
    creativeDirection: 'Fabiano Feijó, Marcelo Coelho',
    artDirection: 'Ricardo Azambuja, Vinicius Eloi, Vinicius Meireles',
    copywriting: 'Luiz Otávio Medeiros',
    scope: 'Filme Publicitário',
    scopeEn: 'Commercial Film',
    accentColor: '#1c1917',
    textColor: 'dark',
    bgColor: '#f5f0eb',
    cardType: 'bacio-zero',
    coverImage: '/covers/01_Capa_Bacio.gif',
    summary: 'Campanha de lançamento da nova linha de produtos zero da Bacio di Latte.',
    summaryEn: "Launch campaign for Bacio di Latte's new line of zero-sugar products.",
    description: 'Campanha de lançamento da nova linha de produtos zero da Bacio di Latte. Com elegância, frescor e sofisticação artesanal, a comunicação destaca a pureza dos ingredientes e o sabor inconfundível do autêntico gelato italiano, provando que zero açúcar mantém 100% da experiência indulgente.',
    descriptionEn: "Launch campaign for Bacio di Latte's new line of zero-sugar products. With elegance, freshness, and artisanal sophistication, the campaign spotlights pure ingredients and the unmistakable taste of authentic Italian gelato, proving that zero sugar preserves 100% of the indulgent experience.",
    tags: ['Filme Publicitário', 'Direção de Arte', 'Comercial', 'Gelato Italiano', 'Branding'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Bacio di Latte' },
      { role: 'Agência', roleEn: 'Agency', name: 'Duuna' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Fabiano Feijó, Marcelo Coelho' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Luiz Otávio Medeiros' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja, Vinicius Eloi, Vinicius Meireles' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Filme Publicitário', nameEn: 'Commercial Film' }
    ],
    images: [
      {
        id: 'bacio-01',
        url: '/projects/01 - Bacio Zero/01_Bacio.MP4',
        caption: '01 / 08 — Bacio Zero: Pureza artesanal e indulgência italiana sem adição de açúcares',
        captionEn: '01 / 08 — Bacio Zero: Artisanal purity and Italian indulgence without added sugars',
        alt: 'Bacio di Latte Gelato Zero commercial video',
        embedHTML: '<iframe src="https://player.vimeo.com/video/1213313203?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="1080" height="1920" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Bacio Zero | Bacio di Latte"></iframe>'
      },
      {
        id: 'bacio-02',
        url: '/projects/01 - Bacio Zero/02_Bacio.jpg',
        caption: '02 / 08 — Textura aveludada do gelato em cena macro cinematográfica',
        captionEn: '02 / 08 — Velvety gelato texture in macro cinematic capture',
        alt: 'Velvety gelato texture macro'
      },
      {
        id: 'bacio-03',
        url: '/projects/01 - Bacio Zero/03_Bacio.jpg',
        caption: '03 / 08 — Fotografia de produto com iluminação e estética clean',
        captionEn: '03 / 08 — Product photography with soft lighting and clean aesthetic',
        alt: 'Gelato product still life'
      },
      {
        id: 'bacio-04',
        url: '/projects/01 - Bacio Zero/04_Bacio.mp4',
        caption: '04 / 08 — Frame cinematográfico: movimento fluído do gelato',
        captionEn: '04 / 08 — Cinematic frame: Fluid motion of gelato',
        alt: 'Gelato motion shot'
      },
      {
        id: 'bacio-05',
        url: '/projects/01 - Bacio Zero/05_Bacio.mp4',
        caption: '05 / 08 — Preparação artesanal em close-up',
        captionEn: '05 / 08 — Artisanal preparation in close-up',
        alt: 'Gelato preparation process'
      },
      {
        id: 'bacio-06',
        url: '/projects/01 - Bacio Zero/06_Bacio.mp4',
        caption: '06 / 08 — Experiência sensorial com luz solar difusa',
        captionEn: '06 / 08 — Sensory experience with diffused sunlight',
        alt: 'Gelato sensory experience'
      },
      {
        id: 'bacio-07',
        url: '/projects/01 - Bacio Zero/07_Bacio.mp4',
        caption: '07 / 08 — Identidade visual dos sabores em movimento',
        captionEn: '07 / 08 — Flavor visual identity in motion',
        alt: 'Flavor identity animation'
      },
      {
        id: 'bacio-08',
        url: '/projects/01 - Bacio Zero/08_Bacio.mp4',
        caption: '08 / 08 — Celebração final: O gelato Zero em toda sua indulgência',
        captionEn: '08 / 08 — Final celebration: Zero gelato in full indulgent glory',
        alt: 'Final celebration shot'
      }
    ]
  },
  {
    id: 'cartela-brahmiada',
    title: 'Cartela Brahmiada',
    subtitle: 'Ambev × Botecos Boa Praça & Tatu Bola',
    subtitleEn: 'Ambev × Boa Praça & Tatu Bola Bars',
    category: 'Filme Publicitário',
    categoryEn: 'Commercial Film',
    year: '2026',
    client: 'Alife Nino',
    agency: 'Duuna',
    creativeDirection: 'Fabiano Feijó, Rafael do Nascimento',
    artDirection: 'Ricardo Azambuja',
    copywriting: 'Luiz Otávio Medeiros',
    scope: 'Filme Publicitário',
    scopeEn: 'Commercial Film',
    accentColor: '#991b1b',
    textColor: 'dark',
    bgColor: '#f59e0b',
    cardType: 'cartela-brahmiada',
    coverImage: '/covers/02_Capa_Alife.gif',
    summary: 'Parceria dos botecos Boa Praça e Tatu Bola com a Ambev realizada durante a Copa do Mundo de 2026.',
    summaryEn: 'Partnership between the Boa Praça and Tatu Bola bars with Ambev, held during the 2026 World Cup.',
    description: 'Cartela Brahmiada é uma parceria dos botecos Boa Praça e Tatu Bola com a Ambev realizada durante a Copa do Mundo de 2026. A campanha celebra a vibração inigualável dos torcedores reunidos na mesa de bar, unindo a paixão pelo futebol, chopp trincando e a atmosfera calorosa dos tradicionais botecos brasileiros.',
    descriptionEn: 'Cartela Brahmiada is a partnership between the Boa Praça and Tatu Bola bars with Ambev, held during the 2026 World Cup. The campaign captures the unparalleled energy of fans gathered around bar tables, combining soccer passion, ice-cold beer, and the warm camaraderie of traditional Brazilian botecos.',
    tags: ['Filme Publicitário', 'Copa do Mundo', 'Ambev', 'Comercial', 'Brahma'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Alife Nino' },
      { role: 'Agência', roleEn: 'Agency', name: 'Duuna' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Fabiano Feijó, Rafael do Nascimento' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Luiz Otávio Medeiros' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Filme Publicitário', nameEn: 'Commercial Film' }
    ],
    images: [
      {
        id: 'brahmiada-01',
        url: '/projects/02 - Cartela Brahmiada/01_Brahmiada.mp4',
        caption: '01 / 02 — Clima de boteco e transmissão dos jogos da Copa do Mundo 2026',
        captionEn: '01 / 02 — Boteco ambiance and 2026 World Cup match broadcasting',
        alt: 'Boteco celebration atmosphere',
        embedHTML: '<div style="padding:177.78% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1213318809?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Cartela Brahmiada | Tatu Bola"></iframe></div><script src="https://player.vimeo.com/api/player.js"><\/script>'
      },
      {
        id: 'brahmiada-02',
        url: '/projects/02 - Cartela Brahmiada/02_Brahmiada.mp4',
        caption: '02 / 02 — Chopp Brahma cremoso e gelado servido com colarinho perfeito',
        captionEn: '02 / 02 — Ice-cold draft beer with velvety foam collar',
        alt: 'Draft beer in glass',
        embedHTML: '<div style="padding:177.78% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1213318103?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Cartela Brahmiada | Boa Praça"></iframe></div><script src="https://player.vimeo.com/api/player.js"><\/script>'
      }
    ]
  },
  {
    id: 'the-sandler-clause',
    title: 'The Sandler Clause',
    subtitle: 'Verizon presents The Sandler Clause',
    subtitleEn: 'Verizon presents The Sandler Clause',
    category: 'Campanha Integrada',
    categoryEn: 'Integrated Campaign',
    year: '2026',
    client: 'Verizon',
    entry: 'Young Ones 26',
    creativeDirection: 'Filipe Sanches',
    artDirection: 'João Navarro, Felipe Pádula, Ricardo Azambuja',
    copywriting: 'Biia Santos, Pedro Machado',
    scope: 'Campanha Integrada',
    scopeEn: 'Integrated Campaign',
    accentColor: '#ee0000',
    textColor: 'light',
    bgColor: '#b91c1c',
    cardType: 'sandler-clause',
    coverImage: '/covers/03_Capa_Verizon.gif',
    summary: 'A Verizon enfrenta o desafio de comunicar à Geração Z um serviço sem cláusulas ocultas com Adam Sandler.',
    summaryEn: 'Verizon faces the challenge of communicating to Gen Z a reliable service without hidden clauses.',
    description: 'A Verizon apresenta The Sandler Clause. A Verizon enfrenta o desafio de comunicar à Geração Z que, além de oferecer um excelente custo-benefício, o serviço é rápido e confiável, sem cláusulas ocultas em seus termos de contrato. Adam Sandler, o astro norte-americano e símbolo de estilo único e autenticidade, é o protagonista da campanha com The Sandler Clause, uma forma exclusiva e divertida de contratar serviços de telefonia móvel sem taxas escondidas ou cobranças adicionais.',
    descriptionEn: 'Verizon presents The Sandler Clause. Verizon faces the challenge of communicating to Generation Z that, in addition to offering good value for money, the service is fast and reliable, without hidden clauses in its contract terms. Adam Sandler, the American star and symbol of unique style and authenticity, is the protagonist of the campaign with The Sandler Clause, an exclusive and fun way to contract mobile phone services without hidden fees or additional charges.',
    tags: ['Campanha Integrada', 'Young Ones 26', 'Verizon', 'Gen Z', 'Commercial'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Verizon' },
      { role: 'Concurso', roleEn: 'Entry', name: 'Young Ones 26' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Filipe Sanches' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Biia Santos, Pedro Machado' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'João Navarro, Felipe Pádula, Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Campanha Integrada', nameEn: 'Integrated Campaign' }
    ],
    images: [
      {
        id: 'sandler-01',
        url: '/projects/03 - Verizon/01_Verizon.mp4',
        caption: '01 / 06 — The Sandler Clause: Desmistificando contratos de telecomunicação para a Geração Z',
        captionEn: '01 / 06 — The Sandler Clause: Demystifying telecom contracts for Generation Z',
        alt: 'The Sandler Clause campaign visual',
        embedHTML: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IbGMgpVfGJ8?si=xVn94py2hd0iSCZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
      },
      {
        id: 'sandler-02',
        url: '/projects/03 - Verizon/02_Verizon.png',
        caption: '02 / 06 — Interface móvel simplificada: Termos sem entrelinhas e transparência total',
        captionEn: '02 / 06 — Simplified mobile UI: Zero fine print and total transparency',
        alt: 'Mobile interface design'
      },
      {
        id: 'sandler-03',
        url: '/projects/03 - Verizon/03_Verizon.png',
        caption: '03 / 06 — Peças digitais com o tom autêntico e bem-humorado de Adam Sandler',
        captionEn: '03 / 06 — Digital visual assets with Adam Sandler iconic comedic tone',
        alt: 'Young creators in studio'
      },
      {
        id: 'sandler-04',
        url: '/projects/03 - Verizon/04_Verizon.png',
        caption: '04 / 06 — Pôsteres tipográficos de alto contraste inspirados em cláusulas contratuais',
        captionEn: '04 / 06 — High-contrast typographic posters inspired by contractual clauses',
        alt: 'Typographic contract poster'
      },
      {
        id: 'sandler-05',
        url: '/projects/03 - Verizon/05_Verizon.png',
        caption: '05 / 05 — Ativações OOH interativas nas principais cidades norte-americanas',
        captionEn: '05 / 05 — Interactive OOH urban billboards in major cities',
        alt: 'Urban billboard showcase'
      }
    ]
  },
  {
    id: 'clash-on-hold',
    title: 'Clash On Hold',
    subtitle: 'Clash of Clans × Netflix OOH Invasion',
    subtitleEn: 'Clash of Clans × Netflix OOH Invasion',
    category: 'Out of Home',
    categoryEn: 'Out of Home',
    year: '2026',
    client: 'Clash of Clans',
    entry: 'Young Ones 26',
    creativeDirection: 'Filipe Sanches',
    artDirection: 'André Gotz, Ricardo Azambuja, Felipe Pádula',
    copywriting: 'Daniel Fernandes, Giulia Vantini, Pedro Machado',
    scope: 'Out of Home',
    scopeEn: 'Out of Home',
    accentColor: '#facc15',
    textColor: 'light',
    bgColor: '#0f172a',
    cardType: 'clash-on-hold',
    coverImage: '/covers/04_Capa_Clash.gif',
    summary: 'Invasão contextual em obras paradas com OOHs criativos para a nova série da Netflix.',
    summaryEn: 'Contextual OOH invasion of stalled construction sites for the new Netflix series.',
    description: 'O Clash of Clans é conhecido por duas mecânicas principais: construir e invadir. Para promover a nova série da Netflix, trouxemos essa lógica para o mundo real e "invadimos" canteiros de obras paralisados com anúncios de OOH sagazes, mostrando que quando o assunto é construir, o Clash of Clans entende melhor que ninguém, gerando visibilidade de maneira criativa e contextualizada.',
    descriptionEn: 'Clash of Clans is known for two core mechanics: building and invading. To promote the new Netflix series, we brought this logic to the real world and "invaded" stalled construction sites with witty OOHs, showing that when it comes to building, Clash of Clans knows best, generating visibility in a creative and contextual way.',
    tags: ['Out of Home', 'OOH', 'Clash of Clans', 'Netflix', 'Young Ones 26'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Clash of Clans' },
      { role: 'Concurso', roleEn: 'Entry', name: 'Young Ones 26' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Filipe Sanches' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Daniel Fernandes, Giulia Vantini, Pedro Machado' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'André Gotz, Ricardo Azambuja, Felipe Pádula' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Out of Home', nameEn: 'Out of Home' }
    ],
    images: [
      {
        id: 'clash-01',
        url: '/projects/04 - Clash/01_Clash.mp4',
        caption: '01 / 05 — Clash On Hold: Invasão de canteiros de obras em vídeo',
        captionEn: '01 / 05 — Clash On Hold: Construction site takeover video',
        alt: 'Construction site OOH video',
        embedHTML: '<iframe width="560" height="315" src="https://www.youtube.com/embed/fw-HeOdCrwo?si=7dIF_ZGrHCUze3Rt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
      },
      {
        id: 'clash-02',
        url: '/projects/04 - Clash/02_Clash.webp',
        caption: '02 / 05 — Tapumes de obras envelopados com a mecânica clássica de construção de vilas',
        captionEn: '02 / 05 — Construction hoardings wrapped with classic Clash village building mechanics',
        alt: 'Scaffolding and wrapped hoardings'
      },
      {
        id: 'clash-03',
        url: '/projects/04 - Clash/03_Clash.webp',
        caption: '03 / 05 — Redação bem-humorada provocando o atraso de obras reais vs. upgrades do jogo',
        captionEn: '03 / 05 — Witty copywriting contrasting delayed real-world construction with game upgrades',
        alt: 'Architectural urban frame'
      },
      {
        id: 'clash-04',
        url: '/projects/04 - Clash/04_Clash.webp',
        caption: '04 / 05 — Detalhe da direção de arte inspirada em fitas de isolamento e texturas de concreto',
        captionEn: '04 / 05 — Art direction detail inspired by hazard tape and brutalist concrete textures',
        alt: 'Graphic hazard and typography detail'
      },
      {
        id: 'clash-05',
        url: '/projects/04 - Clash/05_Clash.webp',
        caption: '05 / 05 — Visão noturna com iluminação de canteiro destacando o logotipo da Netflix',
        captionEn: '05 / 05 — Night shot with construction site floodlights highlighting Netflix series logo',
        alt: 'Night construction lighting'
      }
    ]
  },
  {
    id: 'playoffs-2k23',
    title: 'playOffs 2K23',
    subtitle: '8-Bit Aesthetic & Basketball Nostalgia',
    subtitleEn: '8-Bit Aesthetic & Basketball Nostalgia',
    category: 'Direção de Arte e Design Gráfico',
    categoryEn: 'Art Direction & Graphic Design',
    year: '2023',
    client: 'Nike',
    school: 'CUCA',
    creativeDirection: 'Andrea Souza',
    artDirection: 'Ricardo Azambuja',
    copywriting: 'Ricardo Azambuja',
    scope: 'Direção de Arte e Design Gráfico',
    scopeEn: 'Art Direction & Graphic Design',
    accentColor: '#22c55e',
    textColor: 'light',
    bgColor: '#18181b',
    cardType: 'playoffs-2k23',
    coverImage: '/covers/05_Capa_Nike.png',
    summary: 'A estética 8-bit como válvula de escape e respiro nostálgico para torcedores e jogadores da NBA.',
    summaryEn: '8-bit retro aesthetics as a creative escape and nostalgic immersion for NBA fans and gamers.',
    description: 'DIFERENCIAÇÃO E IDENTIFICAÇÃO\nEm um mundo repleto de designs visuais modernos e complexos, o estilo 8-bit destaca-se como uma escolha ideal para servir como válvula de escape e respiro — muito parecido com o que o basquete representa para quem quer apenas chegar em casa e assistir ao seu time favorito jogar. O uso predominante da estética 8-bit neste projeto traz leveza aos visuais criados, ajudando a destacar a campanha, capturar a atenção do público e transmitir a mensagem de forma diferenciada.\n\nNOSTALGIA E IMERSÃO NA TECNOLOGIA ATUAL\nA estética 8-bit e o pixel art remetem às origens dos videogames, despertando uma forte sensação de nostalgia nos fãs da NBA que cresceram jogando games retrô. Além disso, esse sentimento conecta-se diretamente ao momento atual, no qual jogos como o NBA 2K conectam o espectador ao universo da NBA, jogando ao lado de seus atletas e franquias favoritas. Isso cria uma conexão emocional imediata com o público, tornando a experiência inesquecível.',
    descriptionEn: "DIFFERENTIATION AND IDENTIFICATION\nIn a world full of modern and complex visual designs, the 8-bit style stands out as an ideal choice to serve as an escape valve, a breath of fresh air, much like basketball is for those who just want to come home and watch their favorite team play. Therefore, the prevalent use of the 8-bit aesthetic in this project brings lightness to the visuals created and presented throughout this presentation. This differentiation helps the project stand out, capturing viewers' attention and conveying the message in a different manner than usual.\n\nNOSTALGIA IN IMMERSION INTO TODAY'S TECHNOLOGY\nThe 8-bit aesthetic and pixel art harken back to the origins of video games, evoking a strong sense of nostalgia for NBA fans who grew up playing retro games. Additionally, this feeling connects with the current moment we live in, where games like NBA 2K connect the average basketball viewer to the NBA world, playing alongside their favorite players or their beloved team, having an immersive experience throughout their gameplay. This creates an immediate emotional connection with the audience, making the experience more memorable.",
    tags: ['Direção de Arte', 'Design Gráfico', 'Pixel Art', 'Nike', 'NBA'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Nike' },
      { role: 'Escola', roleEn: 'School', name: 'CUCA' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Andrea Souza' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Ricardo Azambuja' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2023' },
      { role: 'Categoria', roleEn: 'Category', name: 'Direção de Arte e Design Gráfico', nameEn: 'Art Direction & Graphic Design' }
    ],
    images: [
      {
        url: '/projects/05 - Nike/01_Nike.gif',
        caption: '01 / 10 — playOffs 2K23: Fusão entre quadras urbanas e a linguagem pixelada dos arcades',
        captionEn: '01 / 10 — playOffs 2K23: Fusion of urban courts and 8-bit retro arcade pixel visual language',
        alt: 'Basketball court in retro aesthetic'
      },
      {
        url: '/projects/05 - Nike/02_Nike.png',
        caption: '02 / 10 — Design de personagens em pixel art com uniformes e sneakers históricos da Nike',
        captionEn: '02 / 10 — Pixel art character design featuring historic Nike uniforms and sneakers',
        alt: 'Pixel basketball sneakers and gear'
      },
      {
        url: '/projects/05 - Nike/03_Nike.png',
        caption: '03 / 10 — Grid tipográfico modular com fontes monoespaçadas e números estilo placar digital',
        captionEn: '03 / 10 — Modular typographic grid with monospaced scoreboard typography',
        alt: 'Scoreboard digital typography grid'
      },
      {
        url: '/projects/05 - Nike/04_Nike.png',
        caption: '04 / 10 — Telas de loading e transições cinemáticas para transmissões ao vivo',
        captionEn: '04 / 10 — Loading screens and cinematic transitions for live stream broadcasts',
        alt: 'Broadcast graphics screen'
      },
      {
        url: '/projects/05 - Nike/05_Nike.png',
        caption: '05 / 10 — Cartuchos e manual de instruções vintage reinventados como peças de colecionador',
        captionEn: '05 / 10 — Vintage cartridges and instruction manual reimagined as collectible merchandise',
        alt: 'Retro gaming collectible packaging'
      },
      {
        url: '/projects/05 - Nike/06_Nike.png',
        caption: '06 / 10 — Visual identity showcase: O encontro da tecnologia moderna com a nostalgia retrô',
        captionEn: '06 / 10 — Visual identity showcase: Modern sports tech meeting retro 8-bit nostalgia',
        alt: 'Visual identity system overview'
      },
      {
        url: '/projects/05 - Nike/07_Nike.png',
        caption: '07 / 10 — Sprites animados e sequências de movimento em 8-bit para jogabilidade',
        captionEn: '07 / 10 — Animated sprites and movement sequences rendered in pixel art aesthetic',
        alt: 'Pixel art animation frames'
      },
      {
        url: '/projects/05 - Nike/08_Nike.png',
        caption: '08 / 10 — Paleta de cores sistemática derivada da identidade visual Nike',
        captionEn: '08 / 10 — Systematic color palette derived from Nike heritage and basketball culture',
        alt: 'Color palette specifications'
      },
      {
        url: '/projects/05 - Nike/09_Nike.png',
        caption: '09 / 10 — Telas de menu e interface em retro pixel design para experiência imersiva',
        captionEn: '09 / 10 — Menu screens and UI elements rendered in immersive pixel design language',
        alt: 'Game menu interface design'
      },
      {
        url: '/projects/05 - Nike/10_Nike.png',
        caption: '10 / 10 — Integração completa do universo 8-bit no ecosistema de experiência Nike',
        captionEn: '10 / 10 — Complete 8-bit universe integration across the full Nike experience ecosystem',
        alt: 'Full ecosystem integration overview'
      }
    ]
  },
  {
    id: 'open-up',
    title: 'Open Up',
    subtitle: 'Tuborg · D&AD New Blood 26',
    subtitleEn: 'Tuborg · D&AD New Blood 26',
    category: 'Campanha Integrada',
    categoryEn: 'Integrated Campaign',
    year: '2026',
    client: 'Tuborg',
    entry: 'D&AD New Blood 26',
    creativeDirection: 'Filipe Sanches',
    artDirection: 'André Gotz, Ricardo Azambuja',
    copywriting: 'Daniel Fernandes, Pedro Moreno, Pedro Henrique Guimarães',
    scope: 'Campanha Integrada',
    scopeEn: 'Integrated Campaign',
    accentColor: '#10b981',
    textColor: 'light',
    bgColor: '#047857',
    cardType: 'open-up',
    coverImage: '/covers/06_Capa_Tuborg.gif',
    summary: 'Campanha integrada para Tuborg incentivando abertura social, música e autenticidade.',
    summaryEn: 'Integrated campaign for Tuborg encouraging open-mindedness, music, and authentic connection.',
    description: 'Campanha desenvolvida para a Tuborg no concurso D&AD New Blood 2026. A iniciativa desafia padrões sociais rígidos e incentiva o público jovem a se abrir para novos encontros, conversas espontâneas e manifestações autênticas de individualidade. Integrando experiências urbanas, ativações digitais e o emblemático anel de abertura da garrafa Tuborg, "Open Up" transforma cada brinde em um convite de desinibição e celebração coletiva.',
    descriptionEn: "Campaign developed for Tuborg for the D&AD New Blood 2026 competition. The initiative challenges rigid social conventions and encourages youth to open up to new encounters, spontaneous conversations, and authentic expressions of individuality. Integrating urban experiences, digital activations, and Tuborg's iconic ring-pull bottle cap, \"Open Up\" turns every toast into an invitation for uninhibited celebration and unity.",
    tags: ['Campanha Integrada', 'D&AD New Blood', 'Tuborg', 'Ativação', 'Publicidade'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Tuborg' },
      { role: 'Concurso', roleEn: 'Entry', name: 'D&AD New Blood 26' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Filipe Sanches' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Daniel Fernandes, Pedro Moreno, Pedro Henrique Guimarães' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'André Gotz, Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Campanha Integrada', nameEn: 'Integrated Campaign' }
    ],
    images: [
      {
        url: '/projects/06 - Tuborg/01_Tuborg.mp4',
        caption: '01 / 06 — Open Up: Vídeo ativação de festival musical celebrando espontaneidade jovem',
        captionEn: '01 / 06 — Open Up: Festival activation video celebrating youthful spontaneity',
        alt: 'Music festival activation video',
        embedHTML: '<iframe width="560" height="315" src="https://www.youtube.com/embed/myRKKr6G2eM?si=El3RyTP09wMd_HyF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
      },
      {
        url: '/projects/06 - Tuborg/02_Tuborg.jpg',
        caption: '02 / 06 — Open Up: Ativações de festivais musicais celebrando a espontaneidade jovem',
        captionEn: '02 / 06 — Open Up: Music festival activations celebrating youthful spontaneity',
        alt: 'Music festival crowd and lights'
      },
      {
        url: '/projects/06 - Tuborg/03_Tuborg.png',
        caption: '03 / 06 — Instalações interativas de áudio e som nas principais praças europeias',
        captionEn: '03 / 06 — Interactive audio sound installations across European cultural plazas',
        alt: 'Audio reactive spatial installation'
      },
      {
        url: '/projects/06 - Tuborg/04_Tuborg.png',
        caption: '04 / 06 — Peças impressas e digitais com tipografia cinética de alta rotação',
        captionEn: '04 / 06 — Print and digital poster assets with kinetic high-energy typography',
        alt: 'Kinetic typography poster design'
      },
      {
        url: '/projects/06 - Tuborg/05_Tuborg.png',
        caption: '05 / 06 — Conexões reais: Jovens compartilhando histórias e quebrando o gelo',
        captionEn: '05 / 06 — Real connections: Young people breaking the ice and sharing stories',
        alt: 'Friends celebrating in festival'
      },
      {
        url: '/projects/06 - Tuborg/06_Tuborg.png',
        caption: '06 / 06 — Prancha executiva do projeto com case study para o D&AD New Blood 2026',
        captionEn: '06 / 06 — Project case study presentation for D&AD New Blood 2026',
        alt: 'Case study presentation board'
      }
    ]
  },
  {
    id: 'volte-a-ser-crianca',
    title: 'Volte a Ser Criança',
    subtitle: 'Sucrilhos · Miami Ad School',
    subtitleEn: 'Frosted Flakes · Miami Ad School',
    category: 'Print',
    categoryEn: 'Print',
    year: '2025',
    client: "Sucrilhos (Kellogg's)",
    school: 'Miami Ad School',
    creativeDirection: 'Toni Rodrigues, Daniel Poletto',
    artDirection: 'Ricardo Azambuja',
    copywriting: 'Beatriz dos Santos',
    scope: 'Print',
    scopeEn: 'Print',
    accentColor: '#60a5fa',
    textColor: 'light',
    bgColor: '#1d4ed8',
    cardType: 'volte-a-ser-crianca',
    coverImage: '/covers/07_Capa_Sucrilhos.png',
    summary: 'Campanha para Sucrilhos sob o mote "Adultos que continuaram com o hábito de consumir o cereal".',
    summaryEn: 'Campaign for Frosted Flakes under the theme "Adults who continued the habit of eating cereal".',
    description: 'Campanha para Sucrilhos sob o mote "Adultos que continuaram com o hábito de consumir o cereal". Desenvolvida na Miami Ad School, a série de peças impressas retrata com sensibilidade e bom humor os momentos em que a tigela de cereal matinal devolve aos adultos a curiosidade despretensiosa, o entusiasmo vibrante e o vigor da infância em meio às responsabilidades da vida moderna.',
    descriptionEn: 'Campaign for Frosted Flakes (Sucrilhos) under the theme "Adults who continued the habit of eating cereal". Developed at Miami Ad School, this print series portrays with warmth and wit how a morning bowl of cereal brings back unpretentious curiosity, vibrant energy, and the uninhibited spirit of childhood amid modern adult responsibilities.',
    tags: ['Print', 'Impresso', 'Miami Ad School', 'Sucrilhos', "Kellogg's"],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: "Sucrilhos (Kellogg's)" },
      { role: 'Escola', roleEn: 'School', name: 'Miami Ad School' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Toni Rodrigues, Daniel Poletto' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Beatriz dos Santos' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2025' },
      { role: 'Categoria', roleEn: 'Category', name: 'Print', nameEn: 'Print' }
    ],
    images: [
      {
        url: '/projects/07 - Sucrilhos/01_Sucrilhos.jpg',
        caption: '01 / 04 — Volte a Ser Criança: O café da manhã como portal afetivo para a infância',
        captionEn: '01 / 04 — Volte a Ser Criança: Breakfast as an emotional gateway to childhood',
        alt: 'Breakfast bowl with cereal'
      },
      {
        url: '/projects/07 - Sucrilhos/02_Sucrilhos.jpg',
        caption: '02 / 04 — Série impressa com layout editorial caloroso e contrastes solares',
        captionEn: '02 / 04 — Print campaign series with warm editorial layout and sunny contrast',
        alt: 'Vibrant print layout composition'
      },
      {
        url: '/projects/07 - Sucrilhos/03_Sucrilhos.jpg',
        caption: '03 / 04 — Redação afetuosa dialogando com os hábitos dos adultos contemporâneos',
        captionEn: '03 / 04 — Heartfelt copywriting speaking to contemporary adult habits',
        alt: 'Editorial magazine layout'
      },
      {
        url: '/projects/07 - Sucrilhos/04_Sucrilhos.jpg',
        caption: '04 / 04 — Tipografia nostálgica combinando traços clássicos e energia moderna',
        captionEn: '04 / 04 — Nostalgic typography pairing classic retro curves with fresh energy',
        alt: 'Typographic poster framing'
      }
    ]
  },
  {
    id: 'its-not-a-phase-mom',
    title: "It's not a phase, mom",
    subtitle: 'Coca-Cola · Projeto Pessoal',
    subtitleEn: 'Coca-Cola · Personal Project',
    category: 'Print',
    categoryEn: 'Print',
    year: '2026',
    client: 'Coca-Cola',
    creativeDirection: 'Ricardo Azambuja',
    artDirection: 'Ricardo Azambuja',
    copywriting: 'Ricardo Azambuja',
    scope: 'Print',
    scopeEn: 'Print',
    accentColor: '#ffffff',
    textColor: 'light',
    bgColor: '#991b1b',
    cardType: 'its-not-a-phase',
    coverImage: '/covers/08_Capa_CocaCola.png',
    summary: 'Projeto pessoal explorando subculturas alternativas e a perenidade do ícone Coca-Cola.',
    summaryEn: 'Personal project exploring alternative subcultures and the enduring icon of Coca-Cola.',
    description: 'Projeto autoral que une a atemporalidade da Coca-Cola com a estética rebelde, nostálgica e autêntica das subculturas dos anos 2000. "It\'s not a phase, mom" mergulha na relação visceral entre a identidade juvenil e as paixões que resistem ao teste do tempo, ressignificando o visual icônico da marca através de tipografia gótica, pins metálicos e atitude punk rock.',
    descriptionEn: 'Personal project blending the timelessness of Coca-Cola with the rebellious, nostalgic, and authentic aesthetic of 2000s subcultures. "It\'s not a phase, mom" delves into the visceral connection between youthful identity and passions that stand the test of time, reinterpreting the brand\'s iconic visual language through gothic typography, enamel pins, and punk rock attitude.',
    tags: ['Print', 'Projeto Pessoal', 'Coca-Cola', 'Poster', 'Subcultura'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Coca-Cola' },
      { role: 'Natureza', roleEn: 'Type', name: 'Projeto Pessoal', nameEn: 'Personal Project' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Ricardo Azambuja' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Ricardo Azambuja' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Print', nameEn: 'Print' }
    ],
    images: [
      {
        url: '/projects/08 - Coca Cola/01_CocaCola.png',
        caption: "01 / 03 — It's not a phase, mom: Ressignificação da icônica garrafa contour em estética grunge",
        captionEn: "01 / 03 — It's not a phase, mom: Grunge reinterpretation of the iconic contour bottle",
        alt: 'Classic Coke bottle in edgy lighting'
      },
      {
        url: '/projects/08 - Coca Cola/02_CocaCola.png',
        caption: '02 / 03 — Pôster zine experimental com serigrafia artesanal em vermelho e preto profundo',
        captionEn: '02 / 03 — Experimental zine poster in screenprint crimson and deep black',
        alt: 'Zine graphic print texture'
      },
      {
        url: '/projects/08 - Coca Cola/03_CocaCola.png',
        caption: '03 / 03 — Detalhes em letterpress com tachas metálicas e tipografia gótica customizada',
        captionEn: '03 / 03 — Letterpress details featuring metal studs and custom gothic typography',
        alt: 'Gothic alternative typography close-up'
      }
    ]
  },
  {
    id: 'casa-santa',
    title: 'Casa Santa',
    subtitle: 'Centro Cultural de Santa Teresa, RJ',
    subtitleEn: 'Cultural Center of Santa Teresa, RJ',
    category: 'Branding',
    categoryEn: 'Branding',
    year: '2024',
    client: 'Casa Santa',
    studio: 'RAWS creative studio',
    creativeDirection: 'Ricardo Azambuja',
    scope: 'Branding',
    scopeEn: 'Branding',
    accentColor: '#fde047',
    textColor: 'light',
    bgColor: '#b45309',
    cardType: 'casa-santa',
    coverImage: '/covers/09_Capa_CasaSanta.gif',
    summary: 'Identidade de marca e posicionamento para o centro cultural e botânico de Santa Teresa.',
    summaryEn: "Brand identity and positioning for Santa Teresa's cultural and botanical center.",
    description: 'A Casa Santa será o local de referência cultural do bairro de Santa Teresa, no Rio de Janeiro. Desde artes plásticas até quintal botânico, seu maior objetivo é trazer a essência carioca através de três pilares fundamentais:\n\n• DESCONTRAÇÃO: Coluna vertebral do projeto. O visitante sente-se em sua própria casa convivendo com as artes, transitando pelas salas e consumindo cultura com a naturalidade de quem bebe um copo d\'água na cozinha.\n• DESMISTIFICAR: Afastar a ideia de que cultura é tradicional, chata e quadrada. Mostrar que a arte pulsa em qualquer lugar — das telas aos postes — ensinando com oficinas ou conversas descontraídas acompanhadas de um bom chopp.\n• DIVERTIR: Trazer de volta a diversão para a arte. Afinal, quem nunca ouviu da avó no auge da infância: "tá fazendo arte, menino?"',
    descriptionEn: 'Casa Santa will be the cultural reference hub of Santa Teresa in Rio de Janeiro. From fine arts to a botanical garden, its core mission is to bring the authentic Carioca spirit to life through three main pillars:\n\n• RELAXATION: The backbone of the project. Visitors feel right at home living among the arts, strolling through galleries and consuming culture as naturally as having a glass of water in their own kitchen.\n• DEMYSTIFY: Debunking the notion that culture is rigid, traditional, or boring. Proving that real art lives everywhere — from canvas to lampposts — whether through workshops or friendly chats over a cold draft beer.\n• ENTERTAIN: Restoring genuine fun to art. Honoring the timeless childhood memory when grandmothers would playfully ask: "are you making art, kid?"',
    tags: ['Branding', 'Identidade Visual', 'Santa Teresa', 'Rio de Janeiro', 'Cultura'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Casa Santa' },
      { role: 'Estúdio', roleEn: 'Studio', name: 'RAWS Creative Studio' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Ricardo Azambuja' },
      { role: 'Estratégia de Marca', roleEn: 'Brand Strategy', name: 'Ricardo Azambuja' },
      { role: 'Design', roleEn: 'Design', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2024' },
      { role: 'Categoria', roleEn: 'Category', name: 'Branding', nameEn: 'Branding' }
    ],
    images: [
      {
        url: '/projects/09 - Casa Santa/01_CasaSanta.gif',
        caption: '01 / 22 — Casa Santa: Paisagem e atmosfera boêmia de Santa Teresa, Rio de Janeiro',
        captionEn: '01 / 22 — Casa Santa: Bohemian landscape and atmosphere of Santa Teresa, Rio de Janeiro',
        alt: 'Santa Teresa neighborhood view'
      },
      {
        url: '/projects/09 - Casa Santa/02_CasaSanta.png',
        caption: '02 / 22 — Brandbook com paleta em terracota, amarelo colonial e verde botânico',
        captionEn: '02 / 22 — Brandbook featuring terracotta, colonial yellow, and botanical green tones',
        alt: 'Brand identity book layout'
      },
      {
        url: '/projects/09 - Casa Santa/03_CasaSanta.png',
        caption: '03 / 22 — Sinalização arquitetônica integrada aos azulejos e casarões históricos',
        captionEn: '03 / 22 — Environmental signage integrated into historical tiles and architecture',
        alt: 'Architectural signage and tiles'
      },
      {
        url: '/projects/09 - Casa Santa/04_CasaSanta.png',
        caption: '04 / 22 — Galeria aberta e quintal botânico: Convivência descontraída e arte acessível',
        captionEn: '04 / 22 — Open gallery and botanical yard: Relaxed hospitality and accessible art',
        alt: 'Botanical garden gallery'
      },
      {
        url: '/projects/09 - Casa Santa/05_CasaSanta.png',
        caption: '05 / 22 — Peças gráficas para eventos, feiras de cerâmica e encontros musicais',
        captionEn: '05 / 22 — Graphic collateral for workshops, ceramic fairs, and musical sessions',
        alt: 'Graphic posters for cultural events'
      },
      {
        url: '/projects/09 - Casa Santa/06_CasaSanta.png',
        caption: '06 / 22 — Sistema de identidade visual completo desenvolvido pela RAWS',
        captionEn: '06 / 22 — Complete visual identity system designed by RAWS creative studio',
        alt: 'Brand stationery overview'
      },
      {
        url: '/projects/09 - Casa Santa/07_CasaSanta.png',
        caption: '07 / 22 — Detalhes visuais do projeto de branding para Casa Santa',
        captionEn: '07 / 22 — Visual details from Casa Santa branding project',
        alt: 'Branding visual details'
      },
      {
        url: '/projects/09 - Casa Santa/08_CasaSanta.png',
        caption: '08 / 22 — Seção do catálogo e galeria de eventos culturais',
        captionEn: '08 / 22 — Cultural event catalog and gallery section',
        alt: 'Event gallery layout'
      },
      {
        url: '/projects/09 - Casa Santa/09_CasaSanta.png',
        caption: '09 / 22 — Elementos decorativos em estilo botânico para a identidade',
        captionEn: '09 / 22 — Decorative botanical elements for brand identity',
        alt: 'Botanical design elements'
      },
      {
        url: '/projects/09 - Casa Santa/10_CasaSanta.png',
        caption: '10 / 22 — Fotografia do espaço físico e ambientação do centro cultural',
        captionEn: '10 / 22 — Photography of the cultural center physical space and ambiance',
        alt: 'Cultural space photography'
      },
      {
        url: '/projects/09 - Casa Santa/11_CasaSanta.png',
        caption: '11 / 22 — Aplicação de marca em elementos de sinalização e wayfinding',
        captionEn: '11 / 22 — Brand application in signage and wayfinding elements',
        alt: 'Wayfinding signage design'
      },
      {
        url: '/projects/09 - Casa Santa/12_CasaSanta.png',
        caption: '12 / 22 — Comunicação visual para atividades e oficinas do centro',
        captionEn: '12 / 22 — Visual communication for center workshops and activities',
        alt: 'Workshop communication material'
      },
      {
        url: '/projects/09 - Casa Santa/13_CasaSanta.png',
        caption: '13 / 22 — Detalhes das peças gráficas impressas e finalizações',
        captionEn: '13 / 22 — Details of printed graphic pieces and finishing touches',
        alt: 'Print material details'
      },
      {
        url: '/projects/09 - Casa Santa/14_CasaSanta.png',
        caption: '14 / 22 — Presença visual em redes sociais e plataformas digitais',
        captionEn: '14 / 22 — Visual presence on social media and digital platforms',
        alt: 'Digital social media assets'
      },
      {
        url: '/projects/09 - Casa Santa/15_CasaSanta.png',
        caption: '15 / 22 — Paleta cromática da identidade em diferentes aplicações',
        captionEn: '15 / 22 — Color palette of identity across different applications',
        alt: 'Color palette applications'
      },
      {
        url: '/projects/09 - Casa Santa/16_CasaSanta.png',
        caption: '16 / 22 — Imagem institucional e apresentação de marca',
        captionEn: '16 / 22 — Institutional image and brand presentation',
        alt: 'Brand presentation image'
      },
      {
        url: '/projects/09 - Casa Santa/17_CasaSanta.png',
        caption: '17 / 22 — Documentação visual do projeto de design e direção de arte',
        captionEn: '17 / 22 — Visual documentation of design and art direction project',
        alt: 'Project documentation'
      },
      {
        url: '/projects/09 - Casa Santa/18_CasaSanta.png',
        caption: '18 / 22 — Composição visual de elementos etnográficos e históricos',
        captionEn: '18 / 22 — Visual composition of ethnographic and historical elements',
        alt: 'Historical visual composition'
      },
      {
        url: '/projects/09 - Casa Santa/19_CasaSanta.png',
        caption: '19 / 22 — Tipografia e hierarquia visual do projeto de identidade',
        captionEn: '19 / 22 — Typography and visual hierarchy of identity project',
        alt: 'Typography hierarchy'
      },
      {
        url: '/projects/09 - Casa Santa/20_CasaSanta.png',
        caption: '20 / 22 — Contexto e ambiente de inserção da marca no espaço',
        captionEn: '20 / 22 — Brand context and insertion in physical space environment',
        alt: 'Spatial brand context'
      },
      {
        url: '/projects/09 - Casa Santa/21_CasaSanta.png',
        caption: '21 / 22 — Visualização de peças promocionais e de comunicação',
        captionEn: '21 / 22 — Visualization of promotional and communication pieces',
        alt: 'Promotional materials display'
      },
      {
        url: '/projects/09 - Casa Santa/22_CasaSanta.png',
        caption: '22 / 22 — Síntese do projeto completo de identidade para Casa Santa',
        captionEn: '22 / 22 — Complete identity project synthesis for Casa Santa',
        alt: 'Complete project overview'
      }
    ]
  },
  {
    id: 'ler-para-crer',
    title: 'Ler para Crer',
    subtitle: 'Estadão · Credibilidade é tudo',
    subtitleEn: 'Estadão · Credibility is everything',
    category: 'Out of Home',
    categoryEn: 'Out of Home',
    year: '2025',
    client: 'Estadão',
    school: 'Miami Ad School',
    creativeDirection: 'Toni Rodrigues, Daniel Poletto',
    artDirection: 'Ricardo Azambuja',
    copywriting: 'Beatriz dos Santos',
    scope: 'Out of Home',
    scopeEn: 'Out of Home',
    accentColor: '#ffffff',
    textColor: 'light',
    bgColor: '#18181b',
    cardType: 'ler-para-crer',
    coverImage: '/covers/10_Capa_Estadao.jpg',
    summary: 'Campanha de OOH para o Estadão sob o mote "Credibilidade é tudo".',
    summaryEn: 'OOH campaign for Estadão under the theme "Credibility is everything".',
    description: 'Campanha para OOH sob o mote "Credibilidade é tudo" para o Estadão. Em uma era de polarização digital e excesso de desinformação, a campanha valoriza a imprensa investigativa e a profundidade analítica de um dos mais tradicionais jornais do país, transformando a leitura fundamentada na única barreira sólida contra narrativas vazias.',
    descriptionEn: 'Out of Home campaign around the theme "Credibility is everything" for Estadão. In an era marked by digital noise and rampant misinformation, the campaign celebrates investigative journalism and analytical rigor, positioning factual reading as the primary shield against baseless narratives.',
    tags: ['Out of Home', 'OOH', 'Miami Ad School', 'Estadão', 'Jornalismo'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Estadão' },
      { role: 'Escola', roleEn: 'School', name: 'Miami Ad School' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Toni Rodrigues, Daniel Poletto' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Beatriz dos Santos' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2025' },
      { role: 'Categoria', roleEn: 'Category', name: 'Out of Home', nameEn: 'Out of Home' }
    ],
    images: [
      {
        url: '/projects/10 - Estadao/01_Estadao.jpg',
        caption: '01 / 06 — Ler para Crer: A força do jornalismo investigativo do Estadão em OOHs de grande escala',
        captionEn: '01 / 06 — Ler para Crer: The strength of Estadão investigative journalism on large-scale OOHs',
        alt: 'Newspaper reading in city'
      },
      {
        url: '/projects/10 - Estadao/02_Estadao.jpg',
        caption: '02 / 06 — Detalhes em tipografia broadsheet com manchetes que confrontam fake news',
        captionEn: '02 / 06 — Broadsheet typography details confronting disinformation headlines',
        alt: 'Broadsheet newspaper pages macro'
      },
      {
        url: '/projects/10 - Estadao/03_Estadao.jpg',
        caption: '03 / 06 — Abrigos de ônibus e totens urbanos com efeito de lupa óptica sobre a informação',
        captionEn: '03 / 06 — Bus shelters and urban totems with optical magnifying lens focus on facts',
        alt: 'Urban newsstand and street posters'
      },
      {
        url: '/projects/10 - Estadao/04_Estadao.jpg',
        caption: '04 / 06 — Layout editorial minimalista em preto e branco absoluto valorizando a palavra',
        captionEn: '04 / 06 — Minimalist black and white editorial layout honoring the power of words',
        alt: 'Minimalist editorial composition'
      },
      {
        url: '/projects/10 - Estadao/05_Estadao.jpg',
        caption: '05 / 06 — Painéis digitais dinâmicos em relógios de rua de São Paulo',
        captionEn: '05 / 06 — Dynamic digital displays on São Paulo urban street clocks',
        alt: 'Street digital billboard display'
      },
      {
        url: '/projects/10 - Estadao/06_Estadao.jpg',
        caption: '06 / 06 — Prancha conceitual desenvolvida na Miami Ad School',
        captionEn: '06 / 06 — Conceptual presentation board crafted at Miami Ad School',
        alt: 'Miami Ad School project board'
      }
    ]
  },
  {
    id: 'aprender-sem-fritar',
    title: 'Aprender Sem Fritar',
    subtitle: 'Philips Walita × Duolingo',
    subtitleEn: 'Philips Walita × Duolingo Collab',
    category: 'Campanha Integrada',
    categoryEn: 'Integrated Campaign',
    year: '2025',
    client: 'Philips Walita',
    school: 'Miami Ad School',
    creativeDirection: 'Gabriel Silva, Daniel Poletto',
    artDirection: 'Ricardo Azambuja',
    copywriting: 'Beatriz dos Santos',
    scope: 'Campanha Integrada',
    scopeEn: 'Integrated Campaign',
    accentColor: '#58cc02',
    textColor: 'dark',
    bgColor: '#eab308',
    cardType: 'aprender-sem-fritar',
    coverImage: '/covers/11_Capa_Philips.jpg',
    summary: 'Collab divertida com o Duolingo para lançar as funções tecnológicas da Airfryer Philips Walita.',
    summaryEn: 'Witty collaboration with Duolingo to launch smart features of the Philips Walita Airfryer.',
    description: 'A Airfryer Philips Walita vai ser lançada e o destaque são as funções tecnológicas do produto. Com a Geração Z sendo o público-alvo, a campanha é uma collab inusitada com o Duolingo para levar um tom divertido e de conscientização, mostrando que cozinhar pratos saudáveis e aprender coisas novas não precisam fritar a cabeça de ninguém.',
    descriptionEn: "The new Philips Walita Airfryer launch highlights its advanced smart features. With Gen Z as the primary audience, this campaign is a witty collaboration with Duolingo to deliver high awareness and entertainment, demonstrating that mastering healthy cooking and learning daily habits doesn't have to fry anyone's brain.",
    tags: ['Campanha Integrada', 'Miami Ad School', 'Philips Walita', 'Duolingo', 'Gen Z'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Philips Walita' },
      { role: 'Escola', roleEn: 'School', name: 'Miami Ad School' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Gabriel Silva, Daniel Poletto' },
      { role: 'Redação', roleEn: 'Copywriting', name: 'Beatriz dos Santos' },
      { role: 'Direção de Arte', roleEn: 'Art Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2025' },
      { role: 'Categoria', roleEn: 'Category', name: 'Campanha Integrada', nameEn: 'Integrated Campaign' }
    ],
    images: [
      {
        url: '/projects/11 - Philips/01_Philips.jpg',
        caption: '01 / 05 — Aprender Sem Fritar: Conectando a gastronomia prática dos jovens com gamificação',
        captionEn: '01 / 05 — Aprender Sem Fritar: Connecting young effortless cooking with gamified habits',
        alt: 'Modern kitchen and healthy cooking'
      },
      {
        url: '/projects/11 - Philips/02_Philips.jpg',
        caption: '02 / 05 — Receitas práticas desenvolvidas pelo corujinha do Duolingo',
        captionEn: '02 / 05 — Quick healthy recipes guided by the iconic Duolingo mascot',
        alt: 'Fresh healthy food ingredients'
      },
      {
        url: '/projects/11 - Philips/03_Philips.jpg',
        caption: '03 / 05 — Design de produto da Airfryer Philips Walita com funções conectadas ao smartphone',
        captionEn: '03 / 05 — Philips Walita Airfryer product styling with smartphone connected features',
        alt: 'Smart appliance in kitchen'
      },
      {
        url: '/projects/11 - Philips/04_Philips.jpg',
        caption: '04 / 05 — Notificações push e tom de voz bem-humorado estimulando novos hábitos culinários',
        captionEn: '04 / 05 — Push notifications and tongue-in-cheek copy encouraging new cooking streaks',
        alt: 'Digital app mockups and copy'
      },
      {
        url: '/projects/11 - Philips/05_Philips.jpg',
        caption: '05 / 05 — Ativações em redes sociais com influenciadores e memes virais da Geração Z',
        captionEn: '05 / 05 — Social media activations with Gen Z creators and viral meme culture',
        alt: 'Social media campaign visuals'
      }
    ]
  },
  {
    id: 'autoria-feminina',
    title: 'Autoria Feminina',
    subtitle: 'Damásio × Quest Edu',
    subtitleEn: 'Damásio × Quest Edu Tribute',
    category: 'Campanha Integrada',
    categoryEn: 'Integrated Campaign',
    year: '2026',
    client: 'Damásio',
    company: 'Quest Edu',
    marketingDirector: 'Luiz Bianco Cunha',
    creativeDirection: 'Ricardo Azambuja',
    scope: 'Campanha Integrada',
    scopeEn: 'Integrated Campaign',
    accentColor: '#fbbf24',
    textColor: 'light',
    bgColor: '#2e1065',
    cardType: 'autoria-feminina',
    coverImage: '/covers/12_Capa_AutoriaFeminina.png',
    summary: 'O Direito brasileiro foi construído por mulheres: Transformando conquistas jurídicas em agradecimento público.',
    summaryEn: 'Brazilian law was shaped by women: Turning historic legal victories into public gratitude.',
    description: 'O Direito brasileiro foi escrito, por muito tempo, sem mulheres — e contra elas. Direitos básicos como trabalhar, votar, constituir família ou viver sem violência não existiam na lei. Eles precisaram ser criados, disputados e institucionalizados.\n\nNo Brasil, mulheres transformaram vivências em dispositivos jurídicos concretos: estatutos, leis e direitos que hoje sustentam a vida de milhões, mas, ainda assim, esses feitos não são de comum conhecimento a boa parte da população.\n\nAssim, o Damásio resolveu transformar essas conquistas jurídicas em mensagens públicas de agradecimento às mulheres que as conquistaram, trazendo visibilidade a elas e levando os fatos ao público.\n\nA ideia é explicitar o quanto do Direito brasileiro tem autoria feminina e que cada construção e avanço nas leis foram resultado de mulheres dentro do sistema jurídico e político.',
    descriptionEn: 'For a long time, Brazilian law was written without women — and against them. Basic rights such as working, voting, raising a family, or living free from violence did not exist in the legal code. They had to be created, fought for, and institutionalized.\n\nIn Brazil, women transformed lived experiences into concrete legal landmarks: statutes, laws, and rights that safeguard millions today, yet these monumental achievements remain overlooked by much of the population.\n\nConsequently, Damásio transformed these legal milestones into public messages of gratitude to the women who achieved them, bringing them long-overdue visibility and sharing the facts with the general public.\n\nThe initiative highlights the immense female authorship behind Brazilian law, proving that each landmark and advancement was driven by women within the legal and political spheres.',
    tags: ['Campanha Integrada', 'Direito', 'Damásio', 'Autoria Feminina', 'Cultura'],
    credits: [
      { role: 'Cliente', roleEn: 'Client', name: 'Damásio' },
      { role: 'Empresa', roleEn: 'Company', name: 'Quest Edu' },
      { role: 'Diretor de Marketing', roleEn: 'Marketing Director', name: 'Luiz Bianco Cunha' },
      { role: 'Direção Criativa', roleEn: 'Creative Direction', name: 'Ricardo Azambuja' },
      { role: 'Ano', roleEn: 'Year', name: '2026' },
      { role: 'Categoria', roleEn: 'Category', name: 'Campanha Integrada', nameEn: 'Integrated Campaign' }
    ],
    images: [
      {
        url: '/projects/12 - Autoria Feminina/01_AutoriaFeminina.jpg',
        caption: '01 / 03 — Autoria Feminina: O reconhecimento histórico das juristas que construíram as leis no Brasil',
        captionEn: '01 / 03 — Autoria Feminina: Historical recognition of female jurists who shaped Brazilian laws',
        alt: 'Legal justice books and scales'
      },
      {
        url: '/projects/12 - Autoria Feminina/02_AutoriaFeminina.png',
        caption: '02 / 03 — Publicações em grandes jornais e manifestos públicos em homenagem às legisladoras',
        captionEn: '02 / 03 — National newspaper publications and public tributes honoring female legislators',
        alt: 'Newspaper and print publication tribute'
      },
      {
        url: '/projects/12 - Autoria Feminina/03_AutoriaFeminina.png',
        caption: '03 / 03 — Depoimentos e pesquisas históricas sobre conquistas fundamentais dos direitos civis',
        captionEn: '03 / 03 — Testimonials and legal research on foundational civil rights landmarks',
        alt: 'Legal scholars in symposium'
      }
    ]
  }
];
