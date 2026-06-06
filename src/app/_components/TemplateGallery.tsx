import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  GithubLogo,
  YoutubeLogo,
  Calendar,
  Lightning,
  SquaresFour,
} from "@phosphor-icons/react/dist/ssr";

const APP_HREF = "/app";

/* ────────────────────────────────────────────────────────────────
   TemplateGallery — 8 signatures modeled after real-world templates
   from HubSpot, WiseStamp, and Signature Hound. Every signature is
   rendered with email-safe font stacks ONLY (Helvetica, Arial,
   Georgia, Verdana, Courier New, Times) so what visitors see in
   this gallery is exactly what they'd get pasted into Gmail or
   Outlook. No web fonts. No flex tricks that break in Outlook
   desktop. Real-feeling names, real-feeling companies, real-feeling
   contact details.
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
          Eight here, twenty-four more inside. Built with the fonts every email
          client actually renders, so what you see is exactly what your reply
          will look like in Gmail, Outlook, and Apple Mail.
        </p>
      </div>

      <div className="container">
        <div className="lp-gallery-grid">
          {/* Row 1 — 5 + 4 + 3 */}
          <GalleryItem num="01" name="Classic Pro" col={5} surface="paper">
            <ClassicProSignature />
          </GalleryItem>
          <GalleryItem num="02" name="Developer Terminal" col={4} surface="ink">
            <DeveloperSignature />
          </GalleryItem>
          <GalleryItem num="03" name="Minimalist Executive" col={3} surface="paper">
            <MinimalistSignature />
          </GalleryItem>

          {/* Row 2 — 4 + 4 + 4 */}
          <GalleryItem num="04" name="Counsel Centered" col={4} surface="warm">
            <CounselSignature />
          </GalleryItem>
          <GalleryItem num="05" name="Bold Realtor" col={4} surface="ink">
            <BoldRealtorSignature />
          </GalleryItem>
          <GalleryItem num="06" name="Compact Operator" col={4} surface="paper">
            <CompactSignature />
          </GalleryItem>

          {/* Row 3 — 6 + 6 */}
          <GalleryItem num="07" name="Sales CTA" col={6} surface="warm">
            <SalesCtaSignature />
          </GalleryItem>
          <GalleryItem num="08" name="Studio Branded" col={6} surface="paper">
            <StudioBrandedSignature />
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

/* ──────────────── Gallery wrapper ──────────────── */
function GalleryItem({
  num,
  name,
  col,
  surface,
  children,
}: {
  num: string;
  name: string;
  col: 3 | 4 | 5 | 6;
  surface: "paper" | "warm" | "ink";
  children: React.ReactNode;
}) {
  return (
    <article className={`lp-gal-card lp-gal-col-${col}`}>
      <header className="lp-gal-head">
        <span className="lp-gal-head-num">{num}</span>
        <span className="lp-gal-head-name">{name}</span>
      </header>
      <div className={`lp-gal-chrome lp-gal-surf-${surface}`}>
        <div className="lp-gal-sig">{children}</div>
      </div>
    </article>
  );
}

/* ──────────────── Reusable avatar ──────────────── */
function TplAvatar({
  src,
  fallback,
  tint,
  size = 56,
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
      className={`tpl-av tpl-av-${shape}`}
      style={{ width: size, height: size, backgroundColor: tint }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={size} height={size} loading="eager" />
      <span className="tpl-av-fb">{fallback}</span>
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   01) Classic Pro — Account Manager / Consultant
   The WiseStamp "Premier" archetype: photo left, content right,
   navy accent bar, full contact rows with letter labels, social row.
   Font: Helvetica Neue (the universal sans).
   ════════════════════════════════════════════════════════════════ */
function ClassicProSignature() {
  return (
    <div className="tpl tpl-classic">
      <div className="tpl-classic-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=85&auto=format&fit=crop&crop=faces"
          fallback="AW"
          tint="#dcc9b6"
          size={68}
        />
        <span className="tpl-classic-bar" aria-hidden />
        <div className="tpl-classic-body">
          <div className="tpl-classic-name">Anna Wright</div>
          <div className="tpl-classic-meta">
            Senior Account Manager
            <br />
            Meridian Studio, New York
          </div>
          <div className="tpl-classic-divider" aria-hidden />
          <div className="tpl-classic-rows">
            <div>
              <span className="lbl">E</span>
              anna.wright@meridian.co
            </div>
            <div>
              <span className="lbl">M</span>
              +1 (415) 555&#8209;0142
            </div>
            <div>
              <span className="lbl">W</span>
              meridian.co/anna
            </div>
          </div>
          <div className="tpl-classic-social">
            <SocialChip color="#1a3a5c">
              <LinkedinLogo weight="fill" />
            </SocialChip>
            <SocialChip color="#1a3a5c">
              <XLogo weight="fill" />
            </SocialChip>
            <SocialChip color="#1a3a5c">
              <InstagramLogo weight="fill" />
            </SocialChip>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   02) Developer Terminal — Software Engineer / DevOps
   Dark surface, monospace, $-prompt rows, GitHub + LinkedIn only.
   Font: Courier New (renders everywhere, monospace is rare but safe).
   ════════════════════════════════════════════════════════════════ */
function DeveloperSignature() {
  return (
    <div className="tpl tpl-dev">
      <div className="tpl-dev-prompt">// staff-eng @ labs.dev</div>
      <div className="tpl-dev-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="TK"
          tint="#3a5a72"
          size={46}
          shape="square"
        />
        <div>
          <div className="tpl-dev-name">$ whoami</div>
          <div className="tpl-dev-sub">Tomáš Krátky · Staff Engineer</div>
        </div>
      </div>
      <div className="tpl-dev-rows">
        <div>
          <span className="lbl">&gt;</span> tomas@labs.dev
        </div>
        <div>
          <span className="lbl">&gt;</span> github.com/tkratky
        </div>
        <div>
          <span className="lbl">&gt;</span> labs.dev/team
        </div>
      </div>
      <div className="tpl-dev-foot">
        <span className="tpl-dev-eof">// EOF</span>
        <div className="tpl-dev-social">
          <SocialChip color="#5cffa1" onDark>
            <GithubLogo weight="fill" />
          </SocialChip>
          <SocialChip color="#5cffa1" onDark>
            <LinkedinLogo weight="fill" />
          </SocialChip>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   03) Minimalist Executive — C-suite / Partner
   No photo. Two lines. The "I don't need to flex" signature.
   Used by managing partners, investors, senior counsel.
   Font: Helvetica Neue, very tight.
   ════════════════════════════════════════════════════════════════ */
function MinimalistSignature() {
  return (
    <div className="tpl tpl-min">
      <div className="tpl-min-name">Priya Shah</div>
      <div className="tpl-min-meta">
        Managing Partner
        <br />
        Halo Capital
      </div>
      <div className="tpl-min-rule" aria-hidden />
      <div className="tpl-min-rows">
        <div>priya@halo.capital</div>
        <div>halo.capital</div>
        <div>+1 415 555 0119</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   04) Counsel Centered — Lawyer / Doctor / Financial Advisor
   Centered, serif, formal. Cream surface. Forest green accent.
   Font: Georgia (the most-supported serif in email).
   ════════════════════════════════════════════════════════════════ */
function CounselSignature() {
  return (
    <div className="tpl tpl-counsel">
      <div className="tpl-counsel-stack">
        <TplAvatar
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="MT"
          tint="#c8c2b6"
          size={58}
        />
        <div className="tpl-counsel-name">Dr. Marek Tóth</div>
        <div className="tpl-counsel-title">Senior Tax Counsel</div>
        <div className="tpl-counsel-firm">Northwave Legal, London</div>
        <div className="tpl-counsel-rule" aria-hidden />
        <div className="tpl-counsel-rows">
          <div>marek@northwave.legal</div>
          <div>+44 20 7946 0382 · northwave.legal</div>
        </div>
        <div className="tpl-counsel-social">
          <SocialChip color="#2d5239" naked>
            <LinkedinLogo weight="fill" />
          </SocialChip>
          <SocialChip color="#2d5239" naked>
            <XLogo weight="fill" />
          </SocialChip>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   05) Bold Realtor — Real Estate / Insurance / Premium Sales
   Dark surface, square photo, ALL CAPS name in Arial Black,
   burgundy accent line, big phone treatment.
   Font: Arial (with Arial Black for the name).
   ════════════════════════════════════════════════════════════════ */
function BoldRealtorSignature() {
  return (
    <div className="tpl tpl-bold">
      <div className="tpl-bold-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="MT"
          tint="#8b6f5c"
          size={62}
          shape="square"
        />
        <div className="tpl-bold-body">
          <div className="tpl-bold-name">MAYA TORRES</div>
          <div className="tpl-bold-title">VP of Sales</div>
          <div className="tpl-bold-firm">Vertex Realty · Miami</div>
          <div className="tpl-bold-rule" aria-hidden />
          <div className="tpl-bold-phone">+1 (305) 555 0188</div>
          <div className="tpl-bold-email">maya@vertexrealty.com</div>
        </div>
      </div>
      <div className="tpl-bold-foot">
        <div className="tpl-bold-license">LIC #SL3441290 · FL</div>
        <div className="tpl-bold-social">
          <SocialChip color="#c45872" onDark>
            <LinkedinLogo weight="fill" />
          </SocialChip>
          <SocialChip color="#c45872" onDark>
            <InstagramLogo weight="fill" />
          </SocialChip>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   06) Compact Operator — Founder / Operator / High-Volume Sender
   The WiseStamp "Inline" archetype: single tight block, one row of
   info, no wasted vertical space. Designed for people sending
   dozens of replies a day.
   Font: Helvetica Neue, very small.
   ════════════════════════════════════════════════════════════════ */
function CompactSignature() {
  return (
    <div className="tpl tpl-compact">
      <div className="tpl-compact-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="SK"
          tint="#cca597"
          size={46}
        />
        <div className="tpl-compact-body">
          <div className="tpl-compact-line1">
            <strong>Sara Klein</strong>
            <span className="tpl-dot" aria-hidden>·</span>
            <span className="tpl-compact-role">Founder &amp; CEO, Northwave</span>
          </div>
          <div className="tpl-compact-line2">
            sara@northwave.io
            <span className="tpl-dot" aria-hidden>·</span>
            +44 7700 900 123
            <span className="tpl-dot" aria-hidden>·</span>
            northwave.io
          </div>
          <div className="tpl-compact-social">
            <SocialChip color="#1e1e1e" naked>
              <LinkedinLogo weight="fill" />
            </SocialChip>
            <SocialChip color="#1e1e1e" naked>
              <XLogo weight="fill" />
            </SocialChip>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   07) Sales CTA — SDR / AE / Anyone Booking Meetings
   The HubSpot / WiseStamp sales archetype: full contact info plus
   a prominent "Book a meeting" button. Indigo CTA, on cream surface.
   Font: Helvetica Neue.
   ════════════════════════════════════════════════════════════════ */
function SalesCtaSignature() {
  return (
    <div className="tpl tpl-sales">
      <div className="tpl-sales-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="JB"
          tint="#a8b8c8"
          size={66}
        />
        <div className="tpl-sales-body">
          <div className="tpl-sales-name">Jordan Bailey</div>
          <div className="tpl-sales-title">
            Senior Account Executive · <strong>Acme Cloud</strong>
          </div>
          <div className="tpl-sales-rows">
            <div>
              <span className="lbl">Email</span>
              jordan.bailey@acmecloud.com
            </div>
            <div>
              <span className="lbl">Mobile</span>
              +1 (628) 555 0214
            </div>
          </div>
          <div className="tpl-sales-cta-row">
            <span className="tpl-sales-cta">
              <Calendar weight="fill" size={13} />
              Book a 15-min intro
              <ArrowUpRight weight="bold" size={11} />
            </span>
            <div className="tpl-sales-social">
              <SocialChip color="#3730a3">
                <LinkedinLogo weight="fill" />
              </SocialChip>
              <SocialChip color="#3730a3">
                <XLogo weight="fill" />
              </SocialChip>
            </div>
          </div>
        </div>
      </div>
      <div className="tpl-sales-discl">
        Confidential &amp; proprietary. Acme Cloud, Inc. · 1 California St,
        San Francisco
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   08) Studio Branded — Design Studio / Boutique Agency
   Logomark + wordmark masthead, signature below, promotional bottom
   strip with current quarter's work. Terracotta accent.
   Font: Verdana (popular with creative studios for its distinctness
   while still being email-safe).
   ════════════════════════════════════════════════════════════════ */
function StudioBrandedSignature() {
  return (
    <div className="tpl tpl-studio">
      <div className="tpl-studio-mast">
        <span className="tpl-studio-mark" aria-hidden>B</span>
        <div className="tpl-studio-mast-text">
          <div className="tpl-studio-word">BEAUMONT</div>
          <div className="tpl-studio-sub">STUDIO · PARIS · EST. 2018</div>
        </div>
      </div>
      <div className="tpl-studio-divider" aria-hidden />
      <div className="tpl-studio-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="LB"
          tint="#c4a48a"
          size={50}
        />
        <div className="tpl-studio-body">
          <div className="tpl-studio-name">Lucas Beaumont</div>
          <div className="tpl-studio-title">Creative Director</div>
        </div>
        <div className="tpl-studio-contact">
          <div>lucas@beaumont.studio</div>
          <div>+33 1 42 60 30 30</div>
          <div>beaumont.studio</div>
        </div>
      </div>
      <div className="tpl-studio-banner">
        <span className="tpl-studio-banner-tag">NEW</span>
        Brand systems for Q3 — see latest work
        <ArrowUpRight weight="bold" size={11} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Social chip — small circle with brand color background.
   `naked` = no fill, glyph in color directly (used by minimalist
   and counsel templates where chips would feel too heavy).
   ──────────────────────────────────────────────────────────────── */
function SocialChip({
  color,
  onDark,
  naked,
  children,
}: {
  color: string;
  onDark?: boolean;
  naked?: boolean;
  children: React.ReactNode;
}) {
  if (naked) {
    return (
      <span className="tpl-social-naked" style={{ color }}>
        {children}
      </span>
    );
  }
  return (
    <span
      className={`tpl-social-chip${onDark ? " tpl-social-chip-on-dark" : ""}`}
      style={{ background: color }}
    >
      {children}
    </span>
  );
}
