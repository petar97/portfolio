"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "wordpress",
    title: "STRIMHealth",
    description: "Led the development of the StrimHealth platform for IBISS, University of Belgrade. Focused on creating a responsive and user-friendly front-end, tailored to healthcare research needs. The project involved building a fully customized WordPress theme, implementing dynamic elements through custom fields and objects, and optimizing the user interface for seamless navigation across devices.\n\n Ensured design consistency, accessibility, and performance optimization throughout the development process.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      { name: "Javascript" },
      { name: "Wordpress" },
    ],
    image: "assets/work/strimhealth.webp",
    live: "https://strimhealth.ibiss.bg.ac.rs/",
    github: "",
  },
  {
    num: "02",
    category: "full-stack",
    title: "delaygram",
    description: "Delaygram is a social media platform inspired by Instagram, built using React, Node.js, and Firebase. It allows users to post, comment, and interact with images in real-time.I developed both the front-end and back-end, implementing user authentication, real-time database updates, and a clean, responsive interface.\n\nThis project demonstrates my ability to create full-stack applications with a focus on seamless user experience and efficient data handling.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      { name: "Javascript" },
      { name: "React" },
      { name: "Google Firebase" },
      { name: "Node.js" },
    ],
    image: "assets/work/delaygram.webp",
    live: "",
    github: "https://github.com/petar97/delaygram",
  },
  {
    num: "03",
    category: "front-end",
    title: "šema website",
    description: "This project is a responsive website created for Šema, a digital agency, utilizing HTML5, CSS3, and JavaScript. The site was designed to showcase the agency's services, including advertising, branding, and web development. It features an intuitive layout, smooth animations, and a clean, modern design.\n\nMy role involved developing the front-end architecture and ensuring a seamless user experience across all devices.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      { name: "Javascript" }
    ],
    image: "assets/work/sema.webp",
    live: "https://petar97.github.io/sema-website/",
    github: "https://github.com/petar97/sema-website",
  },
  {
    num: "04",
    category: "mobile android",
    title: "the rick and morty app",
    description: "The Rick and Morty App is an Android application built in Java, allowing users to browse characters from the popular show 'Rick and Morty.' It uses the Rick and Morty API to fetch character data, implementing efficient pagination and a clean user interface.\n\nThe app demonstrates my skills in mobile development, including working with RESTful APIs, handling asynchronous data loading, and building an intuitive UI for mobile users.",
    stack: [
      { name: "Java" },
    ],
    image: "assets/work/ram.webp",
    live: "",
    github: "https://github.com/petar97/TheRickAndMortyApp",
  },
]


const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        transition: {delay: 2.4, duration: 0.4, ease: "easeIn"},
      }}
      className="min-h-[80vh] flex flex-col py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline mt-6 xl:mt-0">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize ">
                {project.title}
              </h2>
              <h3 className="capitalize text-xl font-semibold">
                {project.category} project
              </h3>
              <p className="text-white/60 whitespace-pre-line">{project.description}</p>
              <ul className="flex gap-4 flex-wrap">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent inline-flex whitespace-nowrap">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <div className="flex items-center gap-4 justify-end mb-3">
              <Link href={project.live} target="_blank" className={project.live ? "block" : "hidden"}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

              <Link href={project.github} target="_blank" className={project.github ? "block" : "hidden"}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github repository</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
            <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[460px]" onSlideChange={handleSlideChange}>
              {projects.map((project, index) => {
                return <SwiperSlide key={index} className="w-full">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                    <div className="relative w-full h-full">
                      <Image src={project.image} fill className="object-cover object-top border border-accent select-none"  alt={project.title} />
                    </div>
                  </div>
                </SwiperSlide>
              })}
              <WorkSliderBtns 
                containerStyles="flex gap-2 absolute right-0  bottom-[calc(50%_-_22px)] z-20 w-full justify-between xl:justify-none" 
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work
