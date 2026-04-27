"use client";

import { motion } from "framer-motion";
import { accentHex, type AccentColor } from "@/lib/utils";

interface Props {
  name: string;
  level: number;
  accent: AccentColor;
  delay?: number;
}

export default function SkillBar({ name, level, accent, delay = 0 }: Props) {
  const color = accentHex[accent];

  return (
    <div className="group">
      <div className="flex items-center justify-between text-xs font-mono mb-2">
        <span className="text-heading-soft">{name}</span>
        <span className="text-muted">{level}%</span>
      </div>
      <div className="h-[6px] bg-border/80 rounded-sm overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
