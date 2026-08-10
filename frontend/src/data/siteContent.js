import { entregaConfig, pagamentosResumo } from "./entregaContent"

export const marca = {
  nome: "Real Cesta Básica",
  logo: "/imagens/logoBox.png",
}

export const siteConfig = {
  moeda: "BRL",
}

export const topbar = [
  `Entrega em ${entregaConfig.cidade}/${entregaConfig.uf}`,
  "Retirada grátis na loja",
  pagamentosResumo,
]

export const header = {
  busca: "Buscar arroz, feijão, óleo, sabão…",
  menu: [
    { nome: "Cestas", to: "/cestas" },
    { nome: "Mercado", to: "/mercado" },
    { nome: "Oferta", to: "/ofertas" },
  ],
  ctaMensagem: "Olá! Quero fazer um pedido.",
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
    titulo: "Preencha entrega e pagamento",
    descricao:
      "O site soma o frete e mostra o total antes de você decidir se pede.",
  },
  {
    passo: 3,
    titulo: "Confirme no WhatsApp",
    descricao:
      "O pedido chega pronto pro atendente. Ele confirma o estoque e envia a chave PIX ou o link de pagamento.",
  },
]

export const naoEncontrada = {
  codigo: "404",
  titulo: "Essa página não existe",
  texto:
    "O link pode estar errado ou a página saiu do ar. Veja as cestas prontas, procure no mercado online ou chame um atendente que a gente acha o que você precisa.",
  botoes: [
    { texto: "Voltar pro início", to: "/" },
    { texto: "Ver as cestas", to: "/cestas" },
  ],
  ctaMensagem: "Olá! Não encontrei o que procurava no site.",
  cta: "Falar com atendente",
}

export const footer = {
  esquerda: `© 2026 Real Cesta Básica — entrega em ${entregaConfig.cidade}/${entregaConfig.uf} e retirada na loja`,
  direita: `${pagamentosResumo} • Pedidos pelo WhatsApp (67) 99253-3808`,
  whatsapp: "+55 67 99253-3808",
}
