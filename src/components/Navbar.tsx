import { useState } from "react";
import Logo from "./Logo";
import { Menu } from "lucide-react";

interface NavbarProps {
  links?: { label: string; href: string }[];
  activePage: string;
  setActivePage: (href: string) => void;
}

export default function Navbar({
  links,
  activePage,
  setActivePage,
}: NavbarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <div className="flex w-full min-h-14 sm:min-h-12 bg-apple-card/40 p-2 px-4 justify-center gap-4">
        <Logo />
        <div className="flex gap-4 text-sm items-center text-white/70">
          <div className="hidden sm:flex gap-4">
            {links &&
              links.map((link) => {
                return (
                  <a
                    key={link.href}
                    className={`cursor-pointer transition-colors duration-500 text-sm ${
                      activePage === link.href
                        ? "text-apple-blue/90 font-extrabold hover:text-apple-blue"
                        : "text-white/60 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePage(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
          </div>
          <Menu
            className="flex sm:hidden w-4 h-4 hover:text-white cursor-pointer transition-colors duration-500"
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </div>
      </div>
      {mobileMenu && (
        <div className="flex sm:hidden flex-col gap-4 bg-apple-card/40 p-4 border-b border-apple-elevated/20 transition-all duration-200 starting:opacity-0 starting:-translate-y-2 opacity-100 translate-y-0">
          {links &&
            links.map((link) => {
              return (
                <a
                  key={link.href}
                  className={`hover:text-white cursor-pointer transition-colors duration-500 text-sm ${
                    activePage === link.href
                      ? "text-white font-medium"
                      : "text-white/60"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(link.href);
                    setMobileMenu(false);
                  }}
                >
                  {link.label}
                </a>
              );
            })}
        </div>
      )}
    </>
  );
}
