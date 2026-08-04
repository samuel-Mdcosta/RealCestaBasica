import { useEffect } from "react"

// Quantas camadas estão abertas ao mesmo tempo (drawer + checkout, por exemplo).
//
// Sem esse contador, fechar o drawer enquanto o checkout está aberto devolveria
// o scroll do fundo: a limpeza do drawer zera o overflow sem saber que ainda
// tem gente por cima.
let camadas = 0

export function useTravaScroll(ativo) {
  useEffect(() => {
    if (!ativo) return

    camadas += 1
    document.body.style.overflow = "hidden"

    return () => {
      camadas -= 1
      if (camadas === 0) document.body.style.overflow = ""
    }
  }, [ativo])
}
