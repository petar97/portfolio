"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import { asset } from "@/lib/utils";
import { ENTRY_DELAY } from "@/lib/animations";

// gallery: captioned screens shown as thumbnails under the slide; projects without one use `image`
const projects = [
  {
    num: "01",
    category: "AI platform",
    title: "LitteraWorks",
    description: "LitteraWorks is an AI transcription platform for media and sports organisations: upload audio or video, get a speaker-labelled transcript, then turn it into quotes, social clips, subtitles, translations, articles and summaries. I designed and built the entire frontend, for both the web platform and the marketing site.\n\nA typed Vue 3 single-page app with rich-text editing, real-time job updates and 8 interface languages, backed by unit and end-to-end tests.",
    stack: [
      { name: "Vue 3" },
      { name: "TypeScript" },
      { name: "Vite" },
      { name: "Pinia" },
      { name: "TipTap" },
      { name: "vue-i18n" },
      { name: "Pusher" },
      { name: "Vitest" },
      { name: "Playwright" },
    ],
    gallery: [
      { label: "Transcript editor", image: asset("/assets/work/litteraworks-overview.webp") },
      { label: "Home", image: asset("/assets/work/litteraworks-home.webp") },
      { label: "My files", image: asset("/assets/work/litteraworks-files.webp") },
      { label: "Social clips", image: asset("/assets/work/litteraworks-clips.webp") },
      { label: "Marketing site", image: asset("/assets/work/litteraworks-site.webp") },
    ],
    live: "",
    github: "",
  },
  {
    num: "02",
    category: "sports website",
    title: "FK Partizan",
    description: "The official website of FK Partizan, one of Serbia's biggest football clubs. I designed and built the frontend in Nuxt: news, club and squad pages, a match centre with lineups, statistics, a live blog and photo galleries, the club history, and a Serbian/English interface.\n\nThe design is bold and image-led, with responsive layouts that carry the club's black-and-white identity from large desktop screens down to phones.",
    stack: [
      { name: "Nuxt" },
      { name: "Vue.js" },
      { name: "Javascript" },
    ],
    gallery: [
      { label: "Home", image: asset("/assets/work/partizan-overview.webp") },
      { label: "Match centre", image: asset("/assets/work/partizan-match.webp") },
      { label: "Match tabs", image: asset("/assets/work/partizan-tabs.webp") },
      { label: "Squad", image: asset("/assets/work/partizan-squad.webp") },
    ],
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "website redesign",
    title: "FK Partizan Redesign",
    description: "A complete redesign of the FK Partizan website, currently in development. I designed and built a light, editorial interface around bold headline typography and black-and-white photography: a rotating hero for top stories and the next match, a match centre with a match timeline, pitch-formation lineups, detailed statistics and photo galleries, and redesigned squad cards.\n\nBuilt in Nuxt with responsive layouts and a Serbian/English toggle.",
    stack: [
      { name: "Nuxt" },
      { name: "Vue.js" },
      { name: "Javascript" },
    ],
    gallery: [
      { label: "Home", image: asset("/assets/work/partizan-redesign-overview.webp") },
      { label: "Match centre", image: asset("/assets/work/partizan-redesign-match.webp") },
      { label: "Match tabs", image: asset("/assets/work/partizan-redesign-tabs.webp") },
      { label: "Squad", image: asset("/assets/work/partizan-redesign-squad.webp") },
    ],
    live: "",
    github: "",
  },
  {
    num: "04",
    category: "wordpress",
    title: "STRIMHealth",
    description: "Led the development of the StrimHealth platform for IBISS, University of Belgrade. Focused on creating a responsive and user-friendly front-end, tailored to healthcare research needs. The project involved building a fully customized WordPress theme, implementing dynamic elements through custom fields and objects, and optimizing the user interface for seamless navigation across devices.\n\n Ensured design consistency, accessibility, and performance optimization throughout the development process.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      { name: "Javascript" },
      { name: "Wordpress" },
    ],
    image: asset("/assets/work/strimhealth.webp"),
    live: "https://strimhealth.ibiss.bg.ac.rs/",
    github: "",
  },
  {
    num: "05",
    category: "full-stack",
    title: "delaygram",
    description: "Delaygram is a social media platform inspired by Instagram, built using React, Node.js, and Firebase. It allows users to post, comment, and interact with images in real-time. I developed both the front-end and back-end, implementing user authentication, real-time database updates, and a clean, responsive interface.\n\nThis project demonstrates my ability to create full-stack applications with a focus on seamless user experience and efficient data handling.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      { name: "Javascript" },
      { name: "React" },
      { name: "Google Firebase" },
      { name: "Node.js" },
    ],
    image: asset("/assets/work/delaygram.webp"),
    live: "https://delaygram-rho.vercel.app/",
    github: "https://github.com/petar97/delaygram",
  },
  {
    num: "06",
    category: "front-end",
    title: "šema website",
    description: "This project is a responsive website created for Šema, a digital agency, utilizing HTML5, CSS3, and JavaScript. The site was designed to showcase the agency's services, including advertising, branding, and web development. It features an intuitive layout, smooth animations, and a clean, modern design.\n\nMy role involved developing the front-end architecture and ensuring a seamless user experience across all devices.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      { name: "Javascript" }
    ],
    image: asset("/assets/work/sema.webp"),
    live: "https://petar97.github.io/sema-website/",
    github: "https://github.com/petar97/sema-website",
  },
  {
    num: "07",
    category: "mobile android",
    title: "the rick and morty app",
    description: "The Rick and Morty App is an Android application built in Java, allowing users to browse characters from the popular show 'Rick and Morty.' It uses the Rick and Morty API to fetch character data, implementing efficient pagination and a clean user interface.\n\nThe app demonstrates my skills in mobile development, including working with RESTful APIs, handling asynchronous data loading, and building an intuitive UI for mobile users.",
    stack: [
      { name: "Java" },
    ],
    image: asset("/assets/work/ram.webp"),
    live: "",
    github: "https://github.com/petar97/TheRickAndMortyApp",
  },
]


const galleryOf = (project) => project.gallery ?? [{ label: "Overview", image: project.image }];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const [shot, setShot] = useState(0);
  const gallery = galleryOf(project);

  const handleSlideChange = (swiper) => {
    setProject(projects[swiper.activeIndex]);
    setShot(0);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        transition: {delay: ENTRY_DELAY, duration: 0.4, ease: "easeIn"},
      }}
      className="min-h-[80vh] flex flex-col pb-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] flex flex-col xl:justify-between order-2 xl:order-none">
            <AnimatedSection stagger={0.12} delay={ENTRY_DELAY + 0.1} className="flex flex-col gap-[30px] h-[50%]">
              <AnimatedItem className="text-8xl leading-none font-extrabold text-transparent text-outline mt-8 xl:mt-3 -z-10">
                {project.num}
              </AnimatedItem>
              <AnimatedItem as="h1" className="text-[42px] font-bold leading-none text-white capitalize">
                {project.title}
              </AnimatedItem>
              <AnimatedItem as="h3" className="capitalize text-xl font-semibold">
                {project.category} project
              </AnimatedItem>
              <AnimatedItem as="p" className="text-white/60 whitespace-pre-line">{project.description}</AnimatedItem>
              <AnimatedItem as="ul" className="flex gap-4 flex-wrap">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent inline-flex whitespace-nowrap">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </AnimatedItem>
            </AnimatedSection>
          </div>
          <div className="w-full xl:w-[50%] flex flex-col">
            <AnimatedSection stagger={0.08} delay={ENTRY_DELAY + 0.5} className="flex items-center gap-4 justify-end my-3 order-2 xl:order-none">
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
            <div className="order-1 xl:order-none w-full">
              <Swiper spaceBetween={30} slidesPerView={1} className="w-full" onSlideChange={handleSlideChange}>
                {projects.map((item, index) => {
                  const screens = galleryOf(item);
                  // Only the visible slide follows the selected thumbnail
                  const current = item === project ? screens[shot] : screens[0];
                  return <SwiperSlide key={index} className="w-full">
                    {/* bg matches the composites' base color so letterboxing is invisible */}
                    <div className="relative w-full aspect-[4/3] bg-[#232329] rounded-2xl overflow-hidden">
                      <Image key={current.image} src={current.image} fill sizes="(max-width: 1280px) 100vw, 50vw" className="object-contain select-none motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200" alt={`${item.title}: ${current.label}`} />
                    </div>
                  </SwiperSlide>
                })}
                <WorkSliderBtns 
                  containerStyles="flex gap-2 absolute right-0  bottom-[calc(50%_-_22px)] z-20 w-full justify-between px-4" 
                  btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-full hover:scale-125"
                />
              </Swiper>
              {gallery.length > 1 && (
                <div role="group" className="mt-4 grid grid-flow-col auto-cols-fr gap-3" aria-label={`${project.title} screens`}>
                  {gallery.map((screen, index) => (
                    <button
                      key={screen.image}
                      type="button"
                      onClick={() => setShot(index)}
                      aria-pressed={index === shot}
                      className={`group flex flex-col gap-2 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${index === shot ? "text-accent" : "text-white/60 hover:text-white"}`}
                    >
                      <span className={`relative block w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#232329] ring-2 transition-shadow duration-200 ${index === shot ? "ring-accent" : "ring-transparent group-hover:ring-white/20"}`}>
                        <Image src={screen.image} fill sizes="160px" className="object-cover" alt="" />
                      </span>
                      <span className="text-xs leading-tight">{screen.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work
