export interface BlogPost {
  id: number
  title: string
  excerpt: string
  // Adicionaremos um campo 'content' para o corpo completo do post
  content: string
  imageUrl: string
  author: string
  date: string // Formato YYYY-MM-DD para facilitar a ordenação
  category: string
  slug: string
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 Dicas para Melhorar a Ergonomia no seu Home Office",
    excerpt: "Trabalhar em casa se tornou a nova realidade para muitos. Descubra como ajustar seu espaço para máximo conforto e produtividade, evitando dores e lesões.",
    content: "O trabalho remoto veio para ficar, e com ele, a necessidade de um espaço de trabalho ergonômico em casa. Uma postura inadequada pode levar a dores nas costas, no pescoço e até lesões por esforço repetitivo. A primeira dica é investir em uma cadeira ergonômica de qualidade, que ofereça suporte lombar e ajustes de altura. A segunda é posicionar seu monitor na altura dos olhos para evitar tensão no pescoço. Terceiro, use um teclado e mouse externos para manter seus pulsos em uma posição neutra. Quarto, faça pausas regulares para se alongar e caminhar. E por último, certifique-se de que sua iluminação seja adequada para evitar o cansaço visual. Pequenos ajustes podem fazer uma grande diferença na sua saúde e bem-estar.",
    imageUrl: "/seção_1.webp",
    author: "Ana Silva",
    date: "2024-07-28",
    category: "Ergonomia",
    slug: "dicas-ergonomia-home-office",
  },
  {
    id: 2,
    title: "A Escolha da Cadeira Ideal: O que Você Precisa Saber",
    excerpt: "Uma boa cadeira é um investimento na sua saúde. Aprenda os principais fatores a considerar antes de comprar a sua próxima cadeira de escritório.",
    content: "Escolher a cadeira de escritório certa é crucial. Procure por modelos com ajuste de altura do assento, profundidade e suporte lombar ajustável. Os braços da cadeira também devem ser ajustáveis para que seus ombros fiquem relaxados. O material do assento deve ser respirável e confortável para longas horas de uso. A base giratória com rodízios facilita a movimentação sem esforço. Lembre-se de testar a cadeira, se possível, para garantir que ela se adapta perfeitamente ao seu corpo e à sua estação de trabalho. Uma cadeira inadequada não afeta apenas o conforto, mas também a sua produtividade a longo prazo.",
    imageUrl: "/seção_5.webp",
    author: "Carlos Pereira",
    date: "2024-07-15",
    category: "Móveis",
    slug: "escolha-cadeira-ideal",
  },
  {
    id: 3,
    title: "Organização e Produtividade: Como Armários e Estantes Podem Ajudar",
    excerpt: "Um ambiente organizado é a chave para um trabalho focado. Veja como soluções de armazenamento inteligentes podem transformar seu escritório.",
    content: "A desordem visual pode ser uma grande distração. Armários, gaveteiros e estantes são essenciais para manter um ambiente de trabalho limpo e funcional. Utilize organizadores de gaveta para itens pequenos e pastas para documentos importantes. Estantes abertas são ótimas para livros e itens decorativos, enquanto armários fechados escondem a bagunça. Ao planejar seu armazenamento, pense na frequência de uso dos itens: o que você usa diariamente deve estar ao alcance das mãos. Um espaço bem organizado não só parece melhor, mas também melhora seu foco e eficiência.",
    imageUrl: "/seção_3.webp",
    author: "Juliana Costa",
    date: "2024-06-30",
    category: "Organização",
    slug: "organizacao-e-produtividade",
  },
]