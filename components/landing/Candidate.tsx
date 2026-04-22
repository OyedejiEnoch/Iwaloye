'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import NewButton from '../NewButton'

gsap.registerPlugin(ScrollTrigger)

const Candidate = ({ heading, subHeading, text, className, about = false }: { heading?: string, subHeading?: string, text?: string, className?: string, about?: boolean }) => {
    const [mounted, setMounted] = React.useState(false)
    const container = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    useGSAP(() => {
        if (!mounted) return;
        // Header reveal
        gsap.from(headerRef.current, {
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 90%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        })

        // Image slide in from left
        gsap.from(imageRef.current, {
            scrollTrigger: {
                trigger: imageRef.current,
                start: "top 85%",
            },
            opacity: 0,
            x: -50,
            duration: 1.2,
            ease: "power3.out"
        })

        // Content slide in from right
        const contentElements = contentRef.current?.children;
        if (contentElements) {
            gsap.from(contentElements, {
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 85%",
                },
                opacity: 0,
                x: 50,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            })
        }
    }, { scope: container })

    return (
        <section ref={container} className="w-full bg-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                <div ref={headerRef} className='flex flex-col'>
                    <h2 className={`text-4xl md:text-5xl font-sans lg:text-[70px] font-bold text-gray-900 tracking-tight mb-2 uppercase ${className}`}>
                        {heading || "Meet the Candidate"}
                    </h2>
                    <p className={`text-black/80 font-medium mb-6 text-sm ${className}`}>
                        {subHeading || "“The Credible Alternative, driven by vision, strong values, and a commitment to real change.”"}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-8'>
                    <div ref={imageRef}>
                        <Image src={"/assets/iwaloye1.png"} alt='image' width={500} height={500} className="object-cover" />
                    </div>

                    <div ref={contentRef} className='flex flex-col space-y-5'>
                        <h3 className='uppercase text-2xl md:text-3xl font-gentium font-bold leading-tight'>PROGRESS.
                            <br />
                            FORWARD MOMENTUM. <br />
                            GETTING THINGS DONE.</h3>

                        <p className='text-xs text-gray-500 italic tracking-wider leading-relaxed'>{text ? text : "Dr. Najeem Folasayo Salaam, Ph.D., born on August 8, 1965, in the historic town of Ejigbo in Osun State, Nigeria, stands as a distinguished figure whose life story is as compelling as it is inspiring. Marked by a rare blend of resilience, intellect, and an unwavering commitment to service, his journey began under challenging circumstances, as he was orphaned at the tender age of 10, an experience that could have defined his limits but instead ignited within him a deep well of strength..."} </p>

                        <div className="space-y-3">
                            <div className='flex items-end gap-2 h-fit'>
                                <h3 className='md:text-lg lg:text-[24px] font-bold tracking-wider'>A.D.C. 2026</h3>
                                <div className='w-[139px] h-[1.5px] bg-[#F47321] mb-3' />
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[66px] font-freestyle">Salaam F. Najeem</h2>
                            <p className='font-bold text-[#000000]/80 text-sm opacity-70'>For Osun State Governor</p>
                        </div>

                        {mounted && !about && (
                            <NewButton text='Read More' link='/about' className="w-[148px] h-[62px] bg-black text-white" hoverBgClass="bg-white border border-black" hoverTextClass="group-hover:text-black" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Candidate
