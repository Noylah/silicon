export default interface UseCaseProfile {
  id: number;
  name: string;
  highlights: {
    price: "max" | "min" | null;
    cpuCore: "max" | "min" | null;
    gpuCore: "max" | "min" | null;
    ram: "max" | "min" | null;
    storage: "max" | "min" | null;
    hasFan: "max" | "min" | null;
  };
}
