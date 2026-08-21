const STORAGE_KEY = "ig-flagged-deactivated";

function readFlagged(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeFlagged(set: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage nedostupan (npr. privatni mod) — tiho ignorišemo
  }
}

export function isFlagged(username: string): boolean {
  return readFlagged().has(username);
}

export function toggleFlagged(username: string): boolean {
  const set = readFlagged();
  const next = !set.has(username);
  if (next) {
    set.add(username);
  } else {
    set.delete(username);
  }
  writeFlagged(set);
  return next;
}