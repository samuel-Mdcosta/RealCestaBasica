import { siteConfig } from "../data/siteContent"

export function precoParaNumero(preco) {
  const digitos = String(preco).replace(/[^\d,]/g, "").replace(",", ".")
  return Number(digitos) || 0
}

// "R$ 24,90" -> true; "Sob consulta", "" ou undefined -> false.
//
// O checkout mostra um total que o cliente confirma antes de enviar o pedido,
// então preço que não dá pra ler não pode virar 0 silencioso e sumir da conta:
// quem chamar isso mostra "a combinar" no lugar do total.
export function precoValido(preco) {
  return precoParaNumero(preco) > 0
}

export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: siteConfig.moeda,
  })
}
