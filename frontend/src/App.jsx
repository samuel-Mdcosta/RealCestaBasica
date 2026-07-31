import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayouts from './layouts/MainLayouts'
import Home from './pages/Home'
import './App.css'

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
