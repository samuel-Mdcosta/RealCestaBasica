import { pagamentosResumo } from "./entregaContent"
import { cestas } from "./siteContent"
import { itensDaCesta } from "./cestasContent"
import { formatarPreco, precoParaNumero } from "../utils/preco"

const siglaDaOferta = "B"
const precoOferta = "R$ 160,00"

const cestaDaOferta = cestas.find((cesta) => cesta.sigla === siglaDaOferta)

const nomeCesta = cestaDaOferta?.nome 
const rendeCesta = cestaDaOferta?.rende  
const precoCheio = cestaDaOferta?.preco 


const economia = precoParaNumero(precoCheio) - precoParaNumero(precoOferta)
const desconto = Math.round((economia / precoParaNumero(precoCheio)) * 100)

export const ofertaItensTitulo = "O que vem nesta cesta"


export const ofertaItens = itensDaCesta(siglaDaOferta)

const totalItens = ofertaItens.length

export const ofertaProduto = {
  categoria: "Cesta pronta • mais pedida",
  nome: nomeCesta,
  descricao:
    `${totalItens} itens para o mês da sua família: arroz, feijão, óleo, café, ` +
    `macarrão, leite, biscoito e itens de higiene básica. Rende ${rendeCesta}.`,
  selo: "OFERTA DA SEMANA",
  desconto: `-${desconto}%`,
  precoDe: precoCheio,
  precoPor: precoOferta,
  economia: formatarPreco(economia),
  pagamento: pagamentosResumo,
  cta: "Pedir esta cesta",
  nota: "O site soma a entrega e mostra o total antes de você confirmar no WhatsApp.",
  selos: [`${totalItens} itens`, `Rende ${rendeCesta}`, "Marcas confiáveis"],
  foto: "foto: cesta M montada",
}


export const ofertaItem = {
  id: "oferta-da-semana",
  nome: `${ofertaProduto.nome} (oferta da semana)`,
  preco: precoOferta,
}

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
