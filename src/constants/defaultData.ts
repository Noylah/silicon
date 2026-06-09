import type UseCaseProfile from "../types/products";

export const defaultProfiles: UseCaseProfile[] = [
  {
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

export const products = [
  {
    id: 0,
    name: "MacBook Air 13'' (M3, 2024)",
    specs: {
      price: 1249,
      cpuCore: 8,
      gpuCore: 10,
      ram: 16,
      storage: 512,
      hasFan: false,
      displaySize: 13.6,
    },
  },
  {
    id: 1,
    name: "MacBook Pro 14'' (M4, 2025)",
    specs: {
      price: 1949,
      cpuCore: 10,
      gpuCore: 10,
      ram: 16,
      storage: 512,
      hasFan: true,
      displaySize: 14.2,
    },
  },
  {
    id: 2,
    name: "MacBook Pro 16'' (M5 Pro, 2026)",
    specs: {
      price: 2999,
      cpuCore: 12,
      gpuCore: 16,
      ram: 32,
      storage: 1000, // 1TB
      hasFan: true,
      displaySize: 16.2,
    },
  },
];

export const highlights = [
  { name: "price", display: "Prezzo" },
  { name: "cpuCore", display: "Core della CPU" },
  { name: "gpuCore", display: "Core della GPU" },
  { name: "ram", display: "RAM" },
  { name: "storage", display: "Archiviazione" },
  { name: "hasFan", display: "Ventole", boolean: true },
];
