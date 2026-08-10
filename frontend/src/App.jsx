import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayouts from './layouts/MainLayouts'
import Home from './pages/Home'
import Cestas from './pages/Cestas'
import Mercado from './pages/Mercado'
import Ofertas from './pages/Ofertas'
import NaoEncontrada from './pages/NaoEncontrada'
import ScrollToTop from './components/ScrollToTop'
import { CarrinhoProvider } from './context/CarrinhoContext'
import { CheckoutProvider } from './context/CheckoutContext'

export default function App(){
  return(
    <BrowserRouter>
      <ScrollToTop />
      <CarrinhoProvider>
        <CheckoutProvider>
          <Routes>
            <Route path="/" element={<MainLayouts />}>
              <Route index element={<Home />} />
              <Route path="cestas" element={<Cestas />} />
              <Route path="mercado" element={<Mercado />} />
              <Route path="ofertas" element={<Ofertas />} />
              {/* Curinga dentro do layout: o 404 mantém header, busca e menu. */}
              <Route path="*" element={<NaoEncontrada />} />
            </Route>
          </Routes>
        </CheckoutProvider>
      </CarrinhoProvider>
    </BrowserRouter>
  )
}
