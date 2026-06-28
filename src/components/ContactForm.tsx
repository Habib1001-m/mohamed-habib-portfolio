import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioContent";

interface ContactFormProps {
  lang: "en" | "ar";
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = PORTFOLIO_DATA.contact;
  const isRtl = lang === "ar";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const labelClass = `ds-label ${isRtl ? "font-arabic" : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setSuccess(false);
      return;
    }

    setIsSending(true);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          company: company.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setCompany("");

      setTimeout(() => {
        setSuccess(null);
      }, 10000);
    } catch (err) {
      setSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      id="portfolio-contact-form"
      onSubmit={handleSubmit}
      className={`ds-panel p-6 sm:p-8 space-y-5 flex flex-col justify-between ${isRtl ? "font-arabic text-right" : ""}`}
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="input-company">Company</label>
        <input
          id="input-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="input-name" className={labelClass}>
            {t.formName[lang]}
          </label>
          <input
            id="input-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.formNamePlaceholder[lang]}
            className="ds-field"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="input-email" className={labelClass}>
            {t.formEmail[lang]}
          </label>
          <input
            id="input-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.formEmailPlaceholder[lang]}
            className="ds-field"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="input-subject" className={labelClass}>
          {t.formSubject[lang]}
        </label>
        <input
          id="input-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t.formSubjectPlaceholder[lang]}
          className="ds-field"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="input-message" className={labelClass}>
          {t.formMessage[lang]}
        </label>
        <textarea
          id="input-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.formMessagePlaceholder[lang]}
          className="ds-field resize-none"
        ></textarea>
      </div>

      <button
        id="submit-contact-btn"
        type="submit"
        disabled={isSending}
        className={`ds-action ds-action-primary w-full disabled:opacity-50 active:scale-[0.98] cursor-pointer ${isRtl ? "font-arabic" : "font-mono uppercase tracking-wider"}`}
      >
        <span>{isSending ? t.formSending[lang] : t.formSubmit[lang]}</span>
        {!isSending && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
      </button>

      {success === true && (
        <div id="contact-success-msg" aria-live="polite" className={`ds-status-note bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 animate-fade-in ${isRtl ? "font-arabic" : "font-mono"}`}>
          {t.formSuccess[lang]}
        </div>
      )}
      {success === false && (
        <div id="contact-error-msg" aria-live="polite" className={`ds-status-note bg-rose-500/10 border border-rose-500/30 text-rose-300 animate-fade-in ${isRtl ? "font-arabic" : "font-mono"}`}>
          {t.formError[lang]}
        </div>
      )}
    </form>
  );
}
