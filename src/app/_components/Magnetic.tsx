"use client";

import { useEffect, useRef } from "react";

type MagneticProps = {
  children: React.ReactNode;
  /** How strongly the inner element follows the cursor. 0 = none, 0.5 = subtle, 1 = strong. */
  strength?: number;
  /** Optional className passed to the wrapper. */
  className?: string;
};

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    // Respect reduced-motion users.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={wrap} className={`magnetic ${className ?? ""}`}>
      {children}
    </div>
  );
}
