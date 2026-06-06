import Link from "next/link";
import {
  Sparkle,
  ArrowRight,
  ArrowLeft,
  Lightning,
  Stack,
  Layout as LayoutIcon,
  User as UserIcon,
  Camera,
  At,
  Palette,
  TextAa,
  Export as ExportIcon,
  LinkedinLogo,
  XLogo,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

const APP_HREF = "/app";

/* ────────────────────────────────────────────────────────────────
   BenefitsCompare — 2-column proof section.

   LEFT: section title + a faithful mockup of the real editor at
   /app/editor (header strip, three-pane body with grouped nav rail,
   Identity form, and a multi-client live preview).
   RIGHT: four plain benefit headlines (no subtext), then CTA. The
   honest competitor comparison lives in its own section below
   (CompetitorComparison).
   ──────────────────────────────────────────────────────────────── */

export function BenefitsCompare() {
  return (
    <section className="lp-bc lp-section-cream" id="why">
      <div className="container">
        <div className="lp-bc-grid">
          {/* ── LEFT ─────────────────────────────────────── */}
          <div className="lp-bc-left">
            <span className="lp-pill lp-pill-light">
              <span className="lp-pill-ico" aria-hidden>
                <Sparkle weight="fill" size={11} />
              </span>
              Why Siggy
            </span>
            <h2 className="lp-section-title">
              Built for inboxes,
              <br />
              <span className="lp-accent">not for slideshows.</span>
            </h2>

            <EditorMockup />
          </div>

          {/* ── RIGHT ────────────────────────────────────── */}
          <div className="lp-bc-right">
            <ol className="lp-bc-benefits">
              <li>
                <span className="lp-bc-benefits-num">01</span>
                Same in every client.
              </li>
              <li>
                <span className="lp-bc-benefits-num">02</span>
                You own the HTML.
              </li>
              <li>
                <span className="lp-bc-benefits-num">03</span>
                Two minutes flat.
              </li>
              <li>
                <span className="lp-bc-benefits-num">04</span>
                Designed, not generated.
              </li>
            </ol>

            <div className="lp-bc-cta-row">
              <Link href={APP_HREF} className="btn btn-accent btn-large lp-bc-cta">
                <Lightning weight="fill" size={14} />
                Start free
                <ArrowRight weight="bold" size={14} className="arr" />
              </Link>
              <span className="lp-bc-cta-aside">Free forever, no card.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   EditorMockup — a snapshot of /app/editor, rendered in HTML so it
   stays sharp on Retina and dark/light without raster artifacts.
   Mirrors the real header strip, the grouped nav rail, the active
   Identity form, and the right-side multi-client live preview.
   ──────────────────────────────────────────────────────────────── */
function EditorMockup() {
  return (
    <figure
      className="lp-bc-mock"
      role="img"
      aria-label="A snapshot of the Siggy editor: header with the signature name and an Export button, a left navigation rail grouped by Design / Content / Look, the Identity form with name, title, and company fields filled in, and a multi-client live preview showing the rendered signature."
    >
      {/* Window chrome */}
      <div className="lp-bc-mock-chrome">
        <span className="lp-bc-mock-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="lp-bc-mock-url">
          <span className="lp-bc-mock-url-secure" aria-hidden />
          siggy.app/app/editor
        </span>
      </div>

      {/* App */}
      <div className="lp-bc-mock-app">
        {/* Header strip */}
        <header className="lp-bc-mock-head">
          <div className="lp-bc-mock-head-left">
            <span className="lp-bc-mock-back">
              <ArrowLeft weight="bold" size={10} />
              All signatures
            </span>
            <span className="lp-bc-mock-logo">
              <span className="lp-bc-mock-logo-mark" aria-hidden>
                <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 206,30 L 126,130 L 34,130 C 34,52 108,12 206,30 Z" />
                  <path d="M 34,210 L 114,110 L 206,110 C 206,188 132,228 34,210 Z" />
                </svg>
              </span>
              Siggy
            </span>
            <span className="lp-bc-mock-signame">Brand director signature</span>
          </div>
          <div className="lp-bc-mock-head-right">
            <span className="lp-bc-mock-saved">
              <span className="lp-bc-mock-saved-dot" aria-hidden />
              Saved
            </span>
            <span className="lp-bc-mock-btn lp-bc-mock-btn-accent">
              <ExportIcon weight="bold" size={10} />
              Export
            </span>
          </div>
        </header>

        {/* 3-pane body */}
        <div className="lp-bc-mock-body">
          {/* Left rail */}
          <aside className="lp-bc-mock-rail">
            <span className="lp-bc-mock-rail-group">Design</span>
            <RailItem icon={Stack} label="Templates" />
            <RailItem icon={LayoutIcon} label="Layout" />
            <span className="lp-bc-mock-rail-group">Content</span>
            <RailItem icon={UserIcon} label="Identity" active />
            <RailItem icon={Camera} label="Photo" />
            <RailItem icon={At} label="Contact" />
            <span className="lp-bc-mock-rail-group">Look</span>
            <RailItem icon={Palette} label="Color" />
            <RailItem icon={TextAa} label="Typography" />
          </aside>

          {/* Main */}
          <main className="lp-bc-mock-main">
            <div className="lp-bc-mock-main-eyebrow">Content</div>
            <div className="lp-bc-mock-main-title">Identity</div>
            <div className="lp-bc-mock-fields">
              <MockField label="Full name" value="Sara Klein" />
              <MockField label="Job title" value="Brand Director" />
              <MockField label="Company" value="Northwave" />
              <MockField label="Pronouns" value="she / her" />
            </div>
          </main>

          {/* Right preview */}
          <aside className="lp-bc-mock-preview">
            <div className="lp-bc-mock-preview-label">
              <span>Live preview</span>
              <span className="dim">Gmail · Outlook · Apple</span>
            </div>
            <div className="lp-bc-mock-preview-tabs">
              <span className="active">Gmail</span>
              <span>Outlook</span>
              <span>Apple</span>
            </div>
            <div className="lp-bc-mock-preview-frame">
              <div className="lp-bc-mock-preview-mailhead">
                <span className="from">Sara Klein</span>
                <span className="subj">Re: Q3 brand refresh</span>
              </div>
              <div className="lp-bc-mock-preview-body">
                <p>Thanks Marek, the new lockup looks great. Let&apos;s ship.</p>
                <p className="signoff">Best,</p>
                <div className="lp-bc-mock-sig">
                  <div className="lp-bc-mock-sig-row">
                    <span className="lp-bc-mock-sig-av" aria-hidden>SK</span>
                    <div className="lp-bc-mock-sig-col">
                      <span className="n">Sara Klein</span>
                      <span className="t">Brand Director · Northwave</span>
                      <span className="c">sara@northwave.io</span>
                    </div>
                  </div>
                  <span className="lp-bc-mock-sig-rule" aria-hidden />
                  <div className="lp-bc-mock-sig-foot">
                    <span className="lp-bc-mock-sig-social" aria-hidden>
                      <LinkedinLogo weight="fill" size={9} />
                    </span>
                    <span className="lp-bc-mock-sig-social" aria-hidden>
                      <XLogo weight="fill" size={9} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lp-bc-mock-preview-foot">
              <CheckCircle weight="fill" size={10} />
              Identical in Outlook desktop.
            </div>
          </aside>
        </div>
      </div>

      {/* Caption */}
      <figcaption className="lp-bc-mock-caption">
        The actual editor. Live preview keeps up as you type.
      </figcaption>
    </figure>
  );
}

/* ────────────────────────────────────────────────────────────────
   RailItem — single sidebar nav row in the mockup.
   ──────────────────────────────────────────────────────────────── */
function RailItem({
  icon: Icon,
  label,
  active,
}: {
  icon: PhosphorIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <span className={`lp-bc-mock-rail-item${active ? " is-active" : ""}`}>
      <Icon weight={active ? "fill" : "regular"} size={10} />
      {label}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   MockField — one labelled form row in the Identity section.
   ──────────────────────────────────────────────────────────────── */
function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="lp-bc-mock-field">
      <span className="lp-bc-mock-field-label">{label}</span>
      <span className="lp-bc-mock-field-input">{value}</span>
    </div>
  );
}

