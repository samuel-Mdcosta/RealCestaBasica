import { createContext, useContext, useMemo, useState } from "react"
import { precoParaNumero } from "../utils/preco"

const CarrinhoContext = createContext(null)

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([])
  const [aberto, setAberto] = useState(false)

  const valor = useMemo(() => {
    const adicionar = (produto) => {
      setItens((atuais) => {
        const existente = atuais.find((item) => item.nome === produto.nome)
        if (!existente) return [...atuais, { ...produto, quantidade: 1 }]

        return atuais.map((item) =>
          item.nome === produto.nome
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      })
    }

    const alterarQuantidade = (nome, delta) => {
      setItens((atuais) =>
        atuais
          .map((item) =>
            item.nome === nome
              ? { ...item, quantidade: item.quantidade + delta }
              : item
          )
          .filter((item) => item.quantidade > 0)
      )
    }

    const remover = (nome) => {
      setItens((atuais) => atuais.filter((item) => item.nome !== nome))
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
      quantidadeDe: (nome) =>
        itens.find((item) => item.nome === nome)?.quantidade ?? 0,
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
