"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  format?: (n: number) => string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  to,
  duration = 1800,
  decimals = 0,
  suffix = "",
  prefix = "",
  format,
}: CountUpProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting && !fired.current) {
          fired.current = true;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = easeOutCubic(p);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(step);
            else setVal(to);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  const display = format
    ? format(val)
    : decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
