import Link from "next/link";
import TerminalHero from "@/components/TerminalHero";
import AnimatedSection from "@/components/AnimatedSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import { projects } from "@/data/projects";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <TerminalHero />

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <AnimatedSection className="mb-10">
          <div className="label-mono mb-2">{"// 01 · featured work"}</div>
          <h2 className="heading-display text-3xl md:text-4xl">
            Projects I&apos;d put on the whiteboard.
          </h2>
          <p className="text-muted-soft mt-3 max-w-2xl">
            A small slice of the portfolio — the ML and research work I keep
            coming back to. See all eight on the{" "}
            <Link
              href="/projects"
              className="text-accent-green hover:text-heading transition-colors"
            >
              projects page
            </Link>
            .
          </p>
        </AnimatedSection>

        <FeaturedProjects projects={featured} />
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 border-t border-border">
        <AnimatedSection className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <div className="label-mono mb-2">{"// 02 · about"}</div>
            <h2 className="heading-display text-3xl md:text-4xl leading-tight">
              Built for ML work. Sharpened by the SOC.
            </h2>
            <p className="text-muted-soft mt-5 leading-relaxed">
              I&apos;m a Computer Science senior at Fairfield University with a
              mathematics minor, heading to Penn for an M.S. in AI in fall 2026.
              My research sits at the intersection of applied ML and
              explainability — capstone work on LSTM + GNN leak detection for
              water infrastructure (F1=0.93, AUC=0.981), NLP pipelines with
              SHAP and LIME, and a deep-learning entry for a hyperspectral
              imaging challenge.
            </p>
            <p className="text-muted-soft mt-4 leading-relaxed">
              Day-to-day, I work as a SOC Technician: Splunk queries, Active
              Directory audits at scale (45K+ accounts), an IsolationForest
              anomaly detection system over network logs, and automation scripts
              that keep the university&apos;s detection posture honest.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 font-mono text-sm leading-relaxed">
            <div className="text-muted mb-3">$ stat reid</div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <span className="text-muted">role</span>
              <span className="text-heading-soft">ML Engineer · SOC Tech</span>
              <span className="text-muted">undergrad</span>
              <span className="text-heading-soft">Fairfield — B.S. CS · GPA 3.4</span>
              <span className="text-muted">grad</span>
              <span className="text-accent-blue">Penn M.S. AI · Fall 2026</span>
              <span className="text-muted">avail</span>
              <span className="text-accent-green">May 2026</span>
              <span className="text-muted">loc</span>
              <span className="text-heading-soft">Philadelphia, PA</span>
              <span className="text-muted">status</span>
              <span className="text-accent-green">available</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 border-t border-border">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="label-mono mb-2">{"// 03 · what I work on"}</div>
            <h2 className="heading-display text-3xl md:text-4xl">
              Three tracks, one workflow.
            </h2>
          </div>
          <Link
            href="/skills"
            className="font-mono text-xs text-accent-green hover:text-heading transition-colors"
          >
            see the full skills matrix →
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          <AnimatedSection delay={0.05}>
            <div
              className="bg-surface border border-border rounded-sm p-6 h-full"
              style={{ borderLeft: "3px solid #2ec87a" }}
            >
              <div className="label-mono mb-3 text-accent-green">
                {"// ml · research"}
              </div>
              <h3 className="heading-display text-xl mb-3">Machine learning</h3>
              <p className="text-sm text-muted-soft leading-relaxed">
                Classical ML and deep learning with an emphasis on
                interpretable models. XGBoost, scikit-learn, TensorFlow, and
                explainability tooling (SHAP / LIME).
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div
              className="bg-surface border border-border rounded-sm p-6 h-full"
              style={{ borderLeft: "3px solid #e8a83a" }}
            >
              <div className="label-mono mb-3 text-accent-amber">
                {"// security · soc"}
              </div>
              <h3 className="heading-display text-xl mb-3">Security</h3>
              <p className="text-sm text-muted-soft leading-relaxed">
                University SOC operations: Splunk SPL, Active Directory
                auditing, Bloodhound, and the offensive-security curriculum
                (Kali, Nmap, Metasploit, Burp Suite).
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div
              className="bg-surface border border-border rounded-sm p-6 h-full"
              style={{ borderLeft: "3px solid #5ab4d6" }}
            >
              <div className="label-mono mb-3 text-accent-blue">{"// web · tooling"}</div>
              <h3 className="heading-display text-xl mb-3">Web development</h3>
              <p className="text-sm text-muted-soft leading-relaxed">
                TypeScript, React / Next.js, Tailwind, and Node. Clean UIs for
                research outputs and full-stack apps when a project needs a
                proper surface.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 border-t border-border">
        <AnimatedSection className="bg-surface border border-border rounded-sm p-8 md:p-12 text-center">
          <div className="label-mono mb-3">{"// 04 · contact"}</div>
          <h2 className="heading-display text-3xl md:text-4xl mb-4">
            Hiring for May 2026?
          </h2>
          <p className="text-muted-soft max-w-xl mx-auto mb-8">
            I&apos;m targeting ML engineering and security-adjacent roles.
            Happy to walk through the capstone, the SOC work, or any of the
            research in detail.
          </p>
          <div className="flex flex-wrap gap-3 justify-center font-mono text-xs">
            <Link
              href="/contact"
              className="px-5 py-2.5 border border-accent-green/60 text-accent-green hover:bg-accent-green/10 transition-colors rounded-sm"
            >
              get in touch →
            </Link>
            <Link
              href="/projects"
              className="px-5 py-2.5 border border-border text-muted-soft hover:text-heading hover:border-muted transition-colors rounded-sm"
            >
              see all projects
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
