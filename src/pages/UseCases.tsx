import { useState } from "react";
import { defaultProfiles } from "../constants/defaultData";
import {
  deleteUseCaseFromList,
  addUseCaseToList,
  updateUseCaseInList,
} from "../utils/listUtils";
import type { UseCase } from "../constants/defaultData";
import { Plus, Save, Trash2, RotateCcw } from "lucide-react";

interface ProductsProps {
  localUseCases: UseCase[];
  setLocalUseCases: (
    value: UseCase[] | ((val: UseCase[]) => UseCase[]),
  ) => void;
}

export default function Products({
  localUseCases,
  setLocalUseCases,
}: ProductsProps) {
  const [detailModal, setDetailModal] = useState<UseCase | null>(null);

  const handleSpecChange = (
    highlight: keyof UseCase["highlights"],
    stringValue: string,
  ) => {
    if (!detailModal) return;

    const value = parseSelectValue(stringValue);

    const updatedList = updateUseCaseInList(
      localUseCases,
      detailModal.id,
      highlight,
      value,
    );

    setLocalUseCases(updatedList);

    const refreshedUseCase = updatedList.find((u) => u.id === detailModal.id);
    if (refreshedUseCase) {
      setDetailModal(refreshedUseCase);
    }
  };

  function parseSelectValue(value: string): "max" | "min" | null {
    if (value === "max") return "max";
    if (value === "min") return "min";
    return null;
  }

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUseCase, setNewUseCase] = useState({
    name: "",
    highlights: {
      price: null as "max" | "min" | null,
      cpuCore: null as "max" | "min" | null,
      gpuCore: null as "max" | "min" | null,
      ram: null as "max" | "min" | null,
      storage: null as "max" | "min" | null,
      hasFan: null as "max" | "min" | null,
    },
  });

  const handleCreateProduct = (e?: { preventDefault: () => void }) => {
    if (e) e.preventDefault();

    if (!newUseCase.name.trim()) {
      alert("Inserisci un nome valido per il caso d'uso!");
      return;
    }

    const updatedList = addUseCaseToList(localUseCases, newUseCase);

    setLocalUseCases(updatedList);
    setNewUseCase({
      name: "",
      highlights: {
        price: null,
        cpuCore: null,
        gpuCore: null,
        ram: null,
        storage: null,
        hasFan: null,
      },
    });
    setIsCreateOpen(false);
  };

  const handleResetStorage = () => {
    const conferma = confirm(
      "Sei sicuro di voler cancellare tutti i prodotti personalizzati e ripristinare i dati di fabbrica?",
    );
    if (!conferma) return;

    setLocalUseCases(defaultProfiles);
  };

  const handleDeleteUseCase = (useCase: UseCase) => {
    const conferma = confirm(
      `Sei sicuro di voler cancellare il caso d'uso ${useCase.name}?`,
    );
    if (!conferma) return;
    const updatedList = deleteUseCaseFromList(localUseCases, useCase.id);
    setLocalUseCases(updatedList);
    setDetailModal(null);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <span className="font-mono text-apple-blue text-sm uppercase font-black animate-in fade-in duration-1000">
          Casi d'Uso
        </span>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-tight animate-in fade-in duration-1000 text-center">
            Personalizza le tue necessità.
          </span>
          <span className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-none animate-in fade-in duration-1000 text-center mb-3">
            Aggiungi casi d'uso.
          </span>
        </div>
        <span className="text-secondary text-xl text-center">
          Cambia le priorità nei prodotti e confrontali in maniera più precisa e
          personalizzabile.
        </span>
        <div className="flex items-center justify-center w-full mt-12 gap-4">
          <button
            className="text-white flex justify-center items-center gap-2 px-4 py-1 w-fit bg-apple-blue/50 rounded-lg font-black hover:bg-apple-blue/20 cursor-pointer"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={16} />
            <span>Nuovo Prodotto</span>
          </button>
          <button
            className="text-white flex justify-center items-center gap-2 px-4 py-1 w-fit bg-red-500/50 rounded-lg font-black hover:bg-red-500/20 cursor-pointer"
            onClick={() => handleResetStorage()}
          >
            <RotateCcw size={16} />
            <span>Reset Data</span>
          </button>
        </div>
        <div className="w-full max-w-4xl mx-auto mt-4 overflow-hidden overflow-x-auto bg-apple-card/20 backdrop-blur-md border border-apple-elevated/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 mb-12">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="w-full border-b border-white/10 bg-white/2">
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  Nome Caso d'Uso
                </th>
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  Prezzo
                </th>
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  Core CPU
                </th>
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  Core GPU
                </th>
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  RAM
                </th>
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  Archiviazione
                </th>
                <th className="py-5 px-6 text-center text-white text-base font-bold tracking-tight">
                  Ventole
                </th>
              </tr>
            </thead>
            <tbody>
              {localUseCases.map((useCase) => {
                return (
                  <tr
                    key={useCase.id}
                    className="transition-colors duration-200 hover:bg-white/2 cursor-pointer"
                    onClick={() => setDetailModal(useCase)}
                  >
                    <td className="py-4 px-6 text-center text-lg text-white">
                      {useCase.name}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-mono font-bold text-white/80">
                      {useCase.highlights.price === "max"
                        ? "⚠️ MASSIMO"
                        : useCase.highlights.price === "min"
                          ? "✅ MINIMO"
                          : "🔹 NESSUNA"}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-mono font-bold text-white/80">
                      {useCase.highlights.cpuCore === "max"
                        ? "✅ MASSIMO"
                        : useCase.highlights.cpuCore === "min"
                          ? "⚠️ MINIMO"
                          : "🔹 NESSUNA"}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-mono font-bold text-white/80">
                      {useCase.highlights.gpuCore === "max"
                        ? "✅ MASSIMO"
                        : useCase.highlights.gpuCore === "min"
                          ? "⚠️ MINIMO"
                          : "🔹 NESSUNA"}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-mono font-bold text-white/80">
                      {useCase.highlights.ram === "max"
                        ? "✅ MASSIMO"
                        : useCase.highlights.ram === "min"
                          ? "⚠️ MINIMO"
                          : "🔹 NESSUNA"}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-mono font-bold text-white/80">
                      {useCase.highlights.storage === "max"
                        ? "✅ MASSIMO"
                        : useCase.highlights.storage === "min"
                          ? "⚠️ MINIMO"
                          : "🔹 NESSUNA"}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-mono font-bold text-white/80">
                      {useCase.highlights.hasFan === "max"
                        ? "✅ MASSIMO"
                        : useCase.highlights.hasFan === "min"
                          ? "⚠️ MINIMO"
                          : "🔹 NESSUNA"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {detailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="w-full max-w-md bg-apple-card border border-apple-elevated/40 rounded-2xl p-6 flex flex-col shadow-2xl mx-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono text-apple-blue uppercase tracking-widest font-bold">
                  MODIFICA CASO D'USO
                </span>
                <h2 className="text-xl font-black text-white tracking-tight mt-1">
                  {detailModal.name}
                </h2>
              </div>
              <button
                onClick={() => setDetailModal(null)}
                className="text-white/40 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <form
                className="flex flex-col space-y-3"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* PREZZO */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    PREZZO
                  </label>
                  <select
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    value={detailModal.highlights.price || "none"}
                    onChange={(e) => handleSpecChange("price", e.target.value)}
                  >
                    <option value="max" className="bg-apple-card">
                      MASSIMO (Budget Alto)
                    </option>
                    <option value="min" className="bg-apple-card">
                      MINIMO (Risparmio)
                    </option>
                    <option value="none" className="bg-apple-card">
                      NESSUNA PREFERENZA
                    </option>
                  </select>
                </div>

                {/* CPU */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    CORE CPU
                  </label>
                  <select
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    value={detailModal.highlights.cpuCore || "none"}
                    onChange={(e) =>
                      handleSpecChange("cpuCore", e.target.value)
                    }
                  >
                    <option value="max" className="bg-apple-card">
                      MASSIMO
                    </option>
                    <option value="min" className="bg-apple-card">
                      MINIMO (SCONSIGLIATO)
                    </option>
                    <option value="none" className="bg-apple-card">
                      NESSUNA PREFERENZA
                    </option>
                  </select>
                </div>

                {/* GPU */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    CORE GPU
                  </label>
                  <select
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    value={detailModal.highlights.gpuCore || "none"}
                    onChange={(e) =>
                      handleSpecChange("gpuCore", e.target.value)
                    }
                  >
                    <option value="max" className="bg-apple-card">
                      MASSIMO
                    </option>
                    <option value="min" className="bg-apple-card">
                      MINIMO (SCONSIGLIATO)
                    </option>
                    <option value="none" className="bg-apple-card">
                      NESSUNA PREFERENZA
                    </option>
                  </select>
                </div>

                {/* RAM */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    RAM
                  </label>
                  <select
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    value={detailModal.highlights.ram || "none"}
                    onChange={(e) => handleSpecChange("ram", e.target.value)}
                  >
                    <option value="max" className="bg-apple-card">
                      MASSIMO
                    </option>
                    <option value="min" className="bg-apple-card">
                      MINIMO (SCONSIGLIATO)
                    </option>
                    <option value="none" className="bg-apple-card">
                      NESSUNA PREFERENZA
                    </option>
                  </select>
                </div>

                {/* STORAGE */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    ARCHIVIAZIONE
                  </label>
                  <select
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    value={detailModal.highlights.storage || "none"}
                    onChange={(e) =>
                      handleSpecChange("storage", e.target.value)
                    }
                  >
                    <option value="max" className="bg-apple-card">
                      MASSIMO
                    </option>
                    <option value="min" className="bg-apple-card">
                      MINIMO (SCONSIGLIATO)
                    </option>
                    <option value="none" className="bg-apple-card">
                      NESSUNA PREFERENZA
                    </option>
                  </select>
                </div>

                {/* VENTOLA */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    VENTOLA
                  </label>
                  <select
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    value={detailModal.highlights.hasFan || "none"}
                    onChange={(e) => handleSpecChange("hasFan", e.target.value)}
                  >
                    <option value="max" className="bg-apple-card">
                      SI (Ventola)
                    </option>
                    <option value="min" className="bg-apple-card">
                      NO (Fanless)
                    </option>
                    <option value="none" className="bg-apple-card">
                      NESSUNA PREFERENZA
                    </option>
                  </select>
                </div>
              </form>
              <button
                className="flex justify-center items-center gap-2 px-4 py-2 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg font-black transition-colors cursor-pointer mt-4"
                onClick={() => handleDeleteUseCase(detailModal)}
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-mono">ELIMINA CASO D'USO</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 p-4">
          <div className="w-full max-w-md bg-apple-card border border-apple-elevated/40 rounded-2xl p-6 flex flex-col shadow-2xl max-h-[90vh]">
            <div className="flex justify-between items-start mb-4 shrink-0">
              <div>
                <span className="text-xs font-mono text-apple-blue uppercase tracking-widest font-bold">
                  CREA CASO D'USO
                </span>
                <h2 className="text-xl font-black text-white tracking-tight mt-1">
                  Nuovo caso d'uso
                </h2>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-white/40 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>

            <form
              className="flex flex-col space-y-3 overflow-y-auto pr-1 pb-2 scrollbar-thin scrollbar-thumb-white/10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">NOME</label>
                <input
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  type="text"
                  placeholder="es. Video Editing 4K..."
                  value={newUseCase.name}
                  onChange={(e) =>
                    setNewUseCase({ ...newUseCase, name: e.target.value })
                  }
                />
              </div>

              {/* PREZZO CREAZIONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">
                  PREZZO
                </label>
                <select
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  value={newUseCase.highlights.price || "none"}
                  onChange={(e) =>
                    setNewUseCase({
                      ...newUseCase,
                      highlights: {
                        ...newUseCase.highlights,
                        price: parseSelectValue(e.target.value),
                      },
                    })
                  }
                >
                  <option value="max" className="bg-apple-card">
                    MASSIMO (Budget Alto)
                  </option>
                  <option value="min" className="bg-apple-card">
                    MINIMO (Risparmio)
                  </option>
                  <option value="none" className="bg-apple-card">
                    NESSUNA PREFERENZA
                  </option>
                </select>
              </div>

              {/* CPU CREAZIONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">
                  CORE CPU
                </label>
                <select
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  value={newUseCase.highlights.cpuCore || "none"}
                  onChange={(e) =>
                    setNewUseCase({
                      ...newUseCase,
                      highlights: {
                        ...newUseCase.highlights,
                        cpuCore: parseSelectValue(e.target.value),
                      },
                    })
                  }
                >
                  <option value="max" className="bg-apple-card">
                    MASSIMO
                  </option>
                  <option value="min" className="bg-apple-card">
                    MINIMO (SCONSIGLIATO)
                  </option>
                  <option value="none" className="bg-apple-card">
                    NESSUNA PREFERENZA
                  </option>
                </select>
              </div>

              {/* GPU CREAZIONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">
                  CORE GPU
                </label>
                <select
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  value={newUseCase.highlights.gpuCore || "none"}
                  onChange={(e) =>
                    setNewUseCase({
                      ...newUseCase,
                      highlights: {
                        ...newUseCase.highlights,
                        gpuCore: parseSelectValue(e.target.value),
                      },
                    })
                  }
                >
                  <option value="max" className="bg-apple-card">
                    MASSIMO
                  </option>
                  <option value="min" className="bg-apple-card">
                    MINIMO (SCONSIGLIATO)
                  </option>
                  <option value="none" className="bg-apple-card">
                    NESSUNA PREFERENZA
                  </option>
                </select>
              </div>

              {/* RAM CREAZIONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">RAM</label>
                <select
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  value={newUseCase.highlights.ram || "none"}
                  onChange={(e) =>
                    setNewUseCase({
                      ...newUseCase,
                      highlights: {
                        ...newUseCase.highlights,
                        ram: parseSelectValue(e.target.value),
                      },
                    })
                  }
                >
                  <option value="max" className="bg-apple-card">
                    MASSIMO
                  </option>
                  <option value="min" className="bg-apple-card">
                    MINIMO (SCONSIGLIATO)
                  </option>
                  <option value="none" className="bg-apple-card">
                    NESSUNA PREFERENZA
                  </option>
                </select>
              </div>

              {/* STORAGE CREAZIONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">
                  ARCHIVIAZIONE
                </label>
                <select
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  value={newUseCase.highlights.storage || "none"}
                  onChange={(e) =>
                    setNewUseCase({
                      ...newUseCase,
                      highlights: {
                        ...newUseCase.highlights,
                        storage: parseSelectValue(e.target.value),
                      },
                    })
                  }
                >
                  <option value="max" className="bg-apple-card">
                    MASSIMO
                  </option>
                  <option value="min" className="bg-apple-card">
                    MINIMO (SCONSIGLIATO)
                  </option>
                  <option value="none" className="bg-apple-card">
                    NESSUNA PREFERENZA
                  </option>
                </select>
              </div>

              {/* VENTOLA CREAZIONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-secondary font-mono">
                  VENTOLA
                </label>
                <select
                  className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                  value={newUseCase.highlights.hasFan || "none"}
                  onChange={(e) =>
                    setNewUseCase({
                      ...newUseCase,
                      highlights: {
                        ...newUseCase.highlights,
                        hasFan: parseSelectValue(e.target.value),
                      },
                    })
                  }
                >
                  <option value="max" className="bg-apple-card">
                    SI (Ventola)
                  </option>
                  <option value="min" className="bg-apple-card">
                    NO (Fanless)
                  </option>
                  <option value="none" className="bg-apple-card">
                    NESSUNA PREFERENZA
                  </option>
                </select>
              </div>
            </form>

            <div className="mt-4 shrink-0">
              <button
                className="flex justify-center items-center gap-2 px-4 py-2 w-full bg-apple-blue hover:bg-apple-blue/80 text-white rounded-lg font-black transition-all duration-200 cursor-pointer shadow-md"
                onClick={(e) => handleCreateProduct(e as any)}
              >
                <Save className="w-4 h-4" />
                <span className="font-mono">SALVA CASO D'USO</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
