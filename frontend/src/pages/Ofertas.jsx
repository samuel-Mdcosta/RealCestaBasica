import {
  ofertaAvisoLegal,
  ofertaBrinde,
  ofertaFaixaFinal,
  ofertaItem,
  ofertaItens,
  ofertaItensTitulo,
  ofertaProduto,
} from "../data/ofertasContent"
import PlaceholderFoto from "../components/PlaceholderFoto"
import BotaoPedido from "../components/BotaoPedido"
import ComoFunciona from "../components/ComoFunciona"

function Preco({ valor, className = "", centavosClassName = "" }) {
  const [inteiro, centavos] = valor.split(",")
  return (
    <p className={className}>
      {inteiro}
      <span className={centavosClassName}>,{centavos}</span>
    </p>
  )
}

export default function Ofertas() {
  return (
    <main className="flex-grow">
      <section className="bg-amarelo">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block bg-vermelho text-white font-bold text-xs px-3 py-1.5 rounded font-titulos tracking-wide">
                {ofertaProduto.selo}
              </span>
              <span className="inline-block bg-vermelho-escuro text-white font-bold text-xs px-3 py-1.5 rounded font-titulos tracking-wide">
                {ofertaProduto.desconto}
              </span>
            </div>

            <p className="text-sm font-semibold text-vermelho-escuro/80 mt-4">
              {ofertaProduto.categoria}
            </p>

            <h1 className="font-titulos font-extrabold text-4xl md:text-5xl leading-tight mt-1 text-vermelho-escuro uppercase">
              {ofertaProduto.nome}
            </h1>

            <p className="text-sm text-vermelho-escuro/70 mt-4 max-w-xl">
              {ofertaProduto.descricao}
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-lg text-vermelho-escuro/60 line-through">
                {ofertaProduto.precoDe}
              </p>
              <p className="text-sm font-bold text-vermelho-escuro">
                Economize {ofertaProduto.economia}
              </p>
            </div>

            <Preco
              valor={ofertaProduto.precoPor}
              className="font-titulos font-extrabold text-5xl md:text-6xl text-vermelho leading-none"
              centavosClassName="text-2xl md:text-3xl align-top"
            />

            <p className="text-sm text-vermelho-escuro/80 mt-2">
              {ofertaProduto.pagamento}
            </p>

            <div className="mt-6">
              <BotaoPedido
                produto={ofertaItem}
                className="px-6 py-3 rounded-md shadow-sm"
              >
                {ofertaProduto.cta}
              </BotaoPedido>
            </div>

            <p className="text-sm text-vermelho-escuro/70 mt-4">
              {ofertaProduto.nota}
            </p>

            <ul className="flex flex-wrap gap-2 mt-6">
              {ofertaProduto.selos.map((selo) => (
                <li
                  key={selo}
                  className="bg-white/70 text-vermelho-escuro text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  {selo}
                </li>
              ))}
            </ul>
          </div>

          <PlaceholderFoto
            texto={ofertaProduto.foto}
            className="rounded-2xl h-64 md:h-96"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase">
            {ofertaItensTitulo}
          </h2>
          <p className="text-sm text-gray-500">
            {ofertaItens.length} itens • rende 1 mês (3–4 pessoas)
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ofertaItens.map((item) => (
            <li
              key={item.nome}
              className="bg-white rounded-2xl shadow-sm border border-black/5 p-4 flex items-start justify-between gap-3"
            >
              <span className="text-sm font-semibold text-gray-700">
                {item.nome}
              </span>
              <span className="flex-shrink-0 bg-amarelo/25 text-vinho font-titulos font-bold text-sm px-2.5 py-1 rounded whitespace-nowrap">
                {item.qtd}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mt-6">{ofertaAvisoLegal}</p>
      </section>

      <section className="bg-fundo-claro">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden grid md:grid-cols-2 items-stretch">
            <div className="relative min-h-56">
              <PlaceholderFoto
                texto={ofertaBrinde.foto}
                className="h-full w-full min-h-56"
              />
              <span className="absolute top-3 left-3 bg-whatsapp text-white font-bold text-xs px-3 py-1 rounded font-titulos tracking-wide">
                {ofertaBrinde.etiqueta}
              </span>
            </div>

            <div className="p-8 flex flex-col items-start justify-center">
              <span className="inline-block bg-amarelo text-vermelho-escuro font-bold text-xs px-3 py-1.5 rounded font-titulos tracking-wide">
                {ofertaBrinde.selo}
              </span>

              <h2 className="font-titulos font-extrabold text-2xl md:text-3xl text-black uppercase mt-4">
                {ofertaBrinde.nome}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                {ofertaBrinde.descricao}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-vermelho text-white">
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="font-titulos font-extrabold text-2xl md:text-3xl uppercase">
              {ofertaFaixaFinal.titulo}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {ofertaFaixaFinal.subtitulo}
            </p>
          </div>

          <BotaoPedido
            produto={ofertaItem}
            cor="amarelo"
            className="px-6 py-3 rounded-md flex-shrink-0"
          >
            {ofertaFaixaFinal.botao}
          </BotaoPedido>
        </div>
      </section>

      <ComoFunciona />
    </main>
  )
}
