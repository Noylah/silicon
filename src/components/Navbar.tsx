import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Prodotti", href: "/products" },
  { label: "Casi d'uso", href: "/usecases" },
  { label: "Algoritmo", href: "/algoritmo" },
];

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors duration-300 ${
    isActive
      ? "font-extrabold text-apple-blue"
      : "text-white/60 hover:text-white"
  }`;

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-slate-950/70 px-4 shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Navigazione principale" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={linkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          aria-label={mobileMenu ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={mobileMenu}
          aria-controls="mobile-navigation"
          className="rounded p-2 text-white/70 transition-colors hover:text-white sm:hidden"
          onClick={() => setMobileMenu((open) => !open)}
        >
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileMenu && (
        <nav
          id="mobile-navigation"
          aria-label="Navigazione mobile"
          className="flex flex-col gap-4 border-t border-apple-elevated/20 py-4 sm:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={linkClassName}
              onClick={() => setMobileMenu(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
