"use client";

import { useEffect } from "react";
import { X, SignOut, User as UserIcon } from "@phosphor-icons/react/dist/ssr";
import type { User } from "./ExportModal";

export function AccountPanel({
  user,
  onClose,
  onSignOut,
}: {
  user: NonNullable<User>;
  onClose: () => void;
  onSignOut: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="acc-title">
        <div className="drawer-header">
          <div className="drawer-title" id="acc-title">
            Account
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X weight="bold" size={16} />
          </button>
        </div>
        <div className="drawer-body">
          <div className="drawer-section">
            <h5>Profile</h5>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--ink)",
                  color: "var(--bg)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                {user.displayName[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{user.displayName}</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{user.email}</div>
              </div>
            </div>
            <div className="drawer-row">
              <span className="lbl">Name</span>
              <span className="val">{user.displayName}</span>
            </div>
            <div className="drawer-row">
              <span className="lbl">Email</span>
              <span className="val">{user.email}</span>
            </div>
            <div className="drawer-row">
              <span className="lbl">Account ID</span>
              <span className="val" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>
                sgy_{user.email.split("@")[0].slice(0, 8)}
              </span>
            </div>
          </div>

          <div className="drawer-section">
            <h5>Plan</h5>
            <div className="drawer-plan">
              <div>
                <div className="name">Free plan</div>
                <div className="price">2 signatures · 6 templates · 5 AI styles / mo</div>
              </div>
              <span className="badge">Active</span>
            </div>
            <button
              className="btn btn-accent"
              style={{ width: "100%", marginTop: 12, padding: 12 }}
              onClick={() => alert("Upgrade flow placeholder, coming soon.")}
            >
              Upgrade to Starter, $6 / mo
            </button>
          </div>

          <div className="drawer-section">
            <h5>Preferences</h5>
            <div className="drawer-row">
              <span className="lbl">Language</span>
              <span className="val">English</span>
            </div>
            <div className="drawer-row">
              <span className="lbl">Auto-save</span>
              <span className="val">On</span>
            </div>
            <div className="drawer-row">
              <span className="lbl">Email updates</span>
              <span className="val">Product only</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%", padding: 12 }}
            onClick={() => {
              onSignOut();
              onClose();
            }}
          >
            <SignOut weight="bold" size={14} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
