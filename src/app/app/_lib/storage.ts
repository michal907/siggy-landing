import type { SignatureData } from "../_components/SignatureRenderer";

export type SavedSignature = {
  id: string;
  name: string;
  updatedAt: number;
  data: SignatureData;
};

const KEY = "siggy-signatures";

export function loadAll(): SavedSignature[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SavedSignature[];
  } catch {
    return [];
  }
}

export function loadOne(id: string): SavedSignature | null {
  return loadAll().find((s) => s.id === id) ?? null;
}

export function saveAll(list: SavedSignature[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export function upsert(sig: SavedSignature) {
  const all = loadAll();
  const i = all.findIndex((s) => s.id === sig.id);
  if (i >= 0) all[i] = sig;
  else all.unshift(sig);
  saveAll(all);
}

export function remove(id: string) {
  saveAll(loadAll().filter((s) => s.id !== id));
}

export function makeId() {
  return `sig_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function duplicate(id: string): SavedSignature | null {
  const original = loadOne(id);
  if (!original) return null;
  const copy: SavedSignature = {
    ...original,
    id: makeId(),
    name: `${original.name} (copy)`,
    updatedAt: Date.now(),
  };
  upsert(copy);
  return copy;
}
