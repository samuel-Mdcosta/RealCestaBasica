import { useEffect } from "react"
import { useCarrinho } from "../context/CarrinhoContext"
import { carrinhoVazio, faixaWhatsapp } from "../data/mercadoContent"
import { formatarPreco, precoParaNumero } from "../utils/preco"
import { mensagemMercado } from "../utils/whatsapp"
import BotaoWhatsApp from "./BotaoWhatsApp"

function BotaoQuantidade({ children, ...props }) {
  return (
    <button
      type="button"
      className="h-7 w-7 rounded-full border border-black/10 text-vermelho font-bold leading-none flex items-center justify-center hover:bg-fundo-claro transition-colors"
      {...props}
    >
      {children}
    </button>
  )
}

export default function CarrinhoDrawer() {
  const {
    itens,
    aberto,
    fechar,
    alterarQuantidade,
    remover,
    limpar,
    quantidadeTotal,
    total,
  } = useCarrinho()

  useEffect(() => {
    if (!aberto) return

    const fecharComEsc = (e) => {
      if (e.key === "Escape") fechar()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", fecharComEsc)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", fecharComEsc)
    }
  }, [aberto, fechar])

  return (
    <>
      <div
        onClick={fechar}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          aberto ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sua lista de compras"
        inert={!aberto}
        className={`fixed top-0 right-0 z-[70] h-svh w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          aberto ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="bg-vermelho text-white px-5 py-4 flex items-center justify-between gap-3 flex-shrink-0">
          <div>
            <h2 className="font-titulos font-extrabold text-xl uppercase tracking-wide">
              Sua lista
            </h2>
            <p className="text-xs text-white/80">
              {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}
            </p>
          </div>

          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar lista"
            className="p-2 -mr-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-8">
            <span className="text-4xl" aria-hidden="true">
              🛒
            </span>
            <p className="font-titulos font-bold text-lg mt-3">
              {carrinhoVazio.titulo}
            </p>
            <p className="text-sm text-gray-500 mt-1">{carrinhoVazio.texto}</p>
          </div>
        ) : (
          <ul className="flex-grow overflow-y-auto divide-y divide-black/5">
            {itens.map((item) => (
              <li key={item.nome} className="p-4 flex gap-3">
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {item.nome}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.preco} • un
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <BotaoQuantidade
                      onClick={() => alterarQuantidade(item.nome, -1)}
                      aria-label={`Diminuir ${item.nome}`}
                    >
                      −
                    </BotaoQuantidade>
                    <span className="text-sm font-bold w-6 text-center">
                      {item.quantidade}
                    </span>
                    <BotaoQuantidade
                      onClick={() => alterarQuantidade(item.nome, 1)}
                      aria-label={`Aumentar ${item.nome}`}
                    >
                      +
                    </BotaoQuantidade>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <span className="font-titulos font-extrabold text-vermelho">
                    {formatarPreco(precoParaNumero(item.preco) * item.quantidade)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remover(item.nome)}
                    className="text-xs text-gray-400 hover:text-vermelho transition-colors"
                  >
                    remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-black/10 p-5 flex-shrink-0">
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-titulos font-bold uppercase tracking-wide">
              Total
            </span>
            <span className="font-titulos font-extrabold text-2xl text-vermelho">
              {formatarPreco(total)}
            </span>
          </div>

          <BotaoWhatsApp
            mensagem={mensagemMercado(itens, formatarPreco(total))}
            className={`w-full px-6 py-3 rounded-md ${
              itens.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {faixaWhatsapp.botao}
          </BotaoWhatsApp>

          {itens.length > 0 && (
            <button
              type="button"
              onClick={limpar}
              className="w-full text-xs text-gray-400 hover:text-vermelho transition-colors mt-3"
            >
              Limpar lista
            </button>
          )}

          <p className="text-[11px] text-gray-400 text-center mt-3">
            Valores sujeitos a confirmação de preço e estoque pelo atendente.
          </p>
        </div>
      </aside>
    </>
  )
}
