import { createContext, useContext, useMemo, useState } from "react"
import { useCarrinho } from "./CarrinhoContext"

const CheckoutContext = createContext(null)

/**
 * O checkout é um só pro site inteiro (card de cesta, oferta, drawer e faixa),
 * então quem controla se ele está aberto e com quais itens é este contexto.
 *
 * Duas entradas:
 *   abrirComCarrinho() — finaliza a lista que já está montada.
 *   abrirDireto(itens) — cesta pedida com o carrinho vazio; não mexe na lista.
 */
export function CheckoutProvider({ children }) {
  const { itens: itensCarrinho, fechar: fecharCarrinho } = useCarrinho()
  const [aberto, setAberto] = useState(false)
  const [itensDiretos, setItensDiretos] = useState(null)

  const valor = useMemo(() => {
    // O drawer sai de cena quando o checkout entra: duas camadas escuras
    // empilhadas só confundem.
    const abrir = (diretos) => {
      setItensDiretos(diretos)
      fecharCarrinho()
      setAberto(true)
    }

    return {
      aberto,
      itens: itensDiretos ?? itensCarrinho,
      abrirComCarrinho: () => abrir(null),
      abrirDireto: (itens) => abrir(itens),
      fechar: () => {
        setAberto(false)
        setItensDiretos(null)
      },
    }
  }, [aberto, itensDiretos, itensCarrinho, fecharCarrinho])

  return (
    <CheckoutContext.Provider value={valor}>{children}</CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const contexto = useContext(CheckoutContext)
  if (!contexto) {
    throw new Error("useCheckout precisa estar dentro de <CheckoutProvider>")
  }
  return contexto
}
