'use client'

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const heroImage = useRef<HTMLDivElement>(null);
    const leftContent = useRef<HTMLDivElement>(null);
    const rightOverlay = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Image Entrance
        gsap.from(heroImage.current, {
            scale: 1.2,
            duration: 2.5,
            ease: "power2.out",
        });

        // Left Content Staggered reveal
        const leftElements = leftContent.current?.children;
        if (leftElements) {
            gsap.from(leftElements, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                delay: 0.5,
            });
        }

        // Right Overlay reveal
        const rightElements = rightOverlay.current?.children;
        if (rightElements) {
            gsap.from(rightElements, {
                opacity: 0,
                x: 100,
                duration: 1.5,
                stagger: 0.3,
                ease: "power3.out",
                delay: 1,
            });
        }
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full h-screen min-h-[600px] flex overflow-hidden bg-black text-white">
            {/* Large Background Text "OSUN STATE" */}
            <div className="absolute left-6 bottom-10 z-0 whitespace-nowrap opacity-15 select-none pointer-events-none hidden md:block">
                <span className="text-[12rem] lg:text-[16rem] font-bold tracking-tighter" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>
                    OSUN STATE
                </span>
            </div>

            {/* Right Image Background with slanted edge */}
            <div
                ref={heroImage}
                className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0"
                style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
                <Image
                    src="/assets/iwaloye.png"
                    alt="Candidate speaking at podium"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Subtle dark gradient/overlay if needed */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Main Content Container */}
            <div className="container relative z-10 w-full h-full mx-auto px-6 md:px-12 lg:px-18 flex flex-col justify-between pt-18 pb-16">

                {/* Top Left Content */}
                <div ref={leftContent} className="flex flex-col max-w-xl mt-8">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">
                        Together Today
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-bold leading-[1.1] mb-12 text-white">
                        A New <br /> Direction
                    </h1>
                    <div>
                        <button className="bg-[#00d65b] hover:bg-[#00b24c] transition-colors text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-4 px-8 flex items-center gap-3 border-none group cursor-pointer pointer-events-auto">
                            Join The Movement
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Bottom Scroll Text */}
                <div className="flex items-center gap-3 text-sm text-gray-400 mt-auto">
                    <svg className="w-4 h-4 text-[#00d65b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="font-sans font-medium text-[12px] md:text-sm">Scroll to Website</span>
                </div>
            </div>

            {/* Right Side Overlay Texts */}
            <div ref={rightOverlay} className="absolute bottom-12 md:bottom-24 right-6 md:right-12 lg:right-28 z-10 flex flex-col items-end md:items-start text-right md:text-left pointer-events-none">
                <div className="flex relative flex-col md:flex-row items-end md:items-center gap-4">
                    <h2 className="font-sans text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[0.9] text-white drop-shadow-2xl">
                        <span className="block mb-1">The</span>
                        Real Change
                    </h2>
                    {/* Caption text */}
                    <div className="text-[9px] absolute -right-10 top-4 md:text-[14px] text-gray-200 max-w-[250px] md:max-w-[380px] leading-relaxed drop-shadow-md">
                        <span className="font-bold text-white ">"ADC"</span> A party on a mission to rescue Nigeria <br /> one state at a time
                    </div>
                </div>
            </div>

        </section>
    );
}
