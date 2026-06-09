import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";

const navigationLinks = [
  { label: "Home", href: "/home" },
  { label: "Prodotti", href: "/products" },
  { label: "Casi d'Uso", href: "/casiduso" },
  { label: "Algoritmo", href: "/algoritmo" },
];

export default function App() {
  const [activePage, setActivePage] = useState("/home");
  return (
    <div className="selection:bg-apple-blue/20 selection:text-white font-apple">
      <Navbar
        links={navigationLinks}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="px-2">
        {activePage === "/home" && <Home />}
        {activePage === "/products" && <Products />}
      </div>
    </div>
  );
}
