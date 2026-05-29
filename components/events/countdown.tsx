"use client";

import { NEXT_EVENT } from "@/constants/events";
import { useNow } from "@/lib/use-client-value";

const TARGET = new Date(NEXT_EVENT.countdownTarget).getTime();

/** Live countdown to the next event. Shows "—" until the client clock starts. */
export function Countdown() {
  const now = useNow();
  const ready = now > 0;
  const d = Math.max(0, TARGET - now);

  const days = Math.floor(d / 86_400_000);
  const hours = String(Math.floor((d % 86_400_000) / 3_600_000)).padStart(2, "0");
  const min = String(Math.floor((d % 3_600_000) / 60_000)).padStart(2, "0");
  const sec = String(Math.floor((d % 60_000) / 1000)).padStart(2, "0");

  const L = NEXT_EVENT.countdownLabels;
  const cells = [
    { v: ready ? String(days) : "—", l: L.days },
    { v: ready ? hours : "—", l: L.hours },
    { v: ready ? min : "—", l: L.min },
    { v: ready ? sec : "—", l: L.sec },
  ];

  return (
    <div className="countdown">
      {cells.map((c) => (
        <div className="countdown-cell" key={c.l}>
          <div className="v">{c.v}</div>
          <div className="l">{c.l}</div>
        </div>
      ))}
    </div>
  );
}
