import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center py-24 text-center">
      <p className="font-mono text-sm font-bold uppercase tracking-widest text-apple-blue">
        Errore 404
      </p>
      <h1 className="mt-3 text-4xl font-black text-white">
        Questa pagina non esiste
      </h1>
      <p className="mt-4 text-white/60">
        Il link potrebbe essere errato o la pagina potrebbe essere stata
        spostata.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-apple-blue px-5 py-3 font-semibold text-apple-bg transition-opacity hover:opacity-80"
      >
        Torna alla home
      </Link>
    </section>
  );
}
