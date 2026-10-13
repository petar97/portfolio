"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/utils";
import { ENTRY_DELAY } from "@/lib/animations";

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div 
        initial={{opacity: 0}} 
        animate={{
          opacity: 1, 
          transition: {delay: ENTRY_DELAY, duration: 0.4, ease: "easeIn"}
        }}
      >
        {/* image */}
        <motion.div
          initial={{opacity: 0}} 
          animate={{
            opacity: 1, 
            transition: {delay: ENTRY_DELAY + 0.2, duration: 0.4, ease: "easeInOut"}
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute bg-primary"
        >
          <Image src={asset("/assets/port-pic.webp")} priority fill sizes="(max-width: 768px) 298px, 498px" alt="Portrait of Petar" className="object-contain rounded-full mix-blend-lighten" />
        </motion.div>

        {/* circle */}
        <motion.svg 
          className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]" 
          fill="transparent" 
          viewBox="0 0 506 506" 
          aria-hidden="true"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            className="stroke-accent"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="15 120 25 25"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: "center" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

export default Photo
