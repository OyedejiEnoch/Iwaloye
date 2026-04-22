"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import Candidate from "@/components/landing/Candidate";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const text = `  Dr. Najeem Folasayo Salaam, Ph.D., born on August 8, 1965, in the historic town of Ejigbo in Osun State, Nigeria, stands
                        as a distinguished figure whose life story is as compelling as it is inspiring. Marked by a rare blend of resilience, intellect,
                        and an unwavering commitment to service, his journey began under challenging circumstances, as he was orphaned at the tender age of 10,
                        an experience that could have defined his limits but instead ignited within him a deep well of strength, determination, and purpose.
                        Faced with adversity at such a formative stage of life, Dr. Salaam chose not to be constrained by hardship but to rise above it,
                        channeling his struggles into a relentless pursuit of excellence. This early test of character became the bedrock upon which he built an
                        extraordinary life, shaping his worldview and instilling in him the discipline and perseverance that would guide his future endeavors.
                        Through sheer determination and an unyielding belief in the transformative power of education and service, he steadily carved a path that
                        would lead him to remarkable achievements in both academia and public life. Today, his story is not merely one of personal success but a
                        powerful testament to the triumph of the human spirit, an enduring narrative of how courage, resilience, and vision can propel an
                        individual from the depths of early adversity to the pinnacle of political leadership and scholarly distinction.`

export default function AboutPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLDivElement>(null);
    const serviceRef = useRef<HTMLDivElement>(null);
    const impactRef = useRef<HTMLDivElement>(null);
    const statsContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Image Zoom-out on load
        gsap.fromTo(heroImageRef.current,
            { scale: 1.3 },
            { scale: 1, duration: 2.5, ease: "power2.out" }
        );

        // Hero Text reveal
        gsap.from(heroTextRef.current?.children || [], {
            opacity: 0,
            y: 40,
            stagger: 0.3,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5
        });

        // Content Section reveals
        const sections = [educationRef, serviceRef, impactRef];
        sections.forEach((section) => {
            if (section.current) {
                gsap.from(section.current, {
                    scrollTrigger: {
                        trigger: section.current,
                        start: "top 85%",
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });

        // Individual Stat Staggered Entrance
        const statItems = statsContainerRef.current?.querySelectorAll('.stat-item');
        if (statItems) {
            gsap.from(statItems, {
                scrollTrigger: {
                    trigger: statsContainerRef.current,
                    start: "top 85%",
                },
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        // Stats counting animation (remains synchronized)
        const stats = statsContainerRef.current?.querySelectorAll('.stat-number');
        stats?.forEach((stat: any) => {
            const targetVal = parseInt(stat.getAttribute('data-target') || '0');
            const countObj = { val: 0 };
            gsap.to(countObj, {
                val: targetVal,
                scrollTrigger: {
                    trigger: stat,
                    start: "top 90%",
                },
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    stat.innerText = Math.floor(countObj.val);
                }
            });
        });

    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div ref={heroImageRef} className="absolute inset-0 z-0 bg-black/20">
                    <Image
                        src="/assets/iwaloye.png"
                        alt="Dr. Salaam"
                        fill
                        className="object-cover object-center mix-blend-overlay"
                        priority
                    />
                </div>

                {/* Hero Text */}
                <div ref={heroTextRef} className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full mt-20">
                    <div className="max-w-2xl">
                        <p className="text-lg md:text-xl font-medium text-[#8BC34A] mb-2 font-poppins">
                            The Resilient Trailblazer
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-8 tracking-wide drop-shadow-lg">
                            MEET ÌWÀLÓYÈ
                        </h1>
                        <button className="bg-white text-black font-semibold py-4 px-6 flex items-center gap-2 hover:bg-gray-100 transition-colors text-sm">
                            Download Manifesto <FileText className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </section>

            <Candidate heading="ÌWÀLÓYÈ" subHeading="“A Legacy of Leadership, Scholarship, and Service.”" text={text} className="text-center" about={true} />

            {/* Body Content */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-12 md:space-y-24">

                {/* Early Life and Education */}

                <div ref={educationRef} className="text-left md:text-center pt-4 pb-10">
                    <div className="flex items-start md:items-center justify-start md:justify-center gap-2 max-sm:px-4 mb-8 mx-auto w-fit">
                        <span className="flex w-[7px] h-[7px] bg-[#ff8a00] shrink-0 mt-3 max-sm:-ml-10"></span>
                        <h2 className="text-2xl md:text-3xl  font-bold font-gentium text-gray-900 text-left">
                            Early Life and Education
                        </h2>
                    </div>

                    <p className="text-[#364153] font-inter leading-loose text-sm md:text-base text-left md:text-center px-4 md:px-0 font-light">
                        Despite facing the profound loss of his parents at a tender age, Dr. Salaam demonstrated an extraordinary resilience and an unwavering commitment to education that would define the course of his life. His academic journey began at Ansar-U-Deen Primary School in Ejigbo and continued through Baptist School in Ola, culminating at Baptist High School in Ejigbo, where his exceptional dedication to learning began to shine. Driven by an insatiable curiosity and an unrelenting thirst for knowledge,
                        he pursued higher education at the prestigious Obafemi Awolowo University in Ile-Ife, earning a Bachelor of Science degree in Political Science in 1993. Not one to rest on his laurels, Dr. Salaam continued to expand his intellectual horizons, obtaining
                        a Master&apos;s degree in 2013, and further pushing the boundaries of his expertise, he achieved the ultimate academic distinction by completing a Doctor of Philosophy (Ph.D.) in Political Science in 2018. His journey is a testament not only to his remarkable perseverance and intellectual rigor but also to the power of determination and vision in overcoming adversity and reaching the pinnacle of scholarly achievement, inspiring countless others to pursue excellence against all odds.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* Degree Cards */}
                        <div className="border-t border-r border-l border-green-200 p-8 flex flex-col items-center justify-center gap-3 min-h-[140px]">
                            <h3 className="text-green-500 text-xs font-semibold uppercase tracking-wider">Bachelor's Degree</h3>
                            <p className="text-gray-800 font-medium text-sm">B.Sc. Political Science</p>
                            <span className="text-gray-400 text-xs font-medium mt-1">1993</span>
                        </div>
                        <div className="border-t border-r border-l border-green-200 p-8 flex flex-col items-center justify-center gap-3 min-h-[140px]">
                            <h3 className="text-green-500 text-xs font-semibold uppercase tracking-wider">Master's Degree</h3>
                            <p className="text-gray-800 font-medium text-sm">M.Sc. Political Science</p>
                            <span className="text-gray-400 text-xs font-medium mt-1">2013</span>
                        </div>
                        <div className="border-t border-r border-l border-green-200 p-8 flex flex-col items-center justify-center gap-3 min-h-[140px]">
                            <h3 className="text-green-500 text-xs font-semibold uppercase tracking-wider">Doctorate</h3>
                            <p className="text-gray-800 font-medium text-sm">Ph.D. Political Science</p>
                            <span className="text-gray-400 text-xs font-medium mt-1">2018</span>
                        </div>
                    </div>
                </div>

                {/* A Defining Era in Public Service */}
                <div ref={serviceRef} className="text-left md:text-center pt-4 pb-16">
                    <div className="flex items-start md:items-center justify-center gap-2  max-sm:px-4 mb-8 mx-auto w-fit">
                        <span className="flex w-[7px] h-[7px] bg-[#ff8a00] shrink-0 mt-3"></span>
                        <h2 className="text-2xl md:text-3xl font-bold font-gentium text-gray-900 text-left">
                            A Defining Era in Public Service
                        </h2>
                    </div>
                    <p className="text-[#364153] font-inter leading-loose text-sm md:text-base text-left md:text-center px-4 md:px-0 font-light">
                        In 2007, Dr. Salaam was elected to the Osun State House of Assembly, a remarkable milestone that was temporarily interrupted by an annulment of his election in 2009. Undeterred, he reclaimed his mandate in the 2011 elections and was elected Speaker of the Assembly on June 2, 2011. During his eight-year tenure, he presided over a transformative legislative reforms, addressing critical issues such as public health, urban development, and security. Under his leadership the Assembly achieved legislative harmony and effectiveness, solidifying his reputation as a unifying and visionary leader.
                    </p>

                    <div ref={statsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 max-w-4xl mx-auto mt-12 px-4 md:px-0 text-left">
                        {/* Stat 1 */}
                        <div className="flex flex-col items-start md:items-center md:gap-4 lg:gap-6 stat-item">
                            <div className="flex items-center gap-2 mb-2 md:mb-0">
                                <span className="text-7xl md:text-[110px] font-bold font-sans text-gray-900 leading-none stat-number" data-target="20">0</span>
                                <div className="flex flex-col">
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 leading-none">Years</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 leading-none mt-1">Experience</span>
                                </div>
                            </div>
                            <p className="text-xs text-black/80 underline decoration-gray-400 underline-offset-4 mt-2 md:mt-0 font-medium max-w-[200px] leading-relaxed">
                                A proven record of leadership, legislative excellence, and public trust
                            </p>
                        </div>

                        <div className="space-y-10">
                            {/* Stat 2 */}
                            <div className="flex flex-col items-start pt-2 md:pt-4 stat-item">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-[60px] font-bold font-sans text-gray-900 leading-none stat-number" data-target="8">0</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 pb-1">Years</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium">As Speaker of Osun State House of Assembly</p>
                            </div>

                            {/* Stat 3 */}
                            <div className="flex flex-col items-start stat-item">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-[60px] font-bold font-sans text-gray-900 leading-none stat-number" data-target="2">0</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 pb-1">Elections Won</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium max-w-[300px]">2 Elections Won &ndash; 2007 &amp; 2011 (comeback story adds weight)</p>
                            </div>

                            {/* Stat 4 */}
                            <div className="flex flex-col items-start stat-item">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-[60px] font-bold font-sans text-gray-900 leading-none stat-number" data-target="3">0</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 pb-1">Key Reform Areas</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium">Health, Urban Development, Security</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Driven by Determination... */}
                <div ref={impactRef} className="text-left md:text-center pt-4 pb-16">
                    <div className="flex items-start md:items-center justify-center gap-2  max-sm:px-4 mb-8 mx-auto w-fit">
                        <span className="flex w-[7px] h-[7px] bg-[#ff8a00] shrink-0 mt-3"></span>
                        <h2 className="text-2xl md:text-3xl font-bold font-gentium text-gray-900 text-left">
                            Driven by Determination, Defined by Achievement
                        </h2>
                    </div>
                    <p className="text-[#364153] font-inter leading-loose text-sm md:text-base text-left md:text-center px-4 md:px-0 font-light">
                        Dr. Salaam&apos;s influence extends far beyond the realm of politics, marking him as a prolific thinker, writer, and leader whose impact resonates across multiple domains. In 2019, he co-authored the widely recognized textbook Rudiments of Government and Politics, earning respect in both academic and professional circles for his intellectual contributions. His dedication to service has been celebrated through numerous honors, including his induction as Patron of the Sports Writers Association of Nigeria (SWAN), Osun State Chapter, and his recognition as Asiwaju Adinni and Olu Omo of Ejigboland, reflecting both his faith and commitment to community leadership. Following his tenure as Speaker, Dr. Salaam assumed a pivotal role as Executive Director of Marketing and Business Development at Nigeria Communications Satellite Limited (NigComSat), continuing to shape Nigeria&apos;s telecommunications landscape. From an orphaned child in Ejigbo to a trailblazer in politics and academia, his life story is a testament to resilience, determination, and faith, inspiring audiences worldwide through his insights, engagement, and leadership. He is happily married with children, continuing to serve as a beacon of hope and a model of excellence for generations to come.
                    </p>
                </div>

            </section>
        </div>
    );
}