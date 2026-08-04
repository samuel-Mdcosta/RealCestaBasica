import { pagamentosResumo } from "./entregaContent"
import { formatarPreco, precoParaNumero } from "../utils/preco"

// O rodapé da oferta não fica aqui: o Footer global (siteContent.js) já usa o
// número real da loja em todas as páginas.

// ATENÇÃO: o nome "Cesta M — Família" não bate com o catálogo do siteContent.
// Lá, "Cesta da Família — Completa" custa R$ 189,90 (18 itens) e quem custa
// R$ 169,90 é a "Cesta Tipo B". Esta oferta lista 27 itens, então ela é uma
// terceira coisa — decidir qual cesta é essa e alinhar o nome com o catálogo.
const precoCheio = "R$ 169,90"
const precoOferta = "R$ 129,90"

// Desconto e economia deixam de ser digitados: eram três números pra manter em
// sincronia toda vez que o preço da semana mudasse.
const economia = precoParaNumero(precoCheio) - precoParaNumero(precoOferta)
const desconto = Math.round((economia / precoParaNumero(precoCheio)) * 100)

export const ofertaProduto = {
  categoria: "Cesta pronta • mais pedida",
  nome: "Cesta M — Família",
  descricao:
    "27 itens para o mês da sua família: arroz, feijão, óleo, café, macarrão, leite, biscoito e itens de higiene básica. Rende 1 mês para 3–4 pessoas.",
  selo: "OFERTA DA SEMANA",
  desconto: `-${desconto}%`,
  precoDe: precoCheio,
  precoPor: precoOferta,
  economia: formatarPreco(economia),
  pagamento: pagamentosResumo,
  cta: "Pedir esta cesta",
  nota: "O site soma a entrega e mostra o total antes de você confirmar no WhatsApp.",
  selos: ["27 itens", "Rende 1 mês (3–4 pessoas)", "Marcas confiáveis"],
  foto: "foto: cesta M montada",
}

// O que entra no carrinho/checkout quando alguém pede a oferta. Id próprio pra
// não se misturar com a mesma cesta vendida no preço cheio.
export const ofertaItem = {
  id: "oferta-da-semana",
  nome: `${ofertaProduto.nome} (oferta da semana)`,
  preco: precoOferta,
}

export const ofertaItensTitulo = "O que vem nesta cesta"

export const ofertaItens = [
  { nome: "Arroz branco tipo 1", qtd: "5 kg" },
  { nome: "Feijão carioca", qtd: "3 kg" },
  { nome: "Óleo de soja 900 ml", qtd: "2 un" },
  { nome: "Açúcar refinado", qtd: "4 kg" },
  { nome: "Café torrado e moído 500 g", qtd: "1 un" },
  { nome: "Sal refinado 1 kg", qtd: "1 un" },
  { nome: "Farinha de trigo 1 kg", qtd: "1 un" },
  { nome: "Macarrão espaguete 500 g", qtd: "3 un" },
  { nome: "Molho de tomate 340 g", qtd: "2 un" },
  { nome: "Leite integral 1 L", qtd: "6 un" },
  { nome: "Biscoito cream cracker 400 g", qtd: "2 un" },
  { nome: "Achocolatado em pó 400 g", qtd: "1 un" },
  { nome: "Tempero completo 300 g", qtd: "1 un" },
  { nome: "Farinha de mandioca 500 g", qtd: "1 un" },
  { nome: "Milho verde em conserva 170 g", qtd: "1 un" },
  { nome: "Sardinha em lata 125 g", qtd: "2 un" },
  { nome: "Margarina 500 g", qtd: "1 un" },
  { nome: "Suco em pó 25 g", qtd: "4 un" },
  { nome: "Sabonete 85 g", qtd: "2 un" },
  { nome: "Creme dental 90 g", qtd: "1 un" },
  { nome: "Papel higiênico 4 rolos", qtd: "1 un" },
  { nome: "Detergente neutro 500 ml", qtd: "1 un" },
  { nome: "Sabão em pó 1 kg", qtd: "1 un" },
  { nome: "Esponja de aço 8 un", qtd: "1 un" },
  { nome: "Água sanitária 1 L", qtd: "1 un" },
  { nome: "Vinagre de álcool 750 ml", qtd: "1 un" },
  { nome: "Macarrão instantâneo 85 g", qtd: "5 un" },
]

export const ofertaBrinde = {
  selo: "BRINDE DA SEMANA",
  nome: "Sacola retornável + 1 kg de arroz extra",
  descricao: "Grátis em todo pedido desta oferta, enquanto durar o estoque.",
  etiqueta: "GRÁTIS",
  foto: "foto: brinde",
}

export const ofertaAvisoLegal =
  "Marcas podem variar conforme o estoque, sempre mantendo a mesma qualidade. Confirmação item a item pelo WhatsApp."

export const ofertaFaixaFinal = {
  titulo: "Garanta a oferta desta semana",
  subtitulo: `${ofertaProduto.nome} por ${ofertaProduto.precoPor} • enquanto durar o estoque`,
  botao: "Pedir agora",
}
