"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Course } from "@/data/courses";
import { accentHex } from "@/lib/utils";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const [open, setOpen] = useState(false);
  const color = accentHex[course.accent];

  return (
    <motion.button
      layout
      onClick={() => setOpen((v) => !v)}
      type="button"
      className="text-left bg-surface border border-border hover:border-muted/60 transition-colors rounded-sm p-5 flex flex-col"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <motion.div layout="position" className="flex items-start justify-between gap-3">
        <div>
          <div className="label-mono mb-1">{course.category}</div>
          <h3 className="heading-display text-lg leading-tight">
            {course.name}
          </h3>
        </div>
        <span
          className="font-mono text-lg text-muted group-hover:text-heading transition-colors flex-shrink-0"
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border mt-4">
              <div className="label-mono mb-2">Skills & tools</div>
              <div className="flex flex-wrap gap-1.5">
                {course.skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-heading-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <div className="mt-4 font-mono text-[11px] text-muted">
          {course.skills.slice(0, 3).join(" · ")}
          {course.skills.length > 3 ? " · …" : ""}
        </div>
      )}
    </motion.button>
  );
}
