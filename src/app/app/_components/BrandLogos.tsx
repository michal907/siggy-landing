/**
 * Brand glyphs used in the client tabs + chrome.
 *
 * Each is an *original* SVG that uses the email client's brand-associated colors
 * and generic iconographic concepts (envelope, shield, bird, etc.) — designed to be
 * recognizable as that client's family of products through color + general shape,
 * without reproducing any specific company's distinctive trademarked logo design.
 */

import type { EmailClient } from "./EmailPreview";
import { CLIENT_LOGO_OVERRIDES } from "../_lib/clientLogos";

type BrandLogoProps = {
  size?: number;
};

export function GmailGlyph({ size = 32 }: BrandLogoProps) {
  // Generic envelope with multi-color brand-palette accent stripe.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="24" height="18" rx="2" fill="#FFFFFF" />
      <path d="M4 9 L16 18 L28 9" stroke="#E84A29" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="22" width="6" height="4" rx="1" fill="#FBBC04" opacity="0.85" />
      <rect x="22" y="22" width="6" height="4" rx="1" fill="#34A853" opacity="0.85" />
      <rect x="13" y="22" width="6" height="4" rx="1" fill="#4285F4" opacity="0.85" />
    </svg>
  );
}

export function OutlookGlyph({ size = 32 }: BrandLogoProps) {
  // Bold blue square with stylized "O" letter mark.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="6" fill="#0078D4" />
      <ellipse cx="16" cy="16" rx="6.5" ry="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    </svg>
  );
}

export function AppleMailGlyph({ size = 32 }: BrandLogoProps) {
  // Sky-blue envelope with a soft gradient.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="apple-mail-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5DBBE7" />
          <stop offset="100%" stopColor="#0E76C0" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="26" height="20" rx="4" fill="url(#apple-mail-grad)" />
      <path d="M5 10 L16 18 L27 10" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function YahooGlyph({ size = 32 }: BrandLogoProps) {
  // Bold italic serif "Y!" wordmark in brand purple.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="6" fill="#6001D2" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="17"
        fontWeight="800"
        fontStyle="italic"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        Y!
      </text>
    </svg>
  );
}

export function ProtonGlyph({ size = 32 }: BrandLogoProps) {
  // Violet shield with a small key-style mark inside.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3 L27 6 V14 C27 21 22 26 16 29 C10 26 5 21 5 14 V6 Z"
        fill="#6D4AFF"
      />
      <circle cx="16" cy="14" r="3" fill="#FFFFFF" />
      <rect x="14.5" y="15" width="3" height="6" rx="0.6" fill="#FFFFFF" />
    </svg>
  );
}

export function ThunderbirdGlyph({ size = 32 }: BrandLogoProps) {
  // Stylized blue bird silhouette with a spread wing.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="tbird-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5BAEF0" />
          <stop offset="100%" stopColor="#2B5DA0" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="26" height="26" rx="13" fill="url(#tbird-grad)" />
      <path
        d="M9 18 C 11 14, 15 12, 19 13 C 22 14, 24 16, 25 18 C 23 17, 21 16, 19 17 C 17 18, 15 21, 13 22 C 12 22, 10 21, 9 19 Z"
        fill="#FFFFFF"
      />
      <circle cx="22" cy="14" r="1.4" fill="#15140F" />
    </svg>
  );
}

export function BrandLogo({ k, size = 32 }: { k: EmailClient; size?: number }) {
  // If the product owner has dropped an official brand SVG into
  // `public/brand-logos/` and enabled the override, use that directly.
  const override = CLIENT_LOGO_OVERRIDES[k];
  if (override) {
    return (
      <img
        src={override}
        alt=""
        width={size}
        height={size}
        style={{ display: "block", width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  switch (k) {
    case "gmail":
      return <GmailGlyph size={size} />;
    case "outlook":
      return <OutlookGlyph size={size} />;
    case "apple":
      return <AppleMailGlyph size={size} />;
    case "yahoo":
      return <YahooGlyph size={size} />;
    case "proton":
      return <ProtonGlyph size={size} />;
    case "thunderbird":
      return <ThunderbirdGlyph size={size} />;
  }
}
