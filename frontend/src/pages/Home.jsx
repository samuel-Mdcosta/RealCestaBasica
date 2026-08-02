import { Link } from "react-router-dom"
import {
  hero,
  cestasSection,
  cestasHome,
  mercadoSection,
  mercadoCategorias,
} from "../data/siteContent"
import PlaceholderFoto from "../components/PlaceholderFoto"
import CardCesta from "../components/CardCesta"
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

export default function Home() {
  return (
    <main className="flex-grow">
      <section className="bg-amarelo">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-vermelho text-white font-bold text-xs px-3 py-1.5 rounded font-titulos tracking-wide">
              {hero.selo}
            </span>

            <h1 className="font-titulos font-extrabold text-4xl md:text-5xl leading-tight mt-4 text-vermelho-escuro uppercase">
              {hero.titulo}
            </h1>

            <div className="mt-6 flex items-baseline gap-2">
              <p className="text-sm font-semibold text-vermelho-escuro/80">
                {hero.precoDestaque.label}
              </p>
            </div>
            <Preco
              valor={hero.precoDestaque.valor}
              className="font-titulos font-extrabold text-5xl md:text-6xl text-vermelho leading-none"
              centavosClassName="text-2xl md:text-3xl align-top"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {hero.botoes.map((botao, i) => {
                const estilo =
                  i === 0
                    ? "bg-vermelho-escuro text-white font-bold px-6 py-3 rounded-md hover:brightness-110 transition-all"
                    : "bg-white text-gray-900 font-bold px-6 py-3 rounded-md shadow-sm hover:brightness-95 transition-all"

                return botao.to ? (
                  <Link key={botao.texto} to={botao.to} className={estilo}>
                    {botao.texto}
                  </Link>
                ) : (
                  <button key={botao.texto} className={estilo}>
                    {botao.texto}
                  </button>
                )
              })}
            </div>

            <p className="text-sm text-vermelho-escuro/70 mt-4">{hero.nota}</p>
          </div>

          <PlaceholderFoto
            className="rounded-2xl h-64 md:h-96"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase">
            {cestasSection.titulo}
          </h2>
          <Link
            to="/cestas"
            className="text-vermelho font-bold text-sm hover:underline whitespace-nowrap"
          >
            {cestasSection.linkComparacao}
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cestasHome.map((cesta) => (
            <CardCesta key={cesta.sigla} cesta={cesta} />
          ))}
        </div>
      </section>

      <section className="bg-fundo-claro">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase mb-8">
            {mercadoSection.titulo}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {mercadoCategorias.map((cat) => (
              <div
                key={cat.nome}
                className="basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.667rem)] md:basis-[calc(16.666%-0.834rem)] flex flex-col items-center justify-center gap-3 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <span className="h-14 w-14 rounded-full bg-amarelo/30 flex items-center justify-center text-2xl">
                  {cat.icone}
                </span>
                <span className="text-sm font-bold text-gray-900 text-center">
                  {cat.nome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComoFunciona />
    </main>
  )
}
