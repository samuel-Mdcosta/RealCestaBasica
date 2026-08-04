import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarrinhoDrawer from "../components/CarrinhoDrawer";
import CheckoutBox from "../components/CheckoutBox";

export default function MainLayouts() {
  return (
    <div className="flex flex-col min-h-svh overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
      <CarrinhoDrawer />
      <CheckoutBox />
    </div>
  );
}
