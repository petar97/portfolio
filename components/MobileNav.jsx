"use client";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {CiMenuFries} from 'react-icons/ci'
import { useState } from "react";
import { cn } from "@/lib/utils";
import { links, isActive } from "./Nav";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger aria-label="Open menu">
                <CiMenuFries className="text-[32px] text-accent" />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <div className="mt-20 mb-20 text-center text-2xl">
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-4xl font-semibold">
                        Petar<span className="text-accent">.</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-8 justify-center items-center">
                    {links.map((link) => {
                        const active = isActive(link.path, pathname);
                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                aria-current={active ? "page" : undefined}
                                className={cn(active && "text-accent border-b-2 border-accent", "text-xl capitalize hover:text-accent transition-all")}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
};

export default MobileNav
