import AnimatedSection from "@/components/AnimatedSection";
import SkillBar from "@/components/SkillBar";
import { skillGroups } from "@/data/skills";
import { accentHex } from "@/lib/utils";

export const metadata = {
  title: "Skills · Reid VanTrieste",
  description:
    "Skills matrix across ML, security, web, systems, and CS foundations.",
};

export default function SkillsPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <AnimatedSection className="mb-14">
        <div className="label-mono mb-2">{"// skills"}</div>
        <h1 className="heading-display text-4xl md:text-5xl leading-tight">
          Tools, languages, and what I actually reach for.
        </h1>
        <p className="text-muted-soft mt-4 max-w-2xl leading-relaxed">
          Self-assessed proficiency, weighted by how often I use each tool in
          coursework, research, and on the job. Green bars are ML, blue is web
          and theory, amber is security and systems.
        </p>
      </AnimatedSection>

      <div className="space-y-14">
        {skillGroups.map((group, idx) => (
          <AnimatedSection key={group.domain} delay={idx * 0.05}>
            <div
              className="bg-surface border border-border rounded-sm p-6 md:p-8"
              style={{ borderLeft: `3px solid ${accentHex[group.accent]}` }}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                <div>
                  <div
                    className="label-mono mb-1"
                    style={{ color: accentHex[group.accent] }}
                  >
                    domain
                  </div>
                  <h2 className="heading-display text-2xl md:text-3xl">
                    {group.label}
                  </h2>
                </div>
                <p className="text-sm text-muted-soft max-w-md">
                  {group.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                {group.skills.map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    accent={group.accent}
                    delay={i * 0.04}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
