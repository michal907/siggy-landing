import Link from "next/link";
import {
  Scales,
  Check,
  X,
  Minus,
  ArrowRight,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

const APP_HREF = "/app";

/* ────────────────────────────────────────────────────────────────
   CompetitorComparison — its own section.

   Header on top (pill + tight h2 + one-line lede + a small key for
   the check / partial / no glyphs), then the table beneath, then a
   centered footnote. Light surface so the cells read crisply after
   the cream Why-Siggy section above.
   ──────────────────────────────────────────────────────────────── */

type State = "yes" | "no" | "partial";

const ROWS: Array<{
  label: string;
  siggy: State;
  wisestamp: State;
  hubspot: State;
  canva: State;
}> = [
  { label: "Real HTML, not an image", siggy: "yes", wisestamp: "yes", hubspot: "yes", canva: "no" },
  { label: "Tested in Outlook desktop", siggy: "yes", wisestamp: "partial", hubspot: "yes", canva: "no" },
  { label: "Keeps working after you cancel", siggy: "yes", wisestamp: "no", hubspot: "yes", canva: "yes" },
  { label: "Custom CSS & brand controls", siggy: "yes", wisestamp: "partial", hubspot: "no", canva: "yes" },
  { label: "Team brand library & deploy", siggy: "yes", wisestamp: "yes", hubspot: "no", canva: "no" },
  { label: "Free forever tier", siggy: "yes", wisestamp: "no", hubspot: "yes", canva: "partial" },
];

export function CompetitorComparison() {
  return (
    <section className="lp-cmp" id="compare">
      <div className="container lp-section-narrow lp-cmp-head">
        <span className="lp-pill lp-pill-dark">
          <span className="lp-pill-ico" aria-hidden>
            <Scales weight="fill" size={11} />
          </span>
          Honest comparison
        </span>
        <h2 className="lp-section-title">
          Siggy vs.<br />
          <span className="lp-accent">the rest.</span>
        </h2>
        <p className="lp-section-sub">
          Same axes, same scoring, no straw men. The lines that
          actually matter for an email signature you&apos;ll paste once
          and rely on for years.
        </p>

        <ul className="lp-cmp-key" aria-label="Legend">
          <li>
            <span className="lp-cmp-key-chip lp-cmp-key-yes" aria-hidden>
              <Check weight="bold" size={11} />
            </span>
            Holds
          </li>
          <li>
            <span className="lp-cmp-key-chip lp-cmp-key-partial" aria-hidden>
              <Minus weight="bold" size={11} />
            </span>
            Partial
          </li>
          <li>
            <span className="lp-cmp-key-chip lp-cmp-key-no" aria-hidden>
              <X weight="bold" size={11} />
            </span>
            Breaks
          </li>
        </ul>
      </div>

      <div className="container">
        <div className="lp-cmp-tbl">
          <table>
            <thead>
              <tr>
                <th aria-label="Capability" scope="col" />
                <th scope="col" className="is-mine">
                  <span className="lp-cmp-tbl-name">Siggy</span>
                  <span className="lp-cmp-tbl-tier">Free &rarr; 4,99 €/mo</span>
                </th>
                <th scope="col">
                  <span className="lp-cmp-tbl-name">WiseStamp</span>
                  <span className="lp-cmp-tbl-tier">From $5.80/mo</span>
                </th>
                <th scope="col">
                  <span className="lp-cmp-tbl-name">HubSpot</span>
                  <span className="lp-cmp-tbl-tier">Free generator</span>
                </th>
                <th scope="col">
                  <span className="lp-cmp-tbl-name">Canva</span>
                  <span className="lp-cmp-tbl-tier">Pro $14.99/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <Mark state={row.siggy} mine />
                  <Mark state={row.wisestamp} />
                  <Mark state={row.hubspot} />
                  <Mark state={row.canva} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lp-cmp-foot">
          <p className="lp-cmp-foot-note">
            Based on each vendor&apos;s public pricing and product
            documentation, {new Date().getFullYear()}. We update this
            page if they do.
          </p>
          <Link href={APP_HREF} className="btn btn-accent lp-cmp-foot-cta">
            <Lightning weight="fill" size={13} />
            Start free
            <ArrowRight weight="bold" size={13} className="arr" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Mark({ state, mine }: { state: State; mine?: boolean }) {
  const label = state === "yes" ? "Holds" : state === "no" ? "Breaks" : "Partial";
  return (
    <td className={`lp-cmp-tbl-mark lp-cmp-tbl-mark-${state}${mine ? " is-mine" : ""}`}>
      <span aria-label={label} title={label}>
        {state === "yes" ? (
          <Check weight="bold" size={14} />
        ) : state === "no" ? (
          <X weight="bold" size={14} />
        ) : (
          <Minus weight="bold" size={14} />
        )}
      </span>
    </td>
  );
}
