"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { accentHex } from "@/lib/utils";

interface Props {
  project: Project;
  onOpen: (p: Project) => void;
  layoutId?: string;
}

export default function ProjectCard({ project, onOpen, layoutId }: Props) {
  const color = accentHex[project.color];

  return (
    <motion.button
      layout
      layoutId={layoutId}
      type="button"
      onClick={() => onOpen(project)}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group text-left bg-surface border border-border hover:border-muted/60 transition-colors rounded-sm p-6 relative overflow-hidden flex flex-col"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="label-mono mb-2">
            {project.tags.slice(0, 3).join(" · ")}
          </div>
          <h3 className="heading-display text-xl sm:text-2xl leading-tight">
            {project.title}
          </h3>
        </div>
        <span
          className="font-mono text-[11px] tracking-wider uppercase px-2 py-1 rounded-sm"
          style={{
            color,
            borderColor: `${color}55`,
            border: `1px solid ${color}55`,
          }}
        >
          {project.color === "green"
            ? "ml"
            : project.color === "blue"
            ? "web/research"
            : "security"}
        </span>
      </div>

      <p className="text-sm text-muted-soft leading-relaxed mt-4 flex-1">
        {project.shortDescription}
      </p>

      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-heading-soft"
            >
              {m}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted">
          {project.tech.slice(0, 3).join(", ")}
          {project.tech.length > 3 ? "…" : ""}
        </span>
        <span
          className="font-mono text-[11px] text-muted group-hover:text-heading transition-colors"
          aria-hidden="true"
        >
          open →
        </span>
      </div>
    </motion.button>
  );
}
