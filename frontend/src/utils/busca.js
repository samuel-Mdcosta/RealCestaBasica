import { foraDeEscopo } from "../data/escopoLoja"

// "Feijão" -> "feijao": a busca ignora acento e maiúscula.
export function normalizar(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

// Palavras de 1 letra ("e", "5") não ajudam a filtrar e só geram falso positivo.
function palavras(termo) {
  return normalizar(termo)
    .split(/[\s,]+/)
    .filter((palavra) => palavra.length >= 2)
}

// Todas as palavras precisam aparecer: "sabao po" acha "Sabão em pó — 1,6 kg".
// O corredor também conta, pra "higiene" listar o corredor inteiro — mas quem
// casa pelo nome do produto vem primeiro.
export function filtrarPorBusca(produtos, termo) {
  const partes = palavras(termo)
  if (partes.length === 0) return produtos

  const contemTodas = (texto) => {
    const alvo = normalizar(texto)
    return partes.every((parte) => alvo.includes(parte))
  }

  const porNome = produtos.filter((produto) => contemTodas(produto.nome))
  const porCorredor = produtos.filter(
    (produto) =>
      !porNome.includes(produto) &&
      contemTodas(`${produto.nome} ${produto.secao}`)
  )

  return [...porNome, ...porCorredor]
}

// "remedios" casa com "remedio", mas "sal" não casa com "salsicha".
function casaPalavra(palavra, termo) {
  return palavra === termo || (palavra.length > termo.length && palavra.startsWith(termo))
}

/**
 * Devolve o nome da categoria quando a busca é de outro ramo (farmácia,
 * eletrônico, roupa…), ou null quando o termo pode existir na loja.
 *
 * Só diz "não vendemos" do que está no `foraDeEscopo`. Termo desconhecido
 * devolve null de propósito: quem decide se existe é o catálogo, e o que ele
 * não achar vira "pergunte no WhatsApp".
 */
export function categoriaForaDeEscopo(termo) {
  const frase = normalizar(termo)
  const partes = palavras(termo)
  if (partes.length === 0) return null

  const grupo = foraDeEscopo.find((item) =>
    item.termos.some((bloqueado) => {
      const alvo = normalizar(bloqueado)
      return alvo.includes(" ")
        ? frase.includes(alvo)
        : partes.some((parte) => casaPalavra(parte, alvo))
    })
  )

  return grupo?.categoria ?? null
}
