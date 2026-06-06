# Email client brand logos

Drop the official brand SVG for each email client here, then enable it in
`src/app/app/_lib/clientLogos.ts`.

## Expected filenames

- `gmail.svg`
- `outlook.svg`
- `apple.svg`
- `yahoo.svg`
- `proton.svg`
- `thunderbird.svg`

## Where to find official brand assets

Most companies publish an official brand kit. Search for:

- **Gmail / Google Workspace** — Google Brand Resource Center · Mail product
- **Outlook / Microsoft 365** — Microsoft Brand Central · Outlook product
- **Apple Mail** — Apple Press Resources · macOS/iOS app icons
- **Yahoo Mail** — Yahoo Brand Portal
- **Proton Mail** — Proton Press Kit
- **Thunderbird** — MZLA / Thunderbird Brand Assets (creative-commons licensed)

Always check each brand's usage guidelines before shipping their official logo
in a commercial product.

## Behavior

- If a key is enabled in `clientLogos.ts` → the file at that path is used in the
  preview tabs and in the chrome above the email mockup.
- If a key is **not** enabled → the original geometric mark in
  `src/app/app/_components/BrandLogos.tsx` is used as a fallback.

## Format tips

- Square SVG (viewBox `0 0 N N`) works best in the tab pills
- 24–32px display size — make sure the artwork reads at small sizes
- Inline `fill`/`stroke` colors; avoid external references
- Keep the file under a few KB if possible
