import AnimatedSection from "@/components/AnimatedSection";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "Projects · Reid VanTrieste",
  description:
    "Eight projects across ML, security, web, and systems — from an XGBoost capstone to SOC automation scripts.",
};

export default function ProjectsPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <AnimatedSection className="mb-10 md:mb-14">
        <div className="label-mono mb-2">{"// projects"}</div>
        <h1 className="heading-display text-4xl md:text-5xl leading-tight">
          Eight projects. Three tracks.
        </h1>
        <p className="text-muted-soft mt-4 max-w-2xl leading-relaxed">
          Filter by tag to narrow by domain. Click any card to open the full
          detail view with description, tech stack, and results.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.08}>
        <ProjectsGrid />
      </AnimatedSection>

      <div className="mt-12 font-mono text-xs text-muted border-t border-border pt-6">
        <span className="text-accent-green">note:</span> repositories marked{" "}
        <span className="text-heading-soft">[TBD]</span> will be linked once
        confirmed · some SOC and security repos remain private for operational
        reasons
      </div>
    </section>
  );
}
