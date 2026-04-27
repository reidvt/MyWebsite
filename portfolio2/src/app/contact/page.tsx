import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { personal } from "@/data/personal";

export const metadata = {
  title: "Contact · Reid VanTrieste",
  description:
    "Get in touch with Reid VanTrieste — ML engineer and SOC technician available May 2026.",
};

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
        <AnimatedSection>
          <div className="label-mono mb-2">{"// contact"}</div>
          <h1 className="heading-display text-4xl md:text-5xl leading-tight">
            Let&apos;s talk.
          </h1>
          <p className="text-muted-soft mt-5 max-w-lg leading-relaxed">
            Targeting full-time ML engineering, research engineer, and
            security-adjacent roles starting{" "}
            <span className="text-heading">May 2026</span>. If you&apos;re
            hiring or want to compare notes on applied ML + explainability,
            send a message.
          </p>

          <div className="mt-10 font-mono text-sm space-y-3">
            <div>
              <span className="label-mono block mb-1">email</span>
              <a
                href={`mailto:${personal.email}`}
                className="text-heading hover:text-accent-amber transition-colors break-all"
              >
                {personal.email}
              </a>
            </div>
            <div>
              <span className="label-mono block mb-1">phone</span>
              <a
                href={`tel:${personal.phone.replace(/-/g, "")}`}
                className="text-heading hover:text-accent-green transition-colors"
              >
                {personal.phone}
              </a>
            </div>
            <div>
              <span className="label-mono block mb-1">linkedin</span>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-heading hover:text-accent-blue transition-colors break-all"
              >
                {personal.linkedin.replace("https://www.", "")}
              </a>
            </div>
            <div>
              <span className="label-mono block mb-1">github</span>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="text-heading hover:text-accent-green transition-colors"
              >
                github.com/{personal.githubHandle}
              </a>
            </div>
            <div>
              <span className="label-mono block mb-1">location</span>
              <span className="text-heading-soft">{personal.location}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs">
            <a
              href={personal.resumes.ml}
              className="px-4 py-2.5 border border-accent-green/60 text-accent-green hover:bg-accent-green/10 transition-colors rounded-sm"
            >
              ↓ resume · ML
            </a>
            <a
              href={personal.resumes.security}
              className="px-4 py-2.5 border border-accent-amber/60 text-accent-amber hover:bg-accent-amber/10 transition-colors rounded-sm"
            >
              ↓ resume · security
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <ContactForm />
        </AnimatedSection>
      </div>
    </section>
  );
}
