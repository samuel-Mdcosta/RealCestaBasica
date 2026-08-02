import { footer } from "../data/siteContent"

// O link curto (wa.me/message/CÓDIGO) não aceita ?text=, então a mensagem só vai
// preenchida usando o número em dígitos — daí o replace no que vem do siteContent.
const numero = footer.whatsapp.replace(/\D/g, "")

export function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${numero}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

// "Cesta Mini" -> "MINI"
function nomeEmCaps(nomeCesta) {
  return nomeCesta.replace(/^cesta\s+/i, "").toUpperCase()
}

export function mensagemCesta(cesta) {
  return `Olá, acabei de ver no site a cesta ${nomeEmCaps(cesta.nome)}, gostaria de pedir uma para entregar.`
}

function linhaItem(item) {
  if (typeof item === "string") return `• ${item}`
  const quantidade = item.quantidade ?? 1
  return `• ${quantidade}x ${item.nome}`
}

export function mensagemMercado(itens = [], total) {
  if (itens.length === 0) {
    return "Olá, acabei de ver o site, gostaria de fazer um pedido para entregar."
  }

  const lista = itens.map(linhaItem).join("\n")
  const rodape = total ? `\n\nTotal estimado: ${total}` : ""
  return `Olá, acabei de ver no site estes produtos, gostaria de pedir para entregar:\n${lista}${rodape}`
}
