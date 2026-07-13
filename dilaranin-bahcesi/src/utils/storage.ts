import type { GardenFlower } from "../types";

export const STORAGE_KEY = "dilaranin-bahcesi-garden-reset-20260713-2";

function isGardenFlower(value: unknown): value is GardenFlower {
  if (!value || typeof value !== "object") return false;
  const flower = value as Record<string, unknown>;
  return typeof flower.id === "string" && flower.type === "daisy" &&
    Number.isInteger(flower.slotIndex) && typeof flower.x === "number" &&
    typeof flower.y === "number" && typeof flower.scale === "number" &&
    typeof flower.rotation === "number" && typeof flower.createdAt === "string";
}

export function loadGarden(): GardenFlower[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isGardenFlower)) {
      throw new Error("Kayıt beklenen bahçe biçiminde değil.");
    }
    const slotIndexes = parsed.map((flower) => flower.slotIndex);
    if (new Set(slotIndexes).size !== slotIndexes.length) {
      throw new Error("Bahçe kaydında birden fazla çiçek aynı konumda.");
    }
    return parsed;
  } catch (error) {
    console.warn("Bahçe kaydı okunamadı; boş bir bahçeyle devam ediliyor.", error);
    return [];
  }
}

export function saveGarden(flowers: GardenFlower[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flowers));
  } catch (error) {
    console.warn("Bahçe bu cihazda kaydedilemedi.", error);
  }
}
