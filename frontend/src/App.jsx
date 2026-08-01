import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayouts from './layouts/MainLayouts'
import Home from './pages/Home'
import Cestas from './pages/Cestas'
import './App.css'

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<Home />} />
          <Route path="cestas" element={<Cestas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
