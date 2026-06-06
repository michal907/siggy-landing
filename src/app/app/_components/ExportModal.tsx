"use client";

import { useEffect, useState } from "react";
import {
  X,
  Copy,
  Check,
  Lock,
  Sparkle,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

export type User = { displayName: string; email: string } | null;

export function ExportModal({
  html,
  user,
  onSignup,
  onClose,
  onToast,
}: {
  html: string;
  user: User;
  onSignup: (user: NonNullable<User>) => void;
  onClose: () => void;
  onToast: (msg: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupErr, setSignupErr] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = html;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    onToast("HTML copied to clipboard");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErr(null);
    if (!signupName.trim()) return setSignupErr("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) return setSignupErr("Please enter a valid email.");
    onSignup({ displayName: signupName.trim(), email: signupEmail.trim().toLowerCase() });
    onToast("Welcome to Siggy");
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="export-title">
        <div className="modal-header">
          <div>
            <div className="modal-title" id="export-title">
              {user ? "Export your signature" : "One more step. Free, no card."}
            </div>
            <div className="modal-sub">
              {user
                ? `Signed in as ${user.displayName}. Copy the HTML below and paste it into your email client.`
                : "Exports are gated behind a free Siggy account. Takes 10 seconds."}
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X weight="bold" size={16} />
          </button>
        </div>

        <div className="modal-body">
          {!user ? (
            <>
              <div className="gate-card">
                <div className="gate-icon">
                  <Lock weight="fill" size={20} />
                </div>
                <div className="gate-title">Create your free account</div>
                <div className="gate-sub">
                  Save your signatures, sync across devices, and export to every email client. We&apos;ll never spam
                  you.
                </div>
                <form className="gate-form" onSubmit={handleSignup}>
                  <div className="app-field">
                    <label htmlFor="gate-name">Your name</label>
                    <input
                      id="gate-name"
                      type="text"
                      autoFocus
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Anna Wright"
                    />
                  </div>
                  <div className="app-field">
                    <label htmlFor="gate-email">Work email</label>
                    <input
                      id="gate-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="anna@meridian.co"
                    />
                  </div>
                  {signupErr && (
                    <div style={{ fontSize: 13, color: "var(--accent)" }}>{signupErr}</div>
                  )}
                  <button type="submit" className="btn btn-accent" style={{ marginTop: 4 }}>
                    <Sparkle weight="fill" size={14} />
                    Create account &amp; export
                  </button>
                </form>
                <ul className="gate-perks">
                  <li>
                    <CheckCircle weight="fill" size={14} />
                    <span>Free forever, no credit card</span>
                  </li>
                  <li>
                    <CheckCircle weight="fill" size={14} />
                    <span>Your signatures sync across devices</span>
                  </li>
                  <li>
                    <CheckCircle weight="fill" size={14} />
                    <span>One-click export to every email client</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <pre className="code-block">{html}</pre>
              <div className="modal-actions">
                {copied && (
                  <span className="modal-toast">
                    <Check weight="bold" size={14} />
                    Copied to clipboard
                  </span>
                )}
                <button className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
                <button className="btn btn-accent" onClick={handleCopy}>
                  <Copy weight="bold" size={14} />
                  Copy HTML
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
