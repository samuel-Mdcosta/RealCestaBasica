import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { marca, topbar, header } from "../data/siteContent"
import BotaoWhatsApp from "./BotaoWhatsApp"

function ItemMenu({ item, onClick, className = "" }) {
  if (!item.to) {
    return (
      <span className={`hover:text-vermelho cursor-pointer ${className}`}>
        {item.nome}
      </span>
    )
  }

  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `${isActive ? "text-vermelho" : "hover:text-vermelho"} ${className}`
      }
    >
      {item.nome}
    </NavLink>
  )
}

function Busca({ className = "" }) {
  return (
    <div className={className}>
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
  )
}

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    if (!menuAberto) return

    const fecharComEsc = (e) => {
      if (e.key === "Escape") setMenuAberto(false)
    }
    const fecharNoDesktop = () => {
      if (window.innerWidth >= 1024) setMenuAberto(false)
    }

    window.addEventListener("keydown", fecharComEsc)
    window.addEventListener("resize", fecharNoDesktop)
    return () => {
      window.removeEventListener("keydown", fecharComEsc)
      window.removeEventListener("resize", fecharNoDesktop)
    }
  }, [menuAberto])

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="bg-vermelho text-white text-xs">
        <ul className="container mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center font-medium">
          {topbar.map((item) => (
            <li key={item} className="whitespace-nowrap">{item}</li>
          ))}
        </ul>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 lg:gap-8 py-3">
          <Link to="/" className="flex-shrink-0">
            <img
              src={marca.logo}
              alt={marca.nome}
              className="h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          <Busca className="hidden md:block flex-grow min-w-0 max-w-md" />

          <div className="flex items-center gap-3 lg:gap-6 ml-auto">
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm font-bold text-vermelho-escuro font-titulos uppercase tracking-wide">
                {header.menu.map((item) => (
                  <li key={item.nome}>
                    <ItemMenu item={item} className="whitespace-nowrap" />
                  </li>
                ))}
              </ul>
            </nav>

            <BotaoWhatsApp
              mensagem="Olá! Quero fazer um pedido."
              className="hidden sm:flex flex-shrink-0 text-sm px-4 py-2.5 rounded-full shadow-sm whitespace-nowrap"
            >
              {header.cta}
            </BotaoWhatsApp>

            <button
              type="button"
              onClick={() => setMenuAberto((aberto) => !aberto)}
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuAberto}
              aria-controls="menu-mobile"
              className="lg:hidden -mr-2 p-2 rounded-md text-vermelho-escuro hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuAberto ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <Busca className="md:hidden pb-3" />

        {menuAberto && (
          <nav id="menu-mobile" className="lg:hidden border-t border-gray-100">
            <ul className="text-sm font-bold text-vermelho-escuro font-titulos uppercase tracking-wide">
              {header.menu.map((item) => (
                <li
                  key={item.nome}
                  onClick={() => setMenuAberto(false)}
                  className="border-b border-gray-100"
                >
                  <ItemMenu
                    item={item}
                    onClick={() => setMenuAberto(false)}
                    className="block py-3"
                  />
                </li>
              ))}
            </ul>

            <BotaoWhatsApp
              mensagem="Olá! Quero fazer um pedido."
              className="sm:hidden flex text-sm px-4 py-3 rounded-full shadow-sm my-3"
            >
              {header.cta}
            </BotaoWhatsApp>
          </nav>
        )}
      </div>
    </header>
  )
}
