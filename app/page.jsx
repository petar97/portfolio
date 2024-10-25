import { FiDownload } from "react-icons/fi";

import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mb-6">
              Hello, <br /> I&apos;m <span className="text-accent">Petar Milovanović</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80 mx-auto xl:mx-0">
              I&apos;m a frontend developer focused on creating sleek, responsive, and user-friendly web applications.
            </p>
            <div className="flex items-center gap-8 flex-col xl:flex-row">
              <a 
                href="/assets/cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className=" flex items-center gap-2 justify-center whitespace-nowrap rounded-full  font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-accent-hover border border-accent bg-transparent hover:text-primary bg-primary text-accent h-[56px] px-8 text-sm uppercase tracking-[2px]"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </a>
              <div className="mb-8 xl:mb-0">
                <Social 
                  containerStyles="flex gap-6" 
                  iconStyles="w-9 h-9 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" 
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  )
}

export default Home
