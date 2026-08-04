import PlaceholderFoto from "./PlaceholderFoto"
import { useCarrinho } from "../context/CarrinhoContext"

export default function CardProduto({ produto }) {
  const { adicionar, abrir, quantidadeDe } = useCarrinho()
  const quantidade = quantidadeDe(produto)

  const aoAdicionar = () => {
    adicionar(produto)
    abrir()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col transition-shadow hover:shadow-md">
      <div className="relative h-32">
        <PlaceholderFoto texto={produto.secao} className="h-full w-full" />

        {quantidade > 0 && (
          <span className="absolute top-2 right-2 h-6 min-w-6 px-1.5 rounded-full bg-vermelho text-white text-xs font-bold flex items-center justify-center">
            {quantidade}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug flex-grow">
          {produto.nome}
        </h3>

        <div className="flex items-center justify-between gap-2 mt-4">
          <span className="font-titulos font-extrabold text-xl text-vermelho">
            {produto.preco}
          </span>

          <button
            type="button"
            onClick={aoAdicionar}
            aria-label={`Adicionar ${produto.nome} à lista`}
            className="h-9 w-9 flex-shrink-0 rounded-full bg-vermelho text-white text-2xl leading-none flex items-center justify-center hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-vermelho-escuro transition-all"
          >
            <span className="-mt-0.5" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
