import { marca, topbar, header, footer } from "../data/siteContent"

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="bg-vermelho text-white text-xs">
        <ul className="container mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center font-medium">
          {topbar.map((item) => (
            <li key={item} className="whitespace-nowrap">{item}</li>
          ))}
        </ul>
      </div>

      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-4 md:gap-6">
        <a href="/" className="flex-shrink-0">
          <img
            src={marca.logo}
            alt={marca.nome}
            className="h-12 w-auto object-contain"
          />
        </a>

        <div className="flex-grow order-3 md:order-none basis-full md:basis-auto md:max-w-md">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder={header.busca}
              className="w-full py-2.5 pl-10 pr-4 rounded-full text-sm text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amarelo"
            />
          </div>
        </div>

        <nav className="flex-shrink-0">
          <ul className="flex items-center gap-6 text-sm font-bold text-vermelho-escuro font-titulos uppercase tracking-wide">
            {header.menu.map((item) => (
              <li key={item} className="hover:text-vermelho cursor-pointer whitespace-nowrap">
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`https://wa.me/${footer.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 flex items-center gap-2 bg-whatsapp hover:brightness-95 transition-all text-white font-bold text-sm px-4 py-2.5 rounded-full shadow-sm whitespace-nowrap ml-auto md:ml-0"
        >
          {header.cta}
        </a>
      </div>
    </header>
  )
}
