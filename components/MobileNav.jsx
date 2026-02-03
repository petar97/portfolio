"use client";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {CiMenuFries} from 'react-icons/ci'
import { useState, memo, useMemo } from "react";

const links = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "resume",
        path: "/resume",
    },
    {
        name: "work",
        path: "/work",
    },
    {
        name: "contact",
        path: "/contact",
    },
];

const MobileNav = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = useMemo(() => (
        links.map((link) => (
            <Link
                key={link.path}
                href={link.path}
                className={`${link.path === pathname && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
                onClick={() => setIsOpen(false)}
            >
                {link.name}
            </Link>
        ))
    ), [pathname]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={() => setIsOpen(!isOpen)}>
                <CiMenuFries className="text-[32px] text-accent" />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <div className="mt-20 mb-20 text-center text-2xl">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <h1 className="text-4xl font-semibold">
                            Petar<span className="text-accent">.</span>
                        </h1>
                    </Link>
                </div>
                <nav className="flex flex-col gap-8 justify-center items-center">
                    {navLinks}
                </nav>
            </SheetContent>
        </Sheet>
    )
});

MobileNav.displayName = 'MobileNav';

export default MobileNav
