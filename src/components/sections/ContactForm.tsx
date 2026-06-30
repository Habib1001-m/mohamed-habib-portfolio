"use client";

import { useRef, useState } from "react";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { t, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export function ContactForm({ locale }: { locale: Locale }) {
  const c = PORTFOLIO_DATA.contact;
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messageLen, setMessageLen] = useState(0);
  const startedRef = useRef(false);
  const MAX_MESSAGE = 4000;

  const onFirstFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track({ eventName: "lead_contact_started", category: "lead" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim();

    if (!name || !email || !message) {
      setError(t(c.formError, locale));
      setSuccess(false);
      return;
    }

    setIsSending(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Request failed");
      }
      setSuccess(true);
      form.reset();
      track({ eventName: "lead_contact_submitted", category: "lead" });
      setTimeout(() => setSuccess(null), 10000);
    } catch (err) {
      setSuccess(false);
      setError(err instanceof Error ? err.message : t(c.formError, locale));
      track({
        eventName: "contact_form_failed",
        category: "contact",
        props: { reason: err instanceof Error ? err.message : "unknown" },
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ds-card p-6" onFocus={onFirstFocus}>
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="ds-field-wrap">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t(c.formNamePlaceholder, locale)}
            className="ds-field peer"
          />
          <label htmlFor="name">{t(c.formName, locale)}</label>
        </div>
        <div className="ds-field-wrap">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t(c.formEmailPlaceholder, locale)}
            className="ds-field peer"
          />
          <label htmlFor="email">{t(c.formEmail, locale)}</label>
        </div>
      </div>

      <div className="mt-4 ds-field-wrap">
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder={t(c.formSubjectPlaceholder, locale)}
          className="ds-field peer"
        />
        <label htmlFor="subject">{t(c.formSubject, locale)}</label>
      </div>

      <div className="mt-4 ds-field-wrap">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={MAX_MESSAGE}
          placeholder={t(c.formMessagePlaceholder, locale)}
          className="ds-field peer resize-y"
          onChange={(e) => setMessageLen(e.target.value.length)}
        />
        <label htmlFor="message">{t(c.formMessage, locale)}</label>
        <div className="mt-1.5 flex justify-end">
          <span
            className={`font-mono text-[0.7rem] ${
              messageLen > MAX_MESSAGE * 0.9 ? "text-[var(--accent)] font-semibold" : "text-ink-muted"
            }`}
          >
            {messageLen} / {MAX_MESSAGE}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="ds-action ds-action-primary mt-5 w-full disabled:opacity-60"
      >
        {isSending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t(c.formSending, locale)}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t(c.formSubmit, locale)}
          </>
        )}
      </button>

      <div aria-live="polite" className="mt-3">
        {success === true && (
          <div className="animate-success-pop relative flex items-start gap-3 rounded-[var(--r-md)] border border-[rgba(16,242,154,0.25)] bg-[rgba(16,242,154,0.06)] p-4 text-sm text-[#86efac] shadow-[0_0_24px_rgba(16,242,154,0.1)]">
            {/* Confetti micro-burst */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const dist = 28 + (i % 3) * 10;
                const cx = Math.cos(angle) * dist;
                const cy = Math.sin(angle) * dist;
                const colors = ["#10f29a", "#f97316", "#ffc857", "#86efac"];
                return (
                  <span
                    key={i}
                    className="confetti-piece absolute left-4 top-4 h-1.5 w-1.5 rounded-full"
                    style={{
                      "--cx": `${cx}px`,
                      "--cy": `${cy}px`,
                      background: colors[i % colors.length],
                    } as React.CSSProperties}
                  />
                );
              })}
            </span>
            <svg
              className="mt-0.5 h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" opacity="0.4" />
              <path d="M8 12.5l2.5 2.5L16 9" className="check-draw" />
            </svg>
            <div>
              <div className="font-semibold">{t(c.formSuccess, locale)}</div>
              <div className="mt-0.5 text-xs text-[#86efac]/70">
                {t(
                  { en: "Reply within 1 business day", ar: "الرد خلال يوم عمل واحد" },
                  locale,
                )}
              </div>
            </div>
          </div>
        )}
        {success === false && (
          <div className="animate-fade-in flex items-start gap-2 rounded-[var(--r-md)] border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.05)] p-3 text-sm text-[#fca5a5]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error || t(c.formError, locale)}</span>
          </div>
        )}
      </div>
    </form>
  );
}
