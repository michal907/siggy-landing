import type { SignatureData } from "../_components/SignatureRenderer";

export type TemplatePreset = {
  id: string;
  name: string;
  group: "Professional" | "Engineering" | "Executive" | "Formal" | "Sales" | "Operator" | "Creative";
  tag: string;
  swatch: string;
  preset: Partial<SignatureData>;
};

/* ────────────────────────────────────────────────────────────────
   The 8 official Siggy templates. Mirrors the landing-page gallery
   exactly, so what a visitor sees there is what they get inside the
   editor. All templates render with email-safe font stacks via the
   FontFamily mapping in SignatureRenderer.
   ──────────────────────────────────────────────────────────────── */
export const TEMPLATE_PRESETS: TemplatePreset[] = [
  /* 01) Classic Pro — Account Manager / Consultant ───────────── */
  {
    id: "classic-pro",
    name: "Classic Pro",
    group: "Professional",
    tag: "01",
    swatch: "#1a3a5c",
    preset: {
      template: "editorial",
      layout: "stacked",
      accent: "#1a3a5c",
      divColor: "#1a3a5c",
      divThickness: 1,
      fontFamily: "inter",
      fontSize: 13,
      photoShape: "round",
      photoSize: 68,
      socialIconStyle: "filled",
      socialIconShape: "circle",
      socialIconSize: 22,
    },
  },

  /* 02) Developer — Staff Engineer / DevOps ──────────────────── */
  {
    id: "developer",
    name: "Developer",
    group: "Engineering",
    tag: "02",
    swatch: "#2d8050",
    preset: {
      template: "dev",
      layout: "stacked",
      accent: "#2d8050",
      divColor: "#2d8050",
      divThickness: 1,
      fontFamily: "mono",
      fontSize: 12,
      photoShape: "square",
      photoSize: 46,
      socialIconStyle: "filled",
      socialIconShape: "circle",
      socialIconSize: 22,
    },
  },

  /* 03) Minimal Executive — Managing Partner / C-suite ───────── */
  {
    id: "minimal-executive",
    name: "Minimal Executive",
    group: "Executive",
    tag: "03",
    swatch: "#0c0c10",
    preset: {
      template: "minimal",
      layout: "stacked",
      accent: "#0c0c10",
      divColor: "#0c0c10",
      divThickness: 1,
      fontFamily: "inter",
      fontSize: 12.5,
      socialIconStyle: "naked",
      socialIconShape: "circle",
      socialIconSize: 18,
    },
  },

  /* 04) Counsel Centered — Lawyer / Doctor / Advisor ─────────── */
  {
    id: "counsel-centered",
    name: "Counsel Centered",
    group: "Formal",
    tag: "04",
    swatch: "#2d5239",
    preset: {
      template: "centered",
      layout: "stacked",
      accent: "#2d5239",
      divColor: "#2d5239",
      divThickness: 1,
      fontFamily: "serif",
      fontSize: 13,
      photoShape: "round",
      photoSize: 58,
      titleItalic: true,
      socialIconStyle: "naked",
      socialIconShape: "circle",
      socialIconSize: 18,
    },
  },

  /* 05) Bold Realtor — VP of Sales / Real Estate ─────────────── */
  {
    id: "bold-realtor",
    name: "Bold Realtor",
    group: "Sales",
    tag: "05",
    swatch: "#7a2942",
    preset: {
      template: "bold",
      layout: "stacked",
      accent: "#7a2942",
      divColor: "#7a2942",
      divThickness: 2,
      fontFamily: "inter",
      fontSize: 13,
      photoShape: "square",
      photoSize: 64,
      nameWeight: 900,
      titleUppercase: false,
      socialIconStyle: "filled",
      socialIconShape: "circle",
      socialIconSize: 22,
    },
  },

  /* 06) Compact — Founder / High-volume sender ───────────────── */
  {
    id: "compact",
    name: "Compact",
    group: "Operator",
    tag: "06",
    swatch: "#0c0c10",
    preset: {
      template: "compact",
      layout: "stacked",
      accent: "#0c0c10",
      divColor: "#0c0c10",
      divThickness: 1,
      fontFamily: "inter",
      fontSize: 12.5,
      photoShape: "round",
      photoSize: 44,
      socialIconStyle: "naked",
      socialIconShape: "circle",
      socialIconSize: 16,
    },
  },

  /* 07) Sales CTA — AE / SDR / Anyone Booking Meetings ───────── */
  {
    id: "sales-cta",
    name: "Sales CTA",
    group: "Sales",
    tag: "07",
    swatch: "#3730a3",
    preset: {
      template: "editorial",
      layout: "stacked",
      accent: "#3730a3",
      divColor: "#3730a3",
      divThickness: 1,
      fontFamily: "inter",
      fontSize: 13,
      photoShape: "round",
      photoSize: 64,
      ctaEnabled: true,
      ctaText: "Book a 15-min intro",
      ctaUrl: "https://cal.com/your-name",
      ctaStyle: "pill",
      socialIconStyle: "filled",
      socialIconShape: "circle",
      socialIconSize: 22,
    },
  },

  /* 08) Studio Letterhead — Creative Director / Studio Lead ──── */
  {
    id: "studio-letterhead",
    name: "Studio Letterhead",
    group: "Creative",
    tag: "08",
    swatch: "#1f1d1b",
    preset: {
      template: "centered",
      layout: "stacked",
      accent: "#1f1d1b",
      divColor: "#c4b5a3",
      divThickness: 1,
      fontFamily: "serif",
      fontSize: 12.5,
      photoShape: "round",
      photoSize: 52,
      titleItalic: true,
      socialIconStyle: "naked",
      socialIconShape: "circle",
      socialIconSize: 18,
    },
  },
];

export function findTemplate(id: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find((t) => t.id === id);
}
