"use client";

import { useEffect, useState } from "react";
import {
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  GithubLogo,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Stacked signature cluster. Three fully-built signatures on different
 * shades of white / Envato cream. Cycle every 3s with a fluent ease-out.
 * Respects prefers-reduced-motion.
 */
export function SignatureCluster() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % 3);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const cards = [
    { id: "anna", tilt: -3, render: <AnnaCard /> },
    { id: "maya", tilt: 5, render: <MayaCard /> },
    { id: "tomas", tilt: -6, render: <TomasCard /> },
  ];

  return (
    <div className="lp-cluster lp-cluster-stack" aria-hidden="true">
      {cards.map((card, i) => {
        const pos = (i - active + cards.length) % cards.length; // 0 = front
        return (
          <div
            key={card.id}
            className="lp-cluster-card lp-cluster-stack-card"
            data-pos={pos}
            style={{ "--tilt": `${card.tilt}deg` } as React.CSSProperties}
          >
            {card.render}
          </div>
        );
      })}

      {/* Floating "30+ templates" badge */}
      <div className="lp-cluster-badge" aria-hidden="true">
        <Lightning weight="fill" size={12} />
        30+ templates
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Card 1: Anna Wright (paper-white)
   Photo + name + role + contacts + socials + brand wordmark
   ──────────────────────────────────────────────── */
function AnnaCard() {
  return (
    <div className="lp-cluster-content lp-cluster-content-paper">
      <div className="lp-cluster-head">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="AW"
          tint="oklch(78% 0.06 30)"
        />
        <div className="lp-cluster-head-text">
          <div className="lp-cluster-name">Anna Wright</div>
          <div className="lp-cluster-title">Head of Partnerships</div>
          <div className="lp-cluster-company">Meridian Studio</div>
        </div>
      </div>
      <div className="lp-cluster-rule lp-cluster-rule-accent" />
      <div className="lp-cluster-rows">
        <div><span className="lbl">e</span> anna@meridian.co</div>
        <div><span className="lbl">t</span> +1 415 555 0142</div>
        <div><span className="lbl">w</span> meridian.co</div>
      </div>
      <div className="lp-cluster-foot">
        <div className="lp-cluster-soc">
          <span className="b"><LinkedinLogo weight="fill" /></span>
          <span className="b"><XLogo weight="fill" /></span>
          <span className="b"><InstagramLogo weight="fill" /></span>
        </div>
        <BrandWordmark mark="M" label="Meridian Studio" />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Card 2: Maya Torres (warm cream)
   Banner strip + photo + name caps + role + contacts + studio mark
   ──────────────────────────────────────────────── */
function MayaCard() {
  return (
    <div className="lp-cluster-content lp-cluster-content-cream">
      <div className="lp-cluster-banner">
        <span className="lp-cluster-banner-tag">STUDIO</span>
        <span className="lp-cluster-banner-line" aria-hidden />
        <span className="lp-cluster-banner-meta">EST · 2019</span>
      </div>
      <div className="lp-cluster-head">
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="MT"
          tint="oklch(72% 0.10 50)"
          shape="square"
        />
        <div className="lp-cluster-head-text">
          <div className="lp-cluster-name lp-cluster-name-caps">MAYA TORRES</div>
          <div className="lp-cluster-title">Creative Director</div>
          <div className="lp-cluster-company">studio.io</div>
        </div>
      </div>
      <div className="lp-cluster-rule lp-cluster-rule-accent" />
      <div className="lp-cluster-rows">
        <div><span className="lbl">m</span> maya@studio.io</div>
        <div><span className="lbl">w</span> studio.io/maya</div>
      </div>
      <div className="lp-cluster-foot">
        <div className="lp-cluster-soc">
          <span className="b"><LinkedinLogo weight="fill" /></span>
          <span className="b"><InstagramLogo weight="fill" /></span>
        </div>
        <BrandWordmark mark="S" label="studio.io" geometric />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Card 3: Tomáš (off-cream, developer style)
   Mono kicker + photo + name + role + repo + GitHub
   ──────────────────────────────────────────────── */
function TomasCard() {
  return (
    <div className="lp-cluster-content lp-cluster-content-bone">
      <div className="lp-cluster-mono-row">// DEVELOPER · LABS.DEV</div>
      <div className="lp-cluster-head">
        <Avatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="TK"
          tint="oklch(68% 0.04 230)"
        />
        <div className="lp-cluster-head-text">
          <div className="lp-cluster-name lp-cluster-name-mono">$ whoami</div>
          <div className="lp-cluster-title">Tomáš Krátky, Staff Engineer</div>
          <div className="lp-cluster-company">labs.dev</div>
        </div>
      </div>
      <div className="lp-cluster-rule lp-cluster-rule-thin" />
      <div className="lp-cluster-rows lp-cluster-rows-mono">
        <div><span className="lbl">›</span> tomas@labs.dev</div>
        <div><span className="lbl">›</span> github.com/tkratky</div>
      </div>
      <div className="lp-cluster-foot">
        <div className="lp-cluster-soc">
          <span className="b"><GithubLogo weight="fill" /></span>
          <span className="b"><LinkedinLogo weight="fill" /></span>
        </div>
        <BrandWordmark mark="L" label="labs.dev" mono />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────── */
function Avatar({
  src,
  fallback,
  tint,
  shape = "round",
}: {
  src: string;
  fallback: string;
  tint: string;
  shape?: "round" | "square";
}) {
  return (
    <span
      className={`lp-cluster-avatar lp-cluster-avatar-${shape}`}
      style={{ backgroundColor: tint }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={56} height={56} loading="eager" />
      <span className="lp-cluster-avatar-fb">{fallback}</span>
    </span>
  );
}

function BrandWordmark({
  mark,
  label,
  mono,
  geometric,
}: {
  mark: string;
  label: string;
  mono?: boolean;
  geometric?: boolean;
}) {
  return (
    <span className={`lp-cluster-wordmark ${mono ? "lp-cluster-wordmark-mono" : ""}`}>
      <span className={`lp-cluster-wordmark-mark ${geometric ? "geo" : ""}`}>
        {mark}
      </span>
      {label}
    </span>
  );
}
