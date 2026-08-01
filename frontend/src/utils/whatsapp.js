import { footer } from "../data/siteContent"

export function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${footer.whatsapp}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}
