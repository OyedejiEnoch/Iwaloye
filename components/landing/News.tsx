'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Button } from '../ui/button'
import { ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGetAllNewsQuery } from '@/redux/api/detailsApi'

gsap.registerPlugin(ScrollTrigger)

const News = () => {
    const container = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const { data, isLoading} = useGetAllNewsQuery(null)

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

        // Grid cards staggered reveal
        const cards = gridRef.current?.children;
        if (cards) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            })
        }
    }, { scope: container })

    return (
        <section ref={container} className="w-full bg-white py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div ref={headerRef} className='flex flex-col text-center'>
                    <h2 className="text-4xl md:text-5xl lg:text-[70px] font-sans font-bold text-gray-900 tracking-tight mb-4 uppercase">
                        News & Publications
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium mb-6">
                        “Follow campaign updates, speeches, announcements, and press releases”
                    </p>
                </div>


                <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                    
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
                            </div>
                )) : (
                    <>
                    <Link href="/news/adc-raises-concerns-ambassadorial-nominations-1" className="group border border-black">
                        <div className="overflow-hidden bg-gray-100 aspect-video md:aspect-3.5/3 relative">
                            <Image src={"/assets/imageHolder.png"} alt='news thumbnail' fill className="object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className='space-y-4 mt-6 px-5 pb-10'>
                            <h2 className='font-gentium font-semibold text-lg  transition-colors'>Candidate launches Community Dialogue Tour</h2>
                            <p className='text-sm text-[#000000]/80 line-clamp-2'>A campaign initiative designed to meet citizens, understand their concerns, and build solutions together.</p>
                        </div>
                    </Link>
                    <Link href="/news/adc-raises-concerns-ambassadorial-nominations-2" className="group bg-black border border-black">
                        <div className="overflow-hidden bg-gray-100 aspect-video md:aspect-3.5/3 relative">
                            <Image src={"/assets/imageHolder.png"} alt='news thumbnail' fill className="object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className='space-y-4 mt-6 px-5 pb-10  text-white'>
                            <h2 className='font-gentium font-semibold text-lg  transition-colors'>New Economic Plan Announced for Local Businesses</h2>
                            <p className='text-sm  text-white/40 line-clamp-2'>A bold roadmap to support small enterprises and stimulate economic growth.</p>
                        </div>
                    </Link>
                    <Link href="/news/adc-raises-concerns-ambassadorial-nominations-3" className="group border border-black">
                        <div className="overflow-hidden bg-gray-100 aspect-video md:aspect-3.5/3 relative">
                            <Image src={"/assets/imageHolder.png"} alt='news thumbnail' fill className="object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className='space-y-4 mt-6 px-5 pb-10'>
                            <h2 className='font-gentium font-semibold text-lg  transition-colors'>The Youth Empowerment Program Unveiled</h2>
                            <p className='text-sm text-[#000000]/80 line-clamp-2'>A plan focused on tech training, mentorship, and job creation for young people.</p>
                        </div>
                    </Link>

                </>
                ) }
                </div>

                <div className='mt-20 flex justify-center'>
                    <Link href="/news">
                        <Button className='w-full md:w-fit px-12 border border-black py-6 rounded-none bg-black text-white hover:bg-black hover:text-white transition-all'>
                            View All News
                            <ChevronsRight className="ml-2" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default News
