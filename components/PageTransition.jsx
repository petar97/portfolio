"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


const PageTransition = ({ children }) => {
    const pathname = usePathname();
    return (
        <AnimatePresence>
            <div key={pathname}>
                <motion.div className="h-screen w-screen bg-primary fixed top-0 left-0 pointer-events-none" initial={{ opacity: 1 }} animate={{ opacity: 0, transition: {delay: 1, duration: 0.3, ease: "easeInOut"} }} />
                {children}
            </div>
        </AnimatePresence>
  )
}

export default PageTransition