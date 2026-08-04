import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayouts from './layouts/MainLayouts'
import Home from './pages/Home'
import Cestas from './pages/Cestas'
import Mercado from './pages/Mercado'
import Ofertas from './pages/Ofertas'
import { CarrinhoProvider } from './context/CarrinhoContext'
import { CheckoutProvider } from './context/CheckoutContext'
import './App.css'

export default function App(){
  return(
    <BrowserRouter>
      <CarrinhoProvider>
        <CheckoutProvider>
          <Routes>
            <Route path="/" element={<MainLayouts />}>
              <Route index element={<Home />} />
              <Route path="cestas" element={<Cestas />} />
              <Route path="mercado" element={<Mercado />} />
              <Route path="ofertas" element={<Ofertas />} />
            </Route>
          </Routes>
        </CheckoutProvider>
      </CarrinhoProvider>
    </BrowserRouter>
  )
}
