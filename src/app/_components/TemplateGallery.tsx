import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  GithubLogo,
  BehanceLogo,
  Calendar,
  Lightning,
  SquaresFour,
  EnvelopeSimple,
  Phone,
  DeviceMobile,
  GlobeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

const APP_HREF = "/app";

/* ────────────────────────────────────────────────────────────────
   TemplateGallery — 8 signatures on white surfaces, with the fonts
   email clients actually render. Real personas, real icons (not
   letter labels), real-feeling contact details.
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
          <GalleryItem num="01" name="Classic Pro" col={5}>
            <ClassicProSignature />
          </GalleryItem>
          <GalleryItem num="02" name="Developer" col={4}>
            <DeveloperSignature />
          </GalleryItem>
          <GalleryItem num="03" name="Minimal Executive" col={3}>
            <MinimalistSignature />
          </GalleryItem>

          {/* Row 2 — 4 + 4 + 4 */}
          <GalleryItem num="04" name="Counsel Centered" col={4}>
            <CounselSignature />
          </GalleryItem>
          <GalleryItem num="05" name="Bold Realtor" col={4}>
            <BoldRealtorSignature />
          </GalleryItem>
          <GalleryItem num="06" name="Compact" col={4}>
            <CompactSignature />
          </GalleryItem>

          {/* Row 3 — 6 + 6 */}
          <GalleryItem num="07" name="Sales CTA" col={6}>
            <SalesCtaSignature />
          </GalleryItem>
          <GalleryItem num="08" name="Studio Letterhead" col={6}>
            <StudioLetterheadSignature />
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
  children,
}: {
  num: string;
  name: string;
  col: 3 | 4 | 5 | 6;
  children: React.ReactNode;
}) {
  return (
    <article className={`lp-gal-card lp-gal-col-${col}`}>
      <header className="lp-gal-head">
        <span className="lp-gal-head-num">{num}</span>
        <span className="lp-gal-head-name">{name}</span>
      </header>
      <div className="lp-gal-chrome lp-gal-surf-paper">
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
   01) Classic Pro — Senior Account Manager
   White surface, 1px navy bar (was 2px), envelope/phone/globe icons.
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
              <span className="tpl-icn"><EnvelopeSimple weight="regular" size={12} /></span>
              anna.wright@meridian.co
            </div>
            <div>
              <span className="tpl-icn"><DeviceMobile weight="regular" size={12} /></span>
              +1 (415) 555&#8209;0142
            </div>
            <div>
              <span className="tpl-icn"><GlobeSimple weight="regular" size={12} /></span>
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
   02) Developer — Staff Engineer
   Light mono signature. Social icons on LEFT of contact info.
   Font: Courier New.
   ════════════════════════════════════════════════════════════════ */
function DeveloperSignature() {
  return (
    <div className="tpl tpl-dev">
      <div className="tpl-dev-prompt">// staff-eng @ labs.dev</div>
      <div className="tpl-dev-name">$ TOMÁŠ KRÁTKY</div>
      <div className="tpl-dev-sub">Staff Engineer, Labs.dev</div>
      <div className="tpl-dev-hr" aria-hidden />
      <div className="tpl-dev-grid">
        <div className="tpl-dev-social">
          <SocialChip color="#0c0c10">
            <GithubLogo weight="fill" />
          </SocialChip>
          <SocialChip color="#0c0c10">
            <LinkedinLogo weight="fill" />
          </SocialChip>
        </div>
        <div className="tpl-dev-rows">
          <div><span className="tpl-dev-prefix">$</span> tomas@labs.dev</div>
          <div><span className="tpl-dev-prefix">$</span> github.com/tkratky</div>
          <div><span className="tpl-dev-prefix">$</span> labs.dev/team</div>
        </div>
      </div>
      <div className="tpl-dev-eof">// EOF</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   03) Minimal Executive — Managing Partner
   Now with a monogram, a hairline rule, contact, and a value-add
   line: an investment thesis link (something recipients can click
   instead of just stating who Priya is).
   ════════════════════════════════════════════════════════════════ */
function MinimalistSignature() {
  return (
    <div className="tpl tpl-min">
      <div className="tpl-min-head">
        <span className="tpl-min-mark" aria-hidden>PS</span>
        <div className="tpl-min-text">
          <div className="tpl-min-name">Priya Shah</div>
          <div className="tpl-min-meta">Managing Partner</div>
          <div className="tpl-min-meta tpl-min-meta-firm">Halo Capital</div>
        </div>
      </div>
      <div className="tpl-min-rule" aria-hidden />
      <div className="tpl-min-rows">
        <div><span className="tpl-icn"><EnvelopeSimple weight="regular" size={11} /></span>priya@halo.capital</div>
        <div><span className="tpl-icn"><Phone weight="regular" size={11} /></span>+1 415 555 0119</div>
      </div>
      <div className="tpl-min-thesis">
        Investing in B2B infra ·
        <a className="tpl-min-link"> halo.capital/thesis <ArrowUpRight weight="bold" size={9} /></a>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   04) Counsel Centered — Senior Tax Counsel
   Unchanged from prior version (user said good). Now with envelope
   icon for email + map pin for location.
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
          <div>
            <span className="tpl-icn"><EnvelopeSimple weight="regular" size={11} /></span>
            marek@northwave.legal
          </div>
          <div>
            <span className="tpl-icn"><Phone weight="regular" size={11} /></span>
            +44 20 7946 0382
          </div>
          <div>
            <span className="tpl-icn"><MapPin weight="regular" size={11} /></span>
            12 Lincoln&apos;s Inn Fields, London WC2A
          </div>
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
   05) Bold Realtor — VP of Sales
   Now on white. Big CAPS name, big burgundy phone, square photo
   with thin dark border. Polished: better hierarchy, refined
   spacing, license number anchored at the bottom-left.
   ════════════════════════════════════════════════════════════════ */
function BoldRealtorSignature() {
  return (
    <div className="tpl tpl-bold">
      <div className="tpl-bold-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="MT"
          tint="#8b6f5c"
          size={64}
          shape="square"
        />
        <div className="tpl-bold-body">
          <div className="tpl-bold-name">MAYA TORRES</div>
          <div className="tpl-bold-title">
            VP of Sales · <span className="tpl-bold-firm">Vertex Realty Miami</span>
          </div>
          <div className="tpl-bold-rule" aria-hidden />
          <div className="tpl-bold-phone">
            <span className="tpl-icn tpl-icn-on-accent"><Phone weight="fill" size={13} /></span>
            +1 (305) 555&#8209;0188
          </div>
          <div className="tpl-bold-email">
            <span className="tpl-icn"><EnvelopeSimple weight="regular" size={11} /></span>
            maya@vertexrealty.com
          </div>
        </div>
      </div>
      <div className="tpl-bold-foot">
        <div className="tpl-bold-license">FL LIC #SL3441290 · 142 closings YTD</div>
        <div className="tpl-bold-social">
          <SocialChip color="#7a2942">
            <LinkedinLogo weight="fill" />
          </SocialChip>
          <SocialChip color="#7a2942">
            <InstagramLogo weight="fill" />
          </SocialChip>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   06) Compact — Founder
   Clean tight horizontal block, photo left, two-row body right
   (identity row + contact row), tiny social anchored at the end of
   the contact row. No flex-wrap mess.
   ════════════════════════════════════════════════════════════════ */
function CompactSignature() {
  return (
    <div className="tpl tpl-cmp">
      <TplAvatar
        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
        fallback="SK"
        tint="#cca597"
        size={44}
      />
      <div className="tpl-cmp-body">
        <div className="tpl-cmp-line1">
          <span className="tpl-cmp-name">Sara Klein</span>
          <span className="tpl-cmp-role">Founder &amp; CEO, Northwave</span>
        </div>
        <div className="tpl-cmp-line2">
          <span className="tpl-cmp-item">
            <EnvelopeSimple weight="regular" size={11} />
            sara@northwave.io
          </span>
          <span className="tpl-cmp-item">
            <Phone weight="regular" size={11} />
            +44 7700 900 123
          </span>
          <span className="tpl-cmp-item">
            <GlobeSimple weight="regular" size={11} />
            northwave.io
          </span>
          <span className="tpl-cmp-social">
            <SocialChip color="#0c0c10" naked>
              <LinkedinLogo weight="fill" />
            </SocialChip>
            <SocialChip color="#0c0c10" naked>
              <XLogo weight="fill" />
            </SocialChip>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   07) Sales CTA — Account Executive
   Cleaned up: tighter hierarchy, single contact row, the CTA is the
   visual anchor (not competing with a wall of metadata). No more
   address disclaimer.
   ════════════════════════════════════════════════════════════════ */
function SalesCtaSignature() {
  return (
    <div className="tpl tpl-sales">
      <div className="tpl-sales-row">
        <TplAvatar
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
          fallback="JB"
          tint="#a8b8c8"
          size={64}
        />
        <div className="tpl-sales-body">
          <div className="tpl-sales-name">Jordan Bailey</div>
          <div className="tpl-sales-title">
            Senior Account Executive <span className="tpl-sep">·</span>{" "}
            <span className="tpl-sales-firm">Acme Cloud</span>
          </div>
          <div className="tpl-sales-contact">
            <span className="tpl-sales-item">
              <EnvelopeSimple weight="regular" size={12} />
              jordan@acmecloud.com
            </span>
            <span className="tpl-sales-item">
              <Phone weight="regular" size={12} />
              +1 (628) 555 0214
            </span>
          </div>
          <div className="tpl-sales-cta-row">
            <a className="tpl-sales-cta">
              <Calendar weight="fill" size={13} />
              Book a 15-min intro
              <ArrowUpRight weight="bold" size={11} />
            </a>
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
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   08) Studio Letterhead — Creative Director
   Brand-new direction. A printed-letterhead approach: company
   wordmark across the top in Georgia, a hairline above and below
   the body, two-column body (photo + identity on left, contact on
   right), tight tagline at the bottom. Feels like a stationery
   header, not a banner ad.
   ════════════════════════════════════════════════════════════════ */
function StudioLetterheadSignature() {
  return (
    <div className="tpl tpl-letter">
      <div className="tpl-letter-eyebrow">EST. 2018 · PARIS</div>
      <div className="tpl-letter-word">BEAUMONT</div>
      <div className="tpl-letter-rule tpl-letter-rule-top" aria-hidden />

      <div className="tpl-letter-body">
        <div className="tpl-letter-left">
          <TplAvatar
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=128&h=128&q=85&auto=format&fit=crop&crop=faces"
            fallback="LB"
            tint="#c4a48a"
            size={52}
          />
          <div>
            <div className="tpl-letter-name">Lucas Beaumont</div>
            <div className="tpl-letter-title">Creative Director</div>
            <div className="tpl-letter-social">
              <SocialChip color="#1f1d1b" naked>
                <LinkedinLogo weight="fill" />
              </SocialChip>
              <SocialChip color="#1f1d1b" naked>
                <BehanceLogo weight="fill" />
              </SocialChip>
              <SocialChip color="#1f1d1b" naked>
                <InstagramLogo weight="fill" />
              </SocialChip>
            </div>
          </div>
        </div>

        <div className="tpl-letter-right">
          <div className="tpl-letter-contact">
            <div>
              <span className="tpl-icn"><EnvelopeSimple weight="regular" size={11} /></span>
              lucas@beaumont.studio
            </div>
            <div>
              <span className="tpl-icn"><Phone weight="regular" size={11} /></span>
              +33 1 42 60 30 30
            </div>
            <div>
              <span className="tpl-icn"><GlobeSimple weight="regular" size={11} /></span>
              beaumont.studio
            </div>
            <div>
              <span className="tpl-icn"><MapPin weight="regular" size={11} /></span>
              14 rue de Rivoli, Paris
            </div>
          </div>
        </div>
      </div>

      <div className="tpl-letter-rule tpl-letter-rule-bot" aria-hidden />
      <div className="tpl-letter-foot">Brand &middot; Editorial &middot; Identity</div>
    </div>
  );
}

/* ──────────────── Social chip ──────────────── */
function SocialChip({
  color,
  naked,
  children,
}: {
  color: string;
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
    <span className="tpl-social-chip" style={{ background: color }}>
      {children}
    </span>
  );
}
