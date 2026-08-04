import { entregaConfig, opcoesEntrega, formasPagamento } from "../data/entregaContent"
import { precoParaNumero, precoValido } from "./preco"
import { normalizar } from "./texto"

// "Campo Grande - MS", "campo grande/ms" e "CAMPO GRANDE" viram todos
// "campo grande ms": o cliente digita do jeito dele e a comparação é uma só.
function limpar(texto = "") {
  return normalizar(texto).replace(/[^a-z0-9]+/g, " ").trim()
}

const cidadesAceitas = entregaConfig.cidadeAceita.map(limpar)

/**
 * A loja entrega só em Campo Grande. Quem é de fora não fica sem saída: a
 * retirada na loja não passa por esta checagem.
 */
export function cidadeAtendida(cidade) {
  return cidadesAceitas.includes(limpar(cidade))
}

export function opcaoEntrega(id) {
  return opcoesEntrega.find((opcao) => opcao.id === id) ?? opcoesEntrega[0]
}

export function formaPagamento(id) {
  return formasPagamento.find((forma) => forma.id === id) ?? formasPagamento[0]
}

/**
 * Uma conta de total pro site inteiro — cesta, oferta e lista do mercado passam
 * todas por aqui.
 *
 * `temPrecoAberto` avisa que algum item não tem preço legível: nesse caso quem
 * exibe mostra "a combinar" em vez de um total que estaria errado pra menos.
 */
export function calcularTotais(itens = [], entregaId) {
  const opcao = opcaoEntrega(entregaId)

  const bruto = itens.reduce(
    (soma, item) => soma + precoParaNumero(item.preco) * (item.quantidade ?? 1),
    0
  )

  // Somar centavos em ponto flutuante rende 77.28999999999999. Na tela some no
  // arredondamento, mas o troco é comparado com este número: sem arredondar,
  // "troco para 77,29" num pedido de R$ 77,29 seria recusado por insuficiente.
  const subtotal = emCentavos(bruto)

  return {
    opcao,
    subtotal,
    frete: opcao.valor,
    total: emCentavos(subtotal + opcao.valor),
    temPrecoAberto: itens.some((item) => !precoValido(item.preco)),
  }
}

function emCentavos(valor) {
  return Math.round(valor * 100) / 100
}
