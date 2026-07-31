import { footer, marca } from "../data/siteContent"

export default function Footer() {
  return (
    <footer className="bg-rodape text-white mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-center md:text-left">
        <p className="text-white/90">{footer.esquerda}</p>
        <p className="text-white/70">{footer.direita}</p>
      </div>
    </footer>
  )
}
