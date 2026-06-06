/**
 * Branded badge presets.
 *
 * Each badge is rendered as a styled chip: brand-tinted background, short text/initial
 * glyph, and the certification label. We use brand names descriptively (fair nominative
 * use for describing a real certification or partner program) plus simplified initial
 * marks — these are *not* reproductions of any company's official logo.
 */

export type BadgePreset = {
  id: string;
  label: string;
  category: "Partner" | "Certification" | "Compliance" | "Achievement";
  /** Brand-tinted color for the mark background */
  color: string;
  /** Text on the mark (usually short initials) */
  mark: string;
  /** Optional sub-label, shown smaller (e.g. "Verified") */
  sub?: string;
};

export const BADGE_PRESETS: BadgePreset[] = [
  /* Partner programs */
  { id: "google-partner", label: "Google Partner", category: "Partner", color: "#4285F4", mark: "G" },
  { id: "google-expert", label: "Google Ads Expert", category: "Certification", color: "#4285F4", mark: "G", sub: "Ads" },
  { id: "hubspot-partner", label: "HubSpot Partner", category: "Partner", color: "#FF7A59", mark: "HS" },
  { id: "hubspot-expert", label: "HubSpot Expert", category: "Certification", color: "#FF7A59", mark: "HS" },
  { id: "meta-partner", label: "Meta Business Partner", category: "Partner", color: "#0866FF", mark: "M" },
  { id: "ms-partner", label: "Microsoft Partner", category: "Partner", color: "#0078D4", mark: "MS" },
  { id: "salesforce-cert", label: "Salesforce Certified", category: "Certification", color: "#00A1E0", mark: "SF" },
  { id: "shopify-partner", label: "Shopify Partner", category: "Partner", color: "#5A8E3A", mark: "SH" },
  { id: "stripe-partner", label: "Stripe Verified", category: "Partner", color: "#635BFF", mark: "$" },

  /* Cloud / Dev */
  { id: "aws-cert", label: "AWS Certified", category: "Certification", color: "#FF9900", mark: "AWS" },
  { id: "gcp-cert", label: "Google Cloud Certified", category: "Certification", color: "#34A853", mark: "GCP" },
  { id: "azure-cert", label: "Azure Certified", category: "Certification", color: "#0078D4", mark: "Az" },
  { id: "kubernetes", label: "Kubernetes Certified", category: "Certification", color: "#326CE5", mark: "K8s" },

  /* Creative */
  { id: "adobe-cert", label: "Adobe Certified Pro", category: "Certification", color: "#FA0F00", mark: "Ad" },
  { id: "figma-advocate", label: "Figma Advocate", category: "Certification", color: "#A259FF", mark: "Fi" },

  /* Compliance */
  { id: "iso-9001", label: "ISO 9001", category: "Compliance", color: "#1F3253", mark: "ISO" },
  { id: "iso-27001", label: "ISO 27001", category: "Compliance", color: "#1F3253", mark: "ISO" },
  { id: "soc2", label: "SOC 2 Type II", category: "Compliance", color: "#5C5C63", mark: "SOC" },
  { id: "hipaa", label: "HIPAA Compliant", category: "Compliance", color: "#00857C", mark: "HIPAA" },
  { id: "gdpr", label: "GDPR Compliant", category: "Compliance", color: "#003399", mark: "GDPR" },
  { id: "pci-dss", label: "PCI-DSS", category: "Compliance", color: "#444444", mark: "PCI" },

  /* Achievements */
  { id: "bcorp", label: "B Corp Certified", category: "Achievement", color: "#1E1E1E", mark: "B" },
  { id: "fair-trade", label: "Fair Trade", category: "Achievement", color: "#3F8B41", mark: "FT" },
  { id: "trustpilot", label: "Trustpilot Verified", category: "Achievement", color: "#00B67A", mark: "★" },
  { id: "yc-alumni", label: "YC Alumni", category: "Achievement", color: "#F26625", mark: "YC" },
  { id: "product-hunt", label: "Product Hunt #1", category: "Achievement", color: "#DA552F", mark: "PH" },
];

export const BADGE_CATEGORIES = ["Partner", "Certification", "Compliance", "Achievement"] as const;

export function findBadgePreset(id: string): BadgePreset | undefined {
  return BADGE_PRESETS.find((b) => b.id === id);
}
