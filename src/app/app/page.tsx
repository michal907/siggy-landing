"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  User as UserIcon,
  SignIn,
  DotsThree,
  Copy,
  Trash,
  PencilSimple,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { ExportModal, type User } from "./_components/ExportModal";
import { AccountPanel } from "./_components/AccountPanel";
import { SignatureRenderer, type SignatureData } from "./_components/SignatureRenderer";
import { TEMPLATE_PRESETS } from "./_lib/templates";
import { loadAll, remove as removeSig, duplicate, makeId, type SavedSignature } from "./_lib/storage";

const PREVIEW_DATA: SignatureData = {
  name: "Anna Wright",
  pronouns: "",
  title: "Head of Partnerships",
  department: "",
  company: "Meridian Studio",
  companyTagline: "",
  photo: null,
  photoShape: "round",
  photoSize: 56,
  photoBorder: 0,
  photoBorderColor: "#0F0F14",
  photoGrayscale: false,
  email: "anna@meridian.co",
  phone: "+1 415 555 0142",
  mobilePhone: "",
  website: "meridian.co",
  address: "",
  calendarLink: "",
  linkedin: "annawright",
  twitter: "annawright",
  instagram: "",
  github: "",
  youtube: "",
  tiktok: "",
  behance: "",
  dribbble: "",
  threads: "",
  medium: "",
  whatsapp: "",
  socialIconStyle: "filled",
  socialIconShape: "rounded",
  socialIconSize: 22,
  badges: [],
  signoff: "",
  signoffItalic: false,
  ctaEnabled: false,
  ctaText: "Book a call",
  ctaUrl: "calendly.com/anna",
  ctaStyle: "pill",
  disclaimer: "",
  accent: "#F25C45",
  template: "editorial",
  layout: "stacked",
  fontFamily: "inter",
  fontSize: 13,
  nameWeight: 700,
  titleItalic: false,
  titleUppercase: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  spacing: "comfortable",
  divThickness: 2,
  divColor: "#F25C45",
  dividerStyle: "solid",
  frameStyle: "none",
  frameColor: "#E4E4E7",
  frameRadius: 12,
  bgColor: "#FAF7F2",
  customCss: "",
};

const LS_USER = "siggy-user";

export default function DashboardPage() {
  const [signatures, setSignatures] = useState<SavedSignature[]>([]);
  const [user, setUser] = useState<User>(null);
  const [hydrated, setHydrated] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem(LS_USER);
      if (u) setUser(JSON.parse(u));
      setSignatures(loadAll());
    } catch {}
    setHydrated(true);
  }, []);

  const refresh = () => setSignatures(loadAll());

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleDelete = (id: string) => {
    removeSig(id);
    refresh();
    setMenuFor(null);
    showToast("Signature deleted");
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicate(id);
    refresh();
    setMenuFor(null);
    if (copy) showToast("Duplicated");
  };

  const handleSignup = (u: NonNullable<User>) => {
    setUser(u);
    try {
      localStorage.setItem(LS_USER, JSON.stringify(u));
    } catch {}
    showToast(`Welcome, ${u.displayName.split(/\s+/)[0]}`);
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(LS_USER);
    } catch {}
    showToast("Signed out");
  };

  const featured = TEMPLATE_PRESETS.slice(0, 8);

  return (
    <div className="dash-shell">
      {/* HEADER */}
      <header className="dash-header">
        <div className="container">
          <div className="dash-header-left">
            <Link href="/" className="app-back">
              <ArrowLeft weight="bold" size={14} />
              Siggy.app
            </Link>
            <span className="logo">
              <span className="logo-mark" aria-hidden="true">
                <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 206,30 L 126,130 L 34,130 C 34,52 108,12 206,30 Z" />
                  <path d="M 34,210 L 114,110 L 206,110 C 206,188 132,228 34,210 Z" />
                </svg>
              </span>
              Siggy
            </span>
          </div>
          <div className="dash-header-right">
            {user ? (
              <button className="btn btn-secondary" onClick={() => setAccountOpen(true)}>
                <UserIcon weight="bold" size={14} />
                {user.displayName.split(/\s+/)[0]}
              </button>
            ) : (
              <>
                <button className="btn btn-ghost" onClick={() => setSignupOpen(true)}>
                  <SignIn weight="bold" size={14} />
                  Sign in
                </button>
                <button className="btn btn-accent" onClick={() => setSignupOpen(true)}>
                  Create free account
                  <ArrowRight weight="bold" size={14} className="arr" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="container">
          {/* WELCOME */}
          <div className="dash-welcome">
            <span className="dash-eyebrow">
              <span className="dot" />
              {user ? `Good to see you, ${user.displayName.split(/\s+/)[0]}` : "No account needed to start"}
            </span>
            <h1 className="dash-title">
              {signatures.length > 0 ? (
                <>Your <span className="accent-text">signatures.</span></>
              ) : (
                <>Design your first signature.</>
              )}
            </h1>
            <p className="dash-sub">
              {signatures.length > 0
                ? "Pick up where you left off, or start something new."
                : "Two minutes from now you'll have a signature that doesn't look like 2003."}
            </p>
            <div className="dash-cta-row">
              <Link href={`/app/editor?id=${makeId()}`} className="btn btn-accent btn-large">
                <Plus weight="bold" size={14} />
                Create new signature
              </Link>
              {signatures.length === 0 && (
                <a href="#templates" className="btn btn-secondary btn-large">
                  Browse templates
                </a>
              )}
            </div>
          </div>

          {/* SAVED SIGNATURES */}
          {hydrated && signatures.length > 0 && (
            <section className="dash-section">
              <div className="dash-section-head">
                <h2 className="dash-section-title">Your signatures</h2>
                <span className="dash-count">{signatures.length} saved</span>
              </div>
              <div className="sig-grid">
                {signatures.map((s) => (
                  <div key={s.id} className="sig-card">
                    <Link href={`/app/editor?id=${s.id}`} className="sig-card-thumb" aria-label={`Open ${s.name}`}>
                      <div className="sig-thumb-surface">
                        <div style={{ transform: "scale(0.78)", transformOrigin: "top left", width: "128%" }}>
                          <SignatureRenderer data={s.data} />
                        </div>
                      </div>
                      <span
                        className="sig-thumb-accent"
                        style={{ background: s.data.accent }}
                        aria-hidden="true"
                      />
                    </Link>
                    <div className="sig-card-meta">
                      <div className="sig-card-name">{s.name}</div>
                      <div className="sig-card-updated">
                        Updated {formatRelative(s.updatedAt)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="sig-card-menu-btn"
                      aria-label="More options"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMenuFor(menuFor === s.id ? null : s.id);
                      }}
                    >
                      <DotsThree weight="bold" size={18} />
                    </button>
                    {menuFor === s.id && (
                      <>
                        <div className="sig-menu-backdrop" onClick={() => setMenuFor(null)} />
                        <div className="sig-menu" role="menu">
                          <Link href={`/app/editor?id=${s.id}`} className="sig-menu-item">
                            <PencilSimple weight="bold" size={13} />
                            Edit
                          </Link>
                          <button type="button" className="sig-menu-item" onClick={() => handleDuplicate(s.id)}>
                            <Copy weight="bold" size={13} />
                            Duplicate
                          </button>
                          <button type="button" className="sig-menu-item danger" onClick={() => handleDelete(s.id)}>
                            <Trash weight="bold" size={13} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <Link href={`/app/editor?id=${makeId()}`} className="sig-card sig-card-new">
                  <div className="sig-thumb-surface sig-thumb-empty">
                    <Plus weight="bold" size={28} />
                  </div>
                  <div className="sig-card-meta">
                    <div className="sig-card-name">New signature</div>
                    <div className="sig-card-updated">Start from scratch or a template</div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* EMPTY STATE — inline guidance, no card-with-icon template */}
          {hydrated && signatures.length === 0 && (
            <section className="dash-section dash-empty">
              <div className="dash-empty-row">
                <span className="dash-empty-marker" aria-hidden>01</span>
                <div className="dash-empty-copy">
                  <h3 className="dash-empty-h">Start blank, or pick a template below.</h3>
                  <p>No account required to design. Sign in only when you want to save.</p>
                </div>
                <Link href={`/app/editor?id=${makeId()}`} className="btn btn-accent">
                  <Plus weight="bold" size={14} />
                  Open the editor
                </Link>
              </div>
            </section>
          )}

          {/* TEMPLATE STRIP */}
          <section className="dash-section" id="templates">
            <div className="dash-section-head">
              <h2 className="dash-section-title">
                Or start with a <span className="accent-text">template.</span>
              </h2>
              <span className="dash-count">22 designs</span>
            </div>
            <div className="dash-templates-grid">
              {featured.map((t) => {
                const previewData: SignatureData = {
                  ...PREVIEW_DATA,
                  ...t.preset,
                };
                return (
                  <Link
                    key={t.id}
                    href={`/app/editor?id=${makeId()}&template=${t.id}`}
                    className="dash-tpl-card"
                  >
                    <span className="dash-tpl-preview">
                      <span className="dash-tpl-preview-scale">
                        <SignatureRenderer data={previewData} />
                      </span>
                    </span>
                    <span className="dash-tpl-info">
                      <span className="dash-tpl-tag" style={{ background: t.swatch }}>{t.tag}</span>
                      <span className="dash-tpl-name-row">
                        <span className="dash-tpl-name">{t.name}</span>
                        <span className="dash-tpl-group">{t.group}</span>
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Link href={`/app/editor?id=${makeId()}`} className="btn btn-secondary">
                Browse all 22 templates
                <ArrowRight weight="bold" size={14} className="arr" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      {signupOpen && (
        <ExportModal
          html=""
          user={user}
          onSignup={(u) => {
            handleSignup(u);
            setSignupOpen(false);
          }}
          onClose={() => setSignupOpen(false)}
          onToast={showToast}
        />
      )}
      {accountOpen && user && (
        <AccountPanel user={user} onClose={() => setAccountOpen(false)} onSignOut={handleSignOut} />
      )}
      {toast && (
        <div className="toast">
          <span className="ico"><CheckCircle weight="fill" size={16} /></span>
          {toast}
        </div>
      )}
    </div>
  );
}

function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3600_000)}h ago`;
  const days = Math.floor(diff / 86_400_000);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}
