"use client"

import CountUp from "react-countup";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";

const stats = [
  {
    num:  3,
    text: "Years of experience"
  },
  {
    num: 23,
    text: "Projects completed"
  },
  {
    num: 5,
    text: "Tech Stack Diversity"
  },
  {
    num: 1174,
    text: "GitHub Contributions"
  },
]

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <AnimatedSection
          stagger={0.1}
          delay={2.4}
          className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none text-xl"
        >
          {stats.map((item, index) => {
            return <AnimatedItem
              key={index}
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
            >
              <CountUp end={item.num} duration={5} delay={2.6} className="text-4xl xl:text-6xl font-extrabold" />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.text}
              </p>
            </AnimatedItem>
          })}
        </AnimatedSection>
      </div>
    </section>
  )
}

export default Stats