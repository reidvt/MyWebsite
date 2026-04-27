"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project, type ProjectTag } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectFilter from "./ProjectFilter";

export default function ProjectsGrid() {
  const [active, setActive] = useState<ProjectTag | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.tags.includes(active));
  }, [active]);

  const counts = useMemo(() => {
    const out: Record<string, number> = { All: projects.length };
    (["ML", "Security", "Web", "Systems", "Research"] as ProjectTag[]).forEach(
      (t) => {
        out[t] = projects.filter((p) => p.tags.includes(t)).length;
      }
    );
    return out;
  }, []);

  return (
    <>
      <div className="mb-8">
        <ProjectFilter active={active} onChange={setActive} counts={counts} />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={p} onOpen={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="font-mono text-sm text-muted mt-8 border border-border rounded-sm p-6 text-center">
          <span className="text-accent-green">$</span> grep &quot;{active}&quot;
          projects/* — no matches
        </div>
      )}

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
