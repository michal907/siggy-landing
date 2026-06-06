"use client";

/**
 * Static row of the email clients Siggy signatures render in.
 * Logos are inline SVG with real brand colors so they don't depend
 * on external CDNs that have been unreliable (simpleicons dropped
 * Microsoft brands, Wikimedia URLs change). Gmail uses the
 * downloaded multicolor SVG from public/email-clients/gmail.svg.
 */
const CLIENTS: { name: string; mark: React.ReactNode }[] = [
  {
    name: "Gmail",
    mark: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/email-clients/gmail.svg" alt="" width={32} height={32} />
    ),
  },
  { name: "Outlook", mark: <OutlookMark /> },
  { name: "Apple Mail", mark: <AppleMailMark /> },
  { name: "Proton Mail", mark: <ProtonMark /> },
  { name: "Thunderbird", mark: <ThunderbirdMark /> },
];

export function EmailClientsCarousel() {
  return (
    <div className="lp-clients">
      <div className="container">
        <p className="lp-clients-label">Works in every inbox</p>
        <div className="lp-clients-row">
          {CLIENTS.map((c) => (
            <span key={c.name} className="lp-client" aria-label={c.name}>
              <span className="lp-client-mark" aria-hidden>{c.mark}</span>
              <span className="lp-client-name">{c.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Inline brand-color SVG marks. Real palette per brand spec.
   ────────────────────────────────────────────────────────────── */

function OutlookMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ol-env" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#50B0FF" />
          <stop offset="100%" stopColor="#0364B8" />
        </linearGradient>
      </defs>
      {/* 3D envelope body */}
      <path d="M5 5 L21 5 L21 18 L12 13 L5 18 Z" fill="url(#ol-env)" />
      <path d="M5 5 L12 11 L21 5" stroke="#1A6FB8" strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* Front face (lighter, top edge) */}
      <path d="M5 18 L12 13 L21 18 L21 19 L5 19 Z" fill="#41A5EE" />
      {/* O badge bottom-left */}
      <rect x="2" y="12" width="10" height="9" rx="1.6" fill="#0F3B6E" />
      <circle cx="7" cy="16.5" r="2.3" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function AppleMailMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="am-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5C8AFC" />
          <stop offset="100%" stopColor="#1FB6F2" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#am-bg)" />
      <rect x="5.5" y="8" width="13" height="9" rx="1.4" stroke="#FFFFFF" strokeWidth="1.3" fill="none" />
      <path d="M6 9 L12 13.5 L18 9" stroke="#FFFFFF" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProtonMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Lighter purple, top half of envelope */}
      <path d="M3 6 L12 12 L21 6 L21 5.5 L3 5.5 Z" fill="#B6A3F2" />
      {/* Darker purple, bottom half */}
      <path d="M3 6.5 L12 12.5 L21 6.5 L21 18 L3 18 Z" fill="#6D4AFF" />
      {/* Bottom band of darker fold */}
      <path d="M3 18 L12 12.5 L21 18 L21 18.5 L3 18.5 Z" fill="#5638DA" />
    </svg>
  );
}

function ThunderbirdMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tb-circle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1AA1F2" />
          <stop offset="100%" stopColor="#0560B7" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#tb-circle)" />
      {/* Beak / bird crest (purple-blue accent at top right) */}
      <path d="M19 5 C 21 7 21 9 20 11 L 17 9 Z" fill="#A989FF" opacity="0.85" />
      {/* White envelope body */}
      <rect x="6" y="9.5" width="12" height="7.5" rx="1.4" fill="#FFFFFF" />
      <path d="M6.5 10.5 L12 14 L17.5 10.5" stroke="#1AA1F2" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="17.4" cy="7.4" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}
