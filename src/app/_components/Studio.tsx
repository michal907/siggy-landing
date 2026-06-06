"use client";

/* ────────────────────────────────────────────────────────────────
   Siggy Studio — in-browser visual editor.

   Activates with `?edit=1` URL param OR Cmd+Shift+E (Ctrl+Shift+E
   on non-Mac). In edit mode:

   - Hover any text element → outline + tag with its CSS path
   - Click a text element → it becomes contentEditable; type to change
   - Blur or Esc → commits the edit to localStorage
   - Edits persist across reloads (even outside edit mode), so the
     user can preview their copy on the live URL until they're ready
     to ship.
   - Floating toolbar at the bottom: edit count, Copy export, Reset,
     Exit. "Copy export" puts a markdown changeset on the clipboard
     that can be pasted to Claude to apply + deploy.
   ──────────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "siggy:studio:edits-v1";
const EDITABLE_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "span", "li", "a", "strong", "em", "small", "code", "blockquote",
  "dt", "dd", "td", "th",
]);

type Edit = {
  selector: string;
  prop: "text";
  before: string;
  after: string;
  ts: number;
};

type EditMap = Record<string, Edit>;

export function Studio() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [edits, setEdits] = useState<EditMap>({});
  const [hovered, setHovered] = useState<HTMLElement | null>(null);
  const [editingSel, setEditingSel] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const editsRef = useRef<EditMap>({});
  editsRef.current = edits;

  // Mount + load from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEdits(JSON.parse(raw));
    } catch {}
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") setActive(true);

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setActive((a) => !a);
      }
      if (e.key === "Escape") {
        const el = document.activeElement as HTMLElement | null;
        if (el && el.isContentEditable) el.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Persist
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
    } catch {}
  }, [edits, mounted]);

  // Apply persisted text edits to the DOM on every render (and on load).
  useEffect(() => {
    if (!mounted) return;
    Object.values(edits).forEach((edit) => {
      const el = safeQuery(edit.selector);
      if (el && el.textContent !== edit.after) {
        el.textContent = edit.after;
      }
    });
  }, [mounted, edits]);

  // Edit-mode listeners: hover + click
  useEffect(() => {
    if (!active) return;
    document.body.classList.add("studio-on");

    const onMove = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      if (t.closest("[data-studio]")) {
        setHovered(null);
        return;
      }
      const ed = nearestEditable(t);
      setHovered(ed);
    };
    const onLeave = () => setHovered(null);
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t || t.closest("[data-studio]")) return;
      const ed = nearestEditable(t);
      if (!ed) return;
      if (ed.isContentEditable) return;
      e.preventDefault();
      e.stopPropagation();
      beginEdit(ed);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("click", onClick, true);
    return () => {
      document.body.classList.remove("studio-on");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick, true);
      setHovered(null);
    };
  }, [active]);

  const beginEdit = useCallback((el: HTMLElement) => {
    const sel = cssPath(el);
    const before = el.textContent ?? "";
    el.contentEditable = "true";
    el.setAttribute("data-studio-editing", "1");
    el.focus();
    // place caret at end
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const s = window.getSelection();
    s?.removeAllRanges();
    s?.addRange(range);

    setEditingSel(sel);

    const finish = () => {
      el.contentEditable = "false";
      el.removeAttribute("data-studio-editing");
      const after = el.textContent ?? "";
      el.removeEventListener("blur", finish);
      el.removeEventListener("keydown", onKey);
      setEditingSel(null);
      if (after === before) return;
      const original = editsRef.current[sel]?.before ?? before;
      setEdits((prev) => ({
        ...prev,
        [sel]: { selector: sel, prop: "text", before: original, after, ts: Date.now() },
      }));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      }
    };
    el.addEventListener("blur", finish);
    el.addEventListener("keydown", onKey);
  }, []);

  const copyExport = useCallback(async () => {
    const list = Object.values(edits);
    if (!list.length) {
      setToast("Nothing to export yet");
      return;
    }
    const md = buildMarkdown(list);
    try {
      await navigator.clipboard.writeText(md);
      setToast(`Copied ${list.length} edit${list.length === 1 ? "" : "s"} to clipboard`);
    } catch {
      setToast("Copy failed — try Cmd+C manually");
    }
  }, [edits]);

  const reset = useCallback(() => {
    if (!confirm("Discard all local edits and reload?")) return;
    setEdits({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  if (!mounted) return null;
  const editCount = Object.keys(edits).length;
  const dirty = editCount > 0;

  // Persistent badge when edits exist but not in edit mode
  if (!active) {
    if (!dirty) return null;
    return (
      <button
        data-studio
        className="studio-badge"
        onClick={() => setActive(true)}
        title="Open Siggy Studio"
      >
        <span className="studio-badge-dot" aria-hidden />
        {editCount} local edit{editCount === 1 ? "" : "s"}
      </button>
    );
  }

  return (
    <>
      {/* Hover outline */}
      {hovered && !editingSel ? (
        <HoverOverlay el={hovered} />
      ) : null}

      {/* Toolbar */}
      <div data-studio className="studio-bar">
        <span className="studio-brand">
          <span className="studio-brand-dot" aria-hidden />
          Siggy Studio
        </span>
        <span className="studio-sep" aria-hidden />
        <span className="studio-hint">
          Click text to edit · <kbd>Esc</kbd> to confirm · <kbd>⌘⇧E</kbd> to toggle
        </span>
        <span className="studio-grow" />
        <span className="studio-count" data-dirty={dirty ? "1" : "0"}>
          {editCount} edit{editCount === 1 ? "" : "s"}
        </span>
        <button onClick={copyExport} className="studio-btn studio-btn-accent">
          Copy export
        </button>
        <button onClick={reset} className="studio-btn studio-btn-ghost">
          Reset
        </button>
        <button onClick={() => setActive(false)} className="studio-btn studio-btn-ghost">
          Exit
        </button>
      </div>

      {toast ? <div data-studio className="studio-toast">{toast}</div> : null}
    </>
  );
}

/* ── Hover outline drawn from the element's bounding rect ──── */
function HoverOverlay({ el }: { el: HTMLElement }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => {
    const update = () => setRect(el.getBoundingClientRect());
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [el]);
  if (!rect) return null;
  const tag = el.tagName.toLowerCase();
  return (
    <div
      data-studio
      className="studio-hover"
      style={{
        top: rect.top - 2,
        left: rect.left - 2,
        width: rect.width + 4,
        height: rect.height + 4,
      }}
    >
      <span className="studio-hover-tag">{tag}</span>
    </div>
  );
}

/* ──────────────── helpers ──────────────── */

function safeQuery(selector: string): HTMLElement | null {
  try {
    return document.querySelector(selector) as HTMLElement | null;
  } catch {
    return null;
  }
}

function nearestEditable(target: HTMLElement): HTMLElement | null {
  let cur: HTMLElement | null = target;
  while (cur && cur !== document.body) {
    const tag = cur.tagName.toLowerCase();
    if (EDITABLE_TAGS.has(tag) && hasOnlyTextChildren(cur)) return cur;
    cur = cur.parentElement;
  }
  return null;
}

function hasOnlyTextChildren(el: HTMLElement): boolean {
  // Allow elements whose visible content is purely text (or has a few
  // inline children that are also text-only). Strict version: every
  // descendant element is in EDITABLE_TAGS and only contains text.
  // Simpler version: if every direct child is a text node, accept.
  let allText = true;
  el.childNodes.forEach((n) => {
    if (n.nodeType === Node.ELEMENT_NODE) {
      const child = n as HTMLElement;
      const tag = child.tagName.toLowerCase();
      if (!EDITABLE_TAGS.has(tag)) {
        allText = false;
        return;
      }
      // SVGs, IMGs etc. break editing
      if (tag === "svg" || tag === "img" || tag === "video" || tag === "button" || tag === "input") {
        allText = false;
      }
    }
  });
  // Require at least one text node so we have something to edit
  const hasText = Array.from(el.childNodes).some(
    (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim().length > 0,
  );
  return allText && hasText;
}

function cssPath(el: Element): string {
  if (!(el instanceof Element)) return "";
  const path: string[] = [];
  let cur: Element | null = el;
  while (cur && cur.nodeType === Node.ELEMENT_NODE) {
    const node: Element = cur;
    let seg = node.nodeName.toLowerCase();
    if (node.id) {
      seg += `#${cssEscape(node.id)}`;
      path.unshift(seg);
      break;
    }
    const parent: Element | null = node.parentElement;
    if (parent) {
      const sib = Array.from(parent.children).filter((c) => c.nodeName === node.nodeName);
      if (sib.length > 1) {
        const i = sib.indexOf(node) + 1;
        seg += `:nth-of-type(${i})`;
      }
    }
    path.unshift(seg);
    cur = parent;
    if (path.length > 6) break;
  }
  return path.join(" > ");
}

function cssEscape(s: string): string {
  return s.replace(/[^a-zA-Z0-9_-]/g, (c) => `\\${c}`);
}

function buildMarkdown(edits: Edit[]): string {
  const date = new Date().toISOString();
  const lines: string[] = [];
  lines.push(`# Siggy Studio · changeset`);
  lines.push(``);
  lines.push(`Generated ${date} · ${edits.length} edit(s)`);
  lines.push(``);
  edits.forEach((e, i) => {
    lines.push(`## ${i + 1}. \`${e.selector}\``);
    lines.push(``);
    lines.push(`- **Before:** ${quote(e.before)}`);
    lines.push(`- **After:**  ${quote(e.after)}`);
    lines.push(``);
  });
  lines.push(`---`);
  lines.push(`Please apply these text changes to the source and deploy.`);
  return lines.join("\n");
}

function quote(s: string): string {
  return s.length > 200 ? `"${s.slice(0, 200)}…"` : `"${s}"`;
}
