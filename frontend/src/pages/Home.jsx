import {
  hero,
  cestasSection,
  cestas,
  mercadoSection,
  mercadoCategorias,
  comoFunciona,
} from "../data/siteContent"

const stripePattern = {
  backgroundImage:
    "repeating-linear-gradient(45deg, #ece0c4 0px, #ece0c4 12px, #e3d3ab 12px, #e3d3ab 24px)",
}

function PlaceholderFoto({ texto, className = "" }) {
  return (
    <div
      style={stripePattern}
      className={`flex items-center justify-center ${className}`}
    >
      <span className="bg-white/70 border border-black/10 text-gray-500 text-xs font-mono px-3 py-1 rounded">
        {texto}
      </span>
    </div>
  )
}

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
              {hero.botoes.map((botao, i) => (
                <button
                  key={botao}
                  className={
                    i === 0
                      ? "bg-vermelho-escuro text-white font-bold px-6 py-3 rounded-md hover:brightness-110 transition-all"
                      : "bg-white text-gray-900 font-bold px-6 py-3 rounded-md shadow-sm hover:brightness-95 transition-all"
                  }
                >
                  {botao}
                </button>
              ))}
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
          <a href="#" className="text-vermelho font-bold text-sm hover:underline whitespace-nowrap">
            {cestasSection.linkComparacao}
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cestas.map((cesta) => (
            <div
              key={cesta.sigla}
              className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col"
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
                  <button className="bg-whatsapp text-white font-bold px-4 py-2 rounded-full hover:brightness-95 transition-all">
                    Pedir agora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-fundo-claro">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-titulos font-extrabold text-3xl md:text-4xl text-black uppercase mb-8">
            {mercadoSection.titulo}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {mercadoCategorias.map((cat) => (
              <div
                key={cat.nome}
                className="flex flex-col items-center justify-center gap-3 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
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
    </main>
  )
}
