import {
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  GithubLogo,
  YoutubeLogo,
  TiktokLogo,
  BehanceLogo,
  DribbbleLogo,
  ThreadsLogo,
  MediumLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

export type TemplateKey = "editorial" | "bold" | "centered" | "compact" | "dev" | "minimal";
export type LayoutKey = "stacked" | "sidebar" | "photo-right" | "two-col";
export type FontFamily = "inter" | "serif" | "mono" | "system" | "display";
export type PhotoShape = "round" | "square";
export type DividerStyle = "solid" | "dashed" | "dotted" | "double" | "none";
export type FrameStyle = "none" | "border" | "card";
export type SpacingScale = "comfortable" | "cozy" | "compact";
export type SocialIconStyle = "filled" | "outline" | "naked";
export type SocialIconShape = "rounded" | "circle" | "square";
export type CtaStyle = "pill" | "underline" | "banner";

export type Badge = {
  id: string;
  label: string;
  color?: string;
  mark?: string;
  custom?: boolean;
  imageDataUrl?: string;
};

export type SignatureData = {
  /* Identity */
  name: string;
  pronouns: string;
  title: string;
  department: string;
  company: string;
  companyTagline: string;

  /* Photo */
  photo: string | null;
  photoShape: PhotoShape;
  photoSize: number;            // 40-96 px
  photoBorder: number;          // 0-4 px
  photoBorderColor: string;
  photoGrayscale: boolean;

  /* Contact */
  email: string;
  phone: string;
  mobilePhone: string;
  website: string;
  address: string;
  calendarLink: string;

  /* Social */
  linkedin: string;
  twitter: string;
  instagram: string;
  github: string;
  youtube: string;
  tiktok: string;
  behance: string;
  dribbble: string;
  threads: string;
  medium: string;
  whatsapp: string;
  socialIconStyle: SocialIconStyle;
  socialIconShape: SocialIconShape;
  socialIconSize: number;       // 18-32 px

  /* Badges */
  badges: Badge[];

  /* Signoff */
  signoff: string;              // "Best," etc. empty = hidden
  signoffItalic: boolean;

  /* CTA / Banner */
  ctaEnabled: boolean;
  ctaText: string;
  ctaUrl: string;
  ctaStyle: CtaStyle;

  /* Disclaimer */
  disclaimer: string;

  /* Style */
  accent: string;
  template: TemplateKey;
  layout: LayoutKey;
  fontFamily: FontFamily;
  fontSize: number;             // base 11-18
  nameWeight: number;           // 400-900
  titleItalic: boolean;
  titleUppercase: boolean;
  lineHeight: number;           // 1.2-2.0
  letterSpacing: number;        // -0.04 to 0.04
  spacing: SpacingScale;

  /* Divider */
  divThickness: number;         // 1-6
  divColor: string;
  dividerStyle: DividerStyle;

  /* Frame */
  frameStyle: FrameStyle;
  frameColor: string;
  frameRadius: number;          // 0-24
  bgColor: string;              // for card frames

  /* Custom CSS */
  customCss: string;
};

export const FONT_FAMILY_MAP: Record<FontFamily, string> = {
  inter: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
  serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
  mono: "var(--font-mono), Menlo, Consolas, monospace",
  system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "var(--font-display), 'Bricolage Grotesque', system-ui, sans-serif",
};

const SPACING_GAP: Record<SpacingScale, number> = {
  comfortable: 4,
  cozy: 3,
  compact: 2,
};

function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "·"
  );
}

function titleLine(d: SignatureData) {
  const role = [d.title, d.department].filter(Boolean).join(", ");
  if (role && d.company) return `${role} · ${d.company}`;
  return role || d.company || "";
}

function nameLine(d: SignatureData) {
  return d.pronouns ? `${d.name} (${d.pronouns})` : d.name;
}

function Photo({ data, size }: { data: SignatureData; size?: number }) {
  const s = size ?? data.photoSize;
  const style: React.CSSProperties = {
    width: s,
    height: s,
    backgroundImage: data.photo ? `url(${data.photo})` : undefined,
    filter: data.photoGrayscale && data.photo ? "grayscale(1)" : undefined,
    borderRadius: data.photoShape === "square" ? Math.round(s * 0.18) : "50%",
    border: data.photoBorder > 0 ? `${data.photoBorder}px solid ${data.photoBorderColor}` : undefined,
  };
  return (
    <div className="sig-photo" style={style}>
      {!data.photo && initials(data.name)}
    </div>
  );
}

function ContactRows({ data, hideLabels = false }: { data: SignatureData; hideLabels?: boolean }) {
  type Row = [string, React.ReactNode];
  const rows: Row[] = [];
  if (data.email) rows.push(["e", <a key="e" href={`mailto:${data.email}`}>{data.email}</a>]);
  if (data.phone) rows.push(["t", data.phone]);
  if (data.mobilePhone) rows.push(["m", data.mobilePhone]);
  if (data.website) {
    const url = data.website.startsWith("http") ? data.website : `https://${data.website}`;
    rows.push(["w", <a key="w" href={url}>{data.website}</a>]);
  }
  if (data.address) rows.push(["a", data.address]);
  if (data.calendarLink) {
    const url = data.calendarLink.startsWith("http") ? data.calendarLink : `https://${data.calendarLink}`;
    rows.push(["b", <a key="b" href={url}>Book a call</a>]);
  }
  if (rows.length === 0) return null;
  return (
    <div className="sig-contact">
      {rows.map(([lbl, val]) => (
        <div key={lbl}>
          {!hideLabels && <span className="lbl">{lbl}</span>}
          {val}
        </div>
      ))}
    </div>
  );
}

const SOCIAL_DEFS: Array<{
  key: keyof Pick<
    SignatureData,
    | "linkedin"
    | "twitter"
    | "instagram"
    | "github"
    | "youtube"
    | "tiktok"
    | "behance"
    | "dribbble"
    | "threads"
    | "medium"
    | "whatsapp"
  >;
  Icon: React.ComponentType<{ weight: "fill" | "regular"; size?: number }>;
  url: (v: string) => string;
}> = [
  {
    key: "linkedin",
    Icon: LinkedinLogo,
    url: (v) => (v.startsWith("http") ? v : `https://linkedin.com/in/${v}`),
  },
  {
    key: "twitter",
    Icon: XLogo,
    url: (v) => (v.startsWith("http") ? v : `https://x.com/${v.replace(/^@/, "")}`),
  },
  {
    key: "instagram",
    Icon: InstagramLogo,
    url: (v) => (v.startsWith("http") ? v : `https://instagram.com/${v.replace(/^@/, "")}`),
  },
  {
    key: "github",
    Icon: GithubLogo,
    url: (v) => (v.startsWith("http") ? v : `https://github.com/${v.replace(/^@/, "")}`),
  },
  {
    key: "youtube",
    Icon: YoutubeLogo,
    url: (v) => (v.startsWith("http") ? v : `https://youtube.com/@${v.replace(/^@/, "")}`),
  },
  {
    key: "tiktok",
    Icon: TiktokLogo,
    url: (v) => (v.startsWith("http") ? v : `https://tiktok.com/@${v.replace(/^@/, "")}`),
  },
  {
    key: "behance",
    Icon: BehanceLogo,
    url: (v) => (v.startsWith("http") ? v : `https://behance.net/${v.replace(/^@/, "")}`),
  },
  {
    key: "dribbble",
    Icon: DribbbleLogo,
    url: (v) => (v.startsWith("http") ? v : `https://dribbble.com/${v.replace(/^@/, "")}`),
  },
  {
    key: "threads",
    Icon: ThreadsLogo,
    url: (v) => (v.startsWith("http") ? v : `https://threads.net/@${v.replace(/^@/, "")}`),
  },
  {
    key: "medium",
    Icon: MediumLogo,
    url: (v) => (v.startsWith("http") ? v : `https://medium.com/@${v.replace(/^@/, "")}`),
  },
  {
    key: "whatsapp",
    Icon: WhatsappLogo,
    url: (v) => (v.startsWith("http") ? v : `https://wa.me/${v.replace(/[^\d]/g, "")}`),
  },
];

function Socials({ data }: { data: SignatureData }) {
  const items: React.ReactNode[] = [];
  for (const def of SOCIAL_DEFS) {
    const v = data[def.key];
    if (v) {
      items.push(
        <a key={def.key} className="b" href={def.url(v)}>
          <def.Icon weight={data.socialIconStyle === "outline" ? "regular" : "fill"} />
        </a>
      );
    }
  }
  if (items.length === 0) return null;
  const shapeClass =
    data.socialIconShape === "circle"
      ? "sig-soc-circle"
      : data.socialIconShape === "square"
        ? "sig-soc-square"
        : "sig-soc-rounded";
  const styleClass = data.socialIconStyle === "naked" ? "sig-soc-naked" : "";
  const style = {
    "--sig-soc-size": `${data.socialIconSize}px`,
  } as React.CSSProperties;
  return (
    <div className={`sig-soc ${shapeClass} ${styleClass}`} style={style}>
      {items}
    </div>
  );
}

function Badges({ data }: { data: SignatureData }) {
  if (data.badges.length === 0) return null;
  return (
    <div className="sig-badges">
      {data.badges.map((b) => (
        <span
          key={b.id}
          className="sig-badge"
          style={
            b.color ? ({ borderColor: `${b.color}33` } as React.CSSProperties) : undefined
          }
        >
          {b.imageDataUrl ? (
            <span
              className="b-img"
              style={{ backgroundImage: `url(${b.imageDataUrl})` }}
              aria-hidden
            />
          ) : (
            <span
              className="b-ico b-ico-text"
              style={b.color ? { background: b.color, color: "white" } : undefined}
            >
              {b.mark || b.label.slice(0, 2).toUpperCase()}
            </span>
          )}
          {b.label}
        </span>
      ))}
    </div>
  );
}

function CtaBlock({ data }: { data: SignatureData }) {
  if (!data.ctaEnabled || !data.ctaText) return null;
  const url = data.ctaUrl?.startsWith("http") ? data.ctaUrl : `https://${data.ctaUrl || ""}`;
  if (data.ctaStyle === "underline") {
    return (
      <a className="sig-cta-underline" href={url} style={{ color: data.accent }}>
        {data.ctaText} →
      </a>
    );
  }
  if (data.ctaStyle === "banner") {
    return (
      <a className="sig-cta-banner" href={url} style={{ background: data.accent }}>
        <span>{data.ctaText}</span>
        <span aria-hidden>→</span>
      </a>
    );
  }
  return (
    <a className="sig-cta-pill" href={url} style={{ background: data.accent }}>
      {data.ctaText} →
    </a>
  );
}

function Disclaimer({ data }: { data: SignatureData }) {
  if (!data.disclaimer) return null;
  return <div className="sig-disclaimer">{data.disclaimer}</div>;
}

function Signoff({ data }: { data: SignatureData }) {
  if (!data.signoff) return null;
  return (
    <div className={`sig-signoff ${data.signoffItalic ? "italic" : ""}`}>{data.signoff}</div>
  );
}

function CoreBlock({ data }: { data: SignatureData }) {
  return (
    <>
      <div className="sig-name">{nameLine(data) || "Your name"}</div>
      <div className={`sig-title ${data.titleItalic ? "italic" : ""} ${data.titleUppercase ? "upper" : ""}`}>
        {titleLine(data) || "Role · Company"}
      </div>
      {data.companyTagline && <div className="sig-tagline">{data.companyTagline}</div>}
      <div className="sig-rule" />
      <ContactRows data={data} />
      <Socials data={data} />
      <CtaBlock data={data} />
      <Badges data={data} />
    </>
  );
}

export function SignatureRenderer({ data }: { data: SignatureData }) {
  const { template, layout } = data;

  const dividerCss =
    data.dividerStyle === "none"
      ? "none"
      : `${data.divThickness}px ${data.dividerStyle === "double" ? "double" : data.dividerStyle} ${data.divColor || data.accent}`;

  const sigStyle = {
    "--sig-accent": data.accent,
    "--sig-div-color": data.divColor || data.accent,
    "--sig-div-thickness": `${data.divThickness}px`,
    "--sig-div-css": dividerCss,
    "--sig-name-weight": `${data.nameWeight}`,
    "--sig-line-height": `${data.lineHeight}`,
    "--sig-letter-spacing": `${data.letterSpacing}em`,
    "--sig-gap": `${SPACING_GAP[data.spacing]}px`,
    fontFamily: FONT_FAMILY_MAP[data.fontFamily],
    fontSize: `${data.fontSize}px`,
  } as React.CSSProperties;

  const frameStyle: React.CSSProperties = {};
  if (data.frameStyle === "border") {
    frameStyle.border = `1px solid ${data.frameColor || "rgba(15,15,20,0.12)"}`;
    frameStyle.borderRadius = `${data.frameRadius}px`;
    frameStyle.padding = "16px 18px";
  } else if (data.frameStyle === "card") {
    frameStyle.background = data.bgColor || "#FAF7F2";
    frameStyle.borderRadius = `${data.frameRadius}px`;
    frameStyle.padding = "18px 20px";
  }

  let inner: React.ReactNode;
  const useLayout = layout !== "stacked";

  if (useLayout && layout === "sidebar") {
    inner = (
      <>
        <div className="sig-left">
          <Photo data={data} />
        </div>
        <div className="sig-right">
          <CoreBlock data={data} />
        </div>
      </>
    );
  } else if (useLayout && layout === "photo-right") {
    inner = (
      <>
        <div className="sig-left">
          <CoreBlock data={data} />
        </div>
        <div className="sig-right">
          <Photo data={data} />
        </div>
      </>
    );
  } else if (useLayout && layout === "two-col") {
    inner = (
      <>
        <div className="sig-cols">
          <div>
            <div className="sig-name">{nameLine(data) || "Your name"}</div>
            <div className={`sig-title ${data.titleItalic ? "italic" : ""} ${data.titleUppercase ? "upper" : ""}`}>
              {titleLine(data) || "Role · Company"}
            </div>
            {data.companyTagline && <div className="sig-tagline">{data.companyTagline}</div>}
            <div className="sig-rule" />
          </div>
          <div>
            <ContactRows data={data} />
            <Socials data={data} />
          </div>
        </div>
        <CtaBlock data={data} />
        <Badges data={data} />
      </>
    );
  } else if (template === "centered") {
    inner = (
      <>
        {data.photo ? (
          <Photo data={data} />
        ) : (
          <div className="sig-avatar">{initials(data.name)}</div>
        )}
        <CoreBlock data={data} />
      </>
    );
  } else if (template === "compact") {
    inner = (
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {data.photo ? (
          <Photo data={data} />
        ) : (
          <div className="sig-avatar">{initials(data.name)}</div>
        )}
        <div>
          <CoreBlock data={data} />
        </div>
      </div>
    );
  } else {
    inner = (
      <>
        {data.photo && <Photo data={data} />}
        <CoreBlock data={data} />
      </>
    );
  }

  const layoutClass = useLayout ? `layout-${layout}` : "";

  return (
    <div className="sig-wrap" style={frameStyle}>
      <Signoff data={data} />
      <div
        className={`sig ${template} ${layoutClass} spacing-${data.spacing} sig-instance`}
        style={sigStyle}
      >
        {data.customCss && (
          <style dangerouslySetInnerHTML={{ __html: scopedCustomCSS(data.customCss) }} />
        )}
        {inner}
      </div>
      <Disclaimer data={data} />
    </div>
  );
}

function scopedCustomCSS(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/([^{}]+)\{([^}]*)\}/g, (_m, sel, body) => {
      const scoped = sel
        .split(",")
        .map((s: string) => `.sig-instance ${s.trim()}`)
        .join(", ");
      return `${scoped}{${body}}`;
    });
}

/* ============================================================
   HTML EXPORT — email-safe table-based markup
   ============================================================ */
function escapeHTML(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeUrl(s: string, prefix: string) {
  if (!s) return "";
  if (s.startsWith("http")) return s;
  return prefix + s.replace(/^@/, "");
}

const FONT_FAMILY_EXPORT: Record<FontFamily, string> = {
  inter: "Arial, Helvetica, sans-serif",
  serif: "Georgia, Cambria, 'Times New Roman', serif",
  mono: "Menlo, Consolas, monospace",
  system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "Arial, Helvetica, sans-serif",
};

export function generateSignatureHTML(data: SignatureData): string {
  const accent = data.accent || "#F25C45";
  const divColor = data.divColor || accent;
  const fontFamily = FONT_FAMILY_EXPORT[data.fontFamily];
  const name = escapeHTML(nameLine(data) || "Your name");
  const title = escapeHTML(titleLine(data));
  const tagline = data.companyTagline ? escapeHTML(data.companyTagline) : "";

  const contactRows: string[] = [];
  if (data.email)
    contactRows.push(
      `<span style="color:${accent};font-weight:600;font-size:11px;margin-right:4px;">e</span><a href="mailto:${escapeHTML(
        data.email
      )}" style="color:${accent};text-decoration:none;">${escapeHTML(data.email)}</a>`
    );
  if (data.phone)
    contactRows.push(
      `<span style="color:${accent};font-weight:600;font-size:11px;margin-right:4px;">t</span>${escapeHTML(data.phone)}`
    );
  if (data.mobilePhone)
    contactRows.push(
      `<span style="color:${accent};font-weight:600;font-size:11px;margin-right:4px;">m</span>${escapeHTML(data.mobilePhone)}`
    );
  if (data.website)
    contactRows.push(
      `<span style="color:${accent};font-weight:600;font-size:11px;margin-right:4px;">w</span><a href="${escapeHTML(
        normalizeUrl(data.website, "https://")
      )}" style="color:${accent};text-decoration:none;">${escapeHTML(data.website)}</a>`
    );
  if (data.address)
    contactRows.push(
      `<span style="color:${accent};font-weight:600;font-size:11px;margin-right:4px;">a</span>${escapeHTML(data.address)}`
    );
  if (data.calendarLink)
    contactRows.push(
      `<span style="color:${accent};font-weight:600;font-size:11px;margin-right:4px;">b</span><a href="${escapeHTML(
        normalizeUrl(data.calendarLink, "https://")
      )}" style="color:${accent};text-decoration:none;">Book a call</a>`
    );

  const socials: string[] = [];
  const socialMap: Array<[keyof SignatureData, string, string]> = [
    ["linkedin", "in", "linkedin.com/in/"],
    ["twitter", "𝕏", "x.com/"],
    ["instagram", "ig", "instagram.com/"],
    ["github", "gh", "github.com/"],
    ["youtube", "yt", "youtube.com/@"],
    ["tiktok", "tt", "tiktok.com/@"],
    ["behance", "Bē", "behance.net/"],
    ["dribbble", "Dr", "dribbble.com/"],
    ["threads", "@", "threads.net/@"],
    ["medium", "M", "medium.com/@"],
    ["whatsapp", "wa", "wa.me/"],
  ];
  for (const [key, label, base] of socialMap) {
    const v = data[key] as string;
    if (v) {
      socials.push(
        `<a href="${escapeHTML(normalizeUrl(v, `https://${base}`))}" style="display:inline-block;width:22px;height:22px;background:#0F0F14;border-radius:5px;text-align:center;line-height:22px;color:#ffffff;text-decoration:none;font-size:10px;font-family:Arial;font-weight:bold;margin-right:5px;">${label}</a>`
      );
    }
  }

  const badgesHtml = data.badges.length
    ? `<tr><td style="padding-top:10px;">${data.badges
        .map(
          (b) =>
            `<span style="display:inline-block;padding:3px 8px;background:#FAF7F2;border:1px solid rgba(15,15,20,0.08);border-radius:100px;font-size:10px;font-weight:600;color:#1F1F26;margin-right:5px;margin-top:3px;">${escapeHTML(
              b.label
            )}</span>`
        )
        .join("")}</td></tr>`
    : "";

  const ctaHtml =
    data.ctaEnabled && data.ctaText
      ? `<tr><td style="padding-top:12px;"><a href="${escapeHTML(
          normalizeUrl(data.ctaUrl || "", "https://")
        )}" style="display:inline-block;padding:8px 14px;background:${accent};color:white;border-radius:100px;font-size:12px;font-weight:600;text-decoration:none;font-family:${fontFamily};">${escapeHTML(
          data.ctaText
        )} →</a></td></tr>`
      : "";

  const signoffHtml = data.signoff
    ? `<div style="font-family:${fontFamily};font-size:13px;color:#1F1F26;margin-bottom:10px;${data.signoffItalic ? "font-style:italic;" : ""}">${escapeHTML(
        data.signoff
      )}</div>`
    : "";

  const disclaimerHtml = data.disclaimer
    ? `<div style="font-family:${fontFamily};font-size:10px;color:#71717A;margin-top:14px;line-height:1.5;max-width:480px;">${escapeHTML(
        data.disclaimer
      )}</div>`
    : "";

  const contactJoined = contactRows
    .map(
      (r) =>
        `<tr><td style="padding:1px 0;font-size:12px;color:#1F1F26;font-family:${fontFamily};">${r}</td></tr>`
    )
    .join("\n      ");
  const socialsHtml = socials.length
    ? `<tr><td style="padding-top:10px;">${socials.join("")}</td></tr>`
    : "";

  const taglineHtml = tagline
    ? `<tr><td style="font-size:11.5px;color:#71717A;font-family:${fontFamily};font-style:italic;padding-bottom:8px;">${tagline}</td></tr>`
    : "";

  let body = "";

  if (data.template === "bold") {
    body = `<table cellpadding="0" cellspacing="0" border="0" style="background:${accent};border-radius:10px;font-family:${fontFamily};color:#ffffff;">
  <tr><td style="padding:18px 20px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:22px;font-weight:${data.nameWeight};letter-spacing:-0.02em;color:#ffffff;padding-bottom:2px;">${name}</td></tr>
      <tr><td style="font-size:12.5px;color:rgba(255,255,255,0.85);padding-bottom:12px;${data.titleItalic ? "font-style:italic;" : ""}${data.titleUppercase ? "text-transform:uppercase;letter-spacing:0.06em;" : ""}">${title}</td></tr>
      ${tagline ? `<tr><td style="font-size:11.5px;color:rgba(255,255,255,0.75);padding-bottom:10px;font-style:italic;">${tagline}</td></tr>` : ""}
      ${data.dividerStyle !== "none" ? `<tr><td style="padding-bottom:12px;"><div style="height:${data.divThickness}px;width:28px;background:#ffffff;"></div></td></tr>` : ""}
      ${contactRows
        .map(
          (r) =>
            `<tr><td style="padding:1px 0;font-size:12px;color:rgba(255,255,255,0.95);">${r.replace(
              /color:[^;]+;/g,
              "color:#ffffff;"
            )}</td></tr>`
        )
        .join("\n      ")}
      ${socialsHtml.replace(/#0F0F14/g, "#ffffff").replace(/color:#ffffff/g, `color:${accent}`)}
      ${ctaHtml.replace(new RegExp(accent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), "#ffffff").replace(/color:white/g, `color:${accent}`)}
      ${badgesHtml}
    </table>
  </td></tr>
</table>`;
  } else if (data.template === "dev") {
    body = `<table cellpadding="0" cellspacing="0" border="0" style="background:#0F0F14;border-radius:10px;font-family:Menlo,Consolas,monospace;color:#DCDCDC;">
  <tr><td style="padding:18px 20px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:14px;color:#DCDCDC;padding-bottom:2px;"><span style="color:${accent};">$ </span>${name}</td></tr>
      <tr><td style="font-size:11px;color:#909090;padding-bottom:12px;"><span style="color:${accent};">→ </span>${title}</td></tr>
      ${tagline ? `<tr><td style="font-size:10.5px;color:#909090;padding-bottom:10px;font-style:italic;">${tagline}</td></tr>` : ""}
      ${data.dividerStyle !== "none" ? `<tr><td style="padding-bottom:12px;"><div style="height:${data.divThickness}px;background:${divColor};opacity:0.5;width:100%;"></div></td></tr>` : ""}
      ${contactRows
        .map(
          (r) =>
            `<tr><td style="padding:1px 0;font-size:11px;color:#B0B0B0;font-family:Menlo,Consolas,monospace;">${r}</td></tr>`
        )
        .join("\n      ")}
      ${socialsHtml}
      ${ctaHtml}
      ${badgesHtml}
    </table>
  </td></tr>
</table>`;
  } else if (data.template === "centered") {
    body = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontFamily};text-align:center;color:#0F0F14;">
  <tr><td align="center">
    <div style="width:${data.photoSize}px;height:${data.photoSize}px;border-radius:${data.photoShape === "square" ? Math.round(data.photoSize * 0.18) : "50%"};background:#0F0F14;color:#ffffff;line-height:${data.photoSize}px;font-weight:700;font-size:17px;margin:0 auto 14px;${
      data.photo
        ? `background-image:url(${data.photo});background-size:cover;background-position:center;${data.photoGrayscale ? "filter:grayscale(1);" : ""}`
        : ""
    }">${data.photo ? "" : escapeHTML(initials(data.name))}</div>
    <div style="font-size:17px;font-weight:${data.nameWeight};letter-spacing:-0.018em;color:#0F0F14;">${name}</div>
    <div style="font-size:12.5px;color:#71717A;margin-top:2px;margin-bottom:12px;${data.titleItalic ? "font-style:italic;" : ""}${data.titleUppercase ? "text-transform:uppercase;letter-spacing:0.06em;" : ""}">${title}</div>
    ${tagline ? `<div style="font-size:11.5px;color:#71717A;font-style:italic;margin-bottom:10px;">${tagline}</div>` : ""}
    ${data.dividerStyle !== "none" ? `<div style="height:${data.divThickness}px;width:24px;background:${divColor};margin:0 auto 12px;"></div>` : ""}
    <div style="font-size:${data.fontSize}px;color:#1F1F26;line-height:1.5;">
      ${[
        data.email && `<a href="mailto:${escapeHTML(data.email)}" style="color:${accent};text-decoration:none;">${escapeHTML(data.email)}</a>`,
        data.phone && escapeHTML(data.phone),
        data.mobilePhone && escapeHTML(data.mobilePhone),
        data.website && `<a href="${escapeHTML(normalizeUrl(data.website, "https://"))}" style="color:${accent};text-decoration:none;">${escapeHTML(data.website)}</a>`,
      ]
        .filter(Boolean)
        .join("<br>")}
    </div>
    ${socials.length ? `<div style="margin-top:12px;">${socials.join("")}</div>` : ""}
    ${data.ctaEnabled && data.ctaText ? `<div style="margin-top:12px;"><a href="${escapeHTML(normalizeUrl(data.ctaUrl || "", "https://"))}" style="display:inline-block;padding:8px 14px;background:${accent};color:white;border-radius:100px;font-size:12px;font-weight:600;text-decoration:none;">${escapeHTML(data.ctaText)} →</a></div>` : ""}
    ${
      data.badges.length
        ? `<div style="margin-top:10px;">${data.badges
            .map(
              (b) =>
                `<span style="display:inline-block;padding:3px 8px;background:#FAF7F2;border:1px solid rgba(15,15,20,0.08);border-radius:100px;font-size:10px;font-weight:600;color:#1F1F26;margin:0 3px;">${escapeHTML(
                  b.label
                )}</span>`
            )
            .join("")}</div>`
        : ""
    }
  </td></tr>
</table>`;
  } else if (data.template === "editorial") {
    body = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontFamily};color:#0F0F14;">
  <tr><td>
    <div style="font-size:24px;font-weight:${data.nameWeight};letter-spacing:-0.028em;color:#0F0F14;">${name}</div>
    <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.16em;font-weight:600;color:#71717A;margin-top:6px;margin-bottom:12px;">${title}</div>
    ${tagline ? `<div style="font-size:11px;color:#71717A;font-style:italic;margin-bottom:12px;">${tagline}</div>` : ""}
    <table cellpadding="0" cellspacing="0" border="0">
      ${contactJoined}
      ${socialsHtml}
      ${ctaHtml}
      ${badgesHtml}
    </table>
  </td></tr>
</table>`;
  } else if (data.template === "compact") {
    body = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontFamily};color:#0F0F14;">
  <tr>
    <td valign="top" style="padding-right:14px;">
      <div style="width:${data.photoSize}px;height:${data.photoSize}px;border-radius:${data.photoShape === "square" ? Math.round(data.photoSize * 0.18) : "50%"};background:#0F0F14;color:#ffffff;text-align:center;line-height:${data.photoSize}px;font-weight:700;font-size:17px;${
        data.photo
          ? `background-image:url(${data.photo});background-size:cover;background-position:center;${data.photoGrayscale ? "filter:grayscale(1);" : ""}`
          : ""
      }">${data.photo ? "" : escapeHTML(initials(data.name))}</div>
    </td>
    <td valign="top">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:17px;font-weight:${data.nameWeight};letter-spacing:-0.018em;color:#0F0F14;padding-bottom:2px;">${name}</td></tr>
        <tr><td style="font-size:12.5px;color:#71717A;padding-bottom:6px;${data.titleItalic ? "font-style:italic;" : ""}">${title}</td></tr>
        ${taglineHtml}
        ${contactJoined}
        ${socialsHtml}
        ${ctaHtml}
        ${badgesHtml}
      </table>
    </td>
  </tr>
</table>`;
  } else {
    // minimal
    body = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontFamily};color:#0F0F14;">
  <tr><td>
    <div style="font-size:16px;font-weight:${data.nameWeight};letter-spacing:-0.018em;color:#0F0F14;">${name}</div>
    <div style="font-size:12.5px;color:#71717A;margin-top:2px;margin-bottom:12px;">${title}</div>
    ${tagline ? `<div style="font-size:11.5px;color:#71717A;font-style:italic;margin-bottom:10px;">${tagline}</div>` : ""}
    <table cellpadding="0" cellspacing="0" border="0">
      ${contactRows
        .map(
          (r) =>
            `<tr><td style="padding:1px 0;font-size:12px;color:#1F1F26;">${r.replace(/<span[^>]*>.*?<\/span>/, "")}</td></tr>`
        )
        .join("\n      ")}
      ${socialsHtml}
      ${ctaHtml}
      ${badgesHtml}
    </table>
  </td></tr>
</table>`;
  }

  return `${signoffHtml}${body}${disclaimerHtml}`;
}
