"use client";

import { useEffect } from "react";

const SELECTORS = [
  "section",
  ".value-card",
  ".tpl-card",
  ".t-card",
  ".price-card",
  ".feature-block",
  ".metric",
];

export function FadeInOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll(SELECTORS.join(", "));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
