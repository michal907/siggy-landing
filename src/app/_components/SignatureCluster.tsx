"use client";

import { useEffect, useState } from "react";
import {
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  Lightning,
  MagnifyingGlass,
  Star,
  EnvelopeSimple,
  Phone,
  DeviceMobile,
  GlobeSimple,
} from "@phosphor-icons/react/dist/ssr";

/* ────────────────────────────────────────────────────────────────
   SignatureCluster — three square cards stacked, each rendering a
   real signature from the template gallery inside the email client
   it'd typically land in: Gmail, Outlook, Apple Mail. Cycle every
   3.5s. 1:1 aspect ratio. Email-safe fonts inside every signature.
   ──────────────────────────────────────────────────────────────── */
export function SignatureCluster() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % 3);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const cards = [
    { id: "gmail-anna", tilt: -3, render: <GmailCard /> },
    { id: "outlook-maya", tilt: 5, render: <OutlookCard /> },
    { id: "apple-marek", tilt: -6, render: <AppleMailCard /> },
  ];

  return (
    <div className="lp-cluster lp-cluster-stack" aria-hidden="true">
      {cards.map((card, i) => {
        const pos = (i - active + cards.length) % cards.length; // 0 = front
        return (
          <div
            key={card.id}
            className="lp-cluster-card lp-cluster-stack-card"
            data-pos={pos}
            style={{ "--tilt": `${card.tilt}deg` } as React.CSSProperties}
          >
            {card.render}
          </div>
        );
      })}

      {/* Floating "30+ templates" badge */}
      <div className="lp-cluster-badge" aria-hidden="true">
        <Lightning weight="fill" size={12} />
        30+ templates
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Card 1: Gmail + Classic Pro signature (Anna Wright)
   ════════════════════════════════════════════════════════════════ */
function GmailCard() {
  return (
    <div className="ec ec-gmail">
      <div className="ec-chrome">
        <div className="ec-chrome-left">
          <span className="ec-glyph ec-glyph-gmail" aria-hidden>M</span>
          <span className="ec-app-name">Gmail</span>
        </div>
        <div className="ec-chrome-right">
          <MagnifyingGlass weight="regular" size={11} />
          <span className="ec-chrome-avatar" aria-hidden>S</span>
        </div>
      </div>
      <div className="ec-thread">
        <div className="ec-thread-row">
          <Star weight="fill" size={10} />
          <span className="ec-thread-from">Anna Wright</span>
          <span className="ec-thread-time">10:42 AM</span>
        </div>
        <div className="ec-thread-subj">Re: Q3 partnership review</div>
      </div>
      <div className="ec-body">
        <p>Marek, thanks for sending the deck. Looks ready to ship.</p>
        <p className="ec-signoff">Best,</p>
        <ClassicProMini />
      </div>
    </div>
  );
}

/* Mini Classic Pro signature — photo + 1px navy bar + body */
function ClassicProMini() {
  return (
    <div className="tplm tplm-classic">
      <div className="tplm-classic-row">
        <span className="tplm-av tplm-av-round">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&q=85&auto=format&fit=crop&crop=faces"
            alt=""
            width={48}
            height={48}
          />
        </span>
        <span className="tplm-classic-bar" aria-hidden />
        <div className="tplm-classic-body">
          <div className="tplm-classic-name">Anna Wright</div>
          <div className="tplm-classic-meta">
            Senior Account Manager
            <br />
            Meridian Studio, New York
          </div>
          <div className="tplm-classic-rule" aria-hidden />
          <div className="tplm-classic-rows">
            <div>
              <EnvelopeSimple weight="regular" size={9} />
              anna.wright@meridian.co
            </div>
            <div>
              <DeviceMobile weight="regular" size={9} />
              +1 (415) 555 0142
            </div>
          </div>
          <div className="tplm-classic-social">
            <span className="tplm-soc-chip" style={{ background: "#1a3a5c" }}>
              <LinkedinLogo weight="fill" />
            </span>
            <span className="tplm-soc-chip" style={{ background: "#1a3a5c" }}>
              <XLogo weight="fill" />
            </span>
            <span className="tplm-soc-chip" style={{ background: "#1a3a5c" }}>
              <InstagramLogo weight="fill" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Card 2: Outlook + Bold Realtor signature (Maya Torres)
   ════════════════════════════════════════════════════════════════ */
function OutlookCard() {
  return (
    <div className="ec ec-outlook">
      <div className="ec-chrome">
        <div className="ec-chrome-left">
          <span className="ec-glyph ec-glyph-outlook" aria-hidden>O</span>
          <span className="ec-app-name">Outlook</span>
        </div>
        <div className="ec-chrome-right">
          <span className="ec-chrome-folder">Focused Inbox</span>
        </div>
      </div>
      <div className="ec-thread">
        <div className="ec-thread-row">
          <span className="ec-thread-flag" aria-hidden />
          <span className="ec-thread-from">Maya Torres</span>
          <span className="ec-thread-time">Wed 9:08</span>
        </div>
        <div className="ec-thread-subj">RE: 142 Brickell offer</div>
      </div>
      <div className="ec-body">
        <p>Jordan, send me the disclosure and I&apos;ll review tonight.</p>
        <p className="ec-signoff">Best,</p>
        <BoldRealtorMini />
      </div>
    </div>
  );
}

/* Mini Bold Realtor signature */
function BoldRealtorMini() {
  return (
    <div className="tplm tplm-bold">
      <div className="tplm-bold-row">
        <span className="tplm-av tplm-av-square">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&q=85&auto=format&fit=crop&crop=faces"
            alt=""
            width={48}
            height={48}
          />
        </span>
        <div className="tplm-bold-body">
          <div className="tplm-bold-name">MAYA TORRES</div>
          <div className="tplm-bold-title">
            VP of Sales · <span className="tplm-bold-firm">Vertex Realty Miami</span>
          </div>
          <div className="tplm-bold-rule" aria-hidden />
          <div className="tplm-bold-phone">
            <Phone weight="fill" size={10} />
            +1 (305) 555 0188
          </div>
          <div className="tplm-bold-email">
            <EnvelopeSimple weight="regular" size={9} />
            maya@vertexrealty.com
          </div>
        </div>
      </div>
      <div className="tplm-bold-foot">
        <span className="tplm-bold-license">FL LIC #SL3441290</span>
        <div className="tplm-bold-social">
          <span className="tplm-soc-chip" style={{ background: "#7a2942" }}>
            <LinkedinLogo weight="fill" />
          </span>
          <span className="tplm-soc-chip" style={{ background: "#7a2942" }}>
            <InstagramLogo weight="fill" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Card 3: Apple Mail + Counsel Centered signature (Dr. Marek Tóth)
   ════════════════════════════════════════════════════════════════ */
function AppleMailCard() {
  return (
    <div className="ec ec-apple">
      <div className="ec-chrome">
        <div className="ec-chrome-left">
          <span className="ec-glyph ec-glyph-apple" aria-hidden>A</span>
          <span className="ec-app-name">Inbox</span>
          <span className="ec-app-sub">iCloud</span>
        </div>
        <div className="ec-chrome-right">
          <span className="ec-chrome-count">12</span>
        </div>
      </div>
      <div className="ec-thread">
        <div className="ec-thread-row">
          <span className="ec-thread-blue" aria-hidden />
          <span className="ec-thread-from">Dr. Marek Tóth</span>
          <span className="ec-thread-time">Yesterday</span>
        </div>
        <div className="ec-thread-subj">Tax counsel · clause 14.2</div>
      </div>
      <div className="ec-body">
        <p>Anna, the amendment is acceptable. Proceeding to sign.</p>
        <p className="ec-signoff">Best regards,</p>
        <CounselMini />
      </div>
    </div>
  );
}

/* Mini Counsel Centered signature */
function CounselMini() {
  return (
    <div className="tplm tplm-counsel">
      <span className="tplm-av tplm-av-round tplm-av-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&q=85&auto=format&fit=crop&crop=faces"
          alt=""
          width={42}
          height={42}
        />
      </span>
      <div className="tplm-counsel-name">Dr. Marek Tóth</div>
      <div className="tplm-counsel-title">Senior Tax Counsel</div>
      <div className="tplm-counsel-firm">Northwave Legal, London</div>
      <div className="tplm-counsel-rule" aria-hidden />
      <div className="tplm-counsel-rows">
        <div>
          <EnvelopeSimple weight="regular" size={9} />
          marek@northwave.legal
        </div>
        <div>
          <Phone weight="regular" size={9} />
          +44 20 7946 0382
        </div>
        <div>
          <GlobeSimple weight="regular" size={9} />
          northwave.legal
        </div>
      </div>
    </div>
  );
}
