import { footer } from "../data/siteContent"
import {
  checkoutContent,
  entregaConfig,
  precoIndisponivel,
} from "../data/entregaContent"
import { formatarPreco } from "./preco"

// O link curto (wa.me/message/CÓDIGO) não aceita ?text=, então a mensagem só vai
// preenchida usando o número em dígitos — daí o replace no que vem do siteContent.
const numero = footer.whatsapp.replace(/\D/g, "")

export function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${numero}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

function linhaItem(item) {
  return `• ${item.quantidade ?? 1}x ${item.nome}`
}

// "Rua das Flores, 123 — Centro, Campo Grande/MS"
function linhaEndereco(endereco) {
  const rua = [endereco.rua, endereco.numero].filter(Boolean).join(", ")
  const cidade = endereco.cidade || entregaConfig.cidade
  return `${rua} — ${endereco.bairro}, ${cidade}/${entregaConfig.uf}`
}

function linhaPagamento(pagamento, troco) {
  if (!pagamento.pedeTroco || !troco) return pagamento.nome
  return `${pagamento.nome} (troco para ${formatarPreco(troco)})`
}

/**
 * A única mensagem de pedido do site. Cesta, oferta e lista do mercado chegam
 * aqui do mesmo jeito — o que muda entre elas é só o conteúdo de `itens`.
 *
 * Espera: { itens, nome, entrega, endereco, pagamento, troco, totais }
 */
export function mensagemPedido(pedido) {
  const { itens = [], nome, entrega, endereco, pagamento, troco, totais } = pedido

  const linhas = ["Olá! Quero fazer este pedido pelo site:", ""]

  linhas.push(
    itens.length ? itens.map(linhaItem).join("\n") : checkoutContent.semItens,
    ""
  )

  linhas.push(
    `${checkoutContent.labelSubtotal}: ${formatarPreco(totais.subtotal)}`,
    `${checkoutContent.labelFrete}: ${
      totais.frete > 0 ? formatarPreco(totais.frete) : "grátis (retirada)"
    }`,
    `${checkoutContent.labelTotal}: ${
      totais.temPrecoAberto
        ? precoIndisponivel.rotulo
        : formatarPreco(totais.total)
    }`,
    ""
  )

  linhas.push(`Nome: ${nome}`)

  if (entrega.pedeEndereco) {
    linhas.push(`Entrega: ${linhaEndereco(endereco)}`)
    if (endereco.complemento) linhas.push(`Complemento: ${endereco.complemento}`)
    if (endereco.referencia) linhas.push(`Referência: ${endereco.referencia}`)
  } else {
    linhas.push(`Entrega: ${entrega.nome}`)
  }

  linhas.push(`Pagamento: ${linhaPagamento(pagamento, troco)}`)

  return linhas.join("\n")
}
