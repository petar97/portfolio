"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

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

const Nav = memo(() => {
    const pathname = usePathname();
    return (
        <nav className="flex gap-8">
            {links.map((link) => {
                return (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`${link.path === pathname && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
  )
});

Nav.displayName = 'Nav';

export default Nav