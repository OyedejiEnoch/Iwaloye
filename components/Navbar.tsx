"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
        url: "#"
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

const Navbar = () => {
    const pathname = usePathname();
    const isTransparent = pathname === "/about";

    return (
        <nav className={`w-full px-4 py-6 ${isTransparent ? 'absolute top-0 left-0 z-50 bg-transparent text-white' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between ">
                <Link href="/">
                    <Image src='/assets/iwaloyelogo.png' alt="logo" width={100} height={100} />
                </Link>


                <div className="hidden md:flex">
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                <Link href={link.url} className={`text-sm hover:text-[15px] transition-all duration-300 font-medium ${isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'}`}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <span className={isTransparent ? "invert brightness-200 bg-white rounded-full overflow-hidden flex items-center justify-center p-[2px]" : ""}><Image src='/icons/Facebook.png' alt="facebook" width={26} height={26} /></span>
                    <span className={isTransparent ? "invert brightness-200 bg-black rounded-full overflow-hidden flex items-center justify-center p-[2px]" : ""}><Image src='/icons/X.png' alt="x" width={26} height={26} /></span>
                    <span className={isTransparent ? "invert brightness-200 bg-black rounded-full overflow-hidden flex items-center justify-center p-[2px]" : ""}><Image src='/icons/Instagram.png' alt="instagram" width={26} height={26} /></span>
                    <span className={isTransparent ? "invert brightness-200 bg-black rounded-full overflow-hidden flex items-center justify-center p-[2px]" : ""}><Image src='/icons/WhatsApp.png' alt="whatsapp" width={26} height={26} /></span>
                    <div className="h-12 w-[0.1px] bg-white" />

                    <div className="ml-4">
                        <Image src='/assets/adcLogo.png' alt="logo" width={100} height={100} />
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
