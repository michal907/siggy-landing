"use client";

import { useState } from "react";
import { LinkedinLogo, XLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";

type Client = "gmail" | "outlook" | "apple" | "proton" | "yahoo";

const CLIENT_META: Record<Client, { name: string; email: string; av: string; avColor: string }> = {
  gmail: { name: "Anna Wright", email: "anna@meridian.co · 2 min ago", av: "A", avColor: "#EA4335" },
  outlook: { name: "Anna Wright", email: "anna@meridian.co · Tue 10:24", av: "A", avColor: "#0078D4" },
  apple: { name: "Anna Wright", email: "anna@meridian.co · Today", av: "A", avColor: "#0E76C0" },
  proton: { name: "Anna Wright", email: "anna@meridian.co · Encrypted", av: "A", avColor: "#6D4AFF" },
  yahoo: { name: "Anna Wright", email: "anna@meridian.co · Today", av: "A", avColor: "#6001D2" },
};

export function EmailClients() {
  const [active, setActive] = useState<Client>("gmail");
  const meta = CLIENT_META[active];

  return (
    <div className="clients-card">
      <div className="clients-tabs">
        <button
          className={`clients-tab ${active === "gmail" ? "active" : ""}`}
          onClick={() => setActive("gmail")}
        >
          <svg viewBox="0 0 90 65" aria-hidden="true">
            <path d="M5 65h15V29.4L0 14.4v45.7C0 63 2.2 65 5 65z" fill="#4285F4" />
            <path d="M70 65h15c2.8 0 5-2.2 5-4.9V14.4l-20 15V65z" fill="#34A853" />
            <path d="M70 9.9v19.5l20-15V5c0-4.6-5.3-7.2-9-4.5L70 9.9z" fill="#FBBC04" />
            <path d="M20 29.4V9.9L45 28.6 70 9.9v19.5L45 48.1 20 29.4z" fill="#EA4335" />
            <path d="M0 5v9.4l20 15V9.9L9 .5C5.3-2.2 0 .4 0 5z" fill="#C5221F" />
          </svg>
          Gmail
        </button>
        <button
          className={`clients-tab ${active === "outlook" ? "active" : ""}`}
          onClick={() => setActive("outlook")}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M44 10H22v28h22c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2z" fill="#1976D2" />
            <path d="M22 10L46 10 46 18 22 18z" fill="#2196F3" />
            <path d="M22 18L34 28 46 18 46 38 22 38z" fill="#1E88E5" />
            <path d="M2 12l15-6v36L2 36c-1.1 0-2-.9-2-2V14c0-1.1.9-2 2-2z" fill="#1565C0" />
            <ellipse cx="9.5" cy="24" rx="5" ry="6.5" fill="none" stroke="#fff" strokeWidth="2" />
          </svg>
          Outlook
        </button>
        <button
          className={`clients-tab ${active === "apple" ? "active" : ""}`}
          onClick={() => setActive("apple")}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="m1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5DBBE7" />
                <stop offset="100%" stopColor="#0E76C0" />
              </linearGradient>
            </defs>
            <rect x="2" y="6" width="28" height="20" rx="4" fill="url(#m1)" />
            <path
              d="M4 9.5L16 18L28 9.5"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          Apple
        </button>
        <button
          className={`clients-tab ${active === "proton" ? "active" : ""}`}
          onClick={() => setActive("proton")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#6D4AFF" />
            <path d="M6 9l6 5 6-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          Proton
        </button>
        <button
          className={`clients-tab ${active === "yahoo" ? "active" : ""}`}
          onClick={() => setActive("yahoo")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#6001D2" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="bold"
              fontFamily="serif"
            >
              Y!
            </text>
          </svg>
          Yahoo
        </button>
      </div>
      <div className="clients-body">
        <div className="clients-email-head">
          <div className="clients-email-avatar" style={{ background: meta.avColor }}>
            {meta.av}
          </div>
          <div className="clients-email-from">
            <strong>{meta.name}</strong>
            <span>{meta.email}</span>
          </div>
        </div>
        <div className="clients-email-body">
          <p style={{ marginBottom: 14 }}>Hey, sending over the deck before our call.</p>
          <p>Let me know what works best for you.</p>
          <div className="clients-sig">
            <div className="clients-sig-name">Anna Wright</div>
            <div className="clients-sig-title">Head of Partnerships · Meridian Studio</div>
            <div className="clients-sig-contact">
              <a href="#">anna@meridian.co</a> · +1 415 555 0142 · <a href="#">meridian.co</a>
            </div>
            <div className="clients-sig-soc" aria-hidden>
              <span className="b"><LinkedinLogo weight="fill" /></span>
              <span className="b"><XLogo weight="fill" /></span>
              <span className="b"><InstagramLogo weight="fill" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
