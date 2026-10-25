"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaCode } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

const experience = {
  title: "Experience",
  description: "Currently working as a Frontend Engineer at AppWorks, where I serve as the sole frontend engineer handling both UI/UX design and full implementation for media, sports, and content-driven platforms. I work with Vue, Nuxt, React, Next, Laravel blade templating, API-driven architectures, and responsive/mobile-first design to deliver fast, accessible, SEO-optimized experiences.\n\nPreviously, I gained valuable experience at Šema and OCP Studio, working across digital marketing agencies and web studios on projects ranging from small e-commerce sites to complex digital ecosystems. Between roles, I completed a Master's degree in Software Engineering at Singidunum University (2021 - 2023).",
  items: [
    {
      company: "AppWorks",
      position: "Frontend Engineer",
      duration: "Apr 2025 - Present",
      highlights: [
        "LitteraWorks: the entire frontend of an AI transcription platform and its marketing site",
        "FK Partizan: the official club website and its upcoming redesign",
        "Webview screens for five iOS and Android apps: Insajder, RTV Budva, Peristeri B.C., Cork City FC and the Serbian SuperLiga",
        "Websites for Dnevnik, the Croatian Basketball Federation (HKS) and UpSpace",
      ],
      link: { href: "/work", label: "See these projects" },
    },
    {
      company: "Šema",
      position: "Web Developer",
      duration: "Jun 2019 - Jan 2021",
      highlights: [
        "Founding member of a cross-functional team digitalising local businesses",
        "Defined web project scopes and took part in client ideation and planning",
        "Collaborated on a digital ecosystem of four web platforms",
      ],
    },
    {
      company: "OCP Studio",
      position: "Junior Web Developer",
      duration: "Apr 2018 - May 2019",
      highlights: [
        "Internship turned into a full role at a boutique web studio",
        "Developed and led small web projects end to end, including client communication",
        "Contributed to the web platform for the launch of IT League",
      ],
    },
  ],
};

const education = {
  title: "Education",
  description: "I hold a Master’s degree in Software Engineering from Singidunum University, where I specialized in web and software development.\n\nDuring my studies, I focused on building practical skills through projects like full-stack and front-end web apps and mobile development. My journey into tech started with a Bachelor's in Informatics and Computing, which provided me with a solid foundation in programming and web technologies.",
  items: [
    {
      institution: "Singidunum University",
      degree: "Master’s in Software Engineering",
      duration: "2021 - 2023",
    },
    {
      institution: "Singidunum University",
      degree: "Bachelor's in Informatics and Computing",
      duration: "2017 - 2021",
    },
  ],
};

// Same groups and order as the CV, so the two never disagree
const skills = {
  title: "Skills",
  groups: [
    { name: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Vue", "Nuxt", "React", "Next.js", "Pinia", "jQuery", "Tailwind CSS", "Bootstrap", "WordPress"] },
    { name: "Backend & APIs", items: ["Node.js", "PHP", "Laravel Blade", "REST APIs"] },
    { name: "Testing", items: ["Vitest", "Playwright"] },
    { name: "Database", items: ["SQL", "NoSQL"] },
    { name: "General-purpose", items: ["Java"] },
    { name: "Tools & workflow", items: ["Git", "Vite", "Figma", "Google Firebase", "Cloudflare", "Asana", "Trello"] },
    { name: "AI-assisted development", items: ["Claude", "ChatGPT", "Cursor"] },
  ],
};

const about = {
  title: "About me",
  description: "I'm passionate about bringing ideas to life through web development. Whether it’s creating a personal portfolio or collaborating on larger digital ecosystems, I focus on designing intuitive, efficient, and scalable solutions.\n\nWith a strong background in front-end and experience with back-end technologies, I'm always excited to tackle new challenges and grow as a developer. Let’s build something great together!",
  info: [
    { fieldName: "Name", fieldValue: "Petar Milovanović" },
    { fieldName: "Experience", fieldValue: "4+ Years" },
    { fieldName: "Location", fieldValue: "Belgrade, Serbia" },
    { fieldName: "Languages", fieldValue: "Serbian, English, German" },
  ],
};

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About me" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

const skillIcons = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  React: FaReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": FaNodeJs,
  Git: FaGitAlt,
};

const card = "bg-[#232329] py-6 px-8 rounded-xl flex flex-col gap-2";
const dot = <span aria-hidden="true" className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-3 align-middle" />;
// scroll-mt leaves room above a section when jumping to it from the menu
const sectionClass = "scroll-mt-8 flex flex-col gap-[30px]";

// Highlights the section currently crossing the middle of the viewport
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const Resume = () => {
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="container mx-auto pb-24">
      <h1 className="sr-only">Resume</h1>
      <div className="flex flex-col xl:flex-row gap-[60px]">
        {/* A track line (bottom on phones, right on desktop) with the active section marked in accent */}
        <nav aria-label="Resume sections" className="xl:w-[300px] xl:order-2 shrink-0">
          <ul className="flex overflow-x-auto xl:flex-col border-b xl:border-b-0 xl:border-r border-white/10 xl:sticky xl:top-[calc(var(--header-condensed)+2rem)]">
            {SECTIONS.map(({ id, label }, i) => (
              <li key={id} className="flex-1 xl:flex-none">
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={`flex items-baseline justify-center xl:justify-end gap-3 px-1.5 xl:px-6 py-3 -mb-px xl:mb-0 xl:-mr-px border-b-2 xl:border-b-0 xl:border-r-2 text-sm xl:text-lg font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${active === id ? "border-accent text-accent" : "border-transparent text-white/60 hover:text-white hover:border-white/30"}`}
                >
                  {label}
                  <span aria-hidden="true" className="hidden xl:inline text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <AnimatedSection stagger={0.1} className="flex-1 flex flex-col gap-24 xl:order-1">
          <AnimatedItem as="section" id="experience" aria-labelledby="experience-title" className={sectionClass}>
            <h2 id="experience-title" className="text-4xl font-bold">{experience.title}</h2>
            <p className="text-white/60 whitespace-pre-line">{experience.description}</p>
            <ul className="flex flex-col gap-[30px]">
              {experience.items.map((item) => (
                <li key={item.company} className={card}>
                  <span className="text-accent">{item.duration}</span>
                  <h3 className="text-xl">{item.position}</h3>
                  <p className="text-white/60">{dot}{item.company}</p>
                  <ul className="mt-2 flex flex-col gap-1 list-disc pl-5 marker:text-accent text-white/80">
                    {item.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  {item.link && (
                    <Link href={item.link.href} className="group self-start mt-4 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors duration-200 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
                      {item.link.label}
                      <FiArrowRight aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </AnimatedItem>

          <AnimatedItem as="section" id="education" aria-labelledby="education-title" className={sectionClass}>
            <h2 id="education-title" className="text-4xl font-bold">{education.title}</h2>
            <p className="text-white/60 whitespace-pre-line">{education.description}</p>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
              {education.items.map((item) => (
                <li key={item.degree} className={card}>
                  <span className="text-accent">{item.duration}</span>
                  <h3 className="text-xl">{item.degree}</h3>
                  <p className="text-white/60 mt-auto">{dot}{item.institution}</p>
                </li>
              ))}
            </ul>
          </AnimatedItem>

          <AnimatedItem as="section" id="skills" aria-labelledby="skills-title" className={sectionClass}>
            <h2 id="skills-title" className="text-4xl font-bold">{skills.title}</h2>
            <div className="flex flex-col gap-8">
              {skills.groups.map((group) => (
                <div key={group.name} className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-accent">{group.name}</h3>
                  <ul className="flex flex-wrap gap-3">
                    {group.items.map((skill) => {
                      const Icon = skillIcons[skill] || FaCode;
                      return <li key={skill} className="inline-flex items-center gap-2 rounded-lg bg-[#232329] px-4 py-2"><Icon aria-hidden="true" className="text-accent" /><span>{skill}</span></li>;
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem as="section" id="about" aria-labelledby="about-title" className={sectionClass}>
            <h2 id="about-title" className="text-4xl font-bold">{about.title}</h2>
            <p className="text-white/60 whitespace-pre-line">{about.description}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
              {about.info.map((item) => (
                <div key={item.fieldName} className="flex flex-col">
                  <dt className="text-white/60">{item.fieldName}</dt>
                  <dd className="text-xl">{item.fieldValue}</dd>
                </div>
              ))}
            </dl>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Resume;
