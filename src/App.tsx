import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defaultProfiles, type UseCase } from "./constants/defaultData";

export interface AppOutletContext {
  localUseCases: UseCase[];
  setLocalUseCases: (
    value: UseCase[] | ((current: UseCase[]) => UseCase[]),
  ) => void;
}

export default function App() {
  const [localUseCases, setLocalUseCases] = useLocalStorage<UseCase[]>(
    "useCases",
    defaultProfiles,
  );

  return (
    <div className="flex min-h-screen flex-col font-apple selection:bg-apple-blue/20 selection:text-white">
      <Navbar />
      <main className="w-full flex-1 px-2">
        <Outlet context={{ localUseCases, setLocalUseCases }} />
      </main>
      <Footer />
    </div>
  );
}
