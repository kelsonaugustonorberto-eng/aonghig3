export const hero = {
  title: "Higienização profissional de estofos em Luanda, sem complicações.",
  subtitle:
    "Sofás, colchões, tapetes e interiores de viatura com padrão premium de limpeza.",
  primaryCta: { label: "Agendar higienização", href: "/agendar" },
  secondaryCta: { label: "Ver antes e depois", href: "/antes-depois" },
  image: "/uploads/real/63C571A7-310D-47C5-B568-26ECD0BF878A.jpg",
  images: [
    "/uploads/real/63C571A7-310D-47C5-B568-26ECD0BF878A.jpg",
    "/uploads/real/IMG_8113.jpg",
    "/uploads/real/IMG_8144.jpg",
    "/uploads/real/IMG_8329.jpg",
    "/uploads/real/IMG_7976.jpg",
  ],
};

export const mainServices = [
  {
    title: "Higienização de Sofás",
    benefit:
      "Remove manchas, odores, pó e ácaros com total segurança para qualquer tecido.",
  },
  {
    title: "Higienização de Colchões",
    benefit: "Elimina ácaros e bactérias, aliviando alergias e melhorando o sono.",
  },
  {
    title: "Tapetes & Carpetes",
    benefit: "Limpeza profunda que devolve cor e textura às fibras.",
  },
  {
    title: "Interiores de Viatura",
    benefit: "Assentos, portas e teto renovados, com cheiro fresco e agradável.",
  },
];

export const processSteps = [
  {
    title: "Pedes a higienização",
    description: "Escolhe serviço, data e localização diretamente no site.",
  },
  {
    title: "Confirmamos a visita",
    description: "Recebes WhatsApp/SMS com todos os detalhes confirmados.",
  },
  {
    title: "Vamos até si",
    description:
      "Levamos os equipamentos profissionais e fazemos tudo no local.",
  },
];

export const differentiators = [
  {
    title: "Equipamentos profissionais",
    description:
      "Extratoras industriais, escovas rotativas e vaporizadores próprios para estofados.",
  },
  {
    title: "Produtos certificados",
    description:
      "Soluções testadas que removem sujidades sem agredir tecido, saúde ou meio ambiente.",
  },
  {
    title: "Equipa treinada",
    description:
      "Técnicos formados em remoção de manchas, protocolos de segurança e atendimento.",
  },
  {
    title: "Remoção profunda",
    description:
      "Processo que atinge camadas internas, eliminando ácaros, fungos, bactérias e odores.",
  },
];

export const coverage = {
  areas: [
    "Talatona",
    "Benfica",
    "Nova Vida",
    "Kilamba",
    "Morro Bento",
    "Viana (por marcação)",
    "Patriota",
    "Vila Alice",
    "Maianga",
    "Ilha e arredores",
  ],
  hours: "De segunda a sábado, das 08h às 18h.",
};

export const testimonials = [
  {
    name: "Lúcia Andrade",
    service: "Higienização de Sofá",
    text: "Ficou como novo. Não pensei que as manchas saíssem tão rápido.",
  },
  {
    name: "Mateus Garcia",
    service: "Colchão king size",
    text: "Dormimos melhor e as alergias diminuíram depois da limpeza.",
  },
  {
    name: "Carla Pimentel",
    service: "Interior de viatura",
    text: "Cheiro agradável e sem manchas nos bancos. A equipa é muito cuidadosa.",
  },
];

export const beforeAfterGallery = [
  {
    id: "caso-01",
    category: "sofás",
    label: "Sofá — Trabalho real 01",
    before: "/uploads/real/IMG_7946.jpg",
    after: "/uploads/real/IMG_7941.jpg",
  },
  {
    id: "caso-02",
    category: "sofás",
    label: "Sofá — Trabalho real 02",
    before: "/uploads/real/IMG_7950.jpg",
    after: "/uploads/real/IMG_7955.jpg",
  },
  {
    id: "caso-03",
    category: "sofás",
    label: "Sofá — Trabalho real 03",
    before: "/uploads/real/IMG_7961.jpg",
    after: "/uploads/real/IMG_7957.jpg",
  },
  {
    id: "caso-04",
    category: "sofás",
    label: "Sofá — Trabalho real 04",
    before: "/uploads/real/IMG_7963.jpg",
    after: "/uploads/real/IMG_7962.jpg",
  },
  {
    id: "caso-05",
    category: "sofás",
    label: "Sofá — Trabalho real 05",
    before: "/uploads/real/IMG_7966.jpg",
    after: "/uploads/real/IMG_7968.jpg",
  },
  {
    id: "caso-06",
    category: "sofás",
    label: "Sofá — Trabalho real 06",
    before: "/uploads/real/IMG_7973.jpg",
    after: "/uploads/real/IMG_7976.jpg",
  },
  {
    id: "caso-07",
    category: "sofás",
    label: "Sofá — Trabalho real 07",
    before: "/uploads/real/IMG_7979.jpg",
    after: "/uploads/real/IMG_7980.jpg",
  },
  {
    id: "caso-08",
    category: "sofás",
    label: "Poltrona — Trabalho real 08",
    before: "/uploads/real/IMG_8008.jpg",
    after: "/uploads/real/IMG_8113.jpg",
  },
  {
    id: "caso-09",
    category: "sofás",
    label: "Chaise — Trabalho real 09",
    before: "/uploads/real/IMG_8149.jpg",
    after: "/uploads/real/IMG_8144.jpg",
  },
  {
    id: "caso-10",
    category: "sofás",
    label: "Sofá — Trabalho real 10",
    before: "/uploads/real/IMG_8336.jpg",
    after: "/uploads/real/IMG_8329.jpg",
  },
  {
    id: "caso-11",
    category: "sofás",
    label: "Conjunto sala — Trabalho real 11",
    before: "/uploads/real/IMG_8347.jpg",
    after: "/uploads/real/IMG_8346.jpg",
  },
  {
    id: "caso-12",
    category: "sofás",
    label: "Sofá — Trabalho real 12",
    before: "/uploads/real/IMG_8348.jpg",
    after: "/uploads/real/63C571A7-310D-47C5-B568-26ECD0BF878A.jpg",
  },
];

const uniqueCategories = Array.from(
  new Set(beforeAfterGallery.map((item) => item.category)),
);

export const beforeAfterFilters = ["todos", ...uniqueCategories];

export const pricingPackages = [
  {
    name: "Pacote Essencial",
    price: "18.500 Kz",
    description: "Higienização de sofá pequeno ou de 2 lugares com almofadas.",
  },
  {
    name: "Pacote Família",
    price: "27.500 Kz",
    description: "Sofá de 3 lugares ou sofá em L acompanhado de tapete médio.",
  },
  {
    name: "Pacote Premium",
    price: "39.500 Kz",
    description: "Sofá grande + tapete ou colchão, 6 cadeiras e aromatização.",
  },
];

export const pricingExtras = [
  {
    title: "Estofos avulso",
    items: [
      { name: "Mono sofá (tecido)", price: "13.500 Kz" },
      { name: "Sofá 2 lugares (tecido)", price: "16.500 Kz" },
      { name: "Sofá 3 lugares (tecido)", price: "18.500 Kz" },
      { name: "Sofá em L até 3 lugares (napa)", price: "23.500 Kz" },
      { name: "Sofá em L até 3 lugares (tecido)", price: "27.500 Kz" },
      { name: "Tapete médio", price: "12.500 Kz" },
      { name: "Tapete grande", price: "20.500 Kz" },
      { name: "Almofada média", price: "500 Kz" },
      { name: "Almofada grande", price: "800 Kz" },
      { name: "Cortina jogos médios", price: "13.500 Kz" },
      { name: "Cortina jogos grandes", price: "19.500 Kz" },
    ],
  },
  {
    title: "Colchões",
    items: [
      { name: "Colchão de berço", price: "6.500 Kz" },
      { name: "Colchão solteiro", price: "11.500 Kz" },
      { name: "Colchão casal", price: "16.500 Kz" },
      { name: "Colchão queen", price: "18.500 Kz" },
      { name: "Colchão king", price: "23.500 Kz" },
    ],
  },
  {
    title: "Cadeiras e viaturas",
    items: [
      { name: "Cadeira (napa)", price: "1.500 Kz" },
      { name: "Cadeira (tecido)", price: "2.500 Kz" },
      { name: "Puff / apoio", price: "4.500 Kz" },
      { name: "SUV 5 lugares", price: "25.500 Kz" },
      { name: "SUV 7 lugares", price: "31.500 Kz" },
    ],
  },
];

export const faqItems = [
  {
    question: "Quanto tempo demora a higienização?",
    answer: "Entre 45 minutos e 2 horas, dependendo do tamanho do serviço.",
  },
  {
    question: "O sofá fica molhado?",
    answer: "Fica levemente húmido e seca completamente entre 4h a 12h.",
  },
  {
    question: "Posso usar o sofá logo depois?",
    answer: "O ideal é aguardar a secagem total para garantir o melhor resultado.",
  },
  {
    question: "Os produtos têm cheiro forte?",
    answer: "Não. São soluções próprias, seguras para casa e animais.",
  },
  {
    question: "Atendem fins de semana?",
    answer: "Sim, mediante agendamento.",
  },
  {
    question: "Há garantia?",
    answer:
      "Sim. Se alguma área não ficar como esperado, voltamos gratuitamente dentro de 72h.",
  },
];

export const serviceDetails = [
  {
    id: "sofas",
    title: "Higienização de Sofás",
    description:
      "Limpeza profunda com extração profissional, remoção de manchas e eliminação de odores.",
    includes: ["Assentos, encostos, braços e base", "Neutralização de odores"],
    idealFor: ["Pó acumulado", "Crianças e animais", "Derrames recentes"],
  },
  {
    id: "colchoes",
    title: "Higienização de Colchões",
    description:
      "Remoção de sujidades, ácaros e bactérias. Processo seguro para qualquer tipo de colchão.",
    includes: ["Superfície completa", "Laterais e acabamento"],
    idealFor: ["Alergias", "Manchas antigas", "Odores persistentes"],
  },
  {
    id: "tapetes",
    title: "Tapetes & Carpetes",
    description:
      "Pré-tratamento + escovagem + extração. Realce imediato da cor e textura.",
    includes: ["Tapetes pequenos, médios e grandes", "Secagem assistida"],
    idealFor: ["Animais", "Poeira intensa", "Manchas persistentes"],
  },
  {
    id: "viaturas",
    title: "Interior de Viatura",
    description:
      "Higienização completa dos assentos, portas, teto e chão, para tecidos ou couro.",
    includes: ["Bancos, portas, teto e tapetes", "Condicionador de couro"],
    idealFor: ["Odores fortes", "Manchas e derrames", "Viaturas de uso intensivo"],
  },
  {
    id: "cadeiras",
    title: "Cadeiras de escritório",
    description:
      "Limpeza especializada para cadeiras operacionais ou premium, sem danificar o tecido.",
    includes: ["Assento, encosto e apoios de braço", "Proteção anti-ácaros"],
    idealFor: ["Escritórios", "Home office", "Ambientes corporativos"],
  },
];

export const contactInfo = {
  whatsapp: "+244 999 999 999",
  phone: "+244 988 888 888",
  email: "contato@angohigiene.com",
  instagram: "https://instagram.com/angohigiene",
};

export const agendarServiceOptions = [
  { id: "sofas", value: "Sofá", details: ["2 lugares", "3 lugares", "Chaise", "Canto"] },
  { id: "colchoes", value: "Colchão", details: ["Solteiro", "Casal", "Queen", "King"] },
  {
    id: "tapetes",
    value: "Tapete/Carpete",
    details: ["Pequeno", "Médio", "Grande", "Personalizado"],
  },
  {
    id: "cadeiras",
    value: "Cadeiras de escritório",
    details: ["Operacional", "Presidencial", "Reunião", "Banco alto"],
  },
  {
    id: "viaturas",
    value: "Interior de viatura",
    details: ["Bancos em tecido", "Bancos em couro", "SUV", "Pick-up"],
  },
  { id: "outro", value: "Outro", details: ["Descreve nas observações"] },
];
