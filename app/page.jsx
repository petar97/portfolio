import { FiDownload } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedItem from "@/components/AnimatedItem";
import { asset } from "@/lib/utils";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <AnimatedSection stagger={0.15} className="text-center xl:text-left order-2 xl:order-none">
            <AnimatedItem as="span" className="text-xl">Frontend Engineer</AnimatedItem>
            <AnimatedItem as="h1" className="h1 mb-6">
              Hello, <br /> I&apos;m <span className="text-accent">Petar Milovanović</span>
            </AnimatedItem>
            <AnimatedItem as="p" className="max-w-[500px] mb-9 text-white/80 mx-auto xl:mx-0">
              I&apos;m a frontend engineer focused on creating sleek, responsive, and user-friendly web applications.
            </AnimatedItem>
            <AnimatedItem className="flex items-center gap-8 flex-col xl:flex-row">
              <Button asChild variant="outline" size="lg" className="gap-2 hover:bg-accent-hover">
                <a href={asset("/assets/cv.pdf")} target="_blank" rel="noopener noreferrer">
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </AnimatedItem>
          </AnimatedSection>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
