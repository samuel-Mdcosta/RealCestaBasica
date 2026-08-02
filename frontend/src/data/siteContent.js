export const marca = {
  nome: "Real Cesta Básica",
  logo: "/imagens/logoBox.png",
}

export const topbar = [
  "Entrega local no mesmo dia",
  "Retirada grátis na loja",
  "PIX e cartão de crédito",
]

export const header = {
  busca: "Buscar arroz, feijão, óleo, sabão…",
  menu: [
    { nome: "Cestas", to: "/cestas" },
    { nome: "Mercado", to: "/mercado" },
    { nome: "Ofertas" },
  ],
  cta: "Pedir no WhatsApp",
}

export const hero = {
  selo: "OFERTA DA SEMANA",
  titulo: "Cesta básica completa pra sua família",
  precoDestaque: { label: "Cesta x a partir de", valor: "xxxxxxx" },
  botoes: [
    { texto: "Ver as cestas", to: "/cestas" },
    { texto: "Mercado completo", to: "/mercado" },
  ],
  nota: "Você fecha o pedido direto no WhatsApp com um atendente da loja.",
}

export const cestasSection = {
  titulo: "Cestas prontas",
  linkComparacao: "Ver comparação completa →",
}

export const cestas = [
  {
    sigla: "MINI",
    nome: "Cesta Mini",
    tag: "PRA COMEÇAR",
    foto: "foto: cesta Mini",
    descricao: "O essencial de verdade: arroz, feijão, óleo, açúcar, sal, macarrão, papel higienico",
    itens: 8,
    rende: "2 semana",
    preco: "R$ 89,90",
  },
  {
    sigla: "MINI Especial",
    nome: "Cesta MINI Especial — Essencial",
    tag: "1–2 PESSOAS",
    foto: "foto: cesta P",
    descricao: "O melhor para o mês e doação: arroz, feijão, óleo, açúcar, sal, leite, trigo, macarrão e mais.",
    itens: 15,
    rende: "1 mês",
    preco: "R$ 134,90",
  },
  {
    sigla: "B",
    nome: "Cesta Tipo B",
    tag: "MAIS PEDIDA",
    foto: "foto: cesta M",
    descricao: "A ideal para bonificação da empresa e doação: arroz, feijão, óleo, açúcar, sal, macarrão, papel higienico e mais.",
    itens: 15,
    rende: "1 mês (2-3 pessoas)",
    preco: "R$ 169,90",
  },
  {
    sigla: "familia",
    nome: "Cesta da Família — Completa",
    tag: "MELHOR CUSTO",
    foto: "foto: cesta G",
    descricao: "Despensa completa: alimentos, higiene e limpeza.",
    itens: 18,
    rende: "1 mês (4-5 pessoas)",
    preco: "R$ 189,90",
  },
  {
    sigla: "H",
    nome: "Cesta Tipo H",
    tag: "Cesta mais completa para o seu mês",
    foto: "foto: cesta Limpeza",
    descricao: "A cesta ideal para a sua familia passar o mês sem aperto.",
    itens: 25,
    rende: "1 mês",
    preco: "R$ 289,90",
  },
  {
    sigla: "c",
    nome: "Cesta Tipo média",
    tag: "FAMÍLIA GRANDE",
    foto: "foto: cesta GG",
    descricao: "A cesta média reforçada: mais grãos, leite e mais limpeza.",
    itens: 28,
    rende: "1 mês (4+ pessoas)",
    preco: "R$ 379,90",
  },
  {
    sigla: "gigante",
    nome: "Cesta Tipo Gigante",
    tag: "MARCAS LÍDERES",
    foto: "foto: cesta Premium",
    descricao: "A cesta Gigante com marcas premium e extras a maior de todas.",
    itens: 41,
    rende: "2 mês (5+ pessoas)",
    preco: "R$ 589,90",
  },
]

const siglasHome = ["mini", "familia", "gigante"]

export const cestasHome = cestas.filter((cesta) =>
  siglasHome.includes(cesta.sigla.toLowerCase())
)

export const mercadoSection = {
  titulo: "Mercado online",
}

export const mercadoCategorias = [
  { icone: "🌾", nome: "Grãos e Cereais" },
  { icone: "🧼", nome: "Limpeza" },
  { icone: "🪥", nome: "Higiene" },
  { icone: "🍞", nome: "Padaria e Café" },
  { icone: "🥫", nome: "Enlatados" },
]

export const comoFunciona = [
  {
    passo: 1,
    titulo: "Escolha a cesta ou os produtos",
    descricao: "Cestas MINI, Tipo H e Gigante prontas, ou monte sua lista no mercado online.",
  },
  {
    passo: 2,
    titulo: "Envie o pedido no WhatsApp",
    descricao: "Um atendente da loja confirma tudo com você e fecha o valor.",
  },
  {
    passo: 3,
    titulo: "Pague e receba",
    descricao: "PIX ou cartão de crédito. Entrega local ou retirada na loja.",
  },
]

export const footer = {
  esquerda: "© 2026 Real Cesta Básica — entrega local e retirada na loja",
  direita: "PIX • Cartão de crédito • Pedidos pelo WhatsApp (67) 99253-3808",
  whatsapp: "+55 67 99253-3808",
}
