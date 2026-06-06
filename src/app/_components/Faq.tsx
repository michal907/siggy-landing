"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Will it actually look the same in Gmail, Outlook, and Apple Mail?",
    a: "Yes. That's the whole reason Siggy exists. Every template is hand-tested in Gmail (web, iOS, Android), Outlook (Mac, Windows, web, mobile), Apple Mail (macOS + iOS), Proton, Yahoo, and Thunderbird. We use table-based, email-safe HTML so nothing collapses or shifts when your reply lands, including the Outlook desktop renderer that breaks most signature tools.",
  },
  {
    q: "How do I install my signature once I've built it?",
    a: "Copy and paste. We give you a one-click copy button and a 60-second walkthrough for each client (Gmail, Outlook, Apple Mail, etc.). No browser extension, no IT ticket, no DNS records. If you're on Pro, central deploy via Google Workspace or Microsoft 365 pushes signatures to your whole team automatically.",
  },
  {
    q: "Is the free plan really free, or will it ask for a card later?",
    a: "Really free. No card to start, no trial that expires, no \"free for 7 days then we charge you\" trick. You get one signature, six starter templates, and a small Siggy badge in the footer. Keep it forever. Upgrade only when you want more signatures, all 30+ templates, or to remove the badge.",
  },
  {
    q: "Can I use my own logo, brand colors, and fonts?",
    a: "Yes. Upload your logo (SVG, PNG, or JPG), set brand colors via hex or OKLCH, and pick from web-safe fonts that render reliably in every client. On Starter and Pro you also get a custom CSS pane to override any rule, scoped to your signature block so it never bleeds into the rest of the email.",
  },
  {
    q: "Can I manage signatures for a whole team?",
    a: "On Pro, yes. Build a locked brand library, invite teammates, and push signature updates from one place. Change a tagline once and it deploys to every mailbox via Google Workspace or Microsoft 365. SSO, audit logs, and role-based permissions are included.",
  },
  {
    q: "If I cancel, do my signatures stop working?",
    a: "No. Your signatures are real HTML living inside your email client, not a hosted widget calling our servers. If you cancel, every signature you've already pasted keeps working forever. You can also export the raw HTML anytime and keep it. Cancellation drops you to the Free plan, no data is deleted.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? "open" : ""}`}>
          <button
            className="faq-q"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            {item.q}
            <span className="icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
