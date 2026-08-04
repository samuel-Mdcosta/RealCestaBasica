import { linkWhatsApp } from "../utils/whatsapp"
import { baseBotao, coresBotao } from "./estilosBotao"

/**
 * Botão de CONTATO: leva direto pra conversa com uma mensagem pronta (dúvida,
 * orçamento, "vocês têm tal produto?").
 *
 * Pedido não passa por aqui — quem pede usa o <BotaoPedido>, que abre o
 * checkout pra pegar endereço, frete e pagamento antes de mandar pro WhatsApp.
 */
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
      className={`${baseBotao} ${coresBotao[cor]} ${className}`}
    >
      {children}
    </a>
  )
}
