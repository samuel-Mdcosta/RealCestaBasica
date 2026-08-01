import { useState } from "react"
import { cestas } from "../data/siteContent"
import {
  cestasHero,
  cestasListagem,
  comparacao,
  cestasChamadas,
} from "../data/cestasContent"
import CardCesta from "../components/CardCesta"
import BotaoWhatsApp from "../components/BotaoWhatsApp"
import ComoFunciona from "../components/ComoFunciona"

export default function Cestas() {
  const [expandido, setExpandido] = useState(false)

  const visiveis = expandido
    ? cestas
    : cestas.slice(0, cestasListagem.visiveisInicial)
  const restantes = cestas.length - visiveis.length

  return (
    <main className="flex-grow">
      <section className="bg-amarelo">
        <div className="container mx-auto px-4 py-16">
          <span className="inline-block bg-vermelho text-white font-bold text-xs px-3 py-1.5 rounded font-titulos tracking-wide">
            {cestasHero.selo}
          </span>

          <h1 className="font-titulos font-extrabold text-4xl md:text-5xl leading-tight mt-4 text-vermelho-escuro uppercase max-w-3xl">
            {cestasHero.titulo}
          </h1>

          <p className="text-sm text-vermelho-escuro/70 mt-4 max-w-2xl">
            {cestasHero.texto}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase mb-8">
          {cestasListagem.titulo}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiveis.map((cesta) => (
            <CardCesta key={cesta.sigla} cesta={cesta} />
          ))}
        </div>

        {restantes > 0 && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => setExpandido(true)}
              className="border-2 border-vermelho text-vermelho font-bold px-6 py-3 rounded-md hover:bg-vermelho hover:text-white transition-all"
            >
              Ver mais {restantes} {restantes === 1 ? "modelo" : "modelos"} de
              cesta
            </button>
          </div>
        )}
      </section>

      <section id="comparacao" className="bg-fundo-claro">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase mb-8">
            {comparacao.titulo}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] border-collapse">
                <thead>
                  <tr className="bg-vermelho text-white font-titulos font-bold tracking-wide">
                    <th className="text-left px-5 py-3">PRODUTO</th>
                    {comparacao.colunas.map((coluna, i) => (
                      <th
                        key={coluna}
                        className={`px-2 py-3 text-center ${
                          i === comparacao.destaque ? "bg-vermelho-escuro" : ""
                        }`}
                      >
                        {coluna}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {comparacao.linhas.map((linha) => (
                    <tr key={linha.produto} className="border-t border-black/5">
                      <td className="px-5 py-2.5 text-sm font-semibold text-gray-700">
                        {linha.produto}
                      </td>
                      {linha.valores.map((valor, i) => (
                        <td
                          key={comparacao.colunas[i]}
                          className={`px-2 py-2.5 text-center text-sm ${
                            i === comparacao.destaque
                              ? "bg-amarelo/15 font-bold text-vinho"
                              : "text-gray-500"
                          }`}
                        >
                          {valor}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="border-t-2 border-black/10">
                    <td className="px-5 py-4 font-titulos font-extrabold text-xl">
                      TOTAL
                    </td>
                    {comparacao.totais.map((total, i) => (
                      <td
                        key={comparacao.colunas[i]}
                        className={`px-2 py-4 text-center font-titulos font-extrabold text-lg text-vermelho ${
                          i === comparacao.destaque ? "bg-amarelo/15" : ""
                        }`}
                      >
                        {total}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">{comparacao.nota}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-6">
        <div className="bg-amarelo rounded-2xl p-8 flex flex-col items-start">
          <h3 className="font-titulos font-extrabold text-2xl md:text-3xl text-vermelho-escuro uppercase">
            {cestasChamadas.duvida.titulo}
          </h3>
          <p className="text-sm text-vermelho-escuro/80 mt-2">
            {cestasChamadas.duvida.texto}
          </p>
          <BotaoWhatsApp
            mensagem={cestasChamadas.duvida.mensagem}
            className="mt-6 px-6 py-3 rounded-md"
          >
            {cestasChamadas.duvida.botao}
          </BotaoWhatsApp>
        </div>

        <div className="bg-vermelho text-white rounded-2xl p-8 flex flex-col items-start">
          <h3 className="font-titulos font-extrabold text-2xl md:text-3xl uppercase">
            {cestasChamadas.empresas.titulo}
          </h3>
          <p className="text-sm text-white/80 mt-2">
            {cestasChamadas.empresas.texto}
          </p>
          <BotaoWhatsApp
            mensagem={cestasChamadas.empresas.mensagem}
            cor="amarelo"
            className="mt-6 px-6 py-3 rounded-md"
          >
            {cestasChamadas.empresas.botao}
          </BotaoWhatsApp>
        </div>
      </section>

      <ComoFunciona />
    </main>
  )
}
