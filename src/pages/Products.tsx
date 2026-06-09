import { useState } from "react";
import { products } from "../constants/defaultData";
import {
  deleteProductFromList,
  addProductToList,
  updateProductSpecInList,
} from "../utils/productUtils";
import type { Product } from "../constants/defaultData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Plus, Save, Trash2, RotateCcw } from "lucide-react";

interface ProductsProps {}

export default function Products({}: ProductsProps) {
  const [localProducts, setLocalProducts] = useLocalStorage<Product[]>(
    "products",
    products,
  );
  const [detailModal, setDetailModal] = useState<Product | null>(null);

  const handleSpecChange = (
    specName: keyof Product["specs"],
    value: number | boolean,
  ) => {
    if (!detailModal) return;
    setDetailModal({
      ...detailModal,
      specs: {
        ...detailModal.specs,
        [specName]: value,
      },
    });
    const updatedList = updateProductSpecInList(
      localProducts,
      detailModal.id,
      specName,
      value,
    );
    setLocalProducts(updatedList);
  };
  const handleDeleteProduct = () => {
    if (!detailModal) return;
    const conferma = confirm(
      `Sei sicuro di voler eliminare ${detailModal.name}?`,
    );
    if (!conferma) return;

    const updatedList = deleteProductFromList(localProducts, detailModal.id);
    setLocalProducts(updatedList);
    setDetailModal(null);
  };

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    specs: {
      price: 0,
      cpuCore: 8,
      gpuCore: 10,
      ram: 8,
      storage: 256,
      hasFan: false,
    },
  });

  const handleCreateProduct = (e?: { preventDefault: () => void }) => {
    if (e) e.preventDefault();

    if (!newProduct.name.trim()) {
      alert("Inserisci un nome valido per il prodotto!");
      return;
    }

    const updatedList = addProductToList(localProducts, newProduct);

    setLocalProducts(updatedList);
    setNewProduct({
      name: "",
      specs: {
        price: 0,
        cpuCore: 8,
        gpuCore: 10,
        ram: 8,
        storage: 256,
        hasFan: false,
      },
    });
    setIsCreateOpen(false);
  };

  const handleResetStorage = () => {
    const conferma = confirm(
      "Sei sicuro di voler cancellare tutti i prodotti personalizzati e ripristinare i dati di fabbrica?",
    );
    if (!conferma) return;

    setLocalProducts(products);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <span className="font-mono text-apple-blue text-sm uppercase font-black animate-in fade-in duration-1000">
          Products
        </span>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-tight animate-in fade-in duration-1000 text-center">
            Personalizza i risultati.
          </span>
          <span className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-3xl leading-none animate-in fade-in duration-1000 text-center mb-3">
            Aggiungi prodotti.
          </span>
        </div>
        <span className="text-secondary text-xl text-center">
          Cambia le varie specifiche e aggiungi nuovi prodotti al sistema.
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
                  Nome Prodotto
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
              {localProducts.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="transition-colors duration-200 hover:bg-white/2 cursor-pointer"
                    onClick={() => setDetailModal(product)}
                  >
                    <td className="py-4 px-6 text-center text-lg text-white">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white/80">
                      {product.specs.price}€
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white/80">
                      {product.specs.cpuCore}
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white/80">
                      {product.specs.gpuCore}
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white/80">
                      {product.specs.ram}GB
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white/80">
                      {product.specs.storage}GB
                    </td>
                    <td className="py-4 px-6 text-center text-lg text-white/80">
                      {product.specs.hasFan ? "Sì" : "No"}
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
                  MODIFICA SPECIFICHE
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
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    PREZZO (€)
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={detailModal.specs.price}
                    onChange={(e) =>
                      handleSpecChange("price", Number(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    CORE CPU
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={detailModal.specs.cpuCore}
                    onChange={(e) =>
                      handleSpecChange("cpuCore", Number(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    CORE GPU
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={detailModal.specs.gpuCore}
                    onChange={(e) =>
                      handleSpecChange("gpuCore", Number(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    RAM (GB)
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={detailModal.specs.ram}
                    onChange={(e) =>
                      handleSpecChange("ram", Number(e.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    ARCHIVIAZIONE (GB)
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={detailModal.specs.storage}
                    onChange={(e) =>
                      handleSpecChange("storage", Number(e.target.value))
                    }
                  />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="hasFan"
                    className="w-4 h-4 rounded accent-apple-blue"
                    checked={detailModal.specs.hasFan}
                    onChange={(e) =>
                      handleSpecChange("hasFan", e.target.checked)
                    }
                  />
                  <label
                    htmlFor="hasFan"
                    className="text-sm text-secondary font-mono select-none cursor-pointer"
                  >
                    <span>Presenza Ventole</span>
                  </label>
                </div>
              </form>
              <button
                className="flex justify-center items-center gap-2 px-4 py-1 w-full bg-red-500 text-white rounded-lg font-black hover:bg-red-500/50 cursor-pointer"
                onClick={() => handleDeleteProduct()}
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-mono">ELIMINA PRODOTTO</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <div className="w-full max-w-md bg-apple-card border border-apple-elevated/40 rounded-2xl p-6 flex flex-col shadow-2xl mx-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono text-apple-blue uppercase tracking-widest font-bold">
                  CREA PRODOTTO
                </span>
                <h2 className="text-xl font-black text-white tracking-tight mt-1">
                  Nuovo prodotto
                </h2>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
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
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    NOME
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    PREZZO (€)
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={newProduct.specs.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specs: {
                          ...newProduct.specs,
                          price: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    CORE CPU
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={newProduct.specs.cpuCore}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specs: {
                          ...newProduct.specs,
                          cpuCore: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    CORE GPU
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={newProduct.specs.gpuCore}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specs: {
                          ...newProduct.specs,
                          gpuCore: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    RAM (GB)
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={newProduct.specs.ram}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specs: {
                          ...newProduct.specs,
                          ram: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-secondary font-mono">
                    ARCHIVIAZIONE (GB)
                  </label>
                  <input
                    className="w-full h-10 outline-none text-white px-3 bg-white/2 rounded-xl border border-white/5"
                    type="number"
                    value={newProduct.specs.storage}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specs: {
                          ...newProduct.specs,
                          storage: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="hasFan"
                    className="w-4 h-4 rounded accent-apple-blue"
                    checked={newProduct.specs.hasFan}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        specs: {
                          ...newProduct.specs,
                          hasFan: e.target.checked,
                        },
                      })
                    }
                  />
                  <label
                    htmlFor="hasFan"
                    className="text-sm text-secondary font-mono select-none cursor-pointer"
                  >
                    <span>Presenza Ventole</span>
                  </label>
                </div>
              </form>
              <button
                className="flex justify-center items-center gap-2 px-4 py-1 w-full bg-apple-blue/50 text-white rounded-lg font-black hover:bg-apple-blue/20 cursor-pointer"
                onClick={(e) => handleCreateProduct(e as any)}
              >
                <Save className="w-4 h-4" />
                <span className="font-mono">SALVA PRODOTTO</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
