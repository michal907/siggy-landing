import type { EmailClient } from "../_components/EmailPreview";

/**
 * Email client tab + chrome logos.
 *
 * The URLs below are hosted by the user/product owner via the simpleicons CDN.
 * The product owner has reviewed and is responsible for usage of these brand
 * marks in their product (see public/brand-logos/README.md for guidance).
 *
 * To swap any of these for a locally-hosted file:
 *   1. Drop the SVG into `public/brand-logos/<key>.svg`.
 *   2. Change the URL below to "/brand-logos/<key>.svg".
 *
 * Remove an entry to fall back to the geometric mark in BrandLogos.tsx.
 */
export const CLIENT_LOGO_OVERRIDES: Partial<Record<EmailClient, string>> = {
  gmail: "https://cdn.simpleicons.org/gmail/EA4335",
  outlook: "https://cdn.simpleicons.org/microsoftoutlook/0078D4",
  proton: "https://cdn.simpleicons.org/protonmail/6D4AFF",
  yahoo: "https://cdn.simpleicons.org/yahoo/6001D2",
  thunderbird: "https://cdn.simpleicons.org/thunderbird/0A84FF",
  // apple: fall back to the original Apple Mail envelope mark in BrandLogos.tsx
};
