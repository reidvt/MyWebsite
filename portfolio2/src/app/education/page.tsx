import AnimatedSection from "@/components/AnimatedSection";
import CourseCard from "@/components/CourseCard";
import { courses, categoryLabels, type CourseCategory } from "@/data/courses";
import { personal } from "@/data/personal";

export const metadata = {
  title: "Education · Reid VanTrieste",
  description:
    "Coursework from Fairfield University — CS major, math minor, graduating May 2026.",
};

const categoryOrder: CourseCategory[] = [
  "ml",
  "security",
  "web",
  "systems",
  "theory",
];

export default function EducationPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <AnimatedSection className="mb-14">
        <div className="label-mono mb-2">{"// education"}</div>
        <h1 className="heading-display text-4xl md:text-5xl leading-tight">
          The coursework behind the portfolio.
        </h1>
        <p className="text-muted-soft mt-4 max-w-2xl leading-relaxed">
          Expand any course to see what I actually learned there — the tools,
          the concepts, and the parts that carried over into research and
          work.
        </p>
      </AnimatedSection>

      {/* Graduate — UPenn */}
      <AnimatedSection delay={0.05}>
        <div className="bg-surface border border-border rounded-sm p-6 md:p-8 mb-6 grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-3 font-mono text-sm" style={{ borderLeft: "3px solid #5ab4d6" }}>
          <span className="text-muted">institution</span>
          <span className="text-heading-soft">{personal.gradUniversity}</span>
          <span className="text-muted">degree</span>
          <span className="text-heading-soft">{personal.gradDegree}</span>
          <span className="text-muted">focus</span>
          <span className="text-heading-soft">{personal.gradFocus}</span>
          <span className="text-muted">expected</span>
          <span className="text-accent-blue">{personal.gradExpected}</span>
        </div>
      </AnimatedSection>

      {/* Undergraduate — Fairfield */}
      <AnimatedSection delay={0.08}>
        <div className="bg-surface border border-border rounded-sm p-6 md:p-8 mb-12 grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-3 font-mono text-sm" style={{ borderLeft: "3px solid #5ab4d6" }}>
          <span className="text-muted">institution</span>
          <span className="text-heading-soft">{personal.university}</span>
          <span className="text-muted">degree</span>
          <span className="text-heading-soft">
            {personal.degree} · Minor in {personal.minor}
          </span>
          <span className="text-muted">gpa</span>
          <span className="text-heading-soft">{personal.gpa}</span>
          <span className="text-muted">graduation</span>
          <span className="text-accent-green">{personal.graduation}</span>
        </div>
      </AnimatedSection>

      {categoryOrder.map((cat, catIdx) => {
        const group = courses.filter((c) => c.category === cat);
        if (group.length === 0) return null;
        return (
          <AnimatedSection
            key={cat}
            delay={0.05 + catIdx * 0.04}
            className="mb-12"
          >
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="heading-display text-xl md:text-2xl">
                {categoryLabels[cat]}
              </h2>
              <span className="font-mono text-[11px] text-muted">
                [{group.length}]
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((c) => (
                <CourseCard key={c.name} course={c} />
              ))}
            </div>
          </AnimatedSection>
        );
      })}
    </section>
  );
}
