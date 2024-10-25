"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

{/* 
IKONICE ISPRED NASLOVA?
*/}

const experience = {
  icon: "",
  title: "My experience",
  desciption: "As a web developer, I've worked across digital marketing agencies and boutique web studios, gaining experience in end-to-end project management and cross-functional collaboration.\n\nAt Šema, I was part of a founding team driving digital transformation for local businesses, while at OCP, I developed web projects independently and contributed to launching the IT League platform. My experience spans from creating small e-commerce sites to complex digital ecosystems, always ensuring solutions are aligned with business goals.",
  items: [
    {
      company: "Šema",
      position: "Web Developer",
      duration: "2019 - 2020"
    },
    {
      company: "OCP Studio",
      position: "Junior Web Developer",
      duration: "2018 - 2019"
    }
  ]
}

const education = {
  icon: "",
  title: "My education",
  desciption: "I hold a Master’s degree in Software Engineering from Singidunum University, where I specialized in web and software development.\n\nDuring my studies, I focused on building practical skills through projects like full-stack and front-end web apps and mobile development. My journey into tech started with a Bachelor's in Informatics and Computing, which provided me with a solid foundation in programming and web technologies.",
  items: [
    {
      institution: "Software Engineering Module",
      degree: "Master’s degree",
      duration: "2021 - 2023"
    },
    {
      institution: "Faculty of Informatics and Computing",
      degree: "Bachelor's degree",
      duration: "2017 - 2021"
    },
  ]
};

const skills = {
  title: "My skills",
  desciption: "My technical toolkit includes HTML, CSS, JavaScript, React, Angular, WordPress, PHP, Node.js, and experience with databases like SQL and NoSQL.\n\nI also work with tools like Google Firebase, Git, and project management platforms such as Asana and Trello. I’m comfortable working across both front-end and back-end, ensuring cohesive, full-stack solutions for all projects.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5"
    },
    {
      icon: <FaCss3 />,
      name: "css 3"
    },
    {
      icon: <FaJs />,
      name: "javascript"
    },
    {
      icon: <FaReact />,
      name: "react.js"
    },
    {
      icon: <FaNodeJs />,
      name: "node.js"
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js"
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css"
    },
    {
      icon: <FaGitAlt />,
      name: "git"
    },
  ]
}

const about = {
  title: "About me",
  desciption: "I'm passionate about bringing ideas to life through web development. Whether it’s creating a personal portfolio or collaborating on larger digital ecosystems, I focus on designing intuitive, efficient, and scalable solutions.\n\nWith a strong background in front-end and experience with back-end technologies, I'm always excited to tackle new challenges and grow as a developer. Let’s build something great together!",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Petar Milovanovic"
    },
    {
      fieldName: "Phone",
      fieldValue: "(+381) 62 597 627"
    },
    {
      fieldName: "Experience",
      fieldValue: "2 Years"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Serbian"
    },
    {
      fieldName: "Email",
      fieldValue: "petar97m@gmail.com"
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available"
    },
    {
      fieldName: "Languages",
      fieldValue: "Serbian, English, German"
    },
  ]
};

const Resume = () => {
  return (
    <motion.div 
      initial={{opacity: 0}} 
      animate={{
        opacity: 1, 
        transition: {delay: 2.4, duration: 0.4, ease: "easeIn"},
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs 
          defaultValue="experience" 
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6 rounded-xl xl:h-[calc(100vh_-_140px)]">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">
                  {experience.title}
                </h3>
                <p className="text-white/60 mx-auto xl:mx-0 whitespace-pre-line">
                  {experience.desciption}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 ">
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                      </li>
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="education" className="w-full">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">
                  {education.title}
                </h3>
                <p className="text-white/60 mx-auto xl:mx-0 whitespace-pre-line">
                  {education.desciption}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] /* ${[&>*:nth-child(2)]:pr-20} */">
                    {education.items.map((item, index) => {
                      return <li key={index} className="bg-[#232329] h-[186px] py-6 px-10 rounded-xl flex flex-col items-center lg:items-start gap-1 ">
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60 leading-normal">{item.institution}</p>
                        </div>
                      </li>
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="text-white/60 mx-auto xl:mx-0 whitespace-pre-line">{skills.desciption}</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                  {skills.skillList.map((skill, index) => {
                    return <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group ">
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  })}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="text-white/60 mx-auto xl:mx-0 whitespace-pre-line">{about.desciption}</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                      <span className="text-white/60">{item.fieldName}</span>
                      <span className="text-xl">{item.fieldValue}</span>
                    </li>
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume