"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";
import { ENTRY_DELAY } from "@/lib/animations";

const StairTransition = () => {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            {/* CSS-hidden for reduced motion so it never covers the page, even before hydration */}
            <div key={pathname} className="motion-reduce:hidden">
                <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-50 flex">
                    <Stairs />
                </div>

                <motion.div
                    className="h-screen w-screen fixed top-0 pointer-events-none bg-primary"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, transition: {delay: ENTRY_DELAY, duration: 0.3, ease: "easeInOut"}}}
                />
            </div>
        </AnimatePresence>
    )
}

export default StairTransition
