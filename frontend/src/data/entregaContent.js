// Regras de entrega e pagamento num lugar só. A CheckoutBox, a mensagem do
// WhatsApp e a copy do site leem tudo daqui — mudou o frete, mexe só nesta
// linha e o site inteiro acompanha.

export const entregaConfig = {
  cidade: "Campo Grande",
  uf: "MS",
  frete: 20,
  // Como o cliente pode escrever a cidade. Comparado sem acento e em
  // minúsculas, então basta a forma "limpa" de cada jeito comum de digitar.
  cidadeAceita: ["campo grande", "campo grande ms", "campo grande/ms", "cg"],
}

export const opcoesEntrega = [
  {
    id: "entrega",
    nome: "Entrega",
    valor: entregaConfig.frete,
    pedeEndereco: true,
    nota: `Frete fixo em ${entregaConfig.cidade}/${entregaConfig.uf}.`,
  },
  {
    id: "retirada",
    nome: "Retirar na loja",
    valor: 0,
    pedeEndereco: false,
    // Retirada não pede endereço, então serve pra quem é de fora da cidade.
    nota: "Sem taxa. Você combina o horário com o atendente.",
  },
]

export const formasPagamento = [
  {
    id: "pix",
    nome: "PIX",
    nota: "O atendente envia a chave no WhatsApp.",
  },
  {
    id: "cartao",
    nome: "Cartão",
    nota: "Sem taxa. O atendente envia o link de pagamento no WhatsApp.",
  },
  {
    id: "dinheiro",
    nome: "Dinheiro",
    nota: "Você paga na hora da entrega.",
    pedeTroco: true,
  },
]

// Usado pela topbar e pelo rodapé pra não escrever as formas de pagamento à mão
// de novo: "PIX • Cartão • Dinheiro".
export const pagamentosResumo = formasPagamento
  .map((forma) => forma.nome)
  .join(" • ")

export const checkoutContent = {
  titulo: "Finalizar pedido",
  subtituloDados: "Preencha os dados da entrega e do pagamento.",
  subtituloResumo: "Confira o pedido antes de enviar.",
  botaoAvancar: "Ver o total",
  botaoVoltar: "Voltar e corrigir",
  botaoEnviar: "Enviar pedido no WhatsApp",
  labelSubtotal: "Produtos",
  labelFrete: "Entrega",
  labelTotal: "Total",
  aviso:
    "Valores sujeitos a confirmação de preço e estoque pelo atendente antes do pagamento.",
  semItens: "Nenhum item no pedido.",
}

export const checkoutCampos = {
  nome: { label: "Seu nome", placeholder: "Como o atendente deve te chamar" },
  rua: { label: "Rua", placeholder: "Rua / Avenida" },
  numero: { label: "Número", placeholder: "123" },
  bairro: { label: "Bairro", placeholder: "Bairro" },
  complemento: { label: "Complemento", placeholder: "Apto, bloco (opcional)" },
  cidade: { label: "Cidade", placeholder: "Campo Grande" },
  referencia: {
    label: "Ponto de referência",
    placeholder: "Perto de… (opcional)",
  },
  troco: { label: "Troco para quanto?", placeholder: "Ex.: 100 (opcional)" },
}

export const checkoutErros = {
  nome: "Diga seu nome pro atendente saber com quem falar.",
  rua: "Informe a rua.",
  numero: "Informe o número.",
  bairro: "Informe o bairro.",
  cidade: `A loja entrega só em ${entregaConfig.cidade}/${entregaConfig.uf}. Se você é de fora, escolha "Retirar na loja".`,
  troco: "O troco precisa ser maior que o total do pedido.",
}

export const precoIndisponivel = {
  rotulo: "a combinar",
  aviso:
    "Um item do pedido está sem preço no site. O atendente fecha o valor com você no WhatsApp.",
}
