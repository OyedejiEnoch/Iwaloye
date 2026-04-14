"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const galleryData = [
    {
        id: "01",
        title: "LUNCH DAY!",
        subtitle: "The moments between the milestones.",
        images: [
            "/assets/imageHolder.png",
            "/assets/imageHolder.png",
            "/assets/imageHolder.png",
            "/assets/imageHolder.png",
        ]
    },
    {
        id: "02",
        title: "HOW DO I BECOME A MEMBER?",
        subtitle: "Join our movement and make a difference in your community.",
        images: [
            "/assets/imageHolder.png",
            "/assets/imageHolder.png",
        ]
    },
    {
        id: "03",
        title: "HOW DO I BECOME A MEMBER?",
        subtitle: "Discover the multiple pathways to active participation.",
        images: []
    },
    {
        id: "04",
        title: "HOW DO I BECOME A MEMBER?",
        subtitle: "Find out more about our registration process.",
        images: []
    },
    {
        id: "05",
        title: "HOW DO I BECOME A MEMBER?",
        subtitle: "Connect with leaders and fellow members today.",
        images: []
    }
];

export default function GalleryPage() {
    const [openIndex, setOpenIndex] = useState<string>("01");

    const toggleAccordion = (id: string) => {
        setOpenIndex((prev) => (prev === id ? "" : id));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
                <h1
                    className="text-6xl md:text-7xl mb-6 text-[#101828] font-sans"
                >
                    GALLERY
                </h1>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--gentium-font)' }}>
                    "Our story is written in laughter and shared victories. Step inside our highlights
                    and see the heart behind the work"
                </p>
            </section>

            {/* Accordion Section */}
            <section className="max-w-6xl mx-auto px-6 pb-32">
                <div className="w-full h-px bg-gray-200 mb-8" />

                <div className="flex flex-col">
                    {galleryData.map((item, index) => {
                        const isOpen = openIndex === item.id;

                        return (
                            <div
                                key={item.id}
                                className="border-b border-gray-200 py-6 md:py-8 transition-colors"
                            >
                                {/* Accordion Trigger */}
                                <div
                                    className="flex items-start md:items-center cursor-pointer group"
                                    onClick={() => toggleAccordion(item.id)}
                                >
                                    {/* Chevron Left */}
                                    <div className="mr-6 md:mr-10 mt-1 md:mt-0 transition-transform duration-300">
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-black" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                                        )}
                                    </div>

                                    {/* Content Middle */}
                                    <div className="flex-1 pr-6">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 tracking-wide uppercase">
                                            {item.title}
                                        </h3>
                                        {isOpen && item.subtitle && (
                                            <p className="text-gray-500 text-sm mt-3.5" style={{ fontFamily: 'var(--inter-font)' }}>
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    {/* Index Right */}
                                    <div className="ml-4 flex items-center justify-center">
                                        <div className="text-base md:text-lg font-bold text-black origin-center rotate-90 tracking-widest">
                                            {item.id}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content Area (Images) */}
                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-12 mb-4" : "grid-rows-[0fr] opacity-0 mt-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="pl-12 md:pl-16 pr-8">
                                            {item.images && item.images.length > 0 ? (
                                                <>
                                                    <div className="flex flex-row flex-nowrap items-center justify-between gap-4 overflow-x-auto pb-8 xl:overflow-x-visible no-scrollbar">
                                                        {item.images.map((imgSrc, imgIndex) => {
                                                            // Custom rotations for the polaroid effect
                                                            const rotations = [
                                                                "-rotate-6 sm:-translate-y-4",
                                                                "rotate-3 sm:translate-y-2",
                                                                "-rotate-2 sm:translate-y-8",
                                                                "rotate-6 sm:-translate-y-2"
                                                            ];
                                                            const rotationClass = rotations[imgIndex % 4];

                                                            return (
                                                                <div
                                                                    key={imgIndex}
                                                                    className={`flex-shrink-0 bg-white p-2 shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-[200px] h-[260px] md:w-[240px] md:h-[300px] lg:w-[250px] lg:h-[320px] transition-transform duration-500 hover:scale-105 hover:z-10 ${rotationClass}`}
                                                                >
                                                                    <div className="w-full h-full relative bg-gray-100 overflow-hidden">
                                                                        <Image
                                                                            src={imgSrc}
                                                                            alt={`Gallery image ${imgIndex + 1}`}
                                                                            fill
                                                                            className="object-cover relative z-10"
                                                                            unoptimized
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                    <div className="mt-14 mb-4">
                                                        <Link href={`/gallery/${item.id}`} className="inline-flex items-center gap-3 text-sm font-medium text-gray-900 group">
                                                            View full gallery
                                                            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        </Link>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-lg">
                                                    <p className="text-gray-400 italic">No images currently available for this section.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}