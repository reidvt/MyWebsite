"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import { accentHex } from "@/lib/utils";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-bg/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-surface border border-border rounded-sm"
            style={{
              borderLeft: `3px solid ${accentHex[project.color]}`,
            }}
          >
            <div className="sticky top-0 bg-surface/95 backdrop-blur-sm border-b border-border px-6 md:px-8 py-4 flex items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="label-mono mb-1">
                  {project.tags.join(" · ")}
                </div>
                <h2 className="heading-display text-2xl md:text-3xl leading-tight">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 h-9 w-9 border border-border rounded-sm font-mono text-sm text-muted hover:text-heading hover:border-muted transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-6 md:px-8 py-6 space-y-7">
              <p className="text-heading-soft leading-relaxed">
                {project.longDescription}
              </p>

              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <div className="label-mono mb-3">Key results</div>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-xs px-3 py-1.5 rounded-sm border text-heading"
                        style={{
                          borderColor: `${accentHex[project.color]}66`,
                          color: accentHex[project.color],
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="label-mono mb-3">Tech stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1.5 rounded-sm border border-border text-heading-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {project.githubStatus === "public" && project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs px-4 py-2.5 border border-heading-soft/40 text-heading hover:border-heading rounded-sm transition-colors"
                  >
                    github ↗
                  </a>
                ) : (
                  <span className="font-mono text-xs px-4 py-2.5 border border-border text-muted rounded-sm">
                    github · {project.githubStatus === "private" ? "private" : "[TBD]"}
                  </span>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs px-4 py-2.5 border rounded-sm transition-colors"
                    style={{
                      borderColor: `${accentHex[project.color]}66`,
                      color: accentHex[project.color],
                    }}
                  >
                    live demo ↗
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
