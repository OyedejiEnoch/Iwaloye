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
import NewButton from '../NewButton'

gsap.registerPlugin(ScrollTrigger)

const News = () => {
    const container = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const { data, isLoading } = useGetAllNewsQuery(null)

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
                    <h2 className="text-4xl md:text-5xl lg:text-[70px] font-sans font-bold text-gray-900 tracking-tight mb-2 uppercase">
                        News & Publications
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium mb-6 text-sm">
                        “Follow campaign updates, speeches, announcements, and press releases”
                    </p>
                </div>


                <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>

                    {isLoading ? [1, 2, 3].map((_, idx) => {
                        const isMiddle = idx === 1;
                        return (
                            <div key={idx} className={`flex flex-col group animate-pulse border border-black ${isMiddle ? 'bg-black' : 'bg-white'}`}>
                                <div className="relative w-full aspect-video md:aspect-3.5/3 mb-6 overflow-hidden bg-gray-200" />
                                <div className={`px-5 pb-10 ${isMiddle ? 'text-white' : ''}`}>
                                    <div className="h-5 bg-gray-200 mb-3 w-3/4 rounded" />
                                    <div className="h-4 bg-gray-200 w-full mb-2 rounded" />
                                    <div className="h-4 bg-gray-200 w-5/6 rounded" />
                                </div>
                            </div>
                        )
                    }) : (
                        data?.data?.slice(-3).reverse().map((news: any, idx: number) => {
                            // const isMiddle = idx === 1;
                            return (
                                <Link
                                    key={news.id || idx}
                                    href={`/news/${news.id}`}
                                    className={`group border border-black transition-all duration-500 hover:bg-black bg-white'}`}
                                >
                                    <div className="overflow-hidden bg-gray-100 aspect-video md:aspect-3.5/3 relative">
                                        <Image
                                            src={news?.image_or_media_url || "/assets/imageHolder.png"}
                                            alt={news?.title || 'news'}
                                            fill
                                            className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className={`space-y-4 mt-6 px-5 pb-10 transition-colors duration-500 text-black group-hover:text-white`}>
                                        <h2 className='font-gentium font-semibold text-lg transition-colors'>{news.title}</h2>
                                        <div
                                            className={`text-sm line-clamp-2 transition-colors duration-500 text-black/80 group-hover:text-white/60`}
                                            dangerouslySetInnerHTML={{ __html: news.content || 'A campaign initiative designed to meet citizens, understand their concerns, and build solutions together.' }}
                                        />
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>

                <div className='mt-20 flex justify-center'>
                    {/* <Link href="/news">
                        <Button className='w-full md:w-fit px-12 border border-black py-6 rounded-none bg-black text-white hover:bg-black hover:text-white transition-all'>
                            View All News
                            <ChevronsRight className="ml-2" />
                        </Button>
                    </Link> */}
                    <NewButton text='View All News' link='/news' className='w-full md:w-fit bg-black text-white py-4 px-12 min-w-[190px] min-h-[50px]' hoverBgClass='bg-white border border-black text-black' hoverTextClass='group-hover:text-black' />
                </div>

            </div>
        </section>
    )
}

export default News
