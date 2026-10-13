"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const links = [
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

// trailingSlash: true may leave a trailing "/" on the pathname
export const isActive = (path, pathname) => path === (pathname.replace(/(.)\/$/, "$1"));

const Nav = () => {
    const pathname = usePathname();
    return (
        <nav className="flex gap-8">
            {links.map((link) => {
                const active = isActive(link.path, pathname);
                return (
                    <Link
                        key={link.path}
                        href={link.path}
                        aria-current={active ? "page" : undefined}
                        className={cn(active && "text-accent border-b-2 border-accent", "capitalize font-medium hover:text-accent transition-all")}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
  )
};

export default Nav
