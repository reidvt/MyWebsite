"use client";

import { motion } from "framer-motion";
import { allTags, type ProjectTag } from "@/data/projects";
import { cn } from "@/lib/utils";

interface Props {
  active: ProjectTag | "All";
  onChange: (tag: ProjectTag | "All") => void;
  counts: Record<string, number>;
}

export default function ProjectFilter({ active, onChange, counts }: Props) {
  const options: (ProjectTag | "All")[] = ["All", ...allTags];

  return (
    <div className="flex flex-wrap gap-2 font-mono text-xs">
      {options.map((opt) => {
        const isActive = active === opt;
        const count = counts[opt] ?? 0;
        return (
          <motion.button
            key={opt}
            onClick={() => onChange(opt)}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "relative px-3 py-1.5 rounded-sm border transition-colors",
              isActive
                ? "border-accent-green text-accent-green bg-accent-green/5"
                : "border-border text-muted hover:text-heading hover:border-muted"
            )}
          >
            <span className="uppercase tracking-wider">{opt}</span>
            <span className="ml-2 text-muted/80">[{count}]</span>
            {isActive && (
              <motion.span
                layoutId="filter-underline"
                className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-accent-green"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
