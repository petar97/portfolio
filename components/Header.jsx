"use client";

import { useEffect, useRef, useState } from "react";
import Link  from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

// Condensing uses transforms only, so the header's layout height never changes and the page
// can't jump: the bar slides up by --header-pad, the row moves down half of that to stay centred
const condense = "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out";

const Header = () => {
    const marker = useRef(null);
    const [condensed, setCondensed] = useState(false);

    // Condensed whenever the top of the page is out of view (no scroll listener needed)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setCondensed(!entry.isIntersecting));
        observer.observe(marker.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div ref={marker} aria-hidden="true" className="absolute top-0 w-px h-px" />
            <header
                data-condensed={condensed}
                className="group sticky top-0 z-header py-[--header-pad] text-white motion-safe:transition-[transform,background-color] motion-safe:duration-300 motion-safe:ease-out data-[condensed=true]:-translate-y-[--header-pad] data-[condensed=true]:bg-primary/80 data-[condensed=true]:backdrop-blur-md data-[condensed=true]:shadow-[0_1px_0_rgb(255_255_255/0.06)]"
            >
                <div className={`container mx-auto h-[--header-row] flex justify-between items-center ${condense} group-data-[condensed=true]:translate-y-[calc(var(--header-pad)/2)]`}>
                    <Link href="/" className={`text-4xl font-semibold origin-left ${condense} group-data-[condensed=true]:scale-[0.85]`}>
                        Petar<span className="text-accent">.</span>
                    </Link>
                    <div className="hidden xl:flex items-center gap-8">
                        <Nav />
                    </div>

                    <div className="xl:hidden">
                        <MobileNav />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
