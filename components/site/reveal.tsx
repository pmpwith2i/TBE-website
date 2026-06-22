"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const delayClasses: Record<number, string> = {
  80: "delay-[80ms]",
  100: "delay-100",
  120: "delay-[120ms]",
  160: "delay-[160ms]",
  240: "delay-[240ms]",
};

/**
 * Reveals children on scroll-in (replaces the template's IntersectionObserver).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const delayClass = delay ? delayClasses[delay] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "will-change-[opacity,transform] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        delayClass,
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
