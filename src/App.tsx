import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const navigationLinks = [
  { label: "Home", href: "/home" },
  { label: "Laptop", href: "/laptop" },
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
      {activePage === "/home" && <Home />}
    </div>
  );
}
