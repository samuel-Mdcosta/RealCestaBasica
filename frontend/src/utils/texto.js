// "Feijão" -> "feijao". Usado pela busca (ignorar acento e maiúscula) e pela
// validação de cidade do checkout ("CAMPO GRANDE" e "campo grande" são iguais).
//
// O normalize("NFD") separa a letra do acento e o \p{Diacritic} apaga o acento
// que sobrou solto.
export function normalizar(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
}
