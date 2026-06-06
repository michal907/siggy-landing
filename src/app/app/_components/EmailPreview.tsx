"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  Star,
  PaperPlaneTilt,
  Lock,
  ArrowUUpLeft,
  ArrowUDownLeft,
  Tag,
  FolderSimple,
  DotsThreeVertical,
} from "@phosphor-icons/react/dist/ssr";
import { SignatureRenderer, type SignatureData } from "./SignatureRenderer";
import { BrandLogo } from "./BrandLogos";

export type EmailClient = "gmail" | "outlook" | "apple" | "yahoo" | "proton" | "thunderbird";

type ClientMeta = {
  key: EmailClient;
  name: string;
  brand: string;
};

const CLIENTS: ClientMeta[] = [
  { key: "gmail", name: "Gmail", brand: "#EA4335" },
  { key: "outlook", name: "Outlook", brand: "#0078D4" },
  { key: "apple", name: "Apple Mail", brand: "#0E76C0" },
  { key: "yahoo", name: "Yahoo", brand: "#6001D2" },
  { key: "proton", name: "Proton", brand: "#6D4AFF" },
  { key: "thunderbird", name: "Thunderbird", brand: "#2B86C5" },
];

const DEFAULT_BODY =
  "Hi team, thanks for the call earlier.\nI'll have the proposal ready by Friday. Talk soon.";

const MAX_BODY = 400;

/* Per-client header chrome — uses BrandLogo for prominent identity */
function ClientChrome({ k, brand, name }: { k: EmailClient; brand: string; name: string }) {
  if (k === "gmail") {
    return (
      <div className="cmock-chrome cmock-gmail-chrome">
        <BrandLogo k="gmail" size={28} />
        <span className="cmock-brand-name">{name}</span>
        <span className="cmock-search">
          <MagnifyingGlass weight="bold" size={13} />
          <span>Search mail</span>
        </span>
        <span className="cmock-avatar" style={{ background: brand }}>A</span>
      </div>
    );
  }
  if (k === "outlook") {
    return (
      <div className="cmock-chrome cmock-outlook-chrome">
        <BrandLogo k="outlook" size={28} />
        <span className="cmock-brand-name">{name}</span>
        <span className="cmock-spacer" />
        <span className="cmock-pill cmock-pill-strong" style={{ background: brand, color: "white" }}>
          Focused
        </span>
      </div>
    );
  }
  if (k === "apple") {
    return (
      <div className="cmock-chrome cmock-apple-chrome">
        <span className="cmock-dot r" />
        <span className="cmock-dot y" />
        <span className="cmock-dot g" />
        <span className="cmock-spacer" />
        <BrandLogo k="apple" size={24} />
        <span className="cmock-brand-name">{name}</span>
        <span className="cmock-spacer" />
        <span className="cmock-apple-pill">Inbox · 1,438</span>
      </div>
    );
  }
  if (k === "yahoo") {
    return (
      <div className="cmock-chrome cmock-yahoo-chrome">
        <BrandLogo k="yahoo" size={28} />
        <span className="cmock-brand-name">{name} Mail</span>
        <span className="cmock-spacer" />
        <span className="cmock-search">
          <MagnifyingGlass weight="bold" size={13} />
          <span>Search</span>
        </span>
      </div>
    );
  }
  if (k === "proton") {
    return (
      <div className="cmock-chrome cmock-proton-chrome">
        <BrandLogo k="proton" size={28} />
        <span className="cmock-brand-name">{name} Mail</span>
        <span className="cmock-spacer" />
        <span className="cmock-encrypted-pill">
          <Lock weight="bold" size={10} />
          End-to-end encrypted
        </span>
      </div>
    );
  }
  // thunderbird
  return (
    <div className="cmock-chrome cmock-thunderbird-chrome">
      <BrandLogo k="thunderbird" size={28} />
      <span className="cmock-brand-name">{name}</span>
      <span className="cmock-spacer" />
      <DotsThreeVertical weight="bold" size={14} color="var(--ink-3)" />
    </div>
  );
}

/* Per-client toolbar — varies by client, robust at narrow widths */
function ClientToolbar({ k, brand }: { k: EmailClient; brand: string }) {
  if (k === "gmail") {
    return (
      <div className="cmock-toolbar cmock-gmail-toolbar">
        <span className="cmock-circle-btn" title="Reply">
          <ArrowUUpLeft weight="bold" size={13} />
        </span>
        <span className="cmock-circle-btn" title="Forward">
          <ArrowUDownLeft weight="bold" size={13} />
        </span>
        <span className="cmock-circle-btn" title="Label">
          <Tag weight="bold" size={13} />
        </span>
        <span className="cmock-circle-btn" title="Folder">
          <FolderSimple weight="bold" size={13} />
        </span>
        <span className="cmock-toolbar-spacer" />
        <span className="cmock-toolbar-meta">2 of 1,438</span>
      </div>
    );
  }
  if (k === "outlook") {
    return (
      <div className="cmock-toolbar cmock-outlook-toolbar">
        <span className="cmock-ribbon-btn" style={{ background: brand, color: "white", borderColor: brand }}>
          <ArrowUUpLeft weight="bold" size={13} />
          Reply
        </span>
        <span className="cmock-ribbon-btn">
          <ArrowUDownLeft weight="bold" size={13} />
          Forward
        </span>
        <span className="cmock-ribbon-btn">
          <Tag weight="bold" size={13} />
          Categorize
        </span>
        <span className="cmock-toolbar-spacer" />
      </div>
    );
  }
  if (k === "thunderbird") {
    return (
      <div className="cmock-toolbar cmock-thunderbird-toolbar">
        <span className="cmock-link-btn">Get Messages</span>
        <span className="cmock-link-btn">Write</span>
        <span className="cmock-link-btn">Chat</span>
        <span className="cmock-toolbar-spacer" />
        <span className="cmock-toolbar-meta">Local Folders</span>
      </div>
    );
  }
  return null;
}

export function EmailPreview({ data }: { data: SignatureData }) {
  const [active, setActive] = useState<EmailClient>("gmail");
  const [body, setBody] = useState(DEFAULT_BODY);
  const meta = CLIENTS.find((c) => c.key === active)!;

  const initial = data.name?.[0]?.toUpperCase() || "A";

  return (
    <>
      <div className="preview-clients" role="tablist" aria-label="Email client">
        {CLIENTS.map((c) => {
          const isActive = active === c.key;
          return (
            <button
              key={c.key}
              role="tab"
              aria-selected={isActive}
              className={`preview-client-btn ${isActive ? "active" : ""}`}
              onClick={() => setActive(c.key)}
              title={c.name}
            >
              <span className="preview-client-glyph">
                <BrandLogo k={c.key} size={26} />
              </span>
              <span className="preview-client-name">{c.name}</span>
            </button>
          );
        })}
      </div>

      <div className={`client-mock cmock-${active}`}>
        <ClientChrome k={active} brand={meta.brand} name={meta.name} />
        <ClientToolbar k={active} brand={meta.brand} />

        <div className="cmock-body">
          {/* Subject + meta row */}
          <div className="cmock-subject-row">
            <span className="cmock-subject">Q3 partnership, follow-up</span>
            <span className="cmock-subject-meta">2 min ago</span>
          </div>

          {/* From row */}
          <div className="cmock-from-row">
            <span className="cmock-from-av" style={{ background: data.accent }}>{initial}</span>
            <div className="cmock-from-info">
              <strong>{data.name || "Your name"}</strong>
              <span>&lt;{data.email || "you@company.com"}&gt; to me</span>
            </div>
            {active === "gmail" && <Star weight="bold" size={14} className="cmock-star" />}
            {active === "outlook" && <span className="cmock-importance-flag" aria-hidden>!</span>}
          </div>

          {/* Body text — editable, preview-only */}
          <div
            className="cmock-text"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const text = (e.target as HTMLDivElement).innerText.slice(0, MAX_BODY);
              setBody(text);
            }}
            onPaste={(e) => {
              e.preventDefault();
              const text = e.clipboardData
                .getData("text/plain")
                .slice(0, MAX_BODY - body.length);
              document.execCommand("insertText", false, text);
            }}
            role="textbox"
            aria-multiline="true"
            aria-label="Email body (preview only, not exported)"
          >
            {body}
          </div>
          <div className="cmock-counter">
            {body.length} / {MAX_BODY} · preview only, not exported
          </div>

          {/* Signature */}
          <div className="cmock-sig-wrap">
            <SignatureRenderer data={data} />
          </div>

          {/* Reply bar (client-specific footer) */}
          {(active === "gmail" || active === "yahoo" || active === "apple") && (
            <div className="cmock-reply-bar">
              <span className="cmock-reply-chip">
                <ArrowUUpLeft weight="bold" size={13} />
                Reply
              </span>
              <span className="cmock-reply-chip">
                <ArrowUDownLeft weight="bold" size={13} />
                Forward
              </span>
            </div>
          )}
          {active === "proton" && (
            <div className="cmock-reply-bar cmock-proton-footer">
              <Lock weight="bold" size={11} />
              <span>Verified end-to-end encryption</span>
            </div>
          )}
          {active === "thunderbird" && (
            <div className="cmock-reply-bar">
              <span className="cmock-reply-chip">
                <PaperPlaneTilt weight="bold" size={13} />
                Reply
              </span>
              <span className="cmock-reply-chip">
                <ArrowUDownLeft weight="bold" size={13} />
                Forward
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
