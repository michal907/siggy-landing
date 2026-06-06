import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  GithubLogo,
  Calendar,
  Lightning,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

const APP_HREF = "/app";

/* ────────────────────────────────────────────────────────────────
   TemplateGallery — 8 fully-built signatures in a bento grid.
   Conversion-critical: every card looks like a real, polished
   signature an actual professional would use. Variety on every
   axis (surface, layout, typography, photo/no-photo, with/without
   social, with/without CTA) so visitors find one they identify
   with quickly.
   ──────────────────────────────────────────────────────────────── */

export function TemplateGallery() {
  return (
    <section className="lp-gallery" id="templates">
      <div className="container lp-section-narrow">
        <span className="lp-pill lp-pill-light">
          <span className="lp-pill-ico" aria-hidden>
            <SquaresFour weight="fill" size={11} />
          </span>
          Templates
        </span>
        <h2 className="lp-section-title">
          30+ signatures.
          <br />
          <span className="lp-accent">Yours in two minutes.</span>
        </h2>
        <p className="lp-section-sub">
          Hand-built for the kinds of professionals we&apos;ve actually met. Editorial for writers,
          mono for engineers, bold for sales, minimal for execs. Pick one, change your details,
          paste it where your sign-off used to live.
        </p>
      </div>

      <div className="container">
        <div className="lp-gallery-grid">
          {/* Row 1 — 5+4+3 */}
          <GalleryItem num="01" name="Editorial Classic" col={5} surface="paper">
            <EditorialSignature />
          </GalleryItem>
          <GalleryItem num="02" name="Developer Mono" col={4} surface="ink">
            <MonoSignature />
          </GalleryItem>
          <GalleryItem num="03" name="Minimal Quiet" col={3} surface="paper">
            <MinimalSignature />
          </GalleryItem>

          {/* Row 2 — 4+4+4 */}
          <GalleryItem num="04" name="Centered Card" col={4} surface="warm">
            <CenteredSignature />
          </GalleryItem>
          <GalleryItem num="05" name="Bold Identity" col={4} surface="ink">
            <BoldSignature />
          </GalleryItem>
          <GalleryItem num="06" name="Compact Profile" col={4} surface="paper">
            <CompactSignature />
          </GalleryItem>

          {/* Row 3 — 6+6 */}
          <GalleryItem num="07" name="Conversion CTA" col={6} surface="warm">
            <CtaSignature />
          </GalleryItem>
          <GalleryItem num="08" name="Branded Banner" col={6} surface="paper">
            <BannerSignature />
          </GalleryItem>
        </div>

        <div className="lp-gallery-foot">
          <Link href={APP_HREF} className="btn btn-accent btn-large">
            <Lightning weight="fill" size={14} />
            Open the template library
            <ArrowRight weight="bold" size={14} className="arr" />
          </Link>
          <span className="lp-gallery-foot-aside">24 more inside.</span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   GalleryItem — one column-spanning unit. The template's name lives
   ABOVE the card (numbered label + name + optional badge), so it
   reads clearly as "the name of this template", not as part of the
   signature inside.
   ──────────────────────────────────────────────────────────────── */
function GalleryItem({
  num,
  name,
  col,
  surface,
  badge,
  children,
}: {
  num: string;
  name: string;
  col: 3 | 4 | 5 | 6;
  surface: "paper" | "warm" | "ink";
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`lp-gal-card lp-gal-col-${col}`}>
      <header className="lp-gal-head">
        <span className="lp-gal-head-num">{num}</span>
        <span className="lp-gal-head-name">{name}</span>
        {badge ? (
          <span className={`lp-gal-head-badge${badge === "Most popular" ? " is-pop" : ""}`}>
            {badge}
          </span>
        ) : null}
      </header>
      <div className={`lp-gal-chrome lp-gal-surf-${surface}`}>
        <div className="lp-gal-sig">{children}</div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────
   Avatar helper — reused across signatures
   ──────────────────────────────────────────────────────────────── */
function Avatar({
  src,
  fallback,
  tint,
  size = 52,
  shape = "round",
}: {
  src: string;
  fallback: string;
  tint: string;
  size?: number;
  shape?: "round" | "square";
}) {
  return (
    <span
      className={`lp-gal-av lp-gal-av-${shape}`}
      style={{
        width: size,
        height: size,
        backgroundColor: tint,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={size} height={size} loading="eager" />
      <span className="lp-gal-av-fb">{fallback}</span>
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   1) Editorial — paper surface, refined, the "default polished"
   ──────────────────────────────────────────────────────────────── */
function EditorialSignature() {
  return (
    <div className="sig-editorial">
      <div className="sig-head">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="AW"
          tint="oklch(78% 0.06 30)"
        />
        <div className="sig-head-text">
          <div className="sig-name">Anna Wright</div>
          <div className="sig-title">Head of Partnerships</div>
          <div className="sig-company">Meridian Studio</div>
        </div>
      </div>
      <div className="sig-rule sig-rule-accent" />
      <div className="sig-rows">
        <div><span className="lbl">e</span> anna@meridian.co</div>
        <div><span className="lbl">t</span> +1 415 555 0142</div>
        <div><span className="lbl">w</span> meridian.co</div>
      </div>
      <div className="sig-foot">
        <div className="sig-soc">
          <span className="b"><LinkedinLogo weight="fill" /></span>
          <span className="b"><XLogo weight="fill" /></span>
          <span className="b"><InstagramLogo weight="fill" /></span>
        </div>
        <span className="sig-wordmark">
          <span className="sig-wordmark-mark">M</span>
          Meridian
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   2) Developer mono — terminal-style on ink
   ──────────────────────────────────────────────────────────────── */
function MonoSignature() {
  return (
    <div className="sig-mono">
      <div className="sig-mono-prompt">// labs.dev / staff-eng</div>
      <div className="sig-mono-head">
        <Avatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="TK"
          tint="oklch(68% 0.04 230)"
        />
        <div>
          <div className="sig-mono-name">$ whoami</div>
          <div className="sig-mono-sub">Tomáš Krátky, Staff Engineer</div>
        </div>
      </div>
      <div className="sig-rule sig-rule-thin-on-ink" />
      <div className="sig-mono-rows">
        <div><span className="lbl">›</span> tomas@labs.dev</div>
        <div><span className="lbl">›</span> github.com/tkratky</div>
        <div><span className="lbl">›</span> labs.dev/team</div>
      </div>
      <div className="sig-foot">
        <div className="sig-soc">
          <span className="b on-ink"><GithubLogo weight="fill" /></span>
          <span className="b on-ink"><LinkedinLogo weight="fill" /></span>
        </div>
        <span className="sig-mono-end">// EOF</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   3) Minimal — paper, text-only, almost no decoration
   ──────────────────────────────────────────────────────────────── */
function MinimalSignature() {
  return (
    <div className="sig-minimal">
      <div className="sig-name sig-name-light">Marek Tóth</div>
      <div className="sig-title">Head of Marketing, Northwave</div>
      <div className="sig-rows sig-rows-min">
        <div>marek@northwave.io</div>
        <div>+421 911 555 077</div>
        <div>northwave.io</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   4) Centered — cream, avatar centered at top
   ──────────────────────────────────────────────────────────────── */
function CenteredSignature() {
  return (
    <div className="sig-centered">
      <Avatar
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
        fallback="JN"
        tint="oklch(72% 0.10 50)"
      />
      <div className="sig-name">Jana Nováková</div>
      <div className="sig-title">Product Designer</div>
      <div className="sig-rule sig-rule-accent sig-rule-center" />
      <div className="sig-rows sig-rows-centered">
        <div>jana@acme.co</div>
        <div>acme.co/jana</div>
      </div>
      <div className="sig-soc sig-soc-centered">
        <span className="b"><LinkedinLogo weight="fill" /></span>
        <span className="b"><XLogo weight="fill" /></span>
        <span className="b"><InstagramLogo weight="fill" /></span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   5) Bold — ink/dark, caps name, strong rule
   ──────────────────────────────────────────────────────────────── */
function BoldSignature() {
  return (
    <div className="sig-bold">
      <div className="sig-head">
        <Avatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="MT"
          tint="oklch(72% 0.10 50)"
          shape="square"
        />
        <div className="sig-head-text">
          <div className="sig-name sig-name-caps">MAYA TORRES</div>
          <div className="sig-title">Creative Director</div>
          <div className="sig-company">studio.io</div>
        </div>
      </div>
      <div className="sig-rule sig-rule-accent" />
      <div className="sig-rows">
        <div><span className="lbl">→</span> maya@studio.io</div>
        <div><span className="lbl">→</span> studio.io/maya</div>
      </div>
      <div className="sig-foot">
        <div className="sig-soc">
          <span className="b on-ink"><LinkedinLogo weight="fill" /></span>
          <span className="b on-ink"><InstagramLogo weight="fill" /></span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   6) Compact — paper, square avatar left, dense info right
   ──────────────────────────────────────────────────────────────── */
function CompactSignature() {
  return (
    <div className="sig-compact">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
        fallback="DK"
        tint="oklch(72% 0.08 60)"
        shape="square"
      />
      <div className="sig-compact-info">
        <div className="sig-name sig-name-tight">Daniel Kovács</div>
        <div className="sig-title">Founder, Atelier Studio</div>
        <div className="sig-rule sig-rule-accent sig-rule-mini" />
        <div className="sig-rows sig-rows-tight">
          <div>daniel@atelier.studio</div>
          <div>+421 905 123 456 · atelier.studio</div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   7) CTA-led — cream, contact + book-a-call button
   ──────────────────────────────────────────────────────────────── */
function CtaSignature() {
  return (
    <div className="sig-cta">
      <div className="sig-head">
        <Avatar
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="SK"
          tint="oklch(76% 0.06 40)"
        />
        <div className="sig-head-text">
          <div className="sig-name">Sara Klein</div>
          <div className="sig-title">Brand Director, Northwave</div>
        </div>
      </div>
      <div className="sig-rule sig-rule-accent" />
      <div className="sig-rows">
        <div><span className="lbl">e</span> sara@northwave.io</div>
        <div><span className="lbl">w</span> northwave.io/brand</div>
      </div>
      <div className="sig-cta-row">
        <span className="sig-cta-btn">
          <Calendar weight="fill" size={12} />
          Book a 15-min intro
          <ArrowUpRight weight="bold" size={11} />
        </span>
        <div className="sig-soc">
          <span className="b"><LinkedinLogo weight="fill" /></span>
          <span className="b"><XLogo weight="fill" /></span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   8) Banner-led — paper, branded green strip at top
   ──────────────────────────────────────────────────────────────── */
function BannerSignature() {
  return (
    <div className="sig-banner">
      <div className="sig-banner-strip">
        <span>STUDIO · Q3 2026</span>
        <span>NEW WORK · BOOK A CALL</span>
      </div>
      <div className="sig-head">
        <Avatar
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="LB"
          tint="oklch(72% 0.08 50)"
        />
        <div className="sig-head-text">
          <div className="sig-name">Lucas Beaumont</div>
          <div className="sig-title">Marketing Director</div>
          <div className="sig-company">Atelier Beaumont</div>
        </div>
      </div>
      <div className="sig-banner-rows">
        <div className="sig-rows">
          <div><span className="lbl">e</span> lucas@beaumont.studio</div>
          <div><span className="lbl">t</span> +33 1 42 60 30 30</div>
          <div><span className="lbl">w</span> beaumont.studio</div>
          <div><span className="lbl">a</span> 14 rue de Rivoli, Paris</div>
        </div>
        <div className="sig-banner-side">
          <div className="sig-wordmark sig-wordmark-vertical">
            <span className="sig-wordmark-mark big">B</span>
            <span className="sig-wordmark-label">
              <strong>Beaumont</strong>
              <em>Studio · Paris</em>
            </span>
          </div>
          <div className="sig-soc">
            <span className="b"><LinkedinLogo weight="fill" /></span>
            <span className="b"><InstagramLogo weight="fill" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
