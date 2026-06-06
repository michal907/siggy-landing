"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Export,
  User as UserIcon,
  EnvelopeSimple,
  At,
  Palette,
  Sparkle,
  CheckCircle,
  Camera,
  Certificate,
  TextAa,
  Layout as LayoutIcon,
  Code,
  PaintBrushHousehold,
  Minus,
  Plus,
  UploadSimple,
  Trash,
  Stack,
  CaretRight,
  SignIn,
  HandWaving,
  Megaphone,
  Info,
  Rectangle,
  ArrowsOutLineVertical,
} from "@phosphor-icons/react/dist/ssr";
import {
  SignatureRenderer,
  generateSignatureHTML,
  type SignatureData,
  type LayoutKey,
  type FontFamily,
  type PhotoShape,
  type Badge,
} from "../_components/SignatureRenderer";
import { ExportModal, type User } from "../_components/ExportModal";
import { AccountPanel } from "../_components/AccountPanel";
import { EmailPreview } from "../_components/EmailPreview";
import { TEMPLATE_PRESETS, type TemplatePreset } from "../_lib/templates";
import { BADGE_PRESETS, BADGE_CATEGORIES, type BadgePreset } from "../_lib/badges";
import { loadOne, upsert, makeId } from "../_lib/storage";

type SectionKey =
  | "templates"
  | "identity"
  | "photo"
  | "contact"
  | "social"
  | "badges"
  | "signoff"
  | "banner"
  | "disclaimer"
  | "color"
  | "typography"
  | "effects"
  | "frame"
  | "layout"
  | "spacing"
  | "custom-css";

const ACCENT_OPTIONS = [
  { name: "Signal", value: "#F25C45" },
  { name: "Coral", value: "#E84A29" },
  { name: "Sage", value: "#4A6B41" },
  { name: "Ink Blue", value: "#1F3253" },
  { name: "Violet", value: "#6B5CFF" },
  { name: "Gold", value: "#B89046" },
  { name: "Teal", value: "#00A39A" },
  { name: "Magenta", value: "#C04CE0" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Lime", value: "#84CC16" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Ink", value: "#0F0F14" },
];

const DIVIDER_STYLES = ["solid", "dashed", "dotted", "double", "none"] as const;
const FRAME_STYLES = [
  { key: "none", name: "None", help: "Plain background." },
  { key: "border", name: "Border", help: "Subtle outline." },
  { key: "card", name: "Card", help: "Filled background with padding." },
] as const;
const SPACING_OPTIONS = [
  { key: "comfortable", name: "Comfortable" },
  { key: "cozy", name: "Cozy" },
  { key: "compact", name: "Compact" },
] as const;
const CTA_STYLES = [
  { key: "pill", name: "Pill button" },
  { key: "underline", name: "Underlined link" },
  { key: "banner", name: "Full banner" },
] as const;
const SIGNOFF_SUGGESTIONS = ["Best,", "Cheers,", "Thanks,", "Warmly,", "All the best,", "Talk soon,"];

const LAYOUTS: { key: LayoutKey; name: string; help: string }[] = [
  { key: "stacked", name: "Stacked", help: "Default · one column." },
  { key: "sidebar", name: "Sidebar", help: "Photo + rail on the left." },
  { key: "photo-right", name: "Photo right", help: "Details left, photo right." },
  { key: "two-col", name: "Two columns", help: "Identity left, contact right." },
];

const FONTS: { key: FontFamily; name: string }[] = [
  { key: "inter", name: "Inter · Modern sans" },
  { key: "display", name: "Bricolage Grotesque · Display" },
  { key: "serif", name: "Serif · Georgia" },
  { key: "system", name: "System UI" },
  { key: "mono", name: "Mono · JetBrains" },
];

const DEFAULT_DATA: SignatureData = {
  // Identity
  name: "Anna Wright",
  pronouns: "",
  title: "Head of Partnerships",
  department: "",
  company: "Meridian Studio",
  companyTagline: "",
  // Photo
  photo: null,
  photoShape: "round",
  photoSize: 56,
  photoBorder: 0,
  photoBorderColor: "#0F0F14",
  photoGrayscale: false,
  // Contact
  email: "anna@meridian.co",
  phone: "+1 415 555 0142",
  mobilePhone: "",
  website: "meridian.co",
  address: "",
  calendarLink: "",
  // Social
  linkedin: "annawright",
  twitter: "annawright",
  instagram: "",
  github: "",
  youtube: "",
  tiktok: "",
  behance: "",
  dribbble: "",
  threads: "",
  medium: "",
  whatsapp: "",
  socialIconStyle: "filled",
  socialIconShape: "rounded",
  socialIconSize: 22,
  // Badges
  badges: [],
  // Signoff
  signoff: "",
  signoffItalic: false,
  // CTA
  ctaEnabled: false,
  ctaText: "Book a call",
  ctaUrl: "calendly.com/anna",
  ctaStyle: "pill",
  // Disclaimer
  disclaimer: "",
  // Style
  accent: "#F25C45",
  template: "editorial",
  layout: "stacked",
  fontFamily: "inter",
  fontSize: 13,
  nameWeight: 700,
  titleItalic: false,
  titleUppercase: false,
  lineHeight: 1.5,
  letterSpacing: 0,
  spacing: "comfortable",
  // Divider
  divThickness: 2,
  divColor: "#F25C45",
  dividerStyle: "solid",
  // Frame
  frameStyle: "none",
  frameColor: "#E4E4E7",
  frameRadius: 12,
  bgColor: "#FAF7F2",
  // Custom CSS
  customCss: "",
};

const SECTIONS_META: Record<SectionKey, { eyebrow: string; title: string; sub: string }> = {
  templates: { eyebrow: "Templates", title: "Pick your starting point.", sub: "22 hand-tuned presets. Tap one to apply, your data carries over." },
  identity: { eyebrow: "Identity", title: "Who are you?", sub: "Name, role, company. Optional: pronouns, department, tagline." },
  photo: { eyebrow: "Photo", title: "Add a face.", sub: "Upload, shape, size, border, grayscale." },
  contact: { eyebrow: "Contact", title: "How do people reach you?", sub: "Email, phones, web, address, booking link." },
  social: { eyebrow: "Social", title: "Where else can people find you?", sub: "11 platforms. Plus icon style, size, and shape controls." },
  badges: { eyebrow: "Badges", title: "Show your credentials.", sub: "Partner programs, certifications, custom achievements." },
  signoff: { eyebrow: "Sign-off", title: "How do you sign off?", sub: "The line above your name. Optional." },
  banner: { eyebrow: "CTA banner", title: "Add a call to action.", sub: "Drive a single click: a booking, a launch, a campaign." },
  disclaimer: { eyebrow: "Disclaimer", title: "Small print.", sub: "Legal, compliance, or confidentiality notice." },
  color: { eyebrow: "Color", title: "Your accent.", sub: "Sets divider, labels, CTA, and social tiles." },
  typography: { eyebrow: "Typography", title: "Set the type.", sub: "Family, base size, name weight, italic and case for the title." },
  effects: { eyebrow: "Divider", title: "The rule between blocks.", sub: "Thickness, color, and style." },
  frame: { eyebrow: "Frame", title: "Wrap it up.", sub: "Border, card background, corner radius." },
  layout: { eyebrow: "Layout", title: "How does it sit?", sub: "Stacked, sidebar, photo-right, two-column." },
  spacing: { eyebrow: "Spacing", title: "Density.", sub: "Comfortable, cozy, or compact." },
  "custom-css": { eyebrow: "Custom CSS", title: "Advanced.", sub: "Drop in CSS, scoped to your signature." },
};

const LS_USER = "siggy-user";

export default function EditorPageWrapper() {
  return (
    <Suspense fallback={<div className="app-shell" style={{ minHeight: "100vh" }} />}>
      <EditorPage />
    </Suspense>
  );
}

function EditorPage() {
  const params = useSearchParams();
  const initialId = params.get("id");
  const initialTpl = params.get("template");

  const [data, setData] = useState<SignatureData>(() => {
    if (initialTpl) {
      const tpl = TEMPLATE_PRESETS.find((t) => t.id === initialTpl);
      if (tpl) return { ...DEFAULT_DATA, ...tpl.preset };
    }
    return DEFAULT_DATA;
  });
  const [sigId] = useState<string>(initialId || makeId());
  const [sigName, setSigName] = useState("Untitled signature");
  const [section, setSection] = useState<SectionKey>("templates");
  const [user, setUser] = useState<User>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [badgeCategory, setBadgeCategory] = useState<typeof BADGE_CATEGORIES[number]>("Partner");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const badgeImageRef = useRef<HTMLInputElement | null>(null);
  const [customBadgeLabel, setCustomBadgeLabel] = useState("");
  const [customBadgeColor, setCustomBadgeColor] = useState("#E84A29");
  const [customBadgeImage, setCustomBadgeImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem(LS_USER);
      if (u) setUser(JSON.parse(u));
      if (initialId) {
        const saved = loadOne(initialId);
        if (saved) {
          setData({ ...DEFAULT_DATA, ...saved.data });
          setSigName(saved.name);
        }
      }
    } catch {}
    setHydrated(true);
  }, [initialId]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      upsert({ id: sigId, name: sigName, updatedAt: Date.now(), data });
    } catch {}
  }, [data, sigId, sigName, hydrated]);

  const exportHTML = useMemo(() => generateSignatureHTML(data), [data]);

  const update = <K extends keyof SignatureData>(k: K, v: SignatureData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const applyTemplate = (t: TemplatePreset) => {
    setData((d) => ({ ...d, ...t.preset }));
    showToast(`Applied "${t.name}"`);
  };

  const handleSignup = (u: NonNullable<User>) => {
    setUser(u);
    try { localStorage.setItem(LS_USER, JSON.stringify(u)); } catch {}
  };

  const handleSignOut = () => {
    setUser(null);
    try { localStorage.removeItem(LS_USER); } catch {}
    showToast("Signed out");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const onPhotoFile = (file: File) => {
    if (!file?.type.startsWith("image/")) return showToast("Please pick an image file");
    if (file.size > 2 * 1024 * 1024) return showToast("Image too large (max 2MB)");
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  const onBadgeImageFile = (file: File) => {
    if (!file?.type.startsWith("image/")) return showToast("Please pick an image file");
    if (file.size > 200 * 1024) return showToast("Badge icon too large (max 200KB)");
    const reader = new FileReader();
    reader.onload = () => setCustomBadgeImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const toggleBadgePreset = (b: BadgePreset) => {
    setData((d) => {
      if (d.badges.find((x) => x.id === b.id)) return { ...d, badges: d.badges.filter((x) => x.id !== b.id) };
      const next: Badge = { id: b.id, label: b.label, color: b.color, mark: b.mark };
      return { ...d, badges: [...d.badges, next] };
    });
  };

  const addCustomBadge = () => {
    const label = customBadgeLabel.trim();
    if (!label) return;
    const next: Badge = {
      id: `c-${Date.now()}`,
      label,
      color: customBadgeColor,
      mark: label.slice(0, 2).toUpperCase(),
      custom: true,
      imageDataUrl: customBadgeImage || undefined,
    };
    setData((d) => ({ ...d, badges: [...d.badges, next] }));
    setCustomBadgeLabel("");
    setCustomBadgeImage(null);
  };

  const removeBadge = (id: string) => {
    setData((d) => ({ ...d, badges: d.badges.filter((b) => b.id !== id) }));
  };

  const meta = SECTIONS_META[section];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <Link href="/app" className="app-back">
            <ArrowLeft weight="bold" size={14} />
            All signatures
          </Link>
          <span className="logo">
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                <path d="M 206,30 L 126,130 L 34,130 C 34,52 108,12 206,30 Z" />
                <path d="M 34,210 L 114,110 L 206,110 C 206,188 132,228 34,210 Z" />
              </svg>
            </span>
            Siggy
          </span>
          <input
            value={sigName}
            onChange={(e) => setSigName(e.target.value)}
            className="app-sig-name"
            placeholder="Untitled signature"
            aria-label="Signature name"
          />
        </div>
        <div className="app-header-right">
          <span className="app-status">
            <span className="dot" />
            {hydrated ? "Saved" : "Loading…"}
          </span>
          {user ? (
            <button className="btn btn-secondary" onClick={() => setAccountOpen(true)}>
              <UserIcon weight="bold" size={14} />
              {user.displayName.split(/\s+/)[0]}
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => setSignupOpen(true)}>
              <SignIn weight="bold" size={14} />
              Sign in
            </button>
          )}
          <button className="btn btn-accent" onClick={() => setExportOpen(true)}>
            <Export weight="bold" size={14} />
            Export
          </button>
        </div>
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <div className="app-sidebar-section">Design</div>
          {(["templates", "layout", "spacing"] as SectionKey[]).map((k) => (
            <NavItem key={k} k={k} active={section === k} onClick={() => setSection(k)} />
          ))}
          <div className="app-sidebar-section">Content</div>
          {(["identity", "photo", "contact", "social", "badges", "signoff", "banner", "disclaimer"] as SectionKey[]).map((k) => (
            <NavItem key={k} k={k} active={section === k} onClick={() => setSection(k)} />
          ))}
          <div className="app-sidebar-section">Look</div>
          {(["color", "typography", "effects", "frame"] as SectionKey[]).map((k) => (
            <NavItem key={k} k={k} active={section === k} onClick={() => setSection(k)} />
          ))}
          <div className="app-sidebar-section">Advanced</div>
          <NavItem k="custom-css" active={section === "custom-css"} onClick={() => setSection("custom-css")} />
        </aside>

        <main className="app-main">
          <div className="app-main-header">
            <div className="app-main-eyebrow">{meta.eyebrow}</div>
            <h1 className="app-main-title">{meta.title}</h1>
            <div className="app-main-sub" dangerouslySetInnerHTML={{ __html: meta.sub }} />
          </div>

          {section === "templates" && (
            <div className="tpl-gallery-grid">
              {TEMPLATE_PRESETS.map((t) => {
                const active =
                  data.template === t.preset.template &&
                  data.accent === t.preset.accent &&
                  data.layout === t.preset.layout &&
                  data.fontFamily === t.preset.fontFamily;
                const previewData: SignatureData = {
                  ...DEFAULT_DATA,
                  ...t.preset,
                  photo: null,
                  badges: [],
                  customCss: "",
                };
                return (
                  <button
                    type="button"
                    key={t.id}
                    className={`tpl-card-btn ${active ? "active" : ""}`}
                    onClick={() => applyTemplate(t)}
                  >
                    <span className="tpl-card-thumb tpl-card-thumb-live">
                      <span className="tpl-card-preview-scale">
                        <SignatureRenderer data={previewData} />
                      </span>
                      <span className="tpl-card-tag" style={{ background: t.swatch }}>{t.tag}</span>
                    </span>
                    <span className="tpl-card-name">{t.name}</span>
                    <span className="tpl-card-group">{t.group}</span>
                  </button>
                );
              })}
            </div>
          )}

          {section === "identity" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><UserIcon weight="bold" size={14} /></span>
                  Personal details
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-name">Full name</label>
                    <input id="f-name" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Anna Wright" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-pronouns">Pronouns</label>
                    <input id="f-pronouns" value={data.pronouns} onChange={(e) => update("pronouns", e.target.value)} placeholder="she/her" />
                  </div>
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-title">Job title</label>
                    <input id="f-title" value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="Head of Partnerships" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-dept">Department</label>
                    <input id="f-dept" value={data.department} onChange={(e) => update("department", e.target.value)} placeholder="Growth" />
                  </div>
                </div>
                <div className="app-field">
                  <label htmlFor="f-company">Company</label>
                  <input id="f-company" value={data.company} onChange={(e) => update("company", e.target.value)} placeholder="Meridian Studio" />
                </div>
                <div className="app-field">
                  <label htmlFor="f-tagline">Company tagline (optional)</label>
                  <input id="f-tagline" value={data.companyTagline} onChange={(e) => update("companyTagline", e.target.value)} placeholder="Brand consultancy for SaaS" />
                </div>
              </div>
            </>
          )}

          {section === "photo" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Camera weight="bold" size={14} /></span>
                  Upload a photo
                </div>
                <div className="app-photo-row">
                  <div
                    className={`app-photo-preview ${data.photo ? "has-photo" : ""}`}
                    style={data.photo ? { backgroundImage: `url(${data.photo})`, borderRadius: data.photoShape === "square" ? 10 : "50%", filter: data.photoGrayscale ? "grayscale(1)" : undefined } : { borderRadius: data.photoShape === "square" ? 10 : "50%" }}
                  >
                    {!data.photo && data.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="app-photo-actions">
                    <input ref={fileInputRef} type="file" accept="image/*" className="file-input" onChange={(e) => e.target.files?.[0] && onPhotoFile(e.target.files[0])} />
                    <button type="button" className="file-btn" onClick={() => fileInputRef.current?.click()}>
                      <UploadSimple weight="bold" size={13} />
                      {data.photo ? "Replace photo" : "Upload photo"}
                    </button>
                    {data.photo && (
                      <button type="button" className="clear-btn" onClick={() => update("photo", null)}>Remove photo</button>
                    )}
                  </div>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><PaintBrushHousehold weight="bold" size={14} /></span>
                  Shape
                </div>
                <div className="app-layouts">
                  {(["round", "square"] as PhotoShape[]).map((s) => (
                    <button type="button" key={s} className={`app-layout-btn ${data.photoShape === s ? "active" : ""}`} onClick={() => update("photoShape", s)}>
                      <div className="app-layout-pic">
                        <div className="blk" style={{ width: 36, height: 36, borderRadius: s === "round" ? "50%" : 6 }} />
                      </div>
                      <span className="lt-name">{s === "round" ? "Round" : "Square"}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><ArrowsOutLineVertical weight="bold" size={14} /></span>
                  Size
                </div>
                <div className="app-range-row">
                  <input type="range" min={40} max={96} step={2} value={data.photoSize} onChange={(e) => update("photoSize", Number(e.target.value))} />
                  <span className="app-range-val">{data.photoSize}px</span>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Rectangle weight="bold" size={14} /></span>
                  Border
                </div>
                <div className="app-range-row">
                  <input type="range" min={0} max={6} step={1} value={data.photoBorder} onChange={(e) => update("photoBorder", Number(e.target.value))} />
                  <span className="app-range-val">{data.photoBorder}px</span>
                </div>
                {data.photoBorder > 0 && (
                  <div className="app-color-row" style={{ marginTop: 12 }}>
                    {ACCENT_OPTIONS.map((c) => (
                      <button type="button" key={c.value} className={`app-swatch ${data.photoBorderColor === c.value ? "active" : ""}`} style={{ background: c.value }} onClick={() => update("photoBorderColor", c.value)} aria-label={c.name} />
                    ))}
                  </div>
                )}
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><PaintBrushHousehold weight="bold" size={14} /></span>
                  Filter
                </div>
                <Toggle label="Grayscale" checked={data.photoGrayscale} onChange={(v) => update("photoGrayscale", v)} hint="Convert the photo to black &amp; white." />
              </div>
            </>
          )}

          {section === "contact" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><EnvelopeSimple weight="bold" size={14} /></span>
                  Primary
                </div>
                <div className="app-field">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" />
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-phone">Office phone</label>
                    <input id="f-phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 415 555 0142" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-mobile">Mobile</label>
                    <input id="f-mobile" type="tel" value={data.mobilePhone} onChange={(e) => update("mobilePhone", e.target.value)} placeholder="+1 415 555 0143" />
                  </div>
                </div>
                <div className="app-field">
                  <label htmlFor="f-web">Website</label>
                  <input id="f-web" value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="yourcompany.com" />
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><EnvelopeSimple weight="bold" size={14} /></span>
                  More
                </div>
                <div className="app-field">
                  <label htmlFor="f-address">Address (optional)</label>
                  <input id="f-address" value={data.address} onChange={(e) => update("address", e.target.value)} placeholder="221B Baker Street, London" />
                </div>
                <div className="app-field">
                  <label htmlFor="f-cal">Booking link (Calendly etc.)</label>
                  <input id="f-cal" value={data.calendarLink} onChange={(e) => update("calendarLink", e.target.value)} placeholder="calendly.com/anna" />
                </div>
              </div>
            </>
          )}

          {section === "social" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><At weight="bold" size={14} /></span>
                  Social handles
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-li">LinkedIn</label>
                    <input id="f-li" value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="annawright" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-x">X / Twitter</label>
                    <input id="f-x" value={data.twitter} onChange={(e) => update("twitter", e.target.value)} placeholder="@handle" />
                  </div>
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-ig">Instagram</label>
                    <input id="f-ig" value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@handle" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-gh">GitHub</label>
                    <input id="f-gh" value={data.github} onChange={(e) => update("github", e.target.value)} placeholder="username" />
                  </div>
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-yt">YouTube</label>
                    <input id="f-yt" value={data.youtube} onChange={(e) => update("youtube", e.target.value)} placeholder="@channel" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-tt">TikTok</label>
                    <input id="f-tt" value={data.tiktok} onChange={(e) => update("tiktok", e.target.value)} placeholder="@handle" />
                  </div>
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-be">Behance</label>
                    <input id="f-be" value={data.behance} onChange={(e) => update("behance", e.target.value)} placeholder="username" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-dr">Dribbble</label>
                    <input id="f-dr" value={data.dribbble} onChange={(e) => update("dribbble", e.target.value)} placeholder="username" />
                  </div>
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label htmlFor="f-th">Threads</label>
                    <input id="f-th" value={data.threads} onChange={(e) => update("threads", e.target.value)} placeholder="@handle" />
                  </div>
                  <div className="app-field">
                    <label htmlFor="f-md">Medium</label>
                    <input id="f-md" value={data.medium} onChange={(e) => update("medium", e.target.value)} placeholder="@handle" />
                  </div>
                </div>
                <div className="app-field">
                  <label htmlFor="f-wa">WhatsApp (full number, with country code)</label>
                  <input id="f-wa" value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="+14155550142" />
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><PaintBrushHousehold weight="bold" size={14} /></span>
                  Icon style
                </div>
                <div className="app-field">
                  <label>Fill</label>
                  <SegmentedControl
                    options={[
                      { key: "filled", name: "Filled" },
                      { key: "outline", name: "Outlined" },
                      { key: "naked", name: "No background" },
                    ]}
                    value={data.socialIconStyle}
                    onChange={(v) => update("socialIconStyle", v)}
                  />
                </div>
                <div className="app-field">
                  <label>Shape</label>
                  <SegmentedControl
                    options={[
                      { key: "rounded", name: "Rounded" },
                      { key: "square", name: "Square" },
                      { key: "circle", name: "Circle" },
                    ]}
                    value={data.socialIconShape}
                    onChange={(v) => update("socialIconShape", v)}
                  />
                </div>
                <div className="app-field">
                  <label htmlFor="f-soc-size">Size</label>
                  <div className="app-range-row">
                    <input id="f-soc-size" type="range" min={16} max={32} step={1} value={data.socialIconSize} onChange={(e) => update("socialIconSize", Number(e.target.value))} />
                    <span className="app-range-val">{data.socialIconSize}px</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {section === "badges" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Certificate weight="bold" size={14} /></span>
                  Branded badges
                </div>
                <div className="badge-cat-tabs">
                  {BADGE_CATEGORIES.map((c) => (
                    <button type="button" key={c} className={`badge-cat-tab ${badgeCategory === c ? "active" : ""}`} onClick={() => setBadgeCategory(c)}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="app-badges-grid">
                  {BADGE_PRESETS.filter((b) => b.category === badgeCategory).map((b) => {
                    const active = !!data.badges.find((x) => x.id === b.id);
                    return (
                      <button type="button" key={b.id} className={`app-badge-btn ${active ? "active" : ""}`} onClick={() => toggleBadgePreset(b)}>
                        <span className="ico ico-branded" style={{ background: b.color }}>{b.mark}</span>
                        <span className="badge-label">{b.label}</span>
                        {active && <CheckCircle weight="fill" size={14} className="badge-check" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Plus weight="bold" size={14} /></span>
                  Create a custom badge
                </div>
                <div className="app-field">
                  <label htmlFor="cb-label">Label</label>
                  <input id="cb-label" value={customBadgeLabel} onChange={(e) => setCustomBadgeLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomBadge()} placeholder="Verified Partner" />
                </div>
                <div className="app-field-row">
                  <div className="app-field">
                    <label>Color</label>
                    <div className="app-color-row">
                      {ACCENT_OPTIONS.slice(0, 8).map((c) => (
                        <button type="button" key={c.value} className={`app-swatch ${customBadgeColor === c.value ? "active" : ""}`} style={{ background: c.value }} onClick={() => setCustomBadgeColor(c.value)} aria-label={c.name} />
                      ))}
                    </div>
                  </div>
                  <div className="app-field">
                    <label>Icon (optional)</label>
                    <div className="custom-badge-image-row">
                      <div className="custom-badge-preview" style={{ backgroundImage: customBadgeImage ? `url(${customBadgeImage})` : undefined, background: customBadgeImage ? undefined : customBadgeColor, color: "white" }}>
                        {!customBadgeImage && (customBadgeLabel.slice(0, 2).toUpperCase() || "?")}
                      </div>
                      <input ref={badgeImageRef} type="file" accept="image/*" className="file-input" onChange={(e) => e.target.files?.[0] && onBadgeImageFile(e.target.files[0])} />
                      <button type="button" className="file-btn" onClick={() => badgeImageRef.current?.click()}>
                        <UploadSimple weight="bold" size={13} />
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-accent" style={{ marginTop: 6 }} onClick={addCustomBadge} disabled={!customBadgeLabel.trim()}>
                  <Plus weight="bold" size={14} />
                  Add badge
                </button>
              </div>

              {data.badges.length > 0 && (
                <div className="app-card">
                  <div className="app-card-title">
                    <span className="icon-wrap"><CheckCircle weight="bold" size={14} /></span>
                    Selected ({data.badges.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {data.badges.map((b) => (
                      <span key={b.id} className="selected-badge-pill">
                        <span className="pill-mark" style={{ background: b.color || "var(--ink)", backgroundImage: b.imageDataUrl ? `url(${b.imageDataUrl})` : undefined }}>
                          {!b.imageDataUrl && (b.mark || b.label.slice(0, 2).toUpperCase())}
                        </span>
                        {b.label}
                        <button type="button" aria-label={`Remove ${b.label}`} onClick={() => removeBadge(b.id)} className="pill-remove">
                          <Trash weight="bold" size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {section === "color" && (
            <div className="app-card">
              <div className="app-card-title">
                <span className="icon-wrap"><Palette weight="bold" size={14} /></span>
                Accent color
              </div>
              <div className="app-color-row">
                {ACCENT_OPTIONS.map((c) => (
                  <button type="button" key={c.value} className={`app-swatch ${data.accent === c.value ? "active" : ""}`} style={{ background: c.value }} onClick={() => { update("accent", c.value); update("divColor", c.value); }} aria-label={c.name} title={c.name} />
                ))}
              </div>
              <div className="app-field" style={{ marginTop: 18 }}>
                <label htmlFor="f-accent-custom">Custom hex</label>
                <input id="f-accent-custom" value={data.accent} onChange={(e) => update("accent", e.target.value)} placeholder="#E84A29" />
              </div>
            </div>
          )}

          {section === "typography" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><TextAa weight="bold" size={14} /></span>
                  Font family
                </div>
                <div className="app-field">
                  <label htmlFor="f-font">Family</label>
                  <select id="f-font" value={data.fontFamily} onChange={(e) => update("fontFamily", e.target.value as FontFamily)}>
                    {FONTS.map((f) => (<option key={f.key} value={f.key}>{f.name}</option>))}
                  </select>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Minus weight="bold" size={14} /></span>
                  Base font size
                </div>
                <div className="app-range-row">
                  <input type="range" min={11} max={18} step={1} value={data.fontSize} onChange={(e) => update("fontSize", Number(e.target.value))} />
                  <span className="app-range-val">{data.fontSize}px</span>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><TextAa weight="bold" size={14} /></span>
                  Name weight
                </div>
                <div className="app-range-row">
                  <input type="range" min={400} max={900} step={100} value={data.nameWeight} onChange={(e) => update("nameWeight", Number(e.target.value))} />
                  <span className="app-range-val">{data.nameWeight}</span>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><TextAa weight="bold" size={14} /></span>
                  Title style
                </div>
                <Toggle label="Italic" checked={data.titleItalic} onChange={(v) => update("titleItalic", v)} />
                <Toggle label="Uppercase" checked={data.titleUppercase} hint="Becomes spaced caps. Works well with editorial templates." onChange={(v) => update("titleUppercase", v)} />
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><ArrowsOutLineVertical weight="bold" size={14} /></span>
                  Line height
                </div>
                <div className="app-range-row">
                  <input type="range" min={1.2} max={2.0} step={0.05} value={data.lineHeight} onChange={(e) => update("lineHeight", Number(e.target.value))} />
                  <span className="app-range-val">{data.lineHeight.toFixed(2)}</span>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Minus weight="bold" size={14} /></span>
                  Letter spacing
                </div>
                <div className="app-range-row">
                  <input type="range" min={-0.04} max={0.08} step={0.005} value={data.letterSpacing} onChange={(e) => update("letterSpacing", Number(e.target.value))} />
                  <span className="app-range-val">{data.letterSpacing.toFixed(3)}em</span>
                </div>
              </div>
            </>
          )}

          {section === "effects" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><PaintBrushHousehold weight="bold" size={14} /></span>
                  Divider style
                </div>
                <SegmentedControl
                  options={DIVIDER_STYLES.map((s) => ({ key: s, name: s[0].toUpperCase() + s.slice(1) }))}
                  value={data.dividerStyle}
                  onChange={(v) => update("dividerStyle", v)}
                />
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Minus weight="bold" size={14} /></span>
                  Thickness
                </div>
                <div className="app-range-row">
                  <input type="range" min={1} max={6} step={1} value={data.divThickness} onChange={(e) => update("divThickness", Number(e.target.value))} />
                  <span className="app-range-val">{data.divThickness}px</span>
                </div>
              </div>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Palette weight="bold" size={14} /></span>
                  Divider color
                </div>
                <div className="app-color-row">
                  {ACCENT_OPTIONS.map((c) => (
                    <button type="button" key={c.value} className={`app-swatch ${data.divColor === c.value ? "active" : ""}`} style={{ background: c.value }} onClick={() => update("divColor", c.value)} aria-label={c.name} />
                  ))}
                </div>
                <div className="app-field" style={{ marginTop: 14 }}>
                  <label htmlFor="f-div">Custom hex</label>
                  <input id="f-div" value={data.divColor} onChange={(e) => update("divColor", e.target.value)} placeholder="#F25C45" />
                </div>
              </div>
            </>
          )}

          {section === "signoff" && (
            <div className="app-card">
              <div className="app-card-title">
                <span className="icon-wrap"><HandWaving weight="bold" size={14} /></span>
                Sign-off phrase
              </div>
              <div className="app-field">
                <label htmlFor="f-signoff">Phrase (leave blank to hide)</label>
                <input id="f-signoff" value={data.signoff} onChange={(e) => update("signoff", e.target.value)} placeholder="Best," />
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {SIGNOFF_SUGGESTIONS.map((s) => (
                  <button type="button" key={s} className="suggestion-chip" onClick={() => update("signoff", s)}>{s}</button>
                ))}
              </div>
              <Toggle label="Italic" checked={data.signoffItalic} onChange={(v) => update("signoffItalic", v)} />
            </div>
          )}

          {section === "banner" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Megaphone weight="bold" size={14} /></span>
                  CTA banner
                </div>
                <Toggle label="Show CTA in signature" hint="Drive one click: booking, launch, or campaign." checked={data.ctaEnabled} onChange={(v) => update("ctaEnabled", v)} />
              </div>
              {data.ctaEnabled && (
                <>
                  <div className="app-card">
                    <div className="app-card-title">
                      <span className="icon-wrap"><TextAa weight="bold" size={14} /></span>
                      Copy &amp; link
                    </div>
                    <div className="app-field">
                      <label htmlFor="f-cta-text">Button text</label>
                      <input id="f-cta-text" value={data.ctaText} onChange={(e) => update("ctaText", e.target.value)} placeholder="Book a call" maxLength={40} />
                    </div>
                    <div className="app-field">
                      <label htmlFor="f-cta-url">URL</label>
                      <input id="f-cta-url" value={data.ctaUrl} onChange={(e) => update("ctaUrl", e.target.value)} placeholder="calendly.com/anna" />
                    </div>
                  </div>
                  <div className="app-card">
                    <div className="app-card-title">
                      <span className="icon-wrap"><Rectangle weight="bold" size={14} /></span>
                      Style
                    </div>
                    <SegmentedControl
                      options={CTA_STYLES.map((o) => ({ key: o.key, name: o.name }))}
                      value={data.ctaStyle}
                      onChange={(v) => update("ctaStyle", v)}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {section === "disclaimer" && (
            <div className="app-card">
              <div className="app-card-title">
                <span className="icon-wrap"><Info weight="bold" size={14} /></span>
                Disclaimer text
              </div>
              <div className="app-field">
                <label htmlFor="f-disclaim">Small print (legal, compliance, confidentiality)</label>
                <textarea
                  id="f-disclaim"
                  value={data.disclaimer}
                  onChange={(e) => update("disclaimer", e.target.value)}
                  placeholder="This email and any attachments are confidential and intended solely for the addressee."
                  style={{ minHeight: 100, resize: "vertical" }}
                />
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5 }}>
                Shows in small grey type below the signature. Leave blank to hide.
              </div>
            </div>
          )}

          {section === "frame" && (
            <>
              <div className="app-card">
                <div className="app-card-title">
                  <span className="icon-wrap"><Rectangle weight="bold" size={14} /></span>
                  Frame style
                </div>
                <div className="app-layouts">
                  {FRAME_STYLES.map((f) => (
                    <button type="button" key={f.key} className={`app-layout-btn ${data.frameStyle === f.key ? "active" : ""}`} onClick={() => update("frameStyle", f.key)}>
                      <div className="app-layout-pic">
                        <div
                          className="blk"
                          style={{
                            width: 44,
                            height: 30,
                            background: f.key === "card" ? "var(--bg-2)" : "transparent",
                            border: f.key === "border" ? "1.5px solid var(--ink-3)" : f.key === "card" ? "1px solid var(--rule)" : "none",
                            borderRadius: 5,
                          }}
                        />
                      </div>
                      <span className="lt-name">{f.name}</span>
                      <span style={{ fontSize: 11, color: "var(--ink-3)", lineHeight: 1.4 }}>{f.help}</span>
                    </button>
                  ))}
                </div>
              </div>
              {data.frameStyle !== "none" && (
                <>
                  <div className="app-card">
                    <div className="app-card-title">
                      <span className="icon-wrap"><Minus weight="bold" size={14} /></span>
                      Corner radius
                    </div>
                    <div className="app-range-row">
                      <input type="range" min={0} max={24} step={1} value={data.frameRadius} onChange={(e) => update("frameRadius", Number(e.target.value))} />
                      <span className="app-range-val">{data.frameRadius}px</span>
                    </div>
                  </div>
                  {data.frameStyle === "card" && (
                    <div className="app-card">
                      <div className="app-card-title">
                        <span className="icon-wrap"><Palette weight="bold" size={14} /></span>
                        Background color
                      </div>
                      <div className="app-field">
                        <label htmlFor="f-bg">Custom hex</label>
                        <input id="f-bg" value={data.bgColor} onChange={(e) => update("bgColor", e.target.value)} placeholder="#FAF7F2" />
                      </div>
                    </div>
                  )}
                  {data.frameStyle === "border" && (
                    <div className="app-card">
                      <div className="app-card-title">
                        <span className="icon-wrap"><Palette weight="bold" size={14} /></span>
                        Border color
                      </div>
                      <div className="app-color-row">
                        {ACCENT_OPTIONS.map((c) => (
                          <button type="button" key={c.value} className={`app-swatch ${data.frameColor === c.value ? "active" : ""}`} style={{ background: c.value }} onClick={() => update("frameColor", c.value)} aria-label={c.name} />
                        ))}
                      </div>
                      <div className="app-field" style={{ marginTop: 14 }}>
                        <label htmlFor="f-fc">Custom hex</label>
                        <input id="f-fc" value={data.frameColor} onChange={(e) => update("frameColor", e.target.value)} placeholder="#E4E4E7" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {section === "spacing" && (
            <div className="app-card">
              <div className="app-card-title">
                <span className="icon-wrap"><ArrowsOutLineVertical weight="bold" size={14} /></span>
                Density
              </div>
              <SegmentedControl
                options={SPACING_OPTIONS.map((o) => ({ key: o.key, name: o.name }))}
                value={data.spacing}
                onChange={(v) => update("spacing", v)}
              />
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5, marginTop: 14 }}>
                Controls the gap between contact rows, the social row, and the badge row. Cozy is a good default for most templates; compact suits dev / mono style.
              </div>
            </div>
          )}

          {section === "layout" && (
            <div className="app-card">
              <div className="app-card-title">
                <span className="icon-wrap"><LayoutIcon weight="bold" size={14} /></span>
                Layout variant
              </div>
              <div className="app-layouts">
                {LAYOUTS.map((l) => (
                  <button type="button" key={l.key} className={`app-layout-btn ${data.layout === l.key ? "active" : ""}`} onClick={() => update("layout", l.key)}>
                    <LayoutPreview kind={l.key} />
                    <span className="lt-name">{l.name}</span>
                    <span style={{ fontSize: 11, color: "var(--ink-3)", lineHeight: 1.4 }}>{l.help}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === "custom-css" && (
            <div className="app-card">
              <div className="app-card-title">
                <span className="icon-wrap"><Code weight="bold" size={14} /></span>
                Custom CSS
              </div>
              <div className="app-field">
                <label htmlFor="f-css">Scoped to your signature only</label>
                <textarea id="f-css" className="code" value={data.customCss} onChange={(e) => update("customCss", e.target.value)} placeholder={".sig-name { letter-spacing: -0.04em; }\n.sig-rule { width: 100%; }"} />
              </div>
            </div>
          )}
        </main>

        <aside className="app-preview">
          <div className="preview-label">
            <span className="lbl">Live preview</span>
            <span className="meta">Switch clients ↓</span>
          </div>
          <EmailPreview data={data} />
          <div className="preview-tip">
            <span className="ico"><CheckCircle weight="fill" size={16} /></span>
            <span>Each tab styles the window like that client. Click the email body to edit it. Body text isn&apos;t included in export.</span>
          </div>
        </aside>
      </div>

      {exportOpen && (
        <ExportModal html={exportHTML} user={user} onSignup={handleSignup} onClose={() => setExportOpen(false)} onToast={showToast} />
      )}
      {signupOpen && (
        <ExportModal html="" user={user} onSignup={(u) => { handleSignup(u); setSignupOpen(false); }} onClose={() => setSignupOpen(false)} onToast={showToast} />
      )}
      {accountOpen && user && (
        <AccountPanel user={user} onClose={() => setAccountOpen(false)} onSignOut={handleSignOut} />
      )}
      {toast && (
        <div className="toast">
          <span className="ico"><CheckCircle weight="fill" size={16} /></span>
          {toast}
        </div>
      )}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="app-toggle">
      <span>
        <span className="app-toggle-label">{label}</span>
        {hint && <span className="app-toggle-hint" dangerouslySetInnerHTML={{ __html: hint }} />}
      </span>
      <span className={`app-switch ${checked ? "on" : ""}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="app-switch-thumb" />
      </span>
    </label>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; name: string; help?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="app-segmented">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          className={`app-segmented-btn ${value === o.key ? "active" : ""}`}
          onClick={() => onChange(o.key)}
          title={o.help}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
}

function NavItem({ k, active, onClick }: { k: SectionKey; active: boolean; onClick: () => void }) {
  const labels: Record<SectionKey, { label: string; icon: React.ReactNode }> = {
    templates: { label: "Templates", icon: <Stack weight="fill" size={16} /> },
    layout: { label: "Layout", icon: <LayoutIcon weight="bold" size={16} /> },
    spacing: { label: "Spacing", icon: <ArrowsOutLineVertical weight="bold" size={16} /> },
    identity: { label: "Identity", icon: <UserIcon weight="bold" size={16} /> },
    photo: { label: "Photo", icon: <Camera weight="bold" size={16} /> },
    contact: { label: "Contact", icon: <EnvelopeSimple weight="bold" size={16} /> },
    social: { label: "Social", icon: <At weight="bold" size={16} /> },
    badges: { label: "Badges", icon: <Certificate weight="bold" size={16} /> },
    signoff: { label: "Sign-off", icon: <HandWaving weight="bold" size={16} /> },
    banner: { label: "CTA banner", icon: <Megaphone weight="bold" size={16} /> },
    disclaimer: { label: "Disclaimer", icon: <Info weight="bold" size={16} /> },
    color: { label: "Color", icon: <Palette weight="bold" size={16} /> },
    typography: { label: "Typography", icon: <TextAa weight="bold" size={16} /> },
    effects: { label: "Divider", icon: <PaintBrushHousehold weight="bold" size={16} /> },
    frame: { label: "Frame", icon: <Rectangle weight="bold" size={16} /> },
    "custom-css": { label: "Custom CSS", icon: <Code weight="bold" size={16} /> },
  };
  return (
    <button type="button" className={`app-nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <span className="icon-wrap">{labels[k].icon}</span>
      {labels[k].label}
      {active && <CaretRight weight="bold" size={12} className="nav-arrow" />}
    </button>
  );
}

function LayoutPreview({ kind }: { kind: LayoutKey }) {
  const styles: React.CSSProperties = { display: "flex", gap: 4, padding: 6, width: "100%", height: 50, alignItems: "stretch" };
  if (kind === "stacked") {
    return (
      <div className="app-layout-pic" style={{ flexDirection: "column", padding: 6, gap: 4, height: 50 }}>
        <div className="blk" style={{ height: 6, width: "70%" }} />
        <div className="blk" style={{ height: 4, width: "50%", opacity: 0.6 }} />
        <div className="blk" style={{ height: 4, width: "80%", opacity: 0.6 }} />
      </div>
    );
  }
  if (kind === "sidebar") {
    return (
      <div className="app-layout-pic" style={styles}>
        <div className="blk" style={{ width: 28, height: 28, alignSelf: "center", borderRadius: "50%" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
          <div className="blk" style={{ height: 5, width: "80%" }} />
          <div className="blk" style={{ height: 3, width: "60%", opacity: 0.6 }} />
          <div className="blk" style={{ height: 3, width: "70%", opacity: 0.6 }} />
        </div>
      </div>
    );
  }
  if (kind === "photo-right") {
    return (
      <div className="app-layout-pic" style={styles}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
          <div className="blk" style={{ height: 5, width: "80%" }} />
          <div className="blk" style={{ height: 3, width: "60%", opacity: 0.6 }} />
          <div className="blk" style={{ height: 3, width: "70%", opacity: 0.6 }} />
        </div>
        <div className="blk" style={{ width: 28, height: 28, alignSelf: "center", borderRadius: "50%" }} />
      </div>
    );
  }
  return (
    <div className="app-layout-pic" style={styles}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
        <div className="blk" style={{ height: 5, width: "85%" }} />
        <div className="blk" style={{ height: 3, width: "60%", opacity: 0.6 }} />
      </div>
      <div style={{ width: 1, background: "currentColor", opacity: 0.2 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
        <div className="blk" style={{ height: 3, width: "70%", opacity: 0.6 }} />
        <div className="blk" style={{ height: 3, width: "80%", opacity: 0.6 }} />
      </div>
    </div>
  );
}
