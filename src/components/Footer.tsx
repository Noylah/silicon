import { Link } from "react-router-dom";
import { ArrowUpRight, CodeXml, Globe } from "lucide-react";

const legalLinks = [
  { label: "Privacy policy", to: "/privacy" },
  { label: "Cookie e archiviazione", to: "/cookie" },
  { label: "Termini d'uso", to: "/termini" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/55 px-4 py-8 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-sm font-bold tracking-wide text-white">
            SILICON<span className="text-cyan-200">LAB</span>
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
            Confronta laptop, scegli in base alle tue priorità e capisci come
            nasce il risultato. Le informazioni sono indicative: verifica
            sempre i dettagli con il venditore.
          </p>
        </div>

        <nav aria-label="Informazioni legali" className="flex flex-col items-start gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            Informazioni
          </span>
          {legalLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-slate-400 transition-colors hover:text-cyan-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            Repository pubblico
          </span>
          <a
            href="https://github.com/Noylah/silicon"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-200"
          >
            <CodeXml size={16} aria-hidden="true" />
            Codice e contributi
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/Noylah"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-200"
          >
            <CodeXml size={16} aria-hidden="true" />
            Noylah
          </a>
          <a
            href="https://noyla.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-200"
          >
            <Globe size={16} aria-hidden="true" />
            Portfolio
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Silicon Lab</span>
        <span className="mx-2 text-white/20">·</span>
        <span>Contributi benvenuti su GitHub</span>
      </div>
    </footer>
  );
}
