"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import ProjectGallery from "@/components/ProjectGallery";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import { ENTRY_DELAY, PAGE_FADE } from "@/lib/animations";
import { projects, galleryOf } from "@/lib/projects";

const projectBtn = "w-11 h-11 rounded-full bg-white/5 text-2xl flex justify-center items-center transition-colors duration-200 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

// Link to a neighbouring project; at either end of the list a dimmed placeholder keeps the layout
const ProjectLink = ({ to, label, children }) =>
  to ? (
    <Link href={`/work/${to.slug}`} aria-label={`${label}: ${to.title}`} title={to.title} className={projectBtn}>{children}</Link>
  ) : (
    <span aria-hidden="true" className={`${projectBtn} opacity-30 pointer-events-none`}>{children}</span>
  );

// One project's page: text on the left, screens and links on the right; prev/next step through all projects
const ProjectDetail = ({ index }) => {
  const project = projects[index];
  const [shot, setShot] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: PAGE_FADE }}
      className="min-h-[80vh] flex flex-col pb-12 xl:px-0"
    >
      <div className="container mx-auto">
        <Link href="/work" className="group inline-flex items-center gap-2 mb-8 text-white/60 hover:text-accent transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <FiArrowLeft className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-x-1" />
          All projects
        </Link>
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex items-end justify-between gap-4 mt-8 xl:mt-3 mb-[30px]">
              <span className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <ProjectLink to={projects[index - 1]} label="Previous project"><FiChevronLeft /></ProjectLink>
                <ProjectLink to={projects[index + 1]} label="Next project"><FiChevronRight /></ProjectLink>
              </div>
            </div>
            <AnimatedSection stagger={0.06} delay={0} className="flex flex-col gap-[30px]">
              <AnimatedItem as="h1" className="text-[42px] font-bold leading-none text-white capitalize">
                {project.title}
              </AnimatedItem>
              <AnimatedItem as="h2" className="capitalize text-xl font-semibold">
                {project.category} project
              </AnimatedItem>
              <AnimatedItem as="p" className="text-white/60 whitespace-pre-line">{project.description}</AnimatedItem>
              <AnimatedItem as="ul" className="flex gap-4 flex-wrap">
                {project.stack.map((item, i) => (
                  <li key={item.name} className="text-xl text-accent inline-flex whitespace-nowrap">
                    {item.name}
                    {i !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </AnimatedItem>
            </AnimatedSection>
          </div>
          <div className="w-full xl:w-[50%] flex flex-col">
            <ProjectGallery title={project.title} screens={galleryOf(project)} shot={shot} onShotChange={setShot} />
            <AnimatedSection stagger={0.08} delay={ENTRY_DELAY + 0.2} className="flex items-center gap-4 justify-end mt-4">
              <TooltipProvider delayDuration={100}>
                {[
                  { href: project.live, label: "Live project", Icon: BsArrowUpRight },
                  { href: project.github, label: "Github repository", Icon: BsGithub },
                ].map(({ href, label, Icon }) => (
                  <AnimatedItem key={label}>
                    {href && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                            <Icon className="text-white text-3xl group-hover:text-accent" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </AnimatedItem>
                ))}
              </TooltipProvider>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetail;
