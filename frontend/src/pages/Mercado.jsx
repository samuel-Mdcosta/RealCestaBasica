import { useMemo, useState } from "react"
import {
  estadoVazio,
  faixaWhatsapp,
  mercadoConfig,
  mercadoHero,
  mercadoProdutos,
  mercadoSecoes,
} from "../data/mercadoContent"
import CardProduto from "../components/CardProduto"
import BotaoWhatsApp from "../components/BotaoWhatsApp"
import { useCarrinho } from "../context/CarrinhoContext"
import { mensagemMercado } from "../utils/whatsapp"
import { formatarPreco } from "../utils/preco"

const TODOS = "Todos os corredores"

function Corredor({ ativo, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap border-2 transition-all ${
        ativo
          ? "bg-vermelho text-white border-vermelho"
          : "bg-white text-gray-700 border-black/5 hover:border-vermelho hover:text-vermelho"
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Mercado() {
  const [secao, setSecao] = useState(TODOS)
  const [pagina, setPagina] = useState(1)
  const { itens, total } = useCarrinho()

  const filtrados = useMemo(
    () =>
      secao === TODOS
        ? mercadoProdutos
        : mercadoProdutos.filter((produto) => produto.secao === secao),
    [secao]
  )

  const paginas = Math.max(
    1,
    Math.ceil(filtrados.length / mercadoConfig.itensPorPagina)
  )
  const paginaAtual = Math.min(pagina, paginas)
  const inicio = (paginaAtual - 1) * mercadoConfig.itensPorPagina
  const visiveis = filtrados.slice(inicio, inicio + mercadoConfig.itensPorPagina)

  const escolherSecao = (nome) => {
    setSecao(nome)
    setPagina(1)
  }

  const irParaPagina = (numero) => {
    setPagina(numero)
    document
      .getElementById("produtos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="flex-grow">
      <section className="bg-amarelo">
        <div className="container mx-auto px-4 py-16">
          <span className="inline-block bg-vermelho text-white font-bold text-xs px-3 py-1.5 rounded font-titulos tracking-wide">
            {mercadoHero.selo}
          </span>

          <h1 className="font-titulos font-extrabold text-4xl md:text-5xl leading-tight mt-4 text-vermelho-escuro uppercase max-w-3xl">
            {mercadoHero.titulo}
          </h1>

          <p className="text-sm text-vermelho-escuro/70 mt-4 max-w-2xl">
            {mercadoHero.subtitulo}
          </p>
        </div>
      </section>

      <section id="produtos" className="container mx-auto px-4 py-16 scroll-mt-44 md:scroll-mt-36">
        <div className="flex flex-wrap gap-2 justify-center">
          <Corredor
            ativo={secao === TODOS}
            onClick={() => escolherSecao(TODOS)}
          >
            <span aria-hidden="true">🛒</span>
            {TODOS}
          </Corredor>

          {mercadoSecoes.map((item) => (
            <Corredor
              key={item.nome}
              ativo={secao === item.nome}
              onClick={() => escolherSecao(item.nome)}
            >
              <span aria-hidden="true">{item.icone}</span>
              {item.nome}
            </Corredor>
          ))}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3 mt-12 mb-8">
          <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase">
            {secao === TODOS ? "Todos os produtos" : secao}
          </h2>
          <p className="text-sm text-gray-500">
            {filtrados.length}{" "}
            {filtrados.length === 1 ? "produto" : "produtos"}
            {paginas > 1 && ` • página ${paginaAtual} de ${paginas}`}
          </p>
        </div>

        {visiveis.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 px-6 py-16 text-center">
            <h3 className="font-titulos font-extrabold text-2xl uppercase text-vermelho-escuro">
              {estadoVazio.titulo}
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              {estadoVazio.texto}
            </p>
            <BotaoWhatsApp
              mensagem={`Olá! Queria saber sobre os produtos do corredor ${secao}.`}
              className="mt-6 px-6 py-3 rounded-md"
            >
              Falar com atendente
            </BotaoWhatsApp>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visiveis.map((produto) => (
              <CardProduto key={produto.nome} produto={produto} />
            ))}
          </div>
        )}

        {paginas > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            <button
              type="button"
              onClick={() => irParaPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
              className="px-4 py-2 rounded-md border-2 border-vermelho text-vermelho font-bold text-sm hover:bg-vermelho hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              Anterior
            </button>

            {Array.from({ length: paginas }, (_, i) => i + 1).map((numero) => (
              <button
                key={numero}
                type="button"
                onClick={() => irParaPagina(numero)}
                aria-current={numero === paginaAtual ? "page" : undefined}
                className={`h-10 w-10 rounded-md font-bold text-sm transition-all ${
                  numero === paginaAtual
                    ? "bg-vermelho text-white"
                    : "bg-white text-gray-700 border border-black/10 hover:border-vermelho hover:text-vermelho"
                }`}
              >
                {numero}
              </button>
            ))}

            <button
              type="button"
              onClick={() => irParaPagina(paginaAtual + 1)}
              disabled={paginaAtual === paginas}
              className="px-4 py-2 rounded-md border-2 border-vermelho text-vermelho font-bold text-sm hover:bg-vermelho hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              Próxima
            </button>
          </div>
        )}
      </section>

      <section className="bg-vermelho text-white">
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <h2 className="font-titulos font-extrabold text-2xl md:text-3xl uppercase">
            {faixaWhatsapp.texto}
          </h2>
          <BotaoWhatsApp
            mensagem={mensagemMercado(itens, formatarPreco(total))}
            cor="amarelo"
            className="px-6 py-3 rounded-md flex-shrink-0"
          >
            {faixaWhatsapp.botao}
          </BotaoWhatsApp>
        </div>
      </section>
    </main>
  )
}
