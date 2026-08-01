import { comoFunciona } from "../data/siteContent"

export default function ComoFunciona() {
  return (
    <section className="bg-vermelho text-white">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {comoFunciona.map((passo) => (
          <div key={passo.passo} className="flex items-start gap-4">
            <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-amarelo text-vermelho-escuro font-titulos font-extrabold text-lg">
              {passo.passo}
            </span>
            <div>
              <h3 className="font-titulos font-bold text-lg">{passo.titulo}</h3>
              <p className="text-white/80 text-sm mt-1">{passo.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
