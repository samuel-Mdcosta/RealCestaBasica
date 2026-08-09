import { cestas } from "./siteContent"

export const cestasHero = {
  selo: "CESTAS PRONTAS",
  titulo: "Escolha o tamanho certo pra sua casa",
  texto:
    "Todas com produtos de marcas confiáveis. Você fecha o pedido no WhatsApp com um atendente da loja.",
}

export const cestasListagem = {
  titulo: "Modelos de cesta",
  visiveisInicial: 4,
}

const colunasComparacao = [
  { sigla: "MINI", rotulo: "MINI" },
  { sigla: "MINI Especial", rotulo: "MINI Especial" },
  { sigla: "B", rotulo: "B" },
  { sigla: "familia", rotulo: "Família" },
  { sigla: "H", rotulo: "H" },
  { sigla: "c", rotulo: "média" },
  { sigla: "gigante", rotulo: "Gigante" },
]

const precoDaCesta = (sigla) =>
  cestas.find((cesta) => cesta.sigla === sigla)?.preco ?? "—"

export const comparacao = {
  titulo: "O que vem em cada cesta",
  colunas: colunasComparacao.map((coluna) => coluna.rotulo),
  destaque: 4,
  linhas: [
    { produto: "Arroz branco tipo 1", valores: ["5 kg", "5 kg", "10 kg", "10 kg", "10 kg", "15 kg", "25 kg"] },
    { produto: "Feijão carioca", valores:      ["1 kg", "1 kg", "1 kg", "1 kg", "2 kg", "2 kg", "3 kg"] },
    { produto: "Sal refinado", valores:      ["1 kg", "1 kg", "1 kg", "1 kg", "1 kg", "1 kg", "1 kg"] },
    { produto: "Óleo de soja 900 ml", valores: ["1 un", "1 un", "2 un", "2 un", "2 un", "4 kg", "10 un"] },
    { produto: "Açúcar cristal", valores:      ["2 kg", "2 kg", "2 kg", "2 kg", "4 kg", "4 kg", "6 kg"] },
    { produto: "Café torrado e moído 250 g", valores: ["-", "-", "1 un", "1 un", "1 un", "1 un", "2 un"] },
    { produto: "Macarrão parafuso 500 g", valores:   ["1 un", "1 un", "1 un", "1 un", "2 un", "2 un", "2 un"] },
    { produto: "Farinha de trigo 1 kg", valores:      ["—", "1 un", "-", "1 un", "1 un", "1 un", "2 un"] },
    { produto: "Molho de tomate 340 g", valores:      ["—", "—", "-", "-", "1 un", "1 un", "2 un"] },
    { produto: "Leite integral 1 L", valores:         ["—", "1 un", "-", "1 un", "-", "1 un", "-"] },
    { produto: "Biscoito cream cracker 400 g", valores: ["—", "1 un", "-", "1 un", "-", "—", "1 un"] },
    { produto: "Lã de aço", valores:                    ["-", "-", "-", "-", "1 un", "1 un", "1 un"] },
    { produto: "Papel higiênico (4 rolos pct)", valores:["1 un", "1 un", "1 un", "1 un", "1 un", "1 un", "1 un"] },
    { produto: "Sabonete 85 g", valores:                ["—", "1 un", "1 un", "1 un", "2 un", "2 un", "2 un"] },
    { produto: "Creme dental 90 g", valores:            ["—", "1 un", "1 un", "1 un", "1 un", "1 un", "1 un"] },
    { produto: "Sabão em pó  400 gramas", valores:           ["-", "1 un", "1 un", "1 un", "-", "-", "-"] },
    { produto: "Sabão em pó  800 gramas", valores:           ["—", "—", "—", "-", "1 un", "1 un", "1 un"] },
    { produto: "Sabão em Barra  pacote", valores:           ["—", "—", "—", "-", "1 un", "1 un", "1 un"] },
    { produto: "Sabão em Barra  unidade", valores:           ["-", "1 un", "1 un", "1 un", "-", "-", "-"] },
    { produto: "Detergente 500 ml", valores:            ["—", "—", "—", "-", "1 un", "1 un", "1 un"] },
    { produto: "Água sanitária 1 L", valores:           ["—", "—", "—", "-", "1 un", "1 un", "1 un"] },
    { produto: "Amaciante 2 L", valores:                ["—", "—", "—", "—", "1 un", "1 un", "1 un"] },
  ],
  totais: colunasComparacao.map((coluna) => precoDaCesta(coluna.sigla)),
  nota: "Marcas podem variar conforme o estoque, sempre mantendo a mesma qualidade. Confirmação item a item pelo WhatsApp.",
}

// A tabela marca ausência ora com "-", ora com "—".
const semItem = (valor) => !valor || valor === "-" || valor === "—"

// "O que vem nesta cesta" a partir da própria tabela de comparação. Quem mostra
// o conteúdo de uma cesta fora desta página (a oferta da semana) importa daqui
// em vez de redigitar a lista e sair do ar com o catálogo.
export function itensDaCesta(sigla) {
  const coluna = colunasComparacao.findIndex((item) => item.sigla === sigla)
  if (coluna === -1) return []

  return comparacao.linhas
    .filter((linha) => !semItem(linha.valores[coluna]))
    .map((linha) => ({ nome: linha.produto, qtd: linha.valores[coluna] }))
}

export const cestasChamadas = {
  duvida: {
    titulo: "Ficou na dúvida do tamanho?",
    texto:
      "Chama no WhatsApp que um atendente te ajuda a escolher pela quantidade de pessoas da casa.",
    botao: "Falar com atendente",
    mensagem: "Olá! Estou em dúvida sobre o tamanho da cesta.",
  },
  empresas: {
    titulo: "Empresas e doações",
    texto:
      "Cestas para funcionários ou campanhas de doação com preço especial por volume e nota fiscal.",
    botao: "Pedir orçamento",
    mensagem: "Olá! Quero um orçamento de cestas para empresa/doação.",
  },
}
