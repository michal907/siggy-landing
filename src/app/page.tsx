import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  XLogo,
  LinkedinLogo,
  GithubLogo,
  Lightning,
  SignIn,
  Megaphone,
  Path,
  Heart,
  Tag,
  Question,
  Rocket,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Faq } from "./_components/Faq";
import { EmailClients } from "./_components/EmailClients";
import { FadeInOnScroll } from "./_components/FadeInOnScroll";
import { CountUp } from "./_components/CountUp";
import { SignatureCluster } from "./_components/SignatureCluster";
import { EmailClientsCarousel } from "./_components/EmailClientsCarousel";
import { TemplateGallery } from "./_components/TemplateGallery";
import { BenefitsCompare } from "./_components/BenefitsCompare";
import { CompetitorComparison } from "./_components/CompetitorComparison";

const APP_HREF = "/app";

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
        <path d="M 206,30 L 126,130 L 34,130 C 34,52 108,12 206,30 Z" />
        <path d="M 34,210 L 114,110 L 206,110 C 206,188 132,228 34,210 Z" />
      </svg>
    </span>
  );
}

function FiveStars() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} weight="fill" />
      ))}
    </>
  );
}

function Pill({
  children,
  tone = "light",
  icon: Icon,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  icon?: PhosphorIcon;
}) {
  return (
    <span className={`lp-pill lp-pill-${tone}`}>
      {Icon ? (
        <span className="lp-pill-ico" aria-hidden>
          <Icon weight="fill" size={11} />
        </span>
      ) : (
        <span className="lp-pill-dot" aria-hidden />
      )}
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <FadeInOnScroll />

      {/* ── TOP PROMO BAR (not sticky) ── */}
      <div className="lp-promo">
        <div className="container lp-promo-inner">
          <span className="lp-promo-tag">
            <Megaphone weight="fill" size={12} />
            New
          </span>
          <span className="lp-promo-text">
            Save <strong>30% on Siggy Pro</strong> Annual through May 31. Code{" "}
            <code className="lp-promo-code">SIGGY30</code>.
          </span>
          <Link href={APP_HREF} className="lp-promo-cta">
            Claim now
            <ArrowRight weight="bold" size={11} />
          </Link>
        </div>
      </div>

      <div className="nav-wrap lp-nav">
        <nav className="container nav-inner">
          <a href="#" className="logo">
            <LogoMark />
            Siggy
          </a>
          <div className="nav-links">
            <a href="#product">Product</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-cta-group">
            <Link href={APP_HREF} className="btn btn-ghost">
              <SignIn weight="bold" size={14} />
              Log in
            </Link>
            <Link href={APP_HREF} className="btn btn-accent">
              <Lightning weight="fill" size={13} />
              Start free
              <ArrowRight weight="bold" size={13} className="arr" />
            </Link>
          </div>
        </nav>
      </div>

      <main className="lp lp-envato">
        {/* ── HERO — dark, signature cluster, vertically centered ── */}
        <section className="lp-hero lp-hero-night">
          {/* Smooth atmospheric wash — no discrete blobs */}
          <div className="lp-mesh" aria-hidden="true">
            <span className="lp-mesh-blob lp-mesh-blob-1" />
            <span className="lp-mesh-blob lp-mesh-blob-2" />
            <span className="lp-mesh-blob lp-mesh-blob-3" />
            <span className="lp-mesh-blob lp-mesh-blob-4" />
            <span className="lp-mesh-blob lp-mesh-blob-5" />
          </div>
          <div className="container lp-hero-inner">
            <div className="lp-hero-text">
              <LovedByPros />

              <h1 className="lp-headline">
                Email signatures,<br />
                <span className="lp-accent">
                  finally <HandUnderline>serious</HandUnderline>.
                </span>
              </h1>

              <p className="lp-sub">
                Pick a template, paste once. A signature that looks the same in every
                inbox your reply lands in.
              </p>

              <div className="lp-cta-row">
                <Link href={APP_HREF} className="btn btn-accent btn-large">
                  <Lightning weight="fill" size={14} />
                  Start free
                  <ArrowRight weight="bold" size={14} className="arr" />
                </Link>
                <a href="#templates" className="lp-cta-secondary">
                  See templates
                  <ArrowUpRight weight="bold" size={13} />
                </a>
              </div>

              <ul className="lp-hero-points">
                <li><Check weight="bold" size={13} /> Free forever for individuals</li>
                <li><Check weight="bold" size={13} /> No credit card to start</li>
                <li><Check weight="bold" size={13} /> 2-minute setup</li>
              </ul>

              <p className="lp-trust">
                <span className="lp-trust-stars">
                  <FiveStars />
                </span>
                <strong>4.9</strong>
                <span className="lp-trust-dot" aria-hidden />
                from professionals at
                <strong className="lp-trust-brand">Hexapod</strong>,
                <strong className="lp-trust-brand">Northwave</strong>,
                <strong className="lp-trust-brand">Atelier</strong>
              </p>
            </div>

            <div className="lp-hero-vis">
              <SignatureCluster />
            </div>
          </div>

          {/* Email clients carousel — shares the dark hero background */}
          <EmailClientsCarousel />
        </section>

        {/* ── TEMPLATES GALLERY — conversion-critical, directly under hero ── */}
        <TemplateGallery />

        {/* ── BENEFITS + APP MOCKUP (cream) ── */}
        <BenefitsCompare />

        {/* ── HONEST COMPETITOR COMPARISON ── */}
        <CompetitorComparison />

        {/* ── PRODUCT (cream section) ── */}
        <section className="lp-product lp-section-cream" id="product">
          <div className="container lp-section-narrow">
            <Pill icon={Path}>How it works</Pill>
            <h2 className="lp-section-title">
              The same signature,<br />
              in every client.
            </h2>
            <p className="lp-section-sub">
              Every Siggy signature is email-safe HTML. Gmail, Outlook (desktop included),
              Apple Mail, Proton, Yahoo, Thunderbird. No silent breakage when your reply lands.
            </p>
          </div>

          <div className="container">
            <div className="lp-product-stage">
              <EmailClients />
            </div>
          </div>
        </section>


        {/* ── PROOF (cream) ── */}
        <section className="lp-proof lp-section-cream">
          <div className="container lp-section-narrow">
            <Pill icon={Heart}>Loved by teams</Pill>
            <blockquote className="lp-quote">
              <p>
                &ldquo;Replaced our messy in-house template overnight. Our brand finally looks
                like a brand in every reply, and our team didn&apos;t have to fight with HTML
                to get there.&rdquo;
              </p>
              <footer>
                <span className="lp-quote-av">SK</span>
                <span>
                  <strong>Sara Klein</strong>, Brand Director at Northwave
                </span>
              </footer>
            </blockquote>
          </div>
          <div className="container">
            <div className="lp-stats">
              <span><strong><CountUp to={12400} suffix="+" /></strong> signatures designed</span>
              <span className="lp-stats-sep" aria-hidden />
              <span><strong className="lp-accent"><CountUp to={4.9} decimals={1} duration={2200} /></strong> average rating</span>
              <span className="lp-stats-sep" aria-hidden />
              <span><strong><CountUp to={30} suffix="+" /></strong> templates</span>
              <span className="lp-stats-sep" aria-hidden />
              <span><strong><CountUp to={7} /></strong> supported clients</span>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="lp-pricing" id="pricing">
          <div className="container lp-section-narrow">
            <Pill icon={Tag}>Pricing</Pill>
            <h2 className="lp-section-title">Honest pricing.</h2>
            <p className="lp-section-sub">
              Free forever for individuals. Pay only when you need team features. No trials
              that expire, no card to start.
            </p>
          </div>

          <div className="container">
            <div className="lp-pricing-grid">
              <article className="lp-price">
                <div className="lp-price-tier">Free</div>
                <div className="lp-price-amount">
                  <span className="lp-price-num">0</span>
                  <span className="lp-price-cur">€</span>
                  <span className="lp-price-period">forever</span>
                </div>
                <p className="lp-price-tag">Try Siggy, pay nothing.</p>
                <ul className="lp-price-features">
                  <li><Check weight="bold" /><span><strong>1 signature</strong></span></li>
                  <li><Check weight="bold" /><span><strong>6 starter templates</strong></span></li>
                  <li><Check weight="bold" /><span>Export to every client</span></li>
                  <li><Check weight="bold" /><span>Includes a small Siggy badge</span></li>
                </ul>
                <Link href={APP_HREF} className="btn btn-secondary lp-price-btn">Start free</Link>
              </article>

              <article className="lp-price lp-price-featured">
                <span className="lp-price-badge">Most popular</span>
                <div className="lp-price-tier">Starter</div>
                <div className="lp-price-amount">
                  <span className="lp-price-num">4</span>
                  <span className="lp-price-decimals">,99</span>
                  <span className="lp-price-cur">€</span>
                  <span className="lp-price-period">monthly</span>
                </div>
                <p className="lp-price-tag">For small teams and serious freelancers.</p>
                <ul className="lp-price-features">
                  <li><Check weight="bold" /><span>Up to <strong>5 signatures</strong></span></li>
                  <li><Check weight="bold" /><span><strong>All 30+ premium templates</strong></span></li>
                  <li><Check weight="bold" /><span>Custom CSS, no guardrails</span></li>
                  <li><Check weight="bold" /><span><strong>No Siggy branding</strong></span></li>
                  <li><Check weight="bold" /><span>Email support</span></li>
                </ul>
                <Link href={APP_HREF} className="btn btn-accent lp-price-btn">
                  Start 14-day trial
                </Link>
              </article>

              <article className="lp-price">
                <div className="lp-price-tier">Pro</div>
                <div className="lp-price-amount">
                  <span className="lp-price-num">9</span>
                  <span className="lp-price-decimals">,99</span>
                  <span className="lp-price-cur">€</span>
                  <span className="lp-price-period">monthly</span>
                </div>
                <p className="lp-price-tag">For teams that care about brand consistency.</p>
                <ul className="lp-price-features">
                  <li><Check weight="bold" /><span>Everything in Starter, plus:</span></li>
                  <li><Check weight="bold" /><span><strong>Unlimited</strong> signatures</span></li>
                  <li><Check weight="bold" /><span><strong>Team brand library</strong> with lock-in</span></li>
                  <li><Check weight="bold" /><span>Central deploy via Google or 365</span></li>
                  <li><Check weight="bold" /><span>SSO, audit logs</span></li>
                </ul>
                <Link href={APP_HREF} className="btn btn-secondary lp-price-btn">
                  Start 14-day trial
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ── FAQ (cream) ── */}
        <section className="lp-faq lp-section-cream" id="faq">
          <div className="container lp-faq-grid">
            <div className="lp-faq-side">
              <Pill icon={Question}>FAQs</Pill>
              <h2 className="lp-section-title">Questions, answered.</h2>
              <p className="lp-section-sub">
                Most of what people ask us, in plain words. Anything missing,{" "}
                <a href="mailto:hi@siggy.app">hi@siggy.app</a>. Usually a few hours.
              </p>
            </div>
            <Faq />
          </div>
        </section>

        {/* ── FINAL CTA — dark drench ── */}
        <section className="lp-final">
          <div className="container lp-section-narrow">
            <Pill tone="dark" icon={Rocket}>Get started</Pill>
            <h2 className="lp-final-headline">
              Sign off properly.
            </h2>
            <p className="lp-section-sub lp-final-sub">
              Two minutes from now you have a signature that doesn&apos;t look like 2003.
              Free forever for individuals.
            </p>
            <div className="lp-cta-row lp-cta-center">
              <Link href={APP_HREF} className="btn btn-accent btn-large">
                <Lightning weight="fill" size={14} />
                Start free
                <ArrowRight weight="bold" size={14} className="arr" />
              </Link>
              <a href="#pricing" className="lp-cta-secondary">
                See pricing
                <ArrowUpRight weight="bold" size={13} />
              </a>
            </div>
            <p className="lp-final-meta">
              <Check weight="bold" size={12} /> Free forever plan
              <span className="lp-meta-sep" />
              <Check weight="bold" size={12} /> No credit card
              <span className="lp-meta-sep" />
              <Check weight="bold" size={12} /> 2-minute setup
            </p>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="container">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <a href="#" className="logo">
                <LogoMark />
                Siggy
              </a>
              <p>Email signatures that look like a person signed them.</p>
            </div>
            <div className="lp-footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#product">How it works</a></li>
                <li><a href="#templates">Templates</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><Link href={APP_HREF}>Open app</Link></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">GDPR</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <span>© 2026 Siggy Labs. Bratislava.</span>
            <div className="lp-footer-socials">
              <a href="#" aria-label="X"><XLogo weight="fill" size={14} /></a>
              <a href="#" aria-label="LinkedIn"><LinkedinLogo weight="fill" size={14} /></a>
              <a href="#" aria-label="GitHub"><GithubLogo weight="fill" size={14} /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* Hand-drawn arched underline as inline SVG. The path uses a chained
   quad curve to mimic the gentle arc of a pen stroke. Draws in on load. */
function HandUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="lp-handline-wrap">
      <span className="lp-handline-text">{children}</span>
      <svg
        className="lp-handline-svg"
        viewBox="0 0 240 22"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Path locked tight inside the 240-wide viewBox so the
            visible stroke spans exactly the word width with no
            overshoot at either end. */}
        <path d="M 4 14 Q 60 6 120 11 T 236 13" />
      </svg>
    </span>
  );
}

/* "Loved by professionals" stack — 3 stable Unsplash headshots overlapped */
function LovedByPros() {
  const avatars = [
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=85&auto=format&fit=crop&crop=faces",
      fallback: "EM",
      tint: "oklch(78% 0.08 30)",
    },
    {
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&q=85&auto=format&fit=crop&crop=faces",
      fallback: "JL",
      tint: "oklch(70% 0.05 230)",
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&q=85&auto=format&fit=crop&crop=faces",
      fallback: "RC",
      tint: "oklch(74% 0.07 60)",
    },
  ];

  return (
    <div className="lp-loved" aria-label="Loved by professionals">
      <span className="lp-loved-stack">
        {avatars.map((a, i) => (
          <span
            key={i}
            className="lp-loved-av"
            style={{ backgroundColor: a.tint }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.src} alt="" width={32} height={32} loading="eager" />
            <span className="lp-loved-fb">{a.fallback}</span>
          </span>
        ))}
      </span>
      <span className="lp-loved-text">Loved by professionals</span>
    </div>
  );
}

