import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { precoParaNumero } from "../utils/preco"

const CarrinhoContext = createContext(null)

const CHAVE_SALVA = "realcesta:carrinho"

/**
 * Cesta e produto do mercado entram na mesma lista, então a chave não pode ser
 * só o nome: a cesta tem `sigla` e o produto que vier do banco vai ter `id`.
 * O nome fica sendo só o que aparece na tela.
 */
export function idDoItem(produto) {
  return produto.id ?? produto.sigla ?? produto.nome
}

// O checkout aumentou o tempo que o cliente passa no site (endereço, pagamento,
// resumo). Perder a lista num recarregar no meio disso é perder a venda.
function lerSalvo() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_SALVA))
    return Array.isArray(salvo) ? salvo : []
  } catch {
    return []
  }
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(lerSalvo)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_SALVA, JSON.stringify(itens))
    } catch {
      // Aba anônima ou cota cheia: o carrinho segue funcionando em memória.
    }
  }, [itens])

  const valor = useMemo(() => {
    const adicionar = (produto) => {
      const id = idDoItem(produto)

      setItens((atuais) => {
        const existente = atuais.find((item) => item.id === id)
        if (!existente) return [...atuais, { ...produto, id, quantidade: 1 }]

        return atuais.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      })
    }

    const alterarQuantidade = (id, delta) => {
      setItens((atuais) =>
        atuais
          .map((item) =>
            item.id === id
              ? { ...item, quantidade: item.quantidade + delta }
              : item
          )
          .filter((item) => item.quantidade > 0)
      )
    }

    const remover = (id) => {
      setItens((atuais) => atuais.filter((item) => item.id !== id))
    }

    return {
      itens,
      aberto,
      adicionar,
      alterarQuantidade,
      remover,
      limpar: () => setItens([]),
      abrir: () => setAberto(true),
      fechar: () => setAberto(false),
      // Aceita o produto inteiro ou só o id, pra servir quem já tem um dos dois.
      quantidadeDe: (produtoOuId) => {
        const id =
          typeof produtoOuId === "string" ? produtoOuId : idDoItem(produtoOuId)
        return itens.find((item) => item.id === id)?.quantidade ?? 0
      },
      quantidadeTotal: itens.reduce((soma, item) => soma + item.quantidade, 0),
      total: itens.reduce(
        (soma, item) => soma + precoParaNumero(item.preco) * item.quantidade,
        0
      ),
    }
  }, [itens, aberto])

  return (
    <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext)
  if (!contexto) {
    throw new Error("useCarrinho precisa estar dentro de <CarrinhoProvider>")
  }
  return contexto
}
