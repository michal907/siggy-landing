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

   LEFT (60%): the editor mockup, standing alone as the visual proof.
   RIGHT (40%): pill, headline, four benefit headlines, accent rule,
   CTA with three inline reassurances. Vertically centered so the
   text block sits comfortably alongside the taller mockup.
   ──────────────────────────────────────────────────────────────── */

export function BenefitsCompare() {
  return (
    <section className="lp-bc lp-section-cream" id="why">
      <div className="container">
        <div className="lp-bc-grid">
          {/* ── LEFT (60%): mockup ──────────────────────── */}
          <div className="lp-bc-left">
            <EditorMockup />
          </div>

          {/* ── RIGHT (40%): pill + h2 + benefits + CTA ── */}
          <div className="lp-bc-right">
            <span className="lp-pill lp-pill-light">
              <span className="lp-pill-ico" aria-hidden>
                <Sparkle weight="fill" size={11} />
              </span>
              Why Siggy
            </span>

            <h2 className="lp-section-title lp-bc-headline">
              Built for inboxes,
              <br />
              <span className="lp-accent">not for slideshows.</span>
            </h2>

            <span className="lp-bc-rule" aria-hidden />

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
              <ul className="lp-bc-reassure" aria-label="Pricing reassurance">
                <li>Free forever</li>
                <li>No card</li>
                <li>2&#8209;min setup</li>
              </ul>
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
            <span className="lp-bc-mock-divider-v" aria-hidden />
            <span className="lp-bc-mock-logo">
              <span className="lp-bc-mock-logo-mark" aria-hidden>
                <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 206,30 L 126,130 L 34,130 C 34,52 108,12 206,30 Z" />
                  <path d="M 34,210 L 114,110 L 206,110 C 206,188 132,228 34,210 Z" />
                </svg>
              </span>
              Siggy
            </span>
            <span className="lp-bc-mock-signame" aria-hidden>
              Brand director signature
            </span>
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
          {/* Left rail — matches the real editor's grouped nav */}
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

          {/* Main — tinted bg, card-wrapped form, like the real editor */}
          <main className="lp-bc-mock-main">
            <div className="lp-bc-mock-main-head">
              <div className="lp-bc-mock-main-eyebrow">Content</div>
              <div className="lp-bc-mock-main-title">Identity</div>
              <div className="lp-bc-mock-main-sub">
                Who you are. The basics that show up first.
              </div>
            </div>

            <div className="lp-bc-mock-card">
              <div className="lp-bc-mock-card-title">
                <span className="lp-bc-mock-card-ico" aria-hidden>
                  <UserIcon weight="fill" size={10} />
                </span>
                Basics
              </div>
              <div className="lp-bc-mock-fields">
                <MockField label="Full name" value="Sara Klein" focused />
                <MockField label="Job title" value="Brand Director" />
                <MockField label="Company" value="Northwave" />
                <MockField label="Pronouns" value="she / her" />
              </div>
            </div>
          </main>

          {/* Right preview — real-feeling client tabs and mail frame */}
          <aside className="lp-bc-mock-preview">
            <div className="lp-bc-mock-preview-label">
              <span>Live preview</span>
              <span className="dim">3 clients</span>
            </div>
            <div className="lp-bc-mock-preview-tabs" role="tablist">
              <span className="tab active">
                <span className="tab-glyph gmail" aria-hidden>M</span>
                Gmail
              </span>
              <span className="tab">
                <span className="tab-glyph outlook" aria-hidden>O</span>
              </span>
              <span className="tab">
                <span className="tab-glyph apple" aria-hidden>A</span>
              </span>
            </div>
            <div className="lp-bc-mock-preview-frame">
              <div className="lp-bc-mock-preview-mailhead">
                <span className="from">Sara Klein</span>
                <span className="time">10:42</span>
                <span className="subj">Re: Q3 brand refresh</span>
              </div>
              <div className="lp-bc-mock-preview-body">
                <p>Thanks Marek, the new lockup looks great. Let&apos;s ship Friday.</p>
                <p className="signoff">Best,</p>
                <div className="lp-bc-mock-sig">
                  <div className="lp-bc-mock-sig-row">
                    <span className="lp-bc-mock-sig-av" aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&q=85&auto=format&fit=crop&crop=faces"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </span>
                    <div className="lp-bc-mock-sig-col">
                      <span className="n">Sara Klein</span>
                      <span className="t">Brand Director, Northwave</span>
                    </div>
                  </div>
                  <span className="lp-bc-mock-sig-rule" aria-hidden />
                  <div className="lp-bc-mock-sig-meta">
                    <span>sara@northwave.io</span>
                    <span className="lp-bc-mock-sig-foot">
                      <span className="lp-bc-mock-sig-social" aria-hidden>
                        <LinkedinLogo weight="fill" size={9} />
                      </span>
                      <span className="lp-bc-mock-sig-social" aria-hidden>
                        <XLogo weight="fill" size={9} />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lp-bc-mock-preview-foot">
              <CheckCircle weight="fill" size={10} />
              Pixel&#8209;identical in Outlook desktop.
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
   ``focused`` adds a subtle accent ring + blinking caret to imply the
   user is currently editing this field.
   ──────────────────────────────────────────────────────────────── */
function MockField({
  label,
  value,
  focused,
}: {
  label: string;
  value: string;
  focused?: boolean;
}) {
  return (
    <div className={`lp-bc-mock-field${focused ? " is-focused" : ""}`}>
      <span className="lp-bc-mock-field-label">{label}</span>
      <span className="lp-bc-mock-field-input">
        {value}
        {focused ? <span className="lp-bc-mock-field-caret" aria-hidden /> : null}
      </span>
    </div>
  );
}

