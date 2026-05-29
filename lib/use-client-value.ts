"use client";

import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/**
 * Returns false during SSR and the first client render (so hydration matches),
 * then true. The idiomatic React 19 way to gate client-only values without a
 * setState-in-effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

// A module-level clock cache so getSnapshot is referentially stable between
// ticks (returning a fresh Date.now() each call would trip useSyncExternalStore).
let cachedNow = 0;

function subscribeClock(onChange: () => void) {
  cachedNow = Date.now();
  const id = setInterval(() => {
    cachedNow = Date.now();
    onChange();
  }, 1000);
  return () => clearInterval(id);
}

/**
 * A 1Hz clock as an external store. Returns 0 on the server / first paint
 * (callers render a placeholder), then live epoch milliseconds.
 */
export function useNow(): number {
  return useSyncExternalStore(
    subscribeClock,
    () => cachedNow,
    () => 0
  );
}

export interface Pair {
  a: number;
  b: number;
}

// A stable client-only random pair. Generated in subscribe (never during
// render), cached so getSnapshot stays referentially stable across renders.
const SERVER_PAIR: Pair = { a: 0, b: 0 };
let cachedPair: Pair = SERVER_PAIR;

function subscribePair(onChange: () => void) {
  if (cachedPair === SERVER_PAIR) {
    cachedPair = {
      a: Math.floor(Math.random() * 8) + 1,
      b: Math.floor(Math.random() * 8) + 1,
    };
    onChange();
  }
  return () => {};
}

/**
 * A small client-only random addition captcha. Returns {a:0,b:0} on the
 * server / first paint, then a fixed random pair (1–8 each) on the client.
 */
export function useClientPair(): Pair {
  return useSyncExternalStore(
    subscribePair,
    () => cachedPair,
    () => SERVER_PAIR
  );
}
