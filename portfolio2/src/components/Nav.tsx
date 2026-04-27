"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/skills", label: "skills" },
  { href: "/education", label: "education" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-bg/70 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-heading"
        >
          <span className="text-accent-green">~/</span>
          <span>reid.vantrieste</span>
          <span className="text-muted">::portfolio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-mono text-sm">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "transition-colors hover:text-heading",
                  active ? "text-heading" : "text-muted"
                )}
              >
                {active && <span className="text-accent-green mr-1">&gt;</span>}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden h-9 w-9 flex flex-col items-center justify-center gap-1.5 border border-border rounded-sm"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "h-[2px] w-4 bg-heading-soft transition-transform",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-[2px] w-4 bg-heading-soft transition-opacity",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-[2px] w-4 bg-heading-soft transition-transform",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md"
          >
            <nav className="flex flex-col py-4 px-5 font-mono text-sm">
              {links.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "py-2 border-b border-border/60 last:border-b-0",
                      active ? "text-heading" : "text-muted"
                    )}
                  >
                    {active && (
                      <span className="text-accent-green mr-2">&gt;</span>
                    )}
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
