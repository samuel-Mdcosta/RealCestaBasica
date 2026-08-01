import { linkWhatsApp } from "../utils/whatsapp"

const cores = {
  verde: "bg-whatsapp text-white",
  amarelo: "bg-amarelo text-vermelho-escuro",
}

export default function BotaoWhatsApp({
  mensagem,
  children,
  cor = "verde",
  className = "",
}) {
  return (
    <a
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-bold hover:brightness-95 transition-all ${cores[cor]} ${className}`}
    >
      {children}
    </a>
  )
}
