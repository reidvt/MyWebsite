"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/personal";

const ROLES = personal.roles;

const TYPE_SPEED = 75;
const DELETE_SPEED = 35;
const HOLD_MS = 1400;

export default function TerminalHero() {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const current = ROLES[index];

    if (phase === "typing") {
      if (sub.length < current.length) {
        const t = setTimeout(
          () => setSub(current.slice(0, sub.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (sub.length > 0) {
        const t = setTimeout(
          () => setSub(current.slice(0, sub.length - 1)),
          DELETE_SPEED
        );
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % ROLES.length);
      setPhase("typing");
    }
  }, [sub, phase, index]);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-muted mb-6"
        >
          <span className="text-accent-green">reid@fairfield</span>
          <span className="text-muted">:</span>
          <span className="text-accent-blue">~/portfolio</span>
          <span className="text-muted">$</span> cat identity.txt
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="heading-display text-4xl sm:text-5xl md:text-7xl leading-[1.02]"
        >
          Reid VanTrieste.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 min-h-[2.4rem] flex items-center gap-2 font-mono text-lg md:text-2xl text-heading-soft"
          aria-live="polite"
        >
          <span className="text-accent-green">&gt;</span>
          <span>{sub}</span>
          <span className="terminal-cursor h-[1em]" aria-hidden="true" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 max-w-2xl text-muted-soft leading-relaxed"
        >
          CS senior at Fairfield University with a mathematics minor. I build
          machine-learning systems, run detection work in a university SOC, and
          ship web tooling when the work calls for it. Graduating{" "}
          <span className="text-heading">May 2026</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-3 font-mono text-xs"
        >
          <a
            href={personal.resumes.ml}
            className="px-4 py-2.5 border border-accent-green/60 text-accent-green hover:bg-accent-green/10 transition-colors rounded-sm"
          >
            <span className="mr-2">↓</span>resume · ML
          </a>
          <a
            href={personal.resumes.security}
            className="px-4 py-2.5 border border-accent-amber/60 text-accent-amber hover:bg-accent-amber/10 transition-colors rounded-sm"
          >
            <span className="mr-2">↓</span>resume · security
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 border border-border text-muted-soft hover:text-heading hover:border-muted transition-colors rounded-sm"
          >
            github ↗
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 border border-border text-muted-soft hover:text-heading hover:border-muted transition-colors rounded-sm"
          >
            linkedin ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
