import { useEffect, useMemo, useState } from "react"
import { useCheckout } from "../context/CheckoutContext"
import {
  checkoutCampos,
  checkoutContent,
  checkoutErros,
  entregaConfig,
  formasPagamento,
  opcoesEntrega,
  precoIndisponivel,
} from "../data/entregaContent"
import {
  calcularTotais,
  cidadeAtendida,
  formaPagamento,
  opcaoEntrega,
} from "../utils/entrega"
import { formatarPreco, precoParaNumero } from "../utils/preco"
import { linkWhatsApp, mensagemPedido } from "../utils/whatsapp"
import Modal from "./Modal"

const CHAVE_SALVA = "realcesta:cliente"

const DADOS_VAZIOS = {
  nome: "",
  entrega: opcoesEntrega[0].id,
  rua: "",
  numero: "",
  bairro: "",
  complemento: "",
  cidade: entregaConfig.cidade,
  referencia: "",
  pagamento: formasPagamento[0].id,
  troco: "",
}

// Cliente que já pediu uma vez não redigita o endereço inteiro.
function lerSalvo() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_SALVA))
    return salvo ? { ...DADOS_VAZIOS, ...salvo, troco: "" } : DADOS_VAZIOS
  } catch {
    return DADOS_VAZIOS
  }
}

function validar(dados, totais) {
  const erros = {}

  if (!dados.nome.trim()) erros.nome = checkoutErros.nome

  if (opcaoEntrega(dados.entrega).pedeEndereco) {
    if (!dados.rua.trim()) erros.rua = checkoutErros.rua
    if (!dados.numero.trim()) erros.numero = checkoutErros.numero
    if (!dados.bairro.trim()) erros.bairro = checkoutErros.bairro
    if (!cidadeAtendida(dados.cidade)) erros.cidade = checkoutErros.cidade
  }

  // Sem total fechado não dá pra dizer se o troco cobre o pedido.
  const pagamento = formaPagamento(dados.pagamento)
  if (
    pagamento.pedeTroco &&
    dados.troco.trim() &&
    !totais.temPrecoAberto &&
    precoParaNumero(dados.troco) < totais.total
  ) {
    erros.troco = checkoutErros.troco
  }

  return erros
}

function Campo({ id, campo, valor, erro, aoMudar, ...props }) {
  return (
    <div className="flex-grow">
      <label
        htmlFor={id}
        className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide"
      >
        {campo.label}
      </label>
      <input
        id={id}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={campo.placeholder}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : undefined}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-vermelho/30 ${
          erro ? "border-vermelho" : "border-black/15 focus:border-vermelho"
        }`}
        {...props}
      />
      {erro && (
        <p id={`${id}-erro`} className="text-xs text-vermelho mt-1">
          {erro}
        </p>
      )}
    </div>
  )
}

function Escolha({ grupo, opcao, marcada, aoEscolher, direita }) {
  return (
    <label
      className={`flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
        marcada ? "border-vermelho bg-vermelho/5" : "border-black/10 hover:border-vermelho/40"
      }`}
    >
      <input
        type="radio"
        name={grupo}
        value={opcao.id}
        checked={marcada}
        onChange={() => aoEscolher(opcao.id)}
        className="mt-1 accent-vermelho"
      />
      <span className="flex-grow">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-bold text-gray-800">{opcao.nome}</span>
          {direita && (
            <span className="text-sm font-titulos font-extrabold text-vermelho">
              {direita}
            </span>
          )}
        </span>
        <span className="block text-xs text-gray-500 mt-0.5">{opcao.nota}</span>
      </span>
    </label>
  )
}

function Linha({ label, valor, forte = false }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={forte ? "font-titulos font-bold uppercase tracking-wide" : "text-sm text-gray-600"}>
        {label}
      </span>
      <span
        className={
          forte
            ? "font-titulos font-extrabold text-2xl text-vermelho"
            : "text-sm font-semibold text-gray-800"
        }
      >
        {valor}
      </span>
    </div>
  )
}

export default function CheckoutBox() {
  const { aberto, itens, fechar } = useCheckout()
  const [passo, setPasso] = useState("dados")
  const [dados, setDados] = useState(lerSalvo)
  const [erros, setErros] = useState({})

  // Toda abertura recomeça na tela de dados, mesmo depois de um envio.
  useEffect(() => {
    if (aberto) {
      setPasso("dados")
      setErros({})
    }
  }, [aberto])

  const totais = useMemo(
    () => calcularTotais(itens, dados.entrega),
    [itens, dados.entrega]
  )

  const entrega = totais.opcao
  const pagamento = formaPagamento(dados.pagamento)

  const alterar = (campo) => (valor) => {
    setDados((atuais) => ({ ...atuais, [campo]: valor }))
    setErros((atuais) => ({ ...atuais, [campo]: undefined }))
  }

  const avancar = (e) => {
    e.preventDefault()
    const encontrados = validar(dados, totais)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return

    try {
      const { troco, ...guardar } = dados
      localStorage.setItem(CHAVE_SALVA, JSON.stringify(guardar))
    } catch {
      // Sem localStorage o checkout funciona igual, só não lembra do endereço.
    }

    setPasso("resumo")
  }

  const totalTexto = totais.temPrecoAberto
    ? precoIndisponivel.rotulo
    : formatarPreco(totais.total)

  const mensagem = mensagemPedido({
    itens,
    nome: dados.nome.trim(),
    entrega,
    endereco: dados,
    pagamento,
    troco: dados.troco.trim() ? precoParaNumero(dados.troco) : 0,
    totais,
  })

  return (
    <Modal aberto={aberto} aoFechar={fechar} titulo={checkoutContent.titulo}>
      <div className="bg-vermelho text-white px-5 py-4 flex items-start justify-between gap-3 flex-shrink-0 rounded-t-2xl">
        <div>
          <h2 className="font-titulos font-extrabold text-xl uppercase tracking-wide">
            {checkoutContent.titulo}
          </h2>
          <p className="text-xs text-white/80">
            {passo === "dados"
              ? checkoutContent.subtituloDados
              : checkoutContent.subtituloResumo}
          </p>
        </div>

        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="p-2 -mr-2 rounded-md hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {passo === "dados" ? (
        <form onSubmit={avancar} className="flex flex-col min-h-0 flex-grow">
          <div className="flex-grow overflow-y-auto px-5 py-4 space-y-5">
            <Campo
              id="checkout-nome"
              campo={checkoutCampos.nome}
              valor={dados.nome}
              erro={erros.nome}
              aoMudar={alterar("nome")}
              autoComplete="name"
            />

            <fieldset>
              <legend className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                Como você quer receber
              </legend>
              <div className="grid gap-2">
                {opcoesEntrega.map((opcao) => (
                  <Escolha
                    key={opcao.id}
                    grupo="entrega"
                    opcao={opcao}
                    marcada={dados.entrega === opcao.id}
                    aoEscolher={alterar("entrega")}
                    direita={opcao.valor > 0 ? formatarPreco(opcao.valor) : "Grátis"}
                  />
                ))}
              </div>
            </fieldset>

            {entrega.pedeEndereco && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Campo
                    id="checkout-rua"
                    campo={checkoutCampos.rua}
                    valor={dados.rua}
                    erro={erros.rua}
                    aoMudar={alterar("rua")}
                    autoComplete="address-line1"
                  />
                  <div className="w-24 flex-shrink-0">
                    <Campo
                      id="checkout-numero"
                      campo={checkoutCampos.numero}
                      valor={dados.numero}
                      erro={erros.numero}
                      aoMudar={alterar("numero")}
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Campo
                    id="checkout-bairro"
                    campo={checkoutCampos.bairro}
                    valor={dados.bairro}
                    erro={erros.bairro}
                    aoMudar={alterar("bairro")}
                  />
                  <Campo
                    id="checkout-cidade"
                    campo={checkoutCampos.cidade}
                    valor={dados.cidade}
                    erro={erros.cidade}
                    aoMudar={alterar("cidade")}
                  />
                </div>

                <Campo
                  id="checkout-complemento"
                  campo={checkoutCampos.complemento}
                  valor={dados.complemento}
                  aoMudar={alterar("complemento")}
                />

                <Campo
                  id="checkout-referencia"
                  campo={checkoutCampos.referencia}
                  valor={dados.referencia}
                  aoMudar={alterar("referencia")}
                />
              </div>
            )}

            <fieldset>
              <legend className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                Forma de pagamento
              </legend>
              <div className="grid gap-2">
                {formasPagamento.map((forma) => (
                  <Escolha
                    key={forma.id}
                    grupo="pagamento"
                    opcao={forma}
                    marcada={dados.pagamento === forma.id}
                    aoEscolher={alterar("pagamento")}
                  />
                ))}
              </div>
            </fieldset>

            {pagamento.pedeTroco && (
              <Campo
                id="checkout-troco"
                campo={checkoutCampos.troco}
                valor={dados.troco}
                erro={erros.troco}
                aoMudar={alterar("troco")}
                inputMode="decimal"
              />
            )}
          </div>

          <div className="border-t border-black/10 p-5 flex-shrink-0">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm text-gray-600">
                {itens.length} {itens.length === 1 ? "item" : "itens"} + entrega
              </span>
              <span className="font-titulos font-extrabold text-xl text-vermelho">
                {totalTexto}
              </span>
            </div>

            <button
              type="submit"
              disabled={itens.length === 0}
              className="w-full px-6 py-3 rounded-md bg-vermelho text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {checkoutContent.botaoAvancar}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto px-5 py-4 space-y-4">
            <ul className="divide-y divide-black/5">
              {itens.map((item) => (
                <li
                  key={item.id ?? item.nome}
                  className="py-2 flex items-baseline justify-between gap-3"
                >
                  <span className="text-sm text-gray-700">
                    {item.quantidade ?? 1}x {item.nome}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
                    {formatarPreco(
                      precoParaNumero(item.preco) * (item.quantidade ?? 1)
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-1 border-t border-black/10 pt-3">
              <Linha
                label={checkoutContent.labelSubtotal}
                valor={formatarPreco(totais.subtotal)}
              />
              <Linha
                label={`${checkoutContent.labelFrete} — ${entrega.nome}`}
                valor={totais.frete > 0 ? formatarPreco(totais.frete) : "Grátis"}
              />
              <div className="pt-2">
                <Linha label={checkoutContent.labelTotal} valor={totalTexto} forte />
              </div>
            </div>

            {totais.temPrecoAberto && (
              <p className="text-xs text-vermelho-escuro bg-amarelo/40 rounded-md p-3">
                {precoIndisponivel.aviso}
              </p>
            )}

            <dl className="text-sm text-gray-600 space-y-1 border-t border-black/10 pt-3">
              <div className="flex gap-2">
                <dt className="font-semibold text-gray-800">Nome:</dt>
                <dd>{dados.nome.trim()}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-gray-800">Entrega:</dt>
                <dd>
                  {entrega.pedeEndereco
                    ? `${dados.rua}, ${dados.numero} — ${dados.bairro}, ${dados.cidade}/${entregaConfig.uf}`
                    : entrega.nome}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-gray-800">Pagamento:</dt>
                <dd>
                  {pagamento.nome}
                  {pagamento.pedeTroco && dados.troco.trim()
                    ? ` (troco para ${formatarPreco(precoParaNumero(dados.troco))})`
                    : ""}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-black/10 p-5 flex-shrink-0">
            <a
              href={linkWhatsApp(mensagem)}
              target="_blank"
              rel="noreferrer"
              onClick={fechar}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-whatsapp text-white font-bold hover:brightness-95 transition-all"
            >
              {checkoutContent.botaoEnviar}
            </a>

            <button
              type="button"
              onClick={() => setPasso("dados")}
              className="w-full text-xs text-gray-400 hover:text-vermelho transition-colors mt-3"
            >
              {checkoutContent.botaoVoltar}
            </button>

            <p className="text-[11px] text-gray-400 text-center mt-3">
              {checkoutContent.aviso}
            </p>
          </div>
        </>
      )}
    </Modal>
  )
}
