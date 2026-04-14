'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Link2 } from 'lucide-react'
import Donate from '../Donate'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Support = () => {
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

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

    // Content reveal
    const contentElements = contentRef.current?.children;
    if (contentElements) {
      gsap.from(contentElements, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      })
    }

    // Stats area reveal
    gsap.from(statsRef.current?.children || [], {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 85%",
      },
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      stagger: 0.2,
      ease: "back.out(1.7)"
    })

    // Floating images reveal
    imagesRef.current.forEach((img, idx) => {
      if (img) {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 95%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 1.5,
          delay: idx * 0.1,
          ease: "power2.out"
        })
      }
    })

  }, { scope: container })

  return (
    <section ref={container} id='support' className='py-20 md:py-28 bg-white overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 md:px-12'>

        {/* Header */}
        <div ref={headerRef} className='text-center mb-6'>
          <h2 className='text-3xl md:text-5xl font-bold font-sans lg:text-[70px] uppercase tracking-wide text-black'>
            Support The Campaign
          </h2>
          <p className='text-xs md:text-sm italic text-black/80  mt-2'>
            &quot;Your contribution is more than a donation&quot;
          </p>
        </div>

        {/* Two-column text area */}
        <div ref={contentRef} className='flex flex-col md:flex-row justify-between items-start gap-6 mt-8 mb-14'>
          {/* Left paragraph */}
          <p className='text-[11px] md:text-[13px] leading-relaxed text-gray-700 max-w-sm italic'>
            Your contribution is more than a donation, it&apos;s a powerful statement of
            belief in fairness, progress, and a better future. Together, we can turn
            shared values into real action, strengthening a people-driven movement
            that amplifies the voice of the community.
          </p>

          {/* Right highlighted text */}
          <div className='flex flex-col items-end text-right font-gentium'>
            <span className='bg-black text-white text-lg md:text-2xl font-bold px-2 py-0.5 leading-snug inline-block'>
              Join our community for donating,
            </span>
            <span className='bg-black text-white text-lg md:text-2xl font-bold px-2 py-0.5 leading-snug inline-block mt-0.5'>
              be part of a positive change in the State.
            </span>
            <span className='bg-black text-white text-lg md:text-2xl font-bold px-2 py-0.5 leading-snug inline-block mt-0.5'>
              With over:
            </span>
          </div>
        </div>

        {/* Stats Section with Photos */}
        <div className='relative flex flex-col items-center'>
          {/* Photo Top-Left */}
          <div ref={el => { imagesRef.current[0] = el }} className='absolute -left-2 max-w-sm:-top-28 md:left-8 md:top-0 w-24 h-28 md:w-36 md:h-42 z-10'>
            <Image
              src="/assets/supportImg.png"
              alt="Community member"
              fill
              className='object-cover'
            />
          </div>

          {/* Photo Top-Right */}
          <div ref={el => { imagesRef.current[1] = el }} className='absolute right-0 md:right-8 top-0 w-24 h-28 md:w-36 md:h-40 z-10'>
            <Image
              src="/assets/supportImg4.png"
              alt="Community members"
              fill
              className='object-cover'
            />
          </div>

          {/* Big Number */}
          <div ref={statsRef} className='flex flex-col items-center z-20 gap-10'>
            <div className='mt-6 mb-2'>
              <span className='text-[80px] md:text-[140px] lg:text-[160px] font-sans font-bold text-black leading-none tracking-tight'>
                36,000+
              </span>
            </div>

            {/* Subtitle */}
            <div>


              <p className='text-sm md:text-base text-center text-black/80 tracking-wider font-semibold font-gentium mb-6'>
                people&nbsp; in our community
              </p>

              {/* Buttons */}
              <div className='flex flex-row items-center gap-4 mb-8'>
                <Link href={"/membership"} className='bg-black hover:bg-[#F47321] hover:border-[#F47321] text-white text-xs md:text-sm font-medium px-6 py-4 border border-black transition-colors tracking-wide'>
                  Join the Community
                </Link>
                <Donate />
              </div>
            </div>
          </div>

          {/* Photo Bottom-Left */}
          <div ref={el => { imagesRef.current[2] = el }} className='absolute left-4 md:left-22 -bottom-30 w-28 h-32 md:w-40 md:h-48 z-10'>
            <Image
              src="/assets/supportImg3.png"
              alt="Community members"
              fill
              className='object-cover'
            />
          </div>

          {/* Photo Bottom-Right */}
          <div ref={el => { imagesRef.current[3] = el }} className='absolute right-4 md:right-30 -bottom-8 w-24 h-28 md:w-36 md:h-40 z-10'>
            <Image
              src="/assets/supportImg2.png"
              alt="Community members"
              fill
              className='object-cover'
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Support
