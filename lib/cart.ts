"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Cart shared state, backed by the TanStack Query cache.
 *
 * The cart isn't fetched from a server — it's client state — but we deliberately
 * keep it in the query cache so every consumer (nav badge, shop grid, the
 * event page CTA) subscribes to one source of truth and re-renders together.
 * Persistence is mirrored to localStorage so a refresh keeps the cart.
 */

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export const CART_QUERY_KEY = ["cart"] as const;
const STORAGE_KEY = "tbe-cart-v1";

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function useCart() {
  const queryClient = useQueryClient();

  const { data: lines = [] } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: readStorage,
    // The query "fetches" from localStorage once, then we mutate the cache.
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const setLines = useCallback(
    (updater: (prev: CartLine[]) => CartLine[]) => {
      queryClient.setQueryData<CartLine[]>(CART_QUERY_KEY, (prev) => {
        const next = updater(prev ?? []);
        writeStorage(next);
        return next;
      });
    },
    [queryClient]
  );

  const add = useCallback(
    (item: Omit<CartLine, "qty">, qty = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === item.id);
        if (existing) {
          return prev.map((l) =>
            l.id === item.id ? { ...l, qty: l.qty + qty } : l
          );
        }
        return [...prev, { ...item, qty }];
      });
    },
    [setLines]
  );

  const remove = useCallback(
    (id: string) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [setLines]
  );

  const clear = useCallback(() => setLines(() => []), [setLines]);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

  return { lines, count, total, add, remove, clear };
}
