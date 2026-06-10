import { CirclePlus, LaptopMinimal } from "lucide-react";
import { useState } from "react";
import { type UseCase } from "../constants/defaultData";
import { products } from "../constants/defaultData";
import { highlights } from "../constants/defaultData";
import { calculateParamScore } from "../utils/calculate";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type UseCaseProfile from "../types/products";

interface HomeProps {
  localUseCases: UseCase[];
}

export default function Home({ localUseCases }: HomeProps) {
  const [selectingTarget, setTarget] = useState<"A" | "B" | null>(null);
  const [productA, setProductA] = useState<number | null>(null);
  const [productB, setProductB] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUseCase, setActiveUseCase] = useState<UseCaseProfile | null>(
    null,
  );
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

  let totalScoreA = 0;
  let totalScoreB = 0;
  let winningProduct: (typeof localProducts)[0] | null = null;

  if (selectedProductA && selectedProductB) {
    highlights.forEach((row) => {
      const valA =
        selectedProductA.specs[row.name as keyof typeof selectedProductA.specs];
      const valB =
        selectedProductB.specs[row.name as keyof typeof selectedProductB.specs];
      const preference = activeUseCase
        ? activeUseCase.highlights[
            row.name as keyof typeof activeUseCase.highlights
          ]
        : null;
      const result = calculateParamScore(valA, valB, preference, row.name);
      totalScoreA += result.scoreA;
      totalScoreB += result.scoreB;
    });
    winningProduct =
      totalScoreA > totalScoreB
        ? selectedProductA
        : totalScoreB > totalScoreA
          ? selectedProductB
          : null;
  }

  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <span className="font-mono text-apple-blue text-sm uppercase font-black animate-in fade-in duration-1000">
          Silicon
        </span>

        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-tight animate-in fade-in duration-1000 text-center">
            Ottimizza la tua ricerca.
          </span>
          <span className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-none animate-in fade-in duration-1000 text-center mb-3">
            Risparmia, confronta.
          </span>
        </div>
        <span className="text-secondary text-xl text-center">
          Seleziona due prodotti, analizza le specifiche' e scopri quale vince
          in base alle tue necessità.
        </span>
        <div className="flex flex-col sm:flex-row gap-6 mt-12">
          {selectedProductA ? (
            <div
              className="bg-apple-card/40 border border-apple-elevated/20 rounded-2xl p-8 min-w-62.5 flex flex-col items-center justify-center hover:border-apple-elevated/50 transition-colors duration-300 group cursor-pointer"
              onClick={() => setTarget("A")}
            >
              <div className="w-12 h-12 rounded-xl bg-apple-card border flex items-center justify-center text-apple-blue border-apple-blue/50 transition-colors duration-300 mb-4 shadow-sm">
                <LaptopMinimal />
              </div>
              <span className="text-sm font-regular text-white">
                {selectedProductA.name}
              </span>
              <span className="text-xs text-apple-blue">
                Clicca per modificare
              </span>
            </div>
          ) : (
            <div
              className="bg-apple-card/40 border border-apple-elevated/20 rounded-2xl p-8 min-w-62.5 flex flex-col items-center justify-center hover:border-apple-elevated/50 transition-colors duration-300 group cursor-pointer"
              onClick={() => setTarget("A")}
            >
              <div className="w-12 h-12 rounded-xl bg-apple-card border border-apple-elevated/40 flex items-center justify-center text-white/40 group-hover:text-apple-blue group-hover:border-apple-blue/50 transition-colors duration-300 mb-4 shadow-sm">
                <CirclePlus />
              </div>
              <span className="text-sm font-regular text-white">
                Seleziona Prodotto A
              </span>
              <span className="text-xs text-secondary">
                Scegli il primo prodotto
              </span>
            </div>
          )}
          {selectedProductB ? (
            <div
              className="bg-apple-card/40 border border-apple-elevated/20 rounded-2xl p-8 min-w-62.5 flex flex-col items-center justify-center hover:border-apple-elevated/50 transition-colors duration-300 group cursor-pointer"
              onClick={() => setTarget("B")}
            >
              <div className="w-12 h-12 rounded-xl bg-apple-card border flex items-center justify-center text-apple-blue border-apple-blue/50 transition-colors duration-300 mb-4 shadow-sm">
                <LaptopMinimal />
              </div>
              <span className="text-sm font-regular text-white">
                {selectedProductB.name}
              </span>
              <span className="text-xs text-apple-blue">
                Clicca per modificare
              </span>
            </div>
          ) : (
            <div
              className="bg-apple-card/40 border border-apple-elevated/20 rounded-2xl p-8 min-w-62.5 flex flex-col items-center justify-center hover:border-apple-elevated/50 transition-colors duration-300 group cursor-pointer"
              onClick={() => setTarget("B")}
            >
              <div className="w-12 h-12 rounded-xl bg-apple-card border border-apple-elevated/40 flex items-center justify-center text-white/40 group-hover:text-apple-blue group-hover:border-apple-blue/50 transition-colors duration-300 mb-4 shadow-sm">
                <CirclePlus />
              </div>
              <span className="text-sm font-regular text-white">
                Seleziona Prodotto B
              </span>
              <span className="text-xs text-secondary">
                Scegli il secondo prodotto
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-3 justify-center mt-4 py-3 px-4 w-full max-w-4xl mx-auto">
        {localUseCases.map((profile) => {
          const isActive = activeUseCase === profile;

          return (
            <div
              className={`flex items-center justify-center cursor-pointer px-4 py-2 rounded-lg border transition-colors duration-300 ${
                isActive
                  ? "bg-apple-card text-white border-apple-blue/80 shadow-md"
                  : "bg-apple-card/20 text-secondary hover:bg-apple-card/80 border-white/20"
              }`}
              onClick={() => setActiveUseCase(isActive ? null : profile)}
              key={profile.name}
            >
              <span className="text-sm font-medium">{profile.name}</span>
            </div>
          );
        })}
      </div>
      {selectedProductA && selectedProductB && (
        <div className="w-full max-w-4xl mx-auto mt-12 overflow-hidden bg-apple-card/20 backdrop-blur-md border border-apple-elevated/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 mb-12">
          <table className="w-full border-collapse text-left">
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
                    className={`transition-colors duration-200 hover:bg-white/2 ${
                      isHighlighted
                        ? "bg-apple-blue/5 hover:bg-apple-blue/10"
                        : ""
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
