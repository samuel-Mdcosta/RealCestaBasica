import PlaceholderFoto from "./PlaceholderFoto"
import BotaoWhatsApp from "./BotaoWhatsApp"
import { mensagemCesta } from "../utils/whatsapp"

export default function CardCesta({ cesta, onSelecionar, selecionada = false }) {
  const clicavel = typeof onSelecionar === "function"

  const aoTeclar = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return
    e.preventDefault()
    onSelecionar()
  }

  return (
    <div
      onClick={clicavel ? onSelecionar : undefined}
      onKeyDown={clicavel ? aoTeclar : undefined}
      role={clicavel ? "button" : undefined}
      tabIndex={clicavel ? 0 : undefined}
      aria-pressed={clicavel ? selecionada : undefined}
      className={`bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col ${
        clicavel
          ? "cursor-pointer transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-vermelho"
          : ""
      } ${selecionada ? "ring-2 ring-vermelho" : ""}`}
    >
      <div className="relative h-56">
        <PlaceholderFoto texto={cesta.foto} className="h-full w-full" />
        <span className="absolute top-3 left-3 bg-amarelo text-vermelho-escuro font-bold text-xs px-3 py-1 rounded font-titulos tracking-wide">
          {cesta.tag}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-titulos font-bold text-2xl">{cesta.nome}</h3>
        <p className="text-gray-600 text-sm mt-2 flex-grow">{cesta.descricao}</p>

        <p className="text-sm text-gray-500 mt-4">
          {cesta.itens} itens • rende {cesta.rende}
        </p>

        <div className="flex items-center justify-between mt-6">
          <span className="font-titulos font-extrabold text-2xl text-vermelho">
            {cesta.preco}
          </span>
          <span onClick={(e) => e.stopPropagation()}>
            <BotaoWhatsApp
              mensagem={mensagemCesta(cesta)}
              className="px-4 py-2 rounded-full"
            >
              Pedir agora
            </BotaoWhatsApp>
          </span>
        </div>
      </div>
    </div>
  )
}
