import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/portfolioContent";

interface ContactFormProps {
  lang: "en" | "ar";
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = PORTFOLIO_DATA.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

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
      className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/10 shadow-2xl glass space-y-5 flex flex-col justify-between"
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
          <label htmlFor="input-name" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            {t.formName[lang]}
          </label>
          <input
            id="input-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.formNamePlaceholder[lang]}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-orange-500/50 focus:bg-orange-500/[0.01] text-white placeholder-slate-600 focus:outline-none transition-all text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="input-email" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            {t.formEmail[lang]}
          </label>
          <input
            id="input-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.formEmailPlaceholder[lang]}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-orange-500/50 focus:bg-orange-500/[0.01] text-white placeholder-slate-600 focus:outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="input-subject" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          {t.formSubject[lang]}
        </label>
        <input
          id="input-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t.formSubjectPlaceholder[lang]}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-orange-500/50 focus:bg-orange-500/[0.01] text-white placeholder-slate-600 focus:outline-none transition-all text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="input-message" className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          {t.formMessage[lang]}
        </label>
        <textarea
          id="input-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.formMessagePlaceholder[lang]}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-orange-500/50 focus:bg-orange-500/[0.01] text-white placeholder-slate-600 focus:outline-none transition-all text-sm resize-none"
        ></textarea>
      </div>

      <button
        id="submit-contact-btn"
        type="submit"
        disabled={isSending}
        className="w-full py-3.5 accent-gradient hover:opacity-90 active:scale-[0.98] disabled:opacity-50 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{isSending ? t.formSending[lang] : t.formSubmit[lang]}</span>
        {!isSending && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
      </button>

      {success === true && (
        <div id="contact-success-msg" aria-live="polite" className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs sm:text-sm text-center animate-fade-in font-mono">
          {t.formSuccess[lang]}
        </div>
      )}
      {success === false && (
        <div id="contact-error-msg" aria-live="polite" className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs sm:text-sm text-center animate-fade-in font-mono">
          {t.formError[lang]}
        </div>
      )}
    </form>
  );
}
