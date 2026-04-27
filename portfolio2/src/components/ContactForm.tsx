"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/personal";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // No backend configured — drop into a mailto link as a safe fallback.
    const subject = `Portfolio contact — ${form.name || "visitor"}`;
    const body = `From: ${form.name} <${form.email}>\n\n${form.message}`;
    const href = `mailto:${personal.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = href;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface border border-border rounded-sm p-6 md:p-8 space-y-5"
      style={{ borderLeft: "3px solid #5ab4d6" }}
    >
      <div>
        <label
          htmlFor="name"
          className="label-mono block mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-bg border border-border rounded-sm px-3 py-2.5 font-mono text-sm text-heading focus:border-accent-blue focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="label-mono block mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-bg border border-border rounded-sm px-3 py-2.5 font-mono text-sm text-heading focus:border-accent-blue focus:outline-none transition-colors"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="label-mono block mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-bg border border-border rounded-sm px-3 py-2.5 font-mono text-sm text-heading focus:border-accent-blue focus:outline-none transition-colors resize-none"
          placeholder="Role, timeline, and anything else I should know."
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={status === "submitting"}
          className="font-mono text-xs px-5 py-2.5 rounded-sm border border-accent-blue/60 text-accent-blue hover:bg-accent-blue/10 transition-colors disabled:opacity-60"
        >
          {status === "submitting"
            ? "opening mail client…"
            : status === "sent"
            ? "sent ✓"
            : "send message →"}
        </motion.button>
        <span className="font-mono text-[11px] text-muted">
          or email directly:{" "}
          <a
            href={`mailto:${personal.email}`}
            className="text-accent-blue hover:text-heading transition-colors"
          >
            {personal.email}
          </a>
        </span>
      </div>
    </form>
  );
}
