import { useState } from "react";

export function useIdCache(key: string): number | null {
  const idStr = window.localStorage.getItem(`id-cache-${key}`);
  if (idStr !== null) {
    window.localStorage.removeItem(`id-cache-${key}`);
  }

  const id = idStr ? parseInt(idStr, 10) : null;

  const [idValue] = useState<number | null>(id);

  console.log(`Retrieved cached id ${idValue} with key ${key}`);
  return idValue;
}

export function cacheId(key: string, id: number): void {
  console.log(`Caching id ${id} with key ${key}`);
  window.localStorage.setItem(`id-cache-${key}`, id.toString());
}
