'use client'

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NewButton from '../NewButton';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const leftContent = useRef<HTMLDivElement>(null);
    const rightOverlay = useRef<HTMLDivElement>(null);
    const mobileContainer = useRef<HTMLDivElement>(null);
    const scrollPrompt = useRef<HTMLDivElement>(null);
    const bgImage1Ref = useRef<HTMLImageElement>(null);
    const bgImage2Ref = useRef<HTMLImageElement>(null);
    const containerRef = container;

    useGSAP(() => {
        // Left Content Staggered reveal (desktop)
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

        // Right Overlay reveal (desktop)
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

        const mobileChildren = mobileContainer.current?.children;
        if (mobileChildren) {
            gsap.from(mobileChildren, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.4,
            });
        }

        // Scroll prompt infinite bounce
        if (scrollPrompt.current) {
            gsap.to(scrollPrompt.current, {
                y: 20,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }, { scope: container });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Image 1 (First Section) Parallax
            if (bgImage1Ref.current) {
                gsap.fromTo(
                    bgImage1Ref.current,
                    { y: '0%' },
                    {
                        y: '25%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.section-1',
                            start: 'top top',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            }

            // Background Image 2 (Second Section) Parallax
            if (bgImage2Ref.current) {
                gsap.fromTo(
                    bgImage2Ref.current,
                    { y: '-10%' },
                    {
                        y: '10%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.section-2',
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={container}>
            {/* ── MOBILE LAYOUT (hidden on md+) ── */}
            <div className="md:hidden">
                {/* Section 1: Full-screen hero */}
                <section className="section-1 relative w-full h-[100svh] overflow-hidden flex flex-col justify-center">
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            ref={bgImage1Ref}
                            src="/assets/iwaloyeHero1.png"
                            alt="Candidate"
                            fill
                            className="object-cover object-top w-full h-full"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Content — bottom-anchored like the reference image */}
                    <div ref={mobileContainer} className="absolute bottom-24 left-0 right-0 z-10 px-6">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/90 font-bold mb-4 block drop-shadow-md">
                            Together Today
                        </span>
                        <h1 className="font-sans font-bold leading-[0.9] drop-shadow-2xl mb-5" style={{ fontSize: 'clamp(2.8rem, 10vw, 4rem)' }}>
                            <span className="text-white">A </span>
                            <span className="text-[#00d65b] font-gentium">New</span>
                            <br />
                            <span className="text-white">Direction</span>
                        </h1>
                        <p className="text-[15px] font-gentium text-white/90 leading-snug max-w-[280px] text-sm mb-10 drop-shadow-lg">
                            &ldquo;The Credible Alternative, driven by vision, strong values, and a commitment to real change.&rdquo;
                        </p>
                        <button className="inline-flex items-center justify-center gap-2 bg-[#00d65b] hover:bg-[#00b24c] text-white font-bold uppercase tracking-wider text-sm px-10 py-3 transition-all active:scale-95 shadow-xl">
                            <span>Join The Movement</span>
                            <span className="ml-1 text-lg">&raquo;</span>
                        </button>
                    </div>

                    {/* Scroll prompt */}
                    <div ref={scrollPrompt} className="absolute bottom-8 left-6 flex items-center gap-3 text-sm text-gray-300 cursor-pointer group z-10">
                        <svg className="w-4 h-4 text-[#00d65b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="font-medium text-xs group-hover:text-white transition-colors">Scroll to Website</span>
                    </div>
                </section>

                {/* Section 2: Quote / Secondary CTA */}
                <section className="section-2 relative w-full overflow-hidden flex flex-col justify-center min-h-[70vh]">
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            ref={bgImage2Ref}
                            src="/assets/iwaloyeHero.png"
                            alt="Supporters gathered"
                            fill
                            className="object-cover object-top w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/65" />
                        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-6 w-full py-20 flex items-center">
                        <div className="w-full">
                            <blockquote className="border-l-4 border-[#00d65b] pl-6 mb-8">
                                <p className="font-gentium italic text-xl text-white leading-tight font-medium drop-shadow-md">
                                    &quot;Together, we can build a stronger, more prosperous Osun State — one community at a time.&quot;
                                </p>
                            </blockquote>
                            {/* <button className="inline-flex items-center justify-center bg-[#00d65b] hover:bg-[#00b24c] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 transition-colors">
                                Take Action &rarr;
                            </button> */}
                        </div>
                    </div>
                </section>
            </div>

            {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
            <section className="hidden md:flex relative w-full h-screen min-h-[600px] overflow-hidden bg-white text-white">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/mainBg.png"
                        alt="Background"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* <div className="absolute inset-0 bg-black/40 pointer-events-none" /> */}
                </div>

                {/* Main Content Container */}
                <div className="container relative z-10 w-full h-full mx-auto px-6 md:px-12 lg:px-10 flex flex-col justify-between pt-24 pb-16">

                    {/* Top Left Content */}
                    <div ref={leftContent} className="flex flex-col max-w-xl mt-6">
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">
                            Together Today
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-sans font-bold leading-[1] mb-12 text-white">
                            A New <br /> Direction
                        </h1>
                        <div>
                            {/* <button className="bg-[#00d65b] hover:bg-[#00b24c] transition-colors text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-4 px-8 flex items-center gap-3 border-none group cursor-pointer pointer-events-auto shadow-lg">
                                Join The Movement
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </button> */}
                            <NewButton text='Join The Movement' className='mt-10 bg-[#00d65b] text-white text-[10px] md:text-xs mt-1 font-bold uppercase tracking-widest py-4 px-8 w-[250px] h-[50px]' hoverBgClass='bg-white border border-black text-black' hoverTextClass='group-hover:text-black' />
                        </div>
                        <h1
                            className="font-bold mt-12 uppercase tracking-tighter select-none pointer-events-none opacity-20 whitespace-nowrap"
                            style={{
                                fontSize: 'clamp(4rem, 8vw, 8rem)',
                                WebkitTextStroke: '0.8px white',
                                color: 'transparent',
                                lineHeight: 1,
                            }}
                        >
                            OSUN STATE
                        </h1>

                    </div>

                    {/* Bottom Scroll Text */}
                    <div ref={scrollPrompt} className="flex items-center gap-3 text-sm text-gray-400 mt-auto mb-8 cursor-pointer group">
                        <svg className="w-4 h-4 text-[#00d65b] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="font-sans font-medium text-[12px] md:text-sm group-hover:text-white transition-colors">Scroll to Website</span>
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
                        <div className="text-[12px] absolute text-right font-gentium -right-10 top-4 md:text-[14px] text-gray-200 max-w-[250px] md:max-w-[380px] leading-relaxed drop-shadow-md">
                            <span className="font-bold text-white">"ADC"</span> A party on a mission to rescue Nigeria <br /> one state at a time
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
