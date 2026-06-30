"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, FileText, Mail, Github, Linkedin, Code, Home, Layers, Briefcase, Cpu, Send } from "lucide-react";
import { PROJECTS_LIST } from "@/data/projects";
import { CONTACT_LINKS } from "@/data/contact";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon: React.ElementType;
  action: () => void;
  group: string;
}

export function CommandPalette({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const nav = PORTFOLIO_DATA.navigation;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string, id: string) => {
      track({ eventName: "command_palette_used", category: "navigation", props: { item: id } });
      close();
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(href);
      }
    },
    [close, router],
  );

  // Build commands
  const commands: CommandItem[] = [
    { id: "home", label: t({ en: "Go to top", ar: "إلى الأعلى" }, locale), icon: Home, group: t({ en: "Navigation", ar: "التنقل" }, locale), action: () => go("#hero", "home") },
    { id: "about", label: t(nav.about, locale), icon: FileText, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#about", "about") },
    { id: "projects", label: t(nav.projects, locale), icon: Briefcase, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#projects", "projects") },
    { id: "proof", label: t({ en: "Proof", ar: "الإثبات" }, locale), icon: Layers, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#proof", "proof") },
    { id: "systems", label: t({ en: "Systems lab", ar: "المختبر" }, locale), icon: Cpu, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#systems", "systems") },
    { id: "experience", label: t(nav.experience, locale), icon: Code, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#experience", "experience") },
    { id: "stack", label: t(nav.stack, locale), icon: Layers, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#stack", "stack") },
    { id: "contact", label: t(nav.contact, locale), icon: Mail, group: t({ en: "Sections", ar: "الأقسام" }, locale), action: () => go("#contact", "contact") },
    ...PROJECTS_LIST.map((p) => ({
      id: `work-${p.id}`,
      label: t(p.title, locale),
      hint: t({ en: "Case study", ar: "دراسة حالة" }, locale),
      icon: Briefcase,
      group: t({ en: "Work", ar: "الأعمال" }, locale),
      action: () => go(`/${locale}/work/${p.id}`, `work-${p.id}`),
    })),
    ...CONTACT_LINKS.map((c) => ({
      id: `contact-${c.id}`,
      label: t(c.label, locale),
      hint: c.href.replace(/^mailto:/, "").replace(/^https?:\/\//, ""),
      icon: c.type === "email" ? Mail : c.type === "github" ? Github : c.type === "linkedin" ? Linkedin : FileText,
      group: t({ en: "Connect", ar: "تواصل" }, locale),
      action: () => go(c.href, `contact-${c.id}`),
    })),
  ];

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.hint?.toLowerCase().includes(query.toLowerCase()))
    : commands;

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      track({ eventName: "command_palette_opened", category: "navigation" });
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      filtered[active].action();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-hairline glass px-3 py-2 text-xs text-ink-muted transition-colors hover:text-ink md:flex"
        aria-label={t({ en: "Open command palette", ar: "فتح لوحة الأوامر" }, locale)}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="font-mono">⌘K</span>
      </button>
    );
  }

  // Group results
  const groups: Record<string, CommandItem[]> = {};
  filtered.forEach((c) => {
    if (!groups[c.group]) groups[c.group] = [];
    groups[c.group].push(c);
  });
  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[var(--r-2xl)] border border-hairline glass shadow-2xl animate-rise-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search className="h-4 w-4 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t(
              { en: "Search sections, projects, links…", ar: "ابحث في الأقسام والمشاريع…" },
              locale,
            )}
            className="flex-1 bg-transparent py-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            aria-label={t({ en: "Search", ar: "بحث" }, locale)}
            role="combobox"
            aria-expanded={true}
            aria-controls="cmdk-list"
          />
          <kbd className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-faint">
            ESC
          </kbd>
        </div>

        <div id="cmdk-list" className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-ink-faint">
              {t({ en: "No results found", ar: "لا توجد نتائج" }, locale)}
            </div>
          )}
          {Object.entries(groups).map(([groupName, items]) => (
            <div key={groupName}>
              <div className="px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink-faint">
                {groupName}
              </div>
              {items.map((item) => {
                const idx = flatIndex++;
                const isActive = idx === active;
                return (
                  <button
                    key={item.id}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActive(idx)}
                    onClick={item.action}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-start transition-colors ${
                      isActive ? "bg-[rgba(255,138,31,0.08)]" : ""
                    }`}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-accent" : "text-ink-faint"}`} />
                    <span className={`flex-1 text-sm ${isActive ? "text-ink" : "text-ink-soft"}`}>
                      {item.label}
                    </span>
                    {item.hint && (
                      <span className="truncate text-xs text-ink-faint">{item.hint}</span>
                    )}
                    {isActive && <ArrowRight className="h-3.5 w-3.5 text-accent" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-hairline px-4 py-2 text-[0.65rem] text-ink-faint">
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-hairline px-1 py-0.5 font-mono">↑↓</kbd>
            {t({ en: "navigate", ar: "تنقل" }, locale)}
            <kbd className="rounded border border-hairline px-1 py-0.5 font-mono">↵</kbd>
            {t({ en: "select", ar: "اختر" }, locale)}
          </span>
          <span className="font-mono">{filtered.length} {t({ en: "results", ar: "نتيجة" }, locale)}</span>
        </div>
      </div>
    </div>
  );
}
