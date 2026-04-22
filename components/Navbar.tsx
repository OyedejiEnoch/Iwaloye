"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "motion/react"
import Donate from "./Donate"

const navLinks = [
    {
        title: "Meet Ìwàlọ́yé",
        url: "/about"
    },
    {
        title: "Manifesto",
        url: "/priorities"
    },
    {
        title: "Resources",
        url: "#",
        subLinks: [
            { title: "Campaign Calendar", url: "/calender" },
            { title: "INEC Voter Verification Service", url: "https://cvr.inecnigeria.org/vvs", external: true },
            { title: "INEC Polling Unit Locator", url: "https://cvr.inecnigeria.org/pu", external: true },
        ]
    },
    {
        title: "News",
        url: "/news"
    },
    {
        title: "Contact Us",
        url: "/contact"
    },
    {
        title: "Donate",
        url: "#support"
    }
]

import { useState, useEffect } from "react"

const Navbar = () => {
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";
    const isHomePage = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Transparent when: on home page AND not scrolled. Also transparent on about page always.
    const isTransparent = isAboutPage || (isHomePage && !scrolled);

    return (
        <nav className={`w-full px-4 fixed top-0 left-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent text-white' : 'bg-white shadow-sm'}`}>
            <div className={`max-w-7xl py-6 mx-auto flex items-center justify-between ${isTransparent ? 'border-b border-white/10' : 'border-b border-gray-300'}`}>
                {isTransparent ?

                    <Link href="/">
                        <Image src='/assets/iwaloyeLogo1.png' alt="logo" width={100} height={100} />
                    </Link>
                    :

                    <Link href="/">
                        <Image src='/assets/iwaloyeLogo.png' alt="logo" width={100} height={100} />
                    </Link>
                }


                <div className="hidden md:flex">
                    <ul className="flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                {link.subLinks ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className={`flex items-center gap-1 text-sm hover:text-[15px] transition-all duration-300 font-medium cursor-pointer outline-none ${isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>
                                                {link.title}
                                                <ChevronDown size={14} />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-[420px] bg-white border border-gray-100 shadow-2xl rounded-none p-0 mt-3">
                                            {link.subLinks.map((subLink) => (
                                                <DropdownMenuItem key={subLink.title} asChild className="p-0 rounded-none cursor-pointer focus:bg-[#12A650] focus:text-white data-[highlighted]:bg-[#12A650] data-[highlighted]:text-white">
                                                    <Link
                                                        href={subLink.url}
                                                        target={subLink.external ? "_blank" : undefined}
                                                        rel={subLink.external ? "noopener noreferrer" : undefined}
                                                        className="w-full px-8 py-5 text-[15px] font-medium text-gray-800 transition-all duration-200 block"
                                                    >
                                                        {subLink.title}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : link.title === "Donate" ? (
                                    <Donate trigger={
                                        <button className={`text-sm hover:text-[15px] transition-all duration-300 font-medium ${isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>
                                            {link.title}
                                        </button>
                                    } />
                                ) : (
                                    <Link href={link.url} className={`text-sm hover:text-[15px] transition-all duration-300 font-medium ${isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>
                                        {link.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                    <a href="https://www.facebook.com/share/17MZxWnGPE/?mibextid=wwXIfr" className={`${isTransparent ? "flex items-center justify-center hover:bg-white/10" : "flex items-center justify-center"} transition-transform duration-300 hover:-translate-y-2`}><Image src={isTransparent ? '/icons/FacebookWhite.png' : '/icons/Facebook.png'} alt="facebook" width={26} height={26} /></a>
                    <a href="https://x.com/najeemfsalaam?s=11" className={`${isTransparent ? "flex items-center justify-center hover:bg-white/10" : "flex items-center justify-center"} transition-transform duration-300 hover:-translate-y-2`}><Image src={isTransparent ? '/icons/XWhite.png' : '/icons/X.png'} alt="x" width={26} height={26} /></a>
                    <a href="https://www.instagram.com/najeemsalaam?igsh=MW13bzc5M2kzbWllcQ==" className={`${isTransparent ? "flex items-center justify-center hover:bg-white/10" : "flex items-center justify-center"} transition-transform duration-300 hover:-translate-y-2`}><Image src={isTransparent ? '/icons/InstagramWhite.png' : '/icons/Instagram.png'} alt="instagram" width={26} height={26} /></a>
                    <a href="https://wa.me/2348033589733" className={`${isTransparent ? "flex items-center justify-center hover:bg-white/10" : "flex items-center justify-center"} transition-transform duration-300 hover:-translate-y-2`}><Image src={isTransparent ? '/icons/WhatsAppWhite.png' : '/icons/WhatsApp.png'} alt="whatsapp" width={26} height={26} /></a>
                    <div className={`h-6 w-[2px] ${isTransparent ? 'bg-white/60' : 'bg-black'}`} />

                    <a href="https://adc.org.ng/" target="_blank" rel="noopener noreferrer" className="ml-2 transition-transform duration-300 hover:scale-105">
                        {isTransparent ?
                            <Image src='/assets/adcWhite.png' alt="logo" width={100} height={100} />
                            :
                            <Image src='/assets/adcLogo.png' alt="logo" width={100} height={100} />
                        }
                    </a>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className={`p-2 outline-none ${isTransparent ? 'text-white' : 'text-gray-900'}`}
                    >
                        <Menu size={28} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                            className="fixed inset-0 bg-white z-50 lg:hidden flex flex-col"
                        >
                            <div className="px-6 py-4 flex items-center justify-between border-b border-black/10">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <Image src='/assets/iwaloyeLogo.png' alt="logo" width={100} height={100} />
                                </Link>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-black p-2"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="flex flex-col mt-10 flex-1 px-10 space-y-9">
                                {navLinks.map((link, index) => {
                                    const hasSubLinks = !!link.subLinks;

                                    return (
                                        <motion.div
                                            key={link.title}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex flex-col"
                                        >
                                            <div className="flex items-center justify-between">
                                                {hasSubLinks ? (
                                                    <span
                                                        className="block text-[1rem] font-gentium leading-tight text-black"

                                                    >
                                                        {link.title}
                                                    </span>
                                                ) : link.title === "Donate" ? (
                                                    <Donate trigger={
                                                        <button
                                                            className={`block text-[1rem] font-gentium leading-tight transition-colors ${pathname === link.url ? 'text-black' : 'text-black/80 hover:text-black'
                                                                }`}
                                                            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.02em' }}
                                                        >
                                                            {link.title}
                                                        </button>
                                                    } />
                                                ) : (
                                                    <Link
                                                        href={link.url}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={`block text-[1rem] font-gentium leading-tight transition-colors ${pathname === link.url ? 'text-black' : 'text-black/80 hover:text-black'
                                                            }`}
                                                        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.02em' }}
                                                    >
                                                        {link.title}
                                                    </Link>
                                                )}
                                            </div>

                                            {hasSubLinks && (
                                                <div className="flex flex-col gap-4 pl-4 pt-4 pb-2 border-l border-black/10 mt-2">
                                                    {link.subLinks?.map((subLink) => (
                                                        <Link
                                                            key={subLink.title}
                                                            href={subLink.url}
                                                            target={subLink.external ? "_blank" : undefined}
                                                            rel={subLink.external ? "noopener noreferrer" : undefined}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="text-[.8rem] text-black/60 hover:text-black transition-colors"
                                                        >
                                                            {subLink.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                                {/* <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: navLinks.length * 0.07 + 0.1 }}
                                    className="pt-10 border-t border-white/10 mt-4"
                                >
                                    <a
                                        href="https://meet.google.com/osf-ddca-ohy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-semibold uppercase text-xs tracking-[0.15em]"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-[#BF3C88] animate-pulse" />
                                        Join Our Community
                                    </a>
                                </motion.div> */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
