import {
  ArrowRight,
  CirclePlus,
  LaptopMinimal,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { type UseCase } from "../constants/defaultData";
import { products } from "../constants/defaultData";
import { highlights } from "../constants/defaultData";
import { calculateParamScore } from "../utils/calculate";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface HomeProps {
  localUseCases: UseCase[];
}

export default function Home({ localUseCases }: HomeProps) {
  const [selectingTarget, setTarget] = useState<"A" | "B" | null>(null);
  const [productA, setProductA] = useState<number | null>(null);
  const [productB, setProductB] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUseCase, setActiveUseCase] = useState<UseCase | null>(null);
  const [localProducts] = useLocalStorage("products", products);
  const selectedProductA = localProducts.find((p) => p.id === productA);
  const selectedProductB = localProducts.find((p) => p.id === productB);

  function selectProduct(productId: number) {
    if (selectingTarget === "A" && productId === productB) {
      alert("Non puoi confrontare due prodotti uguali!");
      return;
    }

    if (selectingTarget === "B" && productId === productA) {
      alert("Non puoi confrontare due prodotti uguali!");
      return;
    }

    if (selectingTarget === "A") {
      setProductA(productId);
      setTarget(null);
    } else if (selectingTarget === "B") {
      setProductB(productId);
      setTarget(null);
    }
    setSearchQuery("");
  }

  const winningProduct = useMemo(() => {
    if (selectedProductA && selectedProductB) {
      let totalScoreA = 0;
      let totalScoreB = 0;
      highlights.forEach((row) => {
        const valA =
          selectedProductA.specs[
            row.name as keyof typeof selectedProductA.specs
          ];
        const valB =
          selectedProductB.specs[
            row.name as keyof typeof selectedProductB.specs
          ];
        const preference = activeUseCase
          ? activeUseCase.highlights[
              row.name as keyof typeof activeUseCase.highlights
            ]
          : null;
        const result = calculateParamScore(valA, valB, preference, row.name);
        totalScoreA += result.scoreA;
        totalScoreB += result.scoreB;
      });
      return totalScoreA > totalScoreB
        ? selectedProductA
        : totalScoreB > totalScoreA
          ? selectedProductB
          : null;
    }
  }, [selectedProductA, selectedProductB, activeUseCase]);

  return (
    <>
      <section className="relative mx-auto mt-10 flex max-w-6xl flex-col items-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 px-5 pb-12 pt-10 shadow-2xl shadow-cyan-950/20 backdrop-blur-sm sm:mt-14 sm:px-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div className="relative flex flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/5 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles size={14} aria-hidden="true" />
            Silicon Lab · laptop comparison
          </span>
          <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            La scelta giusta,
            <span className="block bg-gradient-to-r from-cyan-200 via-sky-400 to-indigo-300 bg-clip-text pb-2 text-transparent">
              senza complicazioni.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-center text-base leading-relaxed text-slate-300 sm:text-lg">
            Metti a confronto due laptop, dai priorità a quello che conta per
            te e scopri come si comportano, specifica per specifica.
          </p>
          <Link
            to="/algoritmo"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200/80 transition-colors hover:text-cyan-100"
          >
            Scopri come funziona il punteggio
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="relative mt-10 flex w-full flex-col justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-6">
          {selectedProductA ? (
            <div
              className="group flex min-h-40 min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/[0.04] p-7 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-white/[0.07] sm:min-w-64 sm:p-8"
              onClick={() => setTarget("A")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-200 transition-colors group-hover:bg-cyan-200/15">
                <LaptopMinimal />
              </div>
              <span className="text-center text-sm font-medium text-white">
                {selectedProductA.name}
              </span>
              <span className="mt-1 text-xs text-cyan-200">
                Clicca per modificare
              </span>
            </div>
          ) : (
            <div
              className="group flex min-h-40 min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-cyan-200/[0.04] sm:min-w-64 sm:p-8"
              onClick={() => setTarget("A")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-colors group-hover:border-cyan-200/40 group-hover:text-cyan-200">
                <CirclePlus />
              </div>
              <span className="text-sm font-medium text-white">
                Seleziona Prodotto A
              </span>
              <span className="mt-1 text-xs text-slate-400">
                Scegli il primo prodotto
              </span>
            </div>
          )}
          {selectedProductB ? (
            <div
              className="group flex min-h-40 min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/[0.04] p-7 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-white/[0.07] sm:min-w-64 sm:p-8"
              onClick={() => setTarget("B")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-200 transition-colors group-hover:bg-cyan-200/15">
                <LaptopMinimal />
              </div>
              <span className="text-center text-sm font-medium text-white">
                {selectedProductB.name}
              </span>
              <span className="mt-1 text-xs text-cyan-200">
                Clicca per modificare
              </span>
            </div>
          ) : (
            <div
              className="group flex min-h-40 min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-cyan-200/[0.04] sm:min-w-64 sm:p-8"
              onClick={() => setTarget("B")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition-colors group-hover:border-cyan-200/40 group-hover:text-cyan-200">
                <CirclePlus />
              </div>
              <span className="text-sm font-medium text-white">
                Seleziona Prodotto B
              </span>
              <span className="mt-1 text-xs text-slate-400">
                Scegli il secondo prodotto
              </span>
            </div>
          )}
        </div>
      </section>
      <div
        aria-label="Filtra il confronto per caso d'uso"
        className="mx-auto mt-5 flex w-full max-w-4xl flex-wrap justify-center gap-2 px-4 py-3"
      >
        {localUseCases.map((profile) => {
          const isActive = activeUseCase === profile;

          return (
            <button
              type="button"
              aria-pressed={isActive}
              className={`flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 transition-all duration-300 ${
                isActive
                  ? "border-cyan-200/50 bg-cyan-200/10 text-cyan-100 shadow-md shadow-cyan-950/20"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              }`}
              onClick={() => setActiveUseCase(isActive ? null : profile)}
              key={profile.name}
            >
              <span className="text-sm font-medium">{profile.name}</span>
            </button>
          );
        })}
      </div>
      {selectedProductA && selectedProductB && (
        <div className="mx-auto mb-12 mt-8 w-full max-w-5xl overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/45 shadow-2xl shadow-black/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/2">
                <th className="py-5 px-6 text-center w-1/3 text-white text-base font-bold tracking-tight">
                  {selectedProductA.name}
                </th>

                <th className="py-5 px-4 text-center w-1/3 text-apple-blue text-sm font-mono font-black uppercase tracking-widest">
                  Specifiche
                </th>

                <th className="py-5 px-6 text-center w-1/3 text-white text-base font-bold tracking-tight">
                  {selectedProductB.name}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {highlights.map((row) => {
                const valA =
                  selectedProductA.specs[
                    row.name as keyof typeof selectedProductA.specs
                  ];
                const valB =
                  selectedProductB.specs[
                    row.name as keyof typeof selectedProductB.specs
                  ];

                const displayA =
                  typeof valA === "boolean" ? (valA ? "Sì" : "No") : valA;
                const displayB =
                  typeof valB === "boolean" ? (valB ? "Sì" : "No") : valB;

                const isHighlighted =
                  activeUseCase?.highlights[
                    row.name as keyof typeof activeUseCase.highlights
                  ] !== null &&
                  activeUseCase?.highlights[
                    row.name as keyof typeof activeUseCase.highlights
                  ] !== undefined;

                return (
                  <tr
                    key={row.name}
                    className={`transition-colors duration-200 ${
                      isHighlighted
                        ? "bg-apple-blue/5 hover:bg-apple-blue/10"
                        : "hover:bg-white/2"
                    }`}
                  >
                    <td className="py-4 px-6 text-center text-lg text-white">
                      {row.name === "price"
                        ? `${displayA}€`
                        : row.name === "storage"
                          ? `${displayA}GB`
                          : row.name === "ram"
                            ? `${displayA}GB`
                            : displayA}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`text-xs font-medium tracking-wide ${
                          isHighlighted
                            ? "text-apple-blue font-bold underline decoration-apple-blue/50 underline-offset-4"
                            : "text-secondary"
                        }`}
                      >
                        {row.display}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white">
                      {row.name === "price"
                        ? `${displayB}€`
                        : row.name === "storage"
                          ? `${displayB}GB`
                          : row.name === "ram"
                            ? `${displayB}GB`
                            : displayB}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col p-8 min-h-12 w-full mt-4 items-center justify-center bg-apple-card/50">
            <span className="text-apple-blue font-black font-mono">
              SCELTA MIGLIORE
            </span>
            {winningProduct ? (
              <span className="text-2xl font-black text-center">
                {winningProduct?.name}
              </span>
            ) : (
              <span className="text-2xl font-black text-center">
                Punteggio Pari
              </span>
            )}
            <span className="text-secondary text-center">
              Il risultato è ottenuto attraverso un calcolo eseguito attraverso
              le priorità impostate nel caso d'uso.
            </span>
          </div>
        </div>
      )}

      {selectingTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="w-full max-w-md bg-apple-card border border-apple-elevated/40 rounded-2xl p-6 flex flex-col shadow-2xl mx-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono text-apple-blue uppercase tracking-widest font-bold">
                  SELEZIONE HARDWARE
                </span>
                <h2 className="text-xl font-black text-white tracking-tight mt-1">
                  Seleziona Prodotto {selectingTarget}
                </h2>
              </div>
              <button
                onClick={() => {
                  setTarget(null);
                  setSearchQuery("");
                }}
                className="text-white/40 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-72 py-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
              <form className="flex items-center justify-center px-2 bg-white/2 rounded-xl border border-white/5">
                <input
                  className="w-full h-8 px-1 bg-transparent outline-none text-white placeholder-white/30"
                  type="text"
                  placeholder="Cerca..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <div className="text-sm text-secondary bg-white/2 border border-white/5 p-4 rounded-xl text-center flex flex-col gap-2">
                {localProducts.filter((product) =>
                  product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                ).length === 0 ? (
                  <div className="py-6 text-white/40 text-sm">
                    Nessun laptop trovato per "{searchQuery}"
                  </div>
                ) : (
                  localProducts
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="bg-apple-card/80 items-start px-4 py-2 rounded w-full border-2 border-white/20 cursor-pointer hover:bg-apple-sidebar hover:text-white hover:border-apple-blue/50"
                        onClick={() => selectProduct(product.id)}
                      >
                        {product.name}
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
