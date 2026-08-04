import { useEffect, useRef } from "react"
import { useTravaScroll } from "../hooks/useTravaScroll"

/**
 * Caixa centralizada (vira folha subindo de baixo no celular). Fica por cima do
 * drawer do carrinho — daí o z-index maior que o de lá.
 */
export default function Modal({ aberto, aoFechar, titulo, children }) {
  const caixa = useRef(null)

  useTravaScroll(aberto)

  useEffect(() => {
    if (!aberto) return

    const fecharComEsc = (e) => {
      if (e.key === "Escape") aoFechar()
    }

    window.addEventListener("keydown", fecharComEsc)
    caixa.current?.focus()
    return () => window.removeEventListener("keydown", fecharComEsc)
  }, [aberto, aoFechar])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div
        onClick={aoFechar}
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
      />

      <div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        className="relative w-full sm:max-w-lg max-h-[92svh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col outline-none"
      >
        {children}
      </div>
    </div>
  )
}
