'use client'

import { Button } from '@/components/ui/button';
import { ChevronsRight, UserPen } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGetAllNewsQuery } from '@/redux/api/detailsApi';
import NewButton from '@/components/NewButton';

gsap.registerPlugin(ScrollTrigger)

const NewsContent = [
  {
    writter: "Guru",
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg.png',
    slug: 'adc-raises-concerns-ambassadorial-nominations-1',
  },
  {
    writter: "Guru",
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg2.png',
    slug: 'adc-raises-concerns-ambassadorial-nominations-2',
  },
  {
    writter: "Guru",
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg3.png',
    slug: 'adc-raises-concerns-ambassadorial-nominations-3',
  },
  {
    writter: "Guru",
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg2.png',
    slug: 'adc-raises-concerns-ambassadorial-nominations-4',
  },
  {
    writter: "Guru",
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg3.png',
    slug: 'adc-raises-concerns-ambassadorial-nominations-5',
  }, {
    writter: "Guru",
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg3.png',
    slug: 'adc-raises-concerns-ambassadorial-nominations-6',
  },
];

const News = () => {
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, error } = useGetAllNewsQuery(null)

  useGSAP(() => {
    // Header reveal
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out"
    })

    // Grid reveal
    const cards = gridRef.current?.children;
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      })
    }
  }, { scope: container })

  return (
    <section ref={container} className="w-full bg-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className='max-w-7xl mx-auto'>
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-[100px] font-sans text-gray-900 tracking-tight mb-4 uppercase">
            NEWS
          </h2>
          <p className="text-black/80 max-w-2xl text-[20px] font-gentium font-medium mb-6 opacity-80">
            “Stay up to date with the latest announcements, updates, and official statements.”
          </p>
        </div>

        <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

          {isLoading ? [1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex flex-col animate-pulse">
              <div className="relative w-full aspect-[16/9] md:aspect-[7/3] mb-6 overflow-hidden bg-gray-200" />
              <div className='px-5'>
                <h3 className="text-[22px] font-gentium font-bold text-gray-900 mb-3 bg-gray-200 h-6 w-3/4" />
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow bg-gray-200 h-4 w-full" />
                <Button className='w-[257px] mt-4 bg-transparent text-black border border-black py-6 rounded-none hover:bg-[#F47321] hover:border-[#F47321] hover:text-white transition-all duration-300'>
                  <span className="bg-gray-200 h-4 w-20" />
                </Button>
              </div>
            </div>)) : data?.data.map((news: any, idx: number) => {
              const date = new Date(news.created_at);
              const day = date.getDate();
              const month = date.toLocaleString('en-US', { month: 'short' });

              return (
                <div key={idx} className="flex flex-col border border-black/10">
                  <Link href={`/news/${news.id}`} className="relative w-full aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={news?.image_or_media_url || "/assets/imageHolder.png"}
                      alt={news?.title || "News Article"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Date Box */}
                    <div className="absolute bottom-4 right-4 bg-white px-6 py-2 flex items-center gap-3 z-10 transition-transform duration-300 group-hover:translate-y-[-4px]">
                      <span className="text-lg font-bold text-gray-900">{day}</span>
                      <div className="w-[1px] h-5 bg-gray-400" />
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">{month}</span>
                    </div>
                  </Link>
                  <div className='border-x border-b border-gray-100 p-6 bg-white shadow-sm'>
                    <div className='flex items-center mb-4 gap-2 text-sm font-medium text-gray-500'>
                      <UserPen size={22} className="" />
                      By-{news.author_name}
                    </div>

                    <hr className='mb-4 border-gray-100' />

                    <h3 className="text-xl font-gentium font-semibold text-gray-900 mb-6 line-clamp-2 min-h-14 transition-colors">
                      {news.title}
                    </h3>
                    <NewButton text='Read All' link={`/news/${news.id}`} className="w-full md:w-60 group-hover:border-none" />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default News
