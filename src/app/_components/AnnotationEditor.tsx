"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * AnnotationEditor — a client-side feedback tool.
 *
 * Activation:
 *   - URL param: ?edit=1 (sticks across reloads via localStorage key
 *     `siggy:edit-mode`)
 *   - Keyboard: Cmd/Ctrl + Shift + E (toggles)
 *
 * What it does:
 *   - Lets you point at any element on the page and pin a note to it
 *   - Highlights the element on hover while you're picking
 *   - Persists notes in localStorage (`siggy:annotations`)
 *   - Lists every note in a side panel
 *   - Exports the whole batch as markdown that you can paste back
 *     to the assistant as a single message
 *
 * Lives in the root layout but renders nothing for regular visitors —
 * the gate (URL param + keyboard) keeps it invisible by default.
 */
type Annotation = {
  id: string;
  note: string;
  selector: string;
  label: string;
  text: string;
  url: string;
  pathname: string;
  rect: { x: number; y: number; width: number; height: number };
  pageHeight: number;
  timestamp: number;
};

const LS_ACTIVE = "siggy:edit-mode";
const LS_NOTES = "siggy:annotations";

export function AnnotationEditor() {
  const [active, setActive] = useState(false);
  const [picking, setPicking] = useState(false);
  const [hoverEl, setHoverEl] = useState<Element | null>(null);
  const [pendingEl, setPendingEl] = useState<Element | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const draftInputRef = useRef<HTMLTextAreaElement | null>(null);

  /* ── Activation gate ─────────────────────────────────────── */
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlOn = url.searchParams.get("edit") === "1";
    const stored = localStorage.getItem(LS_ACTIVE) === "1";
    if (urlOn || stored) setActive(true);
    if (urlOn) localStorage.setItem(LS_ACTIVE, "1");

    const onKey = (e: KeyboardEvent) => {
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        setActive((a) => {
          const next = !a;
          localStorage.setItem(LS_ACTIVE, next ? "1" : "0");
          return next;
        });
      }
      if (e.key === "Escape") {
        if (pendingEl) {
          setPendingEl(null);
          setDraftNote("");
        } else if (picking) {
          setPicking(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picking, pendingEl]);

  /* ── Load annotations ────────────────────────────────────── */
  useEffect(() => {
    if (!active) return;
    try {
      const raw = localStorage.getItem(LS_NOTES);
      if (raw) setAnnotations(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, [active]);

  /* ── Persist annotations ─────────────────────────────────── */
  useEffect(() => {
    if (!active) return;
    try {
      localStorage.setItem(LS_NOTES, JSON.stringify(annotations));
    } catch {
      /* noop */
    }
  }, [annotations, active]);

  /* ── Picking logic ───────────────────────────────────────── */
  const findTargetable = useCallback((el: Element | null): Element | null => {
    let cur: Element | null = el;
    while (cur) {
      // Skip our own UI
      if (cur.closest("[data-annot-ui]")) return null;
      if (cur === document.body || cur === document.documentElement) return cur;
      return cur;
    }
    return null;
  }, []);

  useEffect(() => {
    if (!active || !picking) return;
    const onMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const t = findTargetable(target);
      if (t && t !== hoverEl) setHoverEl(t);
    };
    const onClick = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const t = findTargetable(target);
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      setPendingEl(t);
      setPicking(false);
      setHoverEl(null);
      setDraftNote("");
      setTimeout(() => draftInputRef.current?.focus(), 50);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick, true);
    };
  }, [active, picking, hoverEl, findTargetable]);

  /* ── Save note ───────────────────────────────────────────── */
  const saveDraft = useCallback(() => {
    if (!pendingEl || !draftNote.trim()) return;
    const rect = pendingEl.getBoundingClientRect();
    const ann: Annotation = {
      id: Math.random().toString(36).slice(2, 10),
      note: draftNote.trim(),
      selector: cssPath(pendingEl),
      label: humanLabel(pendingEl),
      text: pendingEl.textContent?.trim().slice(0, 120) ?? "",
      url: window.location.href,
      pathname: window.location.pathname,
      rect: {
        x: Math.round(rect.left + window.scrollX),
        y: Math.round(rect.top + window.scrollY),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
      pageHeight: document.documentElement.scrollHeight,
      timestamp: Date.now(),
    };
    setAnnotations((arr) => [...arr, ann]);
    setPendingEl(null);
    setDraftNote("");
  }, [pendingEl, draftNote]);

  const removeAnnotation = (id: string) => {
    setAnnotations((arr) => arr.filter((a) => a.id !== id));
  };

  const clearAll = () => {
    if (confirm("Delete all notes?")) {
      setAnnotations([]);
    }
  };

  const exportText = formatMarkdown(annotations);

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      alert(`Copied ${annotations.length} note(s) to clipboard. Paste into a new message.`);
    } catch {
      // fallback: select the textarea
      const ta = document.getElementById("annot-export-ta") as HTMLTextAreaElement | null;
      ta?.select();
      document.execCommand("copy");
    }
  };

  if (!active) return null;

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div data-annot-ui="" className="annot-root">
      {/* Toolbar */}
      <div className="annot-toolbar" data-annot-ui="">
        <span className="annot-toolbar-brand">
          <span className="annot-toolbar-dot" /> Edit mode
        </span>

        <button
          type="button"
          className={`annot-btn${picking ? " is-on" : ""}`}
          onClick={() => {
            setPicking((p) => !p);
            setPendingEl(null);
            setDraftNote("");
          }}
        >
          {picking ? "Pick: ON" : "Pick element"}
        </button>

        <button
          type="button"
          className="annot-btn"
          onClick={() => setPanelOpen((v) => !v)}
        >
          Notes ({annotations.length})
        </button>

        <button
          type="button"
          className="annot-btn annot-btn-accent"
          onClick={() => setExportOpen(true)}
          disabled={annotations.length === 0}
        >
          Export
        </button>

        <button
          type="button"
          className="annot-btn annot-btn-ghost"
          onClick={() => {
            setActive(false);
            localStorage.setItem(LS_ACTIVE, "0");
          }}
          title="Exit edit mode (Cmd+Shift+E)"
        >
          ×
        </button>
      </div>

      {/* Hover highlight while picking */}
      {picking && hoverEl ? <HoverHighlight el={hoverEl} /> : null}

      {/* Existing annotation pins on the page */}
      {annotations
        .filter((a) => a.pathname === window.location.pathname)
        .map((a, i) => (
          <AnnotationPin key={a.id} ann={a} index={i + 1} onRemove={() => removeAnnotation(a.id)} />
        ))}

      {/* Draft note input */}
      {pendingEl ? (
        <DraftNoteInput
          el={pendingEl}
          value={draftNote}
          onChange={setDraftNote}
          onSave={saveDraft}
          onCancel={() => {
            setPendingEl(null);
            setDraftNote("");
          }}
          inputRef={draftInputRef}
        />
      ) : null}

      {/* Notes side panel */}
      {panelOpen ? (
        <div className="annot-panel" data-annot-ui="">
          <div className="annot-panel-head">
            <strong>{annotations.length} note(s)</strong>
            <button type="button" className="annot-btn-ghost" onClick={() => setPanelOpen(false)}>×</button>
          </div>
          <div className="annot-panel-body">
            {annotations.length === 0 ? (
              <p className="annot-panel-empty">No notes yet. Click <strong>Pick element</strong>, then click anything on the page.</p>
            ) : (
              annotations.map((a, i) => (
                <div key={a.id} className="annot-row">
                  <span className="annot-row-num">{i + 1}</span>
                  <div className="annot-row-text">
                    <div className="annot-row-label">{a.label}</div>
                    <div className="annot-row-note">{a.note}</div>
                  </div>
                  <button type="button" className="annot-row-x" onClick={() => removeAnnotation(a.id)}>×</button>
                </div>
              ))
            )}
          </div>
          {annotations.length > 0 ? (
            <div className="annot-panel-foot">
              <button type="button" className="annot-btn annot-btn-ghost" onClick={clearAll}>Clear all</button>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Export modal */}
      {exportOpen ? (
        <div className="annot-modal-backdrop" data-annot-ui="" onClick={() => setExportOpen(false)}>
          <div className="annot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="annot-modal-head">
              <strong>Export annotations</strong>
              <button type="button" className="annot-btn-ghost" onClick={() => setExportOpen(false)}>×</button>
            </div>
            <p className="annot-modal-hint">
              Copy this markdown and paste it into a new message to me.
            </p>
            <textarea id="annot-export-ta" className="annot-modal-text" readOnly value={exportText} />
            <div className="annot-modal-foot">
              <button type="button" className="annot-btn annot-btn-accent" onClick={copyExport}>
                Copy to clipboard
              </button>
              <span className="annot-modal-count">{annotations.length} note(s)</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

function HoverHighlight({ el }: { el: Element }) {
  const r = el.getBoundingClientRect();
  return (
    <div
      data-annot-ui=""
      className="annot-hover"
      style={{
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      }}
    />
  );
}

function AnnotationPin({
  ann,
  index,
  onRemove,
}: {
  ann: Annotation;
  index: number;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      data-annot-ui=""
      className={`annot-pin${expanded ? " is-open" : ""}`}
      style={{ top: ann.rect.y, left: ann.rect.x + ann.rect.width - 14 }}
    >
      <button
        type="button"
        className="annot-pin-dot"
        onClick={() => setExpanded((v) => !v)}
        title={ann.label}
      >
        {index}
      </button>
      {expanded ? (
        <div className="annot-pin-card">
          <div className="annot-pin-label">{ann.label}</div>
          <div className="annot-pin-note">{ann.note}</div>
          <div className="annot-pin-foot">
            <button type="button" className="annot-btn annot-btn-ghost" onClick={onRemove}>Delete</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DraftNoteInput({
  el,
  value,
  onChange,
  onSave,
  onCancel,
  inputRef,
}: {
  el: Element;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  inputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}) {
  const r = el.getBoundingClientRect();
  return (
    <div
      data-annot-ui=""
      className="annot-draft"
      style={{
        top: r.top + window.scrollY + r.height + 8,
        left: r.left + window.scrollX,
      }}
    >
      <div className="annot-draft-label">{humanLabel(el)}</div>
      <textarea
        ref={inputRef}
        className="annot-draft-input"
        rows={3}
        value={value}
        placeholder="What should change here?"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onSave();
        }}
      />
      <div className="annot-draft-foot">
        <button type="button" className="annot-btn annot-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="annot-btn annot-btn-accent" onClick={onSave} disabled={!value.trim()}>
          Save (⌘ Enter)
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

function humanLabel(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const cls = (el as HTMLElement).className?.toString().split(" ").filter(Boolean).slice(0, 2).join(".");
  const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
  const text = el.textContent?.trim().slice(0, 32).replace(/\s+/g, " ") ?? "";
  const textPart = text ? ` "${text}${text.length === 32 ? "…" : ""}"` : "";
  const sel = id || (cls ? `.${cls}` : tag);
  return `${sel}${textPart}`;
}

function cssPath(el: Element): string {
  if (!(el instanceof Element)) return "";
  const path: string[] = [];
  let cur: Element | null = el;
  while (cur && cur.nodeType === Node.ELEMENT_NODE && path.length < 5) {
    let seg = cur.nodeName.toLowerCase();
    if ((cur as HTMLElement).id) {
      seg = `#${(cur as HTMLElement).id}`;
      path.unshift(seg);
      break;
    }
    const cls = (cur as HTMLElement).className?.toString().split(" ").filter(Boolean).slice(0, 2);
    if (cls && cls.length) seg += `.${cls.join(".")}`;
    const parent: Element | null = cur.parentElement;
    if (parent) {
      const node: Element = cur;
      const siblings = Array.from(parent.children).filter((s) => s.nodeName === node.nodeName);
      if (siblings.length > 1) {
        seg += `:nth-of-type(${siblings.indexOf(node) + 1})`;
      }
    }
    path.unshift(seg);
    cur = parent;
  }
  return path.join(" > ");
}

function formatMarkdown(arr: Annotation[]): string {
  if (arr.length === 0) return "No annotations.";
  const grouped: Record<string, Annotation[]> = {};
  for (const a of arr) {
    grouped[a.pathname] = grouped[a.pathname] || [];
    grouped[a.pathname].push(a);
  }
  const lines: string[] = [];
  lines.push(`# Page annotations (${arr.length})`);
  lines.push("");
  for (const path of Object.keys(grouped)) {
    lines.push(`## Page: \`${path}\``);
    lines.push("");
    grouped[path].forEach((a, i) => {
      lines.push(`### ${i + 1}. ${a.label}`);
      lines.push(`- Selector: \`${a.selector}\``);
      if (a.text) lines.push(`- Text: ${JSON.stringify(a.text)}`);
      lines.push(`- Position: top ${a.rect.y}px, left ${a.rect.x}px, ${a.rect.width}×${a.rect.height}px (page ${a.pageHeight}px tall)`);
      lines.push("");
      lines.push(a.note);
      lines.push("");
    });
  }
  return lines.join("\n");
}
