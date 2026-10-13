import Link  from "next/link";
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";

const Header = () => {
    return (
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-4xl font-semibold">
                    Petar<span className="text-accent">.</span>
                </Link>
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                    <Button asChild>
                        <Link href="/contact">Hire me</Link>
                    </Button>
                </div>

                <div className="xl:hidden">
                    <MobileNav />
                </div>

            </div>
        </header>
    );
};

export default Header;
