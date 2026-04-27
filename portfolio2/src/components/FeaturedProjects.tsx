"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";

interface Props {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {projects.map((p) => (
          <motion.div
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            <ProjectCard project={p} onOpen={setSelected} />
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
