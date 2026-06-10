import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import UseCases from "./pages/UseCases";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defaultProfiles, type UseCase } from "./constants/defaultData";

const navigationLinks = [
  { label: "Home", href: "/home" },
  { label: "Prodotti", href: "/products" },
  { label: "Casi d'Uso", href: "/usecases" },
  { label: "Algoritmo", href: "/algoritmo" },
];

export default function App() {
  const [activePage, setActivePage] = useState("/home");
  const [localUseCases, setLocalUseCases] = useLocalStorage<UseCase[]>(
    "useCases",
    defaultProfiles,
  );
  return (
    <div className="selection:bg-apple-blue/20 selection:text-white font-apple">
      <Navbar
        links={navigationLinks}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="px-2">
        {activePage === "/home" && <Home localUseCases={localUseCases} />}
        {activePage === "/products" && <Products />}
        {activePage === "/usecases" && (
          <UseCases
            localUseCases={localUseCases}
            setLocalUseCases={setLocalUseCases}
          />
        )}
      </div>
    </div>
  );
}
