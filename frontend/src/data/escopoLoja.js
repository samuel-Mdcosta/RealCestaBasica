// A loja só trabalha com o que se acha num supermercado comum: alimentos,
// higiene pessoal e limpeza da casa. Como a busca vai bater numa API de
// catálogo (Cosmos) que conhece MUITO mais produto do que a loja vende, estes
// grupos servem pra responder "não trabalhamos com isso" antes de consultar
// qualquer coisa.
//
// Regra pra editar: só entra aqui o que é claramente de OUTRO ramo. Coisa
// duvidosa (ração, pilha, lâmpada, caderno, cerveja) fica de fora de
// propósito — cai no "não achei no catálogo, pergunte no WhatsApp", que não
// perde uma venda possível.
//
// Os termos são comparados sem acento e em minúsculas. Termo de uma palavra
// casa com a palavra inteira e com plural/flexão ("remedio" pega "remedios").
// Termo com espaço casa como trecho da frase ("oleo de motor").
export const foraDeEscopo = [
  {
    categoria: "Farmácia e medicamentos",
    termos: [
      "remedio", "medicamento", "farmacia", "drogaria", "analgesico",
      "antibiotico", "anti-inflamatorio", "antialergico", "antitermico",
      "dipirona", "paracetamol", "ibuprofeno", "amoxicilina", "omeprazol",
      "novalgina", "buscopan", "dorflex", "xarope", "pomada", "comprimido",
      "capsula", "seringa", "agulha", "insulina", "curativo", "band aid",
      "termometro", "soro fisiologico", "receita medica", "seringas",
      "seringa descartavel", "aparelho de pressao", "teste de farmacia",
    ],
  },
  {
    categoria: "Eletrônicos e eletrodomésticos",
    termos: [
      "celular", "smartphone", "iphone", "tablet", "notebook", "computador",
      "televisao", "televisor", "monitor", "videogame", "playstation", "xbox",
      "fone de ouvido", "carregador", "caixa de som", "geladeira", "fogao",
      "microondas", "liquidificador", "batedeira", "ventilador",
      "ar condicionado", "maquina de lavar", "cafeteira eletrica",
      "aspirador de po", "impressora",
    ],
  },
  {
    categoria: "Roupas e calçados",
    termos: [
      "roupa", "camisa", "camiseta", "blusa", "casaco", "jaqueta", "calca",
      "bermuda", "short", "vestido", "saia", "sapato", "tenis", "sandalia",
      "chinelo", "bota", "cueca", "calcinha", "sutia", "pijama", "uniforme",
    ],
  },
  {
    categoria: "Móveis e decoração",
    termos: [
      "sofa", "poltrona", "cama", "colchao", "guarda-roupa", "guarda roupa",
      "armario", "estante", "cadeira", "criado mudo", "rack", "penteadeira",
      "cortina", "quadro decorativo", "luminaria",
    ],
  },
  {
    categoria: "Construção e ferramentas",
    termos: [
      // "parafuso" fica fora: a loja vende macarrão parafuso.
      "cimento", "argamassa", "tijolo", "telha", "areia", "brita", "furadeira",
      "martelo", "prego", "broca", "serra eletrica", "esmerilhadeira",
      "tinta de parede", "tinta para parede", "massa corrida", "lixa de parede",
      "cano pvc", "torneira", "chuveiro eletrico",
    ],
  },
  {
    categoria: "Automotivo",
    termos: [
      "pneu", "gasolina", "combustivel", "etanol automotivo", "oleo de motor",
      "oleo lubrificante", "bateria de carro", "amortecedor", "radiador",
      "pastilha de freio", "filtro de oleo", "limpador de para-brisa",
      "para-choque", "retrovisor",
    ],
  },
  {
    categoria: "Brinquedos e esportes",
    termos: [
      "brinquedo", "boneca", "lego", "quebra-cabeca", "patinete", "bicicleta",
      "patins", "skate", "bola de futebol", "video game", "carrinho de controle",
    ],
  },
]

export const escopoLoja = {
  resumo:
    "A Real Cesta Básica vende só o que se encontra num supermercado comum: alimentos, higiene pessoal e limpeza da casa.",
}

export const buscaForaDoEscopo = {
  titulo: "A loja não trabalha com esse tipo de produto",
  botao: "Ver os corredores do mercado",
}

export const buscaSemResultado = {
  titulo: "Não achamos esse produto no catálogo",
  texto:
    "Pode ser que a loja tenha em estoque e o item ainda não esteja no site. Chame no WhatsApp que um atendente confirma pra você.",
  botao: "Perguntar no WhatsApp",
}
