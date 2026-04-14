'use client'

import { useRef } from 'react';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useGetAllVisionQuery } from '@/redux/api/detailsApi';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export const features = [
  {
    title: 'Equality and solidarity',
    description: 'A bold roadmap to support small enterprises and stimulate economic growth.',
    image: '/assets/img1.png',
  },
  {
    title: 'Gender and future',
    description: 'A bold roadmap to support small enterprises and stimulate economic growth.',
    image: '/assets/img2.png',
  },
  {
    title: 'Asylum and migration',
    description: 'A bold roadmap to support small enterprises and stimulate economic growth.',
    image: '/assets/img3.png',
  },
];

export default function Mission() {
  const container = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetAllVisionQuery(null)
  // data?.data

  useGSAP(() => {
    // Header reveal
    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 90%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out"
    });

    // Grid cards staggered reveal
    const cards = gridRef.current?.children;
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }

    // Banner reveal
    gsap.from(bannerRef.current, {
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 90%",
      },
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-white py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-[70px] font-sans font-bold text-gray-900 tracking-tight mb-4 uppercase">
            My vision for Osun state
          </h2>
          <p className="max-w-2xl mb-6">
            "A clear roadmap for a fairer, stronger, and more inclusive future for every citizen."
          </p>
        </div>

        {/* 3-Column Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-24">
          {isLoading ? [1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex flex-col group animate-pulse">
              <div className="relative w-full aspect-[16/9] md:aspect-[7/3] mb-6 overflow-hidden bg-gray-200" />
              <div className='px-5'>
                <h3 className="text-[22px] font-gentium font-bold text-gray-900 mb-3 bg-gray-200 h-6 w-3/4" />
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow bg-gray-200 h-4 w-full" />
                <Button className='w-[257px] mt-4 bg-transparent text-black border border-black py-6 rounded-none hover:bg-[#F47321] hover:border-[#F47321] hover:text-white transition-all duration-300'>
                  <span className="bg-gray-200 h-4 w-20" />
                </Button>
              </div>
            </div>))
            :
            data?.data.map((feature: any, idx: number) => (
              <div key={idx} className="flex flex-col group">
                <div className="relative w-full aspect-[16/9] md:aspect-[7/3] mb-6 overflow-hidden bg-gray-100">
                  <Image
                    src={feature?.banner_image_url}
                    alt={feature?.title}
                    width={200}
                    height={200}
                    className="object-cover w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className='px-5'>
                  <h3 className="text-[22px] font-gentium font-bold text-gray-900 mb-3">
                    {feature?.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                    {feature?.description}
                  </p>
                  <Button className='w-[257px] mt-4 bg-transparent text-black border border-black py-6 rounded-none hover:bg-[#F47321] hover:border-[#F47321] hover:text-white transition-all duration-300'>
                    <Link href={'/priorities'}>
                      Read All
                    </Link>
                    <ChevronsRight size={36} className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
        </div>

        {/* Manifesto Banner */}
        <div ref={bannerRef} className="relative w-full bg-[#f4f4f4] flex flex-col md:flex-row items-center justify-between px-8 py-10 md:py-11 border border-black shadow-sm mt-10 min-h-[158px]">
          {/* Left text */}
          <Image src="/assets/rectangle.png" alt='image' fill className='absolute inset-0' />

          <div className="md:w-1/3 z-10 mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
              Everything that becomes true starts with a manifesto
            </h3>
          </div>

          {/* Center Image (Absolute on md and up, relative on small) */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-0 z-0 h-48 md:h-[130%] lg:h-[140%] flex items-end">
            <div className="relative w-[190px] md:w-[320px] h-[200px]">
              <Image
                src="/assets/iwaloye2.png"
                alt="Candidate Portrait"
                fill
                className="object-cover object-bottom drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Button */}
          <div className="md:w-1/3 z-10 flex justify-center md:justify-end mt-4 md:mt-0">
            <button className="bg-black text-white hover:bg-gray-900 transition-colors flex items-center justify-center py-4 px-6 min-w-[351px] min-h-[85px] gap-5">
              <span className="text-lg font-medium">Download Manifesto</span>
              <Image src={"/icons/Note.png"} alt='icon' width={30} height={30} />

            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
