import { idDoItem, useCarrinho } from "../context/CarrinhoContext"
import { useCheckout } from "../context/CheckoutContext"
import { baseBotao, coresBotao } from "./estilosBotao"

/**
 * "Quero pedir isso" — abre o checkout em vez de ir direto pro WhatsApp.
 *
 * Com `produto` (cesta ou oferta): se a lista já tem alguma coisa, o item entra
 * nela e o drawer abre pro cliente conferir tudo junto; com a lista vazia vai
 * direto pro checkout, sem mexer no carrinho.
 *
 * Sem `produto`: finaliza a lista que já está montada.
 */
export default function BotaoPedido({
  produto,
  children,
  cor = "verde",
  className = "",
}) {
  const { itens, adicionar, abrir } = useCarrinho()
  const { abrirComCarrinho, abrirDireto } = useCheckout()

  // Finalizar uma lista vazia não leva a lugar nenhum.
  const semItens = !produto && itens.length === 0

  const pedir = () => {
    if (!produto) return abrirComCarrinho()

    if (itens.length > 0) {
      adicionar(produto)
      abrir()
      return
    }

    abrirDireto([{ ...produto, id: idDoItem(produto), quantidade: 1 }])
  }

  return (
    <button
      type="button"
      onClick={pedir}
      disabled={semItens}
      className={`${baseBotao} ${coresBotao[cor]} disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  )
}
