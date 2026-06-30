"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: { en: "Command palette", ar: "لوحة الأوامر" } },
  { keys: ["?"], label: { en: "Show this help", ar: "عرض هذه المساعدة" } },
  { keys: ["Esc"], label: { en: "Close dialog", ar: "إغلاق" } },
  { keys: ["↑", "↓"], label: { en: "Navigate lists", ar: "تنقل في القوائم" } },
  { keys: ["↵"], label: { en: "Select", ar: "اختيار" } },
  { keys: ["←", "→"], label: { en: "Gallery navigation", ar: "تنقل المعرض" } },
];

export function ShortcutsHelp({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in a field
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={t({ en: "Keyboard shortcuts", ar: "اختصارات لوحة المفاتيح" }, locale)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[var(--r-2xl)] border border-hairline glass shadow-2xl animate-rise-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">
            {t({ en: "Keyboard shortcuts", ar: "اختصارات لوحة المفاتيح" }, locale)}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-ink-faint hover:text-ink transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="divide-y divide-[var(--hairline)]">
          {SHORTCUTS.map((s, i) => (
            <li key={i} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-ink-soft">{t(s.label, locale)}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k, j) => (
                  <kbd
                    key={j}
                    className="rounded border border-hairline bg-white/[0.03] px-1.5 py-0.5 font-mono text-[0.7rem] text-ink-muted"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t border-hairline px-5 py-3 text-center font-mono text-[0.7rem] text-ink-faint">
          {t({ en: "Press ? anytime to reopen", ar: "اضغط ? لإعادة الفتح" }, locale)}
        </div>
      </div>
    </div>
  );
}
