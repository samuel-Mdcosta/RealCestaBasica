import { Link } from "react-router-dom"
import { naoEncontrada } from "../data/siteContent"
import BotaoWhatsApp from "../components/BotaoWhatsApp"

// Rota curinga do App: cai aqui qualquer URL que não bate com as páginas reais,
// inclusive link velho compartilhado no WhatsApp. Fica dentro do MainLayouts, de
// propósito — com header, busca e menu o cliente se recupera sozinho em vez de
// encarar uma tela morta.
export default function NaoEncontrada() {
  return (
    <main className="flex-grow bg-amarelo">
      <div className="container mx-auto px-4 py-20 md:py-28 max-w-2xl text-center">
        <p className="font-titulos font-extrabold text-6xl md:text-7xl text-vermelho leading-none">
          {naoEncontrada.codigo}
        </p>

        <h1 className="font-titulos font-extrabold text-3xl md:text-4xl mt-4 text-vermelho-escuro uppercase">
          {naoEncontrada.titulo}
        </h1>

        <p className="text-gray-800 mt-4">{naoEncontrada.texto}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {naoEncontrada.botoes.map((botao, i) => (
            <Link
              key={botao.to}
              to={botao.to}
              className={
                i === 0
                  ? "bg-vermelho-escuro text-white font-bold px-6 py-3 rounded-md hover:brightness-110 transition-all"
                  : "bg-white text-gray-900 font-bold px-6 py-3 rounded-md shadow-sm hover:brightness-95 transition-all"
              }
            >
              {botao.texto}
            </Link>
          ))}

          <BotaoWhatsApp
            mensagem={naoEncontrada.ctaMensagem}
            className="px-6 py-3 rounded-md shadow-sm"
          >
            {naoEncontrada.cta}
          </BotaoWhatsApp>
        </div>
      </div>
    </main>
  )
}
