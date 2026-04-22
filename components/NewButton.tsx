'use client'
import React from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronsRight } from "lucide-react"
import Image from "next/image"

const NewButton = React.forwardRef<HTMLButtonElement, any>(({
    icon,
    text,
    link,
    className,
    hoverBgClass = "bg-[#F47321]",
    hoverTextClass = "group-hover:text-white",
    ...props
}, ref) => {
    const backgroundLayer = (
        <span className={`absolute inset-0 z-0 ${hoverBgClass} scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out`} />
    );

    const innerContent = (
        <span className={`relative z-10 flex group-hover:border-none items-center transition-colors duration-300 ${hoverTextClass}`}>
            {text}
            {icon ? <Image src={icon} alt='icon' width={20} height={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" /> : <ChevronsRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />}
        </span>
    );

    if (link) {
        return (
            <Button
                ref={ref}
                asChild
                className={`w-full relative overflow-hidden group mt-6 px-8 py-5 border border-black hover:border-none text-black bg-transparent font-semibold rounded-none ${className || 'md:w-fit'}`}
                {...props}
            >
                <Link href={link}>
                    {backgroundLayer}
                    {innerContent}
                </Link>
            </Button>
        )
    }

    return (
        <Button
            ref={ref}
            className={`w-full relative overflow-hidden group mt-6 px-8 py-5 border border-black hover:border-none text-black bg-transparent font-semibold rounded-none ${className || 'md:w-fit'}`}
            {...props}
        >
            {backgroundLayer}
            {innerContent}
        </Button>
    )
})

NewButton.displayName = "NewButton"

export default NewButton