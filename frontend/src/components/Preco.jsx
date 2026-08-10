
export default function Preco({ valor, className = "", centavosClassName = "" }) {
  const [inteiro, centavos] = String(valor ?? "").split(",")

  return (
    <p className={className}>
      {inteiro}
      {centavos && <span className={centavosClassName}>,{centavos}</span>}
    </p>
  )
}
