import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  estadoVazio,
  faixaWhatsapp,
  mercadoConfig,
  mercadoHero,
  mercadoProdutos,
  mercadoSecoes,
} from "../data/mercadoContent"
import {
  buscaForaDoEscopo,
  buscaSemResultado,
  escopoLoja,
} from "../data/escopoLoja"
import CardProduto from "../components/CardProduto"
import BotaoWhatsApp from "../components/BotaoWhatsApp"
import { useCarrinho } from "../context/CarrinhoContext"
import { mensagemMercado } from "../utils/whatsapp"
import { formatarPreco } from "../utils/preco"
import { categoriaForaDeEscopo, filtrarPorBusca } from "../utils/busca"

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

// Cartão usado nos três estados sem produto na tela.
function AvisoBusca({ titulo, children, acao }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 px-6 py-16 text-center">
      <h3 className="font-titulos font-extrabold text-2xl uppercase text-vermelho-escuro">
        {titulo}
      </h3>
      <div className="text-sm text-gray-500 mt-2 max-w-md mx-auto space-y-2">
        {children}
      </div>
      <div className="mt-6 flex justify-center">{acao}</div>
    </div>
  )
}

export default function Mercado() {
  const [secao, setSecao] = useState(TODOS)
  const [pagina, setPagina] = useState(1)
  const { itens, total } = useCarrinho()
  const [params, setParams] = useSearchParams()
  const busca = (params.get("busca") ?? "").trim()

  // Produto de outro ramo (farmácia, eletrônico…) nem chega a ser procurado no
  // catálogo: a loja já sabe que não vende.
  const categoriaBloqueada = useMemo(
    () => (busca ? categoriaForaDeEscopo(busca) : null),
    [busca]
  )

  // Busca nova recomeça do zero: sem corredor fixo e na primeira página.
  useEffect(() => {
    setSecao(TODOS)
    setPagina(1)
  }, [busca])

  const filtrados = useMemo(() => {
    if (categoriaBloqueada) return []

    const porBusca = busca
      ? filtrarPorBusca(mercadoProdutos, busca)
      : mercadoProdutos

    return secao === TODOS
      ? porBusca
      : porBusca.filter((produto) => produto.secao === secao)
  }, [busca, categoriaBloqueada, secao])

  const limparBusca = () => {
    params.delete("busca")
    setParams(params)
  }

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
          <div>
            <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase">
              {busca
                ? `Resultados para “${busca}”`
                : secao === TODOS
                  ? "Todos os produtos"
                  : secao}
            </h2>
            {busca && (
              <button
                type="button"
                onClick={limparBusca}
                className="text-vermelho font-bold text-sm hover:underline mt-1"
              >
                ← Limpar busca e ver todos os produtos
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {filtrados.length}{" "}
            {filtrados.length === 1 ? "produto" : "produtos"}
            {paginas > 1 && ` • página ${paginaAtual} de ${paginas}`}
          </p>
        </div>

        {categoriaBloqueada ? (
          <AvisoBusca
            titulo={buscaForaDoEscopo.titulo}
            acao={
              <button
                type="button"
                onClick={limparBusca}
                className="border-2 border-vermelho text-vermelho font-bold px-6 py-3 rounded-md hover:bg-vermelho hover:text-white transition-all"
              >
                {buscaForaDoEscopo.botao}
              </button>
            }
          >
            <p>
              “{busca}” é item de{" "}
              <strong className="text-vermelho-escuro">
                {categoriaBloqueada}
              </strong>
              , e a loja não trabalha com esse tipo de produto.
            </p>
            <p>{escopoLoja.resumo}</p>
          </AvisoBusca>
        ) : busca && visiveis.length === 0 ? (
          <AvisoBusca
            titulo={buscaSemResultado.titulo}
            acao={
              <BotaoWhatsApp
                mensagem={`Olá! Procurei por "${busca}" no site e não encontrei. Vocês têm esse produto?`}
                className="px-6 py-3 rounded-md"
              >
                {buscaSemResultado.botao}
              </BotaoWhatsApp>
            }
          >
            <p>
              Nenhum produto do catálogo bate com “{busca}”
              {secao !== TODOS && ` no corredor ${secao}`}.
            </p>
            <p>{buscaSemResultado.texto}</p>
          </AvisoBusca>
        ) : visiveis.length === 0 ? (
          <AvisoBusca
            titulo={estadoVazio.titulo}
            acao={
              <BotaoWhatsApp
                mensagem={`Olá! Queria saber sobre os produtos do corredor ${secao}.`}
                className="px-6 py-3 rounded-md"
              >
                Falar com atendente
              </BotaoWhatsApp>
            }
          >
            <p>{estadoVazio.texto}</p>
          </AvisoBusca>
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
