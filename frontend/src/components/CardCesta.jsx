import PlaceholderFoto from "./PlaceholderFoto"
import BotaoWhatsApp from "./BotaoWhatsApp"
import { mensagemCesta } from "../utils/whatsapp"

export default function CardCesta({ cesta }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col">
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
          <BotaoWhatsApp
            mensagem={mensagemCesta(cesta)}
            className="px-4 py-2 rounded-full"
          >
            Pedir agora
          </BotaoWhatsApp>
        </div>
      </div>
    </div>
  )
}
