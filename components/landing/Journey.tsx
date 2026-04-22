'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const tabs = ['All', 'Facebook', 'Instagram', 'Twitter'] as const

interface PostData {
  image: string
  likes: string
  comments: string
  shares: string
  saves: string
  caption: string
}

const posts: PostData[] = [
  {
    image: '/assets/imageHolder.png',
    likes: '1,414',
    comments: '1,193',
    shares: '2,867',
    saves: '783',
    caption:
      'The National Chairman of the African Democratic Congress, @OdeyRalphs welcomed the @PeterObi family today in Abuja, on behalf of the',
  },
  {
    image: '/assets/imageHolder.png',
    likes: '1,414',
    comments: '1,192',
    shares: '2,867',
    saves: '783',
    caption:
      'The National Chairman of the African Democratic Congress, Jona Network, National Youth Council and Star',
  },
  {
    image: '/assets/imageHolder.png',
    likes: '1,414',
    comments: '1,193',
    shares: '2,867',
    saves: '783',
    caption:
      'The National Chairman of the African Democratic Congress, @OdeyRalphs welcomed the @PeterObi family today in Abuja, on behalf of the',
  },
  {
    image: '/assets/imageHolder.png',
    likes: '1,414',
    comments: '1,193',
    shares: '2,867',
    saves: '783',
    caption:
      'The National Chairman of the African Democratic Congress, African Democratic Congress!',
  },
]

/* ── tiny inline SVG icons ── */
const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const CommentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
)
const BookmarkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

/* ── single Instagram card ── */
const InstagramCard = ({ post }: { post: PostData }) => (
  <div className="card-item relative w-[220px] md:w-[270px] h-[500px] flex-shrink-0">
    {/* Phone frame overlay */}
    <Image
      src="/assets/Phone.png"
      alt="Phone frame"
      width={240}
      height={490}
      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
    />

    {/* Inner card content (fits inside the phone frame) */}
    <div className="relative z-10 mx-[10px] mt-[12px] mb-[12px] bg-white rounded-[22px] h-[500px] overflow-hidden"
      style={{ height: 'calc(100% - 24px)' }}>
      {/* IG top bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="text-[10px] font-semibold italic" style={{ fontFamily: 'Georgia, serif' }}>
          Instagram
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>

      {/* User row */}
      <div className="flex items-center gap-2 px-3 py-1.5 h-[60px]">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src="/assets/imageHolder.png"
            alt="Profile"
            width={24}
            height={24}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold truncate">Iwaloye</p>
          <p className="text-[7px] text-gray-400">1 December</p>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Post image */}
      <div className="relative w-full aspect-square">
        <Image
          src={post.image}
          alt="Post"
          fill
          className="object-cover"
        />
      </div>

      {/* Engagement row */}
      <div className="px-3 pt-2 pb-1 h-[40px]">
        <div className="flex items-center gap-3 text-gray-700">
          <span className="flex items-center gap-0.5 text-[10px]"><HeartIcon /> {post.likes}</span>
          <span className="flex items-center gap-0.5 text-[10px]"><CommentIcon /> {post.comments}</span>
          <span className="flex items-center gap-0.5 text-[10px]"><ShareIcon /> {post.shares}</span>
          <span className="flex items-center gap-0.5 text-[10px] ml-auto"><BookmarkIcon /> {post.saves}</span>
        </div>
      </div>

      {/* Liked by */}
      <div className="px-3 pb-0.5">
        <p className="text-[9.5px] text-gray-500">
          liked by <span className="font-semibold text-black">gurusafe</span> and others
        </p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <p className="text-[10px] leading-[1.4] text-gray-800">
          <span className="font-semibold">goodluckjonathan</span>{' '}
          {post.caption}
        </p>
      </div>
    </div>
  </div>
)

/* ── main section ── */
const Journey = () => {
  const [activeTab, setActiveTab] = useState<string>('Instagram')
  const container = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Heading reveal
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out"
    })

    // Cards staggered reveal
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      })
    }
  }, { scope: container })

  return (
    <section ref={container} className="py-8 md:py-28 bg-white overflow-hidden border-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans lg:text-[70px] uppercase tracking-wide text-black leading-none">
            Follow My Journey
          </h2>
          <p className="text-xs md:text-sm text-black/80 mt-3">
            &quot;Follow up on our socials so you don&apos;t miss out&quot;
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mt-10 mb-12">
          <div className="inline-flex border border-gray-200 rounded-sm overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 md:px-7 py-2 text-xs md:text-sm font-medium transition-colors ${activeTab === tab
                  ? 'bg-[#E8792B] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Instagram cards row */}
        <div ref={cardsRef} className="flex justify-start gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12">
          {posts.map((post, i) => (
            <InstagramCard key={i} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey
