'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { ChevronsRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import NewButton from '../NewButton'

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
      <div ref={container} className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-18 md:gap-9 flex-wrap '>
        <div className='flex flex-col max-sm:items-center'>
          <Image src={"/icons/aboutIcon.png"} alt='image' width={60} height={60} />

          {/* <p className='mt-4 text-xs text-neutral-600 font-semibold'>About</p> */}
          <h2 className='text-[30px] md:text-[26px] font-bold mt-2 font-sans mt-6 max-sm:text-center'>African Democratic Congress</h2>
          <p className='mt-4 text-sm font-medium leading-relaxed max-sm:text-center'>Creating a transparent, accountable political system free from elite control.</p>
          <div className='max-w-2xl md:w-full'>
            <NewButton text='Join the Party' link='https://adc.org.ng/' target="_blank" rel="noopener noreferrer" />
          </div>
        </div>
        <div className='flex flex-col max-sm:items-center'>
          <Image src={"/icons/volunteerIcon.png"} alt='image' width={100} height={70} />

          {/* <p className='mt-4 text-xs text-neutral-600 font-semibold'>Become</p> */}
          <h2 className='text-[30px] md:text-[26px]  font-bold mt-2 font-sans mt-6 max-sm:text-center'>Become A Volunteer</h2>
          <p className='mt-4 leading-relaxed text-sm font-medium max-sm:text-center'>Your support powers our mission. Help spread the message of progress.</p>
          <div className='max-w-2xl md:w-full'>
            <NewButton text='Join the Movement' link='/membership' />
          </div>
        </div>
        <div className='flex flex-col max-sm:items-center'>
          <Image src={"/icons/recognitonIcon.png"} alt='image' width={60} height={60} />

          {/* <p className='mt-4 text-xs text-neutral-600 font-semibold'>Groups</p> */}
          <h2 className='text-[30px] md:text-[26px]  font-bold mt-2 font-sans mt-6 max-sm:text-center'>Support Groups</h2>
          <p className='mt-4 leading-relaxed text-sm font-medium max-sm:text-center'>Celebrating the dedicated individuals powering this movement.</p>
          <div className='max-w-2xl md:w-full'>
            <NewButton text='View Groups' link='' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
