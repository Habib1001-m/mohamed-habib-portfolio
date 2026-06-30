"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check, Share2 } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";

interface ShareBarProps {
  url: string;
  title: string;
  locale: Locale;
}

export function ShareBar({ url, title, locale }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      id: "twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      label: { en: "Share on Twitter", ar: "شارك على تويتر" },
    },
    {
      id: "linkedin",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: { en: "Share on LinkedIn", ar: "شارك على لينكدإن" },
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — fail silently
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="ds-label flex items-center gap-1.5">
        <Share2 className="h-3 w-3" />
        {t({ en: "Share", ar: "شارك" }, locale)}
      </span>
      <div className="flex items-center gap-1.5">
        {shareLinks.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(s.label, locale)}
            className="grid h-9 w-9 place-items-center rounded-[var(--r-md)] border border-hairline bg-white/[0.02] text-ink-muted transition-colors hover:border-hairline-accent hover:text-accent"
          >
            <s.icon className="h-4 w-4" />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label={t({ en: "Copy link", ar: "نسخ الرابط" }, locale)}
          className="grid h-9 w-9 place-items-center rounded-[var(--r-md)] border border-hairline bg-white/[0.02] text-ink-muted transition-colors hover:border-hairline-accent hover:text-accent"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[var(--green)]" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </button>
      </div>
      {copied && (
        <span className="animate-fade-in font-mono text-[0.65rem] text-[var(--green)]">
          {t({ en: "Copied!", ar: "تم النسخ!" }, locale)}
        </span>
      )}
    </div>
  );
}
