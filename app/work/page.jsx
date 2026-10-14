"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import { PAGE_FADE } from "@/lib/animations";
import { projects, FILTERS, galleryOf } from "@/lib/projects";

// Remembers the chosen tab for the visit, so coming back from a project page lands on the same list
const FILTER_KEY = "work-filter";
// Stack items shown on a card before "+N"
const CARD_STACK = 3;

const Work = () => {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  useEffect(() => {
    const saved = sessionStorage.getItem(FILTER_KEY);
    if (FILTERS.some((f) => f.id === saved)) setFilter(saved);
  }, []);

  const selectFilter = (id) => {
    setFilter(id);
    sessionStorage.setItem(FILTER_KEY, id);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: PAGE_FADE }}
      className="min-h-[80vh] pb-24"
    >
      <div className="container mx-auto">
        <h1 className="sr-only">Work</h1>
        <div role="tablist" aria-label="Project type" className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(({ id, label }) => {
            const count = id === "all" ? projects.length : projects.filter((p) => p.type === id).length;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={filter === id}
                onClick={() => selectFilter(id)}
                className={`rounded-full px-5 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${filter === id ? "bg-accent text-primary" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"}`}
              >
                {label} <span className={filter === id ? "text-primary/70" : "text-white/40"}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* key: replay the entry stagger when the filter changes */}
        <AnimatedSection key={filter} as="ul" stagger={0.05} delay={0} aria-label="Projects" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[30px] gap-y-12">
          {visible.map((project) => {
            const extra = project.stack.length - CARD_STACK;
            return (
              <AnimatedItem as="li" key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group flex flex-col gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-primary">
                  <span className="relative block w-full aspect-[4/3] mb-2 rounded-2xl overflow-hidden bg-[#232329] ring-1 ring-white/5 transition-shadow duration-200 group-hover:ring-accent/60">
                    <Image src={galleryOf(project)[0].image} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]" alt="" />
                  </span>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl font-bold leading-tight capitalize transition-colors duration-200 group-hover:text-accent">{project.title}</h2>
                    <span aria-hidden="true" className="text-3xl leading-none font-extrabold text-transparent text-outline">
                      {String(projects.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-white/60 capitalize leading-snug">{project.category} project</p>
                  <p className="text-sm text-accent leading-snug">
                    {project.stack.slice(0, CARD_STACK).map((s) => s.name).join(" · ")}
                    {extra > 0 && <span className="text-white/40"> +{extra}</span>}
                  </p>
                </Link>
              </AnimatedItem>
            );
          })}
        </AnimatedSection>
      </div>
    </motion.section>
  );
};

export default Work;
