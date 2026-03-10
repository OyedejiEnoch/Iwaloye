import Image from "next/image"

const navLinks = [
    {
        title: "About Me",
        url: "#"
    },
    {
        title: "Manifesto",
        url: "#"
    },
    {
        title: "Resources",
        url: "#"
    },
    {
        title: "News",
        url: "#"
    },
    {
        title: "Contact Us",
        url: "#"
    },
    {
        title: "Donate",
        url: "#"
    }
]

const Navbar = () => {
    return (
        <nav className="w-full px-2 py-6 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between ">
                <div>
                    <Image src='/assets/adcLogo.png' alt="logo" width={100} height={100} />
                </div>

                <div>
                    <ul className="flex space-x-4">
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                <a href={link.url} className="text-sm text-gray-500 hover:text-gray-900 hover:text-[15px] transistion duration-300">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center space-x-4">
                    <span><Image src={'/icons/facebook.png'} alt="facebook" width={30} height={30} /></span>
                    <span><Image src={'/icons/Instagram.png'} alt="facebook" width={30} height={30} /></span>
                    <span><Image src={'/icons/WhatsApp.png'} alt="facebook" width={30} height={30} /></span>
                    <span><Image src={'/icons/X.png'} alt="facebook" width={30} height={30} /></span>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
