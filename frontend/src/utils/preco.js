import { siteConfig } from "../data/siteConfig"

export function precoParaNumero(preco) {
  const digitos = String(preco).replace(/[^\d,]/g, "").replace(",", ".")
  return Number(digitos) || 0
}

export function precoValido(preco) {
  return precoParaNumero(preco) > 0
}

export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: siteConfig.moeda,
  })
}
