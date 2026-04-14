'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { ChevronsRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = container.current?.children;
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      })
    }
  }, { scope: container })

  return (
    <section className='py-18 md:py-22 bg-white overflow-hidden'>
      <div ref={container} className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-7 flex-wrap '>
        <div className='flex flex-col'>
          <Image src={"/icons/aboutIcon.png"} alt='image' width={60} height={60} />

          <p className='mt-4 text-xs text-neutral-600 font-semibold'>About</p>
          <h2 className='text-3xl font-bold mt-2 font-sans'>African Democratic Congress</h2>
          <p className='mt-4 text-sm font-medium leading-relaxed'>Creating a transparent, accountable political system free from elite control.</p>
          <Button className='mt-6 bg-transparent w-full md:w-fit px-8 text-black border border-black py-5 font-semibold  rounded-none hover:bg-[#F47321] hover:text-white hover:border-[#F47321] transition-all duration-300'>
            <a href='https://adc.org.ng/'>Join the Party</a>
            <ChevronsRight className="ml-2" />
          </Button>
        </div>
        <div className='flex flex-col'>
          <Image src={"/icons/volunteerIcon.png"} alt='image' width={100} height={70} />

          <p className='mt-4 text-xs text-neutral-600 font-semibold'>Become</p>
          <h2 className='text-3xl font-bold mt-2 font-sans'>A Volunteer</h2>
          <p className='mt-4 leading-relaxed text-sm font-medium'>Your support powers our mission. Help spread the message of progress.</p>
          <Button className='mt-6 bg-transparent w-full md:w-fit px-8 text-black border border-black py-5 font-semibold rounded-none hover:bg-[#F47321] hover:border-[#F47321] hover:text-white transition-all duration-300'>
            Join the Movement
            <ChevronsRight className="ml-2" />
          </Button>
        </div>
        <div className='flex flex-col'>
          <Image src={"/icons/recognitonIcon.png"} alt='image' width={60} height={60} />

          <p className='mt-4 text-xs text-neutral-600 font-semibold'>Groups</p>
          <h2 className='text-3xl font-bold mt-2 font-sans'>Recognition</h2>
          <p className='mt-4 leading-relaxed text-sm font-medium'>Celebrating the dedicated individuals powering this movement.</p>
          <Button className='mt-6 bg-transparent w-full md:w-fit px-8 text-black border border-black py-5 font-semibold  rounded-none hover:bg-[#F47321] hover:border-[#F47321] hover:text-white transition-all duration-300'>
            Join the Movement
            <ChevronsRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default About
