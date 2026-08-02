import { mercadoConfig } from "../data/mercadoContent"

export function precoParaNumero(preco) {
  const digitos = String(preco).replace(/[^\d,]/g, "").replace(",", ".")
  return Number(digitos) || 0
}

export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: mercadoConfig.moeda,
  })
}
