import Link from "next/link";
import { personal } from "@/data/personal";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="font-mono text-xs text-muted">
          <div>
            <span className="text-accent-green">$</span> whoami
          </div>
          <div className="text-heading-soft">
            {personal.shortName} — {personal.degree},{" "}
            {personal.university}
          </div>
          <div>grad: {personal.graduation} · loc: {personal.location}</div>
        </div>

        <div className="flex flex-wrap gap-5 font-mono text-xs text-muted">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-green transition-colors"
          >
            github
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-blue transition-colors"
          >
            linkedin
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="hover:text-accent-amber transition-colors"
          >
            email
          </a>
          <Link
            href="/contact"
            className="hover:text-heading transition-colors"
          >
            contact
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-8 font-mono text-[11px] text-muted/70">
        <span className="text-accent-green">●</span> built with next.js ·
        tailwind · framer motion · deployed on vercel
      </div>
    </footer>
  );
}
