'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Candidate = ({ heading, subHeading, className }: { heading?: string, subHeading?: string, className?: string }) => {
    const container = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
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
        <section ref={container} className="w-full bg-white py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                <div ref={headerRef} className='flex flex-col'>
                    <h2 className={`text-4xl md:text-5xl font-sans lg:text-[70px] font-bold text-gray-900 tracking-tight mb-4 uppercase ${className}`}>
                        {heading || "Meet the Candidate"}
                    </h2>
                    <p className={`text-black/80 max-w-2xl font-medium mb-6 ${className} mx-auto`}>
                        {subHeading || "“Follow campaign updates, speeches, announcements, and press releases”"}
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

                        <p className='text-xs text-gray-500 tracking-wider leading-relaxed'>Dr. Najeem Folasayo Salaam, Ph.D., born on August 8, 1965, in the historic town of Ejigbo in Osun State, Nigeria, stands as a distinguished
                            figure whose life story is as compelling as it is inspiring. Marked by a rare blend of resilience, intellect, and an unwavering commitment to service, his journey began under challenging circumstances, as he was orphaned at the tender age of 10, an experience that could have defined his limits but instead ignited within him a deep well of strength, determination, and purpose. Faced with adversity at such a formative stage of life, Dr. Salaam chose not to be constrained by hardship but to rise above it, channeling his struggles into a relentless pursuit of excellence. This early test of character became the bedrock upon which he built an extraordinary life, shaping his worldview and instilling in him the discipline and perseverance that would guide his future endeavors. Through sheer determination and an unyielding belief in the transformative power of education and service, he steadily carved a path that would lead him to remarkable achievements in both academia and public life. Today, his story is not merely one of personal success but a powerful testament to the triumph of the human spirit,
                            an enduring narrative of how courage, resilience, and vision can propel an individual from the depths of early adversity to the pinnacle of political leadership and scholarly distinction.</p>

                        <div className="space-y-3">
                            <h3 className='md:text-lg lg:text-[24px] font-bold tracking-wider'>A.D.C. 2026</h3>
                            <h2 className="text-3xl md:text-4xl lg:text-[66px] font-freestyle">Salam F. Najeem</h2>
                            <p className='font-bold text-[#000000]/80 text-sm opacity-70'>For Osun State Governor</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Candidate
