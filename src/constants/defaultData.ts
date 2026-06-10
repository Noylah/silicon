import type UseCaseProfile from "../types/products";

export const defaultProfiles: UseCaseProfile[] = [
  {
    id: 0,
    name: "Studente",
    highlights: {
      price: "min",
      cpuCore: null,
      gpuCore: null,
      ram: null,
      storage: null,
      hasFan: null,
    },
  },
  {
    id: 1,
    name: "Gamer",
    highlights: {
      price: null,
      cpuCore: null,
      gpuCore: "max",
      ram: null,
      storage: null,
      hasFan: "max",
    },
  },
  {
    id: 2,
    name: "Designer",
    highlights: {
      price: null,
      cpuCore: "max",
      gpuCore: null,
      ram: null,
      storage: null,
      hasFan: "max",
    },
  },
  {
    id: 3,
    name: "Developer",
    highlights: {
      price: null,
      cpuCore: "max",
      gpuCore: null,
      ram: "max",
      storage: null,
      hasFan: "max",
    },
  },
];
export type UseCase = (typeof defaultProfiles)[number];

export const products = [
  {
    id: 1,
    name: "MacBook Air 13'' (M3, 2024)",
    specs: {
      price: 1249,
      cpuCore: 8,
      gpuCore: 10,
      ram: 16,
      storage: 512,
      hasFan: false,
    },
  },
  {
    id: 2,
    name: "MacBook Pro 14'' (M4 Pro, 2025)",
    specs: {
      price: 2449,
      cpuCore: 12,
      gpuCore: 16,
      ram: 24,
      storage: 512,
      hasFan: true,
    },
  },
  {
    id: 3,
    name: "MacBook Pro 16'' (M5 Pro, 2026)",
    specs: {
      price: 2999,
      cpuCore: 12,
      gpuCore: 16,
      ram: 32,
      storage: 1000,
      hasFan: true,
    },
  },
  {
    id: 4,
    name: "Dell XPS 13 (Intel Core Ultra 7)",
    specs: {
      price: 1499,
      cpuCore: 16,
      gpuCore: 8,
      ram: 16,
      storage: 1000,
      hasFan: true,
    },
  },
  {
    id: 5,
    name: "ASUS Zenbook S 14 (OLED, AMD Ryzen AI 9)",
    specs: {
      price: 1399,
      cpuCore: 10,
      gpuCore: 12,
      ram: 32,
      storage: 1000,
      hasFan: true,
    },
  },

  {
    id: 6,
    name: "ASUS ROG Zephyrus G14 (Ryzen 9 + RTX 4070)",
    specs: {
      price: 2199,
      cpuCore: 8,
      gpuCore: 4608,
      ram: 32,
      storage: 1000,
      hasFan: true,
    },
  },
  {
    id: 7,
    name: "Lenovo Legion Pro 5 (Intel i9 + RTX 4060)",
    specs: {
      price: 1699,
      cpuCore: 24,
      gpuCore: 32,
      ram: 16,
      storage: 1000,
      hasFan: true,
    },
  },
  {
    id: 8,
    name: "Framework Laptop 13 (Soli moduli - Fai da te)",
    specs: {
      price: 1049,
      cpuCore: 8,
      gpuCore: 8,
      ram: 16,
      storage: 512,
      hasFan: true,
    },
  },
];
export type Product = (typeof products)[number];

export const highlights = [
  { name: "price", display: "Prezzo" },
  { name: "cpuCore", display: "Core della CPU" },
  { name: "gpuCore", display: "Core della GPU" },
  { name: "ram", display: "RAM" },
  { name: "storage", display: "Archiviazione" },
  { name: "hasFan", display: "Ventole", boolean: true },
];
