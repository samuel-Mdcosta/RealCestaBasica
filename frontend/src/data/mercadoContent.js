// O telefone do checkout e o rodapé não ficam aqui: vêm de `footer` no
// siteContent.js, que já guarda o número real usado em todo o site.
// A moeda saiu daqui pro `siteConfig`: frete e cesta também são formatados com
// ela, e nenhum dos dois é "mercado".
export const mercadoConfig = {
  itensPorPagina: 20,
}

export const mercadoHero = {
  selo: "MERCADO ONLINE",
  titulo: "Tudo pra sua despensa, corredor por corredor",
  subtitulo:
    "Monte sua lista e envie pelo WhatsApp — um atendente confirma preços e estoque com você.",
}

export const mercadoSecoes = [
  { icone: "🌾", nome: "Grãos e Cereais" },
  { icone: "🥫", nome: "Mercearia" },
  { icone: "🍝", nome: "Massas" },
  { icone: "🍪", nome: "Biscoitos e Bolachas" },
  { icone: "🥫", nome: "Enlatados e Molhos" },
  { icone: "🍞", nome: "Padaria e Café" },
  { icone: "🥤", nome: "Bebidas" },
  { icone: "🧼", nome: "Limpeza" },
  { icone: "🪥", nome: "Higiene" },
]

export const mercadoProdutos = [
  { nome: "Arroz branco tipo 1 — 5 kg", preco: "R$ 24,90", secao: "Grãos e Cereais", oferta: true },
  { nome: "Feijão carioca — 1 kg", preco: "R$ 7,49", secao: "Grãos e Cereais", oferta: true },
  { nome: "Feijão preto — 1 kg", preco: "R$ 8,29", secao: "Grãos e Cereais", oferta: false },
  { nome: "Milho de pipoca — 500 g", preco: "R$ 4,99", secao: "Grãos e Cereais", oferta: false },
  { nome: "Aveia em flocos — 200 g", preco: "R$ 3,89", secao: "Grãos e Cereais", oferta: false },
  { nome: "Farinha de mandioca — 500 g", preco: "R$ 5,49", secao: "Grãos e Cereais", oferta: false },
  { nome: "Açúcar refinado — 1 kg", preco: "R$ 4,79", secao: "Mercearia", oferta: false },
  { nome: "Açúcar cristal — 2 kg", preco: "R$ 8,99", secao: "Mercearia", oferta: true },
  { nome: "Sal refinado — 1 kg", preco: "R$ 2,49", secao: "Mercearia", oferta: false },
  { nome: "Óleo de soja — 900 ml", preco: "R$ 6,79", secao: "Mercearia", oferta: true },
  { nome: "Farinha de trigo — 1 kg", preco: "R$ 5,29", secao: "Mercearia", oferta: false },
  { nome: "Vinagre de álcool — 750 ml", preco: "R$ 3,19", secao: "Mercearia", oferta: false },
  { nome: "Tempero completo — 300 g", preco: "R$ 4,49", secao: "Mercearia", oferta: false },
  { nome: "Macarrão espaguete — 500 g", preco: "R$ 3,99", secao: "Massas", oferta: false },
  { nome: "Macarrão parafuso — 500 g", preco: "R$ 4,19", secao: "Massas", oferta: false },
  { nome: "Macarrão instantâneo — 85 g", preco: "R$ 1,99", secao: "Massas", oferta: true },
  { nome: "Lasanha pré-cozida — 500 g", preco: "R$ 7,89", secao: "Massas", oferta: false },
  { nome: "Biscoito cream cracker — 400 g", preco: "R$ 5,49", secao: "Biscoitos e Bolachas", oferta: false },
  { nome: "Bolacha maisena — 400 g", preco: "R$ 4,99", secao: "Biscoitos e Bolachas", oferta: false },
  { nome: "Biscoito recheado chocolate — 130 g", preco: "R$ 2,99", secao: "Biscoitos e Bolachas", oferta: true },
  { nome: "Bolacha água e sal — 400 g", preco: "R$ 5,29", secao: "Biscoitos e Bolachas", oferta: false },
  { nome: "Molho de tomate — 340 g", preco: "R$ 2,79", secao: "Enlatados e Molhos", oferta: false },
  { nome: "Milho verde em conserva — 170 g", preco: "R$ 3,49", secao: "Enlatados e Molhos", oferta: false },
  { nome: "Ervilha em conserva — 170 g", preco: "R$ 3,29", secao: "Enlatados e Molhos", oferta: false },
  { nome: "Sardinha em lata — 125 g", preco: "R$ 5,99", secao: "Enlatados e Molhos", oferta: true },
  { nome: "Atum em lata — 170 g", preco: "R$ 8,49", secao: "Enlatados e Molhos", oferta: false },
  { nome: "Café torrado e moído — 500 g", preco: "R$ 16,90", secao: "Padaria e Café", oferta: true },
  { nome: "Pão de forma tradicional — 500 g", preco: "R$ 7,49", secao: "Padaria e Café", oferta: false },
  { nome: "Achocolatado em pó — 400 g", preco: "R$ 7,99", secao: "Padaria e Café", oferta: false },
  { nome: "Margarina — 500 g", preco: "R$ 6,89", secao: "Padaria e Café", oferta: false },
  { nome: "Leite integral — 1 L", preco: "R$ 5,49", secao: "Bebidas", oferta: false },
  { nome: "Suco em pó — 25 g", preco: "R$ 1,29", secao: "Bebidas", oferta: false },
  { nome: "Refrigerante cola — 2 L", preco: "R$ 8,99", secao: "Bebidas", oferta: true },
  { nome: "Água mineral — 1,5 L", preco: "R$ 2,99", secao: "Bebidas", oferta: false },
  { nome: "Sabão em pó — 1,6 kg", preco: "R$ 18,90", secao: "Limpeza", oferta: true },
  { nome: "Detergente neutro — 500 ml", preco: "R$ 2,79", secao: "Limpeza", oferta: false },
  { nome: "Água sanitária — 1 L", preco: "R$ 4,29", secao: "Limpeza", oferta: false },
  { nome: "Amaciante — 2 L", preco: "R$ 12,90", secao: "Limpeza", oferta: false },
  { nome: "Esponja de aço — 8 un", preco: "R$ 3,49", secao: "Limpeza", oferta: false },
  { nome: "Sabonete — 85 g", preco: "R$ 2,29", secao: "Higiene", oferta: false },
  { nome: "Creme dental — 90 g", preco: "R$ 4,99", secao: "Higiene", oferta: false },
  { nome: "Papel higiênico — 4 rolos", preco: "R$ 6,49", secao: "Higiene", oferta: true },
  { nome: "Shampoo — 350 ml", preco: "R$ 11,90", secao: "Higiene", oferta: false },
]

// O botão não vai mais direto pro WhatsApp: abre o checkout, que pega endereço,
// frete e pagamento antes. Daí "finalizar" no lugar de "enviar".
export const faixaPedido = {
  texto: "Montou a lista? Veja o total com a entrega.",
  botao: "Finalizar pedido",
}

export const estadoVazio = {
  titulo: "Nenhum produto cadastrado ainda",
  texto:
    "Os produtos deste corredor aparecerão aqui assim que forem cadastrados. Enquanto isso, chame a loja no WhatsApp.",
}

export const carrinhoVazio = {
  titulo: "Sua lista está vazia",
  texto: "Use o botão + nos produtos para montar seu pedido.",
}
