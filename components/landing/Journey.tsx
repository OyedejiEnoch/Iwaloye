'use client'

import Image from 'next/image'
import React, { useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const tabs = ['All', 'Facebook', 'Instagram', 'Twitter'] as const
type TabType = (typeof tabs)[number]

interface PostData {
  image: string
  likes: string
  comments: string
  shares: string
  saves: string
  caption: string
  platform: 'Instagram' | 'Facebook' | 'Twitter'
  date?: string
}

const InstagramPosts: PostData[] = [
  {
    image: '/instagram/first.png',
    likes: '6',
    comments: '0',
    shares: '0',
    saves: '0',
    caption: 'I strongly encourage all ADC women in Osun State to strengthen our unity and collaborate closely as we approach the elections.',
    platform: 'Instagram',
    date: '22 April'
  },
  {
    image: '/instagram/second.png',
    likes: '17',
    comments: '0',
    shares: '0',
    saves: '0',
    caption: 'Today 11th of April , 2026 . I am pleased to announce the successful conduct of the African Democratic Congress (ADC) State Congress in Osun State',
    platform: 'Instagram',
    date: '11 April'
  },
  {
    image: '/instagram/third.png',
    likes: '13',
    comments: '0',
    shares: '0',
    saves: '0',
    caption: 'MY VISIT TO THE OONI OF IFE: A SEEKING OF ROYAL BLESSINGS FOR OSUN',
    platform: 'Instagram',
    date: '9 April'
  },
  {
    image: '/instagram/fourth.png',
    likes: '65',
    comments: '0',
    shares: '0',
    saves: '0',
    caption: 'Is good to be here again .Earlier today at Hallowed Chamber of Osun State House Of Assembly as the State 7th Assembly celebrates a year anniversary in Office',
    platform: 'Instagram',
    date: '9 April'
  },
]

const FacebookPosts: PostData[] = [
  {
    image: '/facebook/first.png',
    likes: '409',
    comments: '61',
    shares: '22',
    saves: '0',
    caption: 'I strongly encourage all ADC women in Osun State to strengthen our unity and collaborate closely as we approach the elections.',
    platform: 'Facebook',
    date: '22 April'
  },
  {
    image: '/facebook/second.png',
    likes: '723',
    comments: '82',
    shares: '55',
    saves: '0',
    caption: 'MY VISIT TO THE OONI OF IFE: A SEEKING OF ROYAL BLESSINGS FOR OSUN Today, I had the honour of being received by His Imperial Majesty, the Ooni of Ife, Adeyeye Enitan Ogunwusi, CFR, at the historic Ile Oodua Palace in Ile-Ife.',
    platform: 'Facebook',
    date: '9 April'
  },
  {
    image: '/facebook/third.png',
    likes: '106',
    comments: '19',
    shares: '3',
    saves: '0',
    caption: 'Celebrating a Leader Whose Impact Defines Ejigboland, “When a man dedicates his life to uplifting his people, his name becomes more than an identity,it becomes a symbol of hope, leadership, and lasting legacy.”',
    platform: 'Facebook',
    date: '13 March'
  },
  {
    image: '/facebook/fourth.png',
    likes: '273',
    comments: '39',
    shares: '13',
    saves: '0',
    caption: 'I sincerely appreciate the Ansar-Ud-Deen Youths Association of Nigeria (ADYAN), Osun State Council, for organizing the Special Ramadan Lecture and prayers held today in my honour.',
    platform: 'Facebook',
    date: '12 March'
  },
]

const XPosts: PostData[] = [
  {
    image: '/twitter/first.png',
    likes: '232',
    comments: '8',
    shares: '56',
    saves: '3',
    caption: 'I joined fellow party leaders and stakeholders at the ADC National Convention in Abuja, reaffirming my dedication to purposeful leadership and people centered governance.',
    platform: 'Twitter',
    date: '15 April'
  },
  {
    image: '/twitter/second.png',
    likes: '98',
    comments: '2',
    shares: '21',
    saves: '0',
    caption: 'Yesterday in Osogbo, I had the honour of attending the Osun State ADC Congress alongside my deputy, Yemisi Agiri. It was a moment of renewed strength and unity for our great party',
    platform: 'Twitter',
    date: '12 April'
  },
  {
    image: '/twitter/third.png',
    likes: '29',
    comments: '14',
    shares: '20',
    saves: '1',
    caption: 'Today meeting is another step forward in our collective resolve to reposition Osun. We are not just consulting we are preparing to lead with vision, courage, and results. 🤝',
    platform: 'Twitter',
    date: '26 March'
  },
  {
    image: '/twitter/fourth.png',
    likes: '65',
    comments: '0',
    shares: '0',
    saves: '0',
    caption: 'Dr @NajeemFSalaam, governorship candidate of the ADC in Osun State, paid a courtesy visit to Oba Abdulazeez Olatunbosun Adebamiji in Ikire-Ile to strengthen traditional ties and promote inclusive leadership ahead of the 2026 governorship election.',
    platform: 'Twitter',
    date: '26 Febuary'
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

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -9.232m1.464 -2.001l3.768 -5.132M20 4l-4.267 0l-3.768 5.132l-3.768 -5.132l-4.197 0l6.768 9.232l-6.768 9.232l4.267 0l3.768 -5.132l3.768 5.132l4.197 0l-6.768 -9.232l6.768 -9.232z" />
  </svg>
)

/* ── generic Social card ── */
const SocialCard = ({ post }: { post: PostData }) => {
  const platform = post.platform

  return (
    <div className="card-item relative w-[220px] md:w-[270px] h-[500px] flex-shrink-0">
      <Image
        src="/assets/Phone.png"
        alt="Phone frame"
        width={240}
        height={490}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      />

      <div className="relative z-10 mx-[10px] mt-[12px] mb-[12px] bg-white rounded-[22px] h-[500px] overflow-hidden"
        style={{ height: 'calc(100% - 24px)' }}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <span className="text-[10px] font-semibold italic" style={{ fontFamily: platform === 'Instagram' ? 'Georgia, serif' : 'sans-serif' }}>
            {platform === 'Twitter' ? 'X' : platform}
          </span>
          {platform === 'Instagram' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
          {platform === 'Facebook' && <FacebookIcon />}
          {platform === 'Twitter' && <XIcon />}
        </div>

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
            <p className="text-[7px] text-gray-400">{post.date || '1 December'}</p>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </div>

        <div className="relative w-full aspect-square">
          <Image
            src={post.image}
            alt="Post"
            fill
            className="object-cover"
          />
        </div>

        <div className="px-3 pt-2 pb-1 h-[40px]">
          <div className="flex items-center gap-3 text-gray-700">
            <span className="flex items-center gap-0.5 text-[10px]"><HeartIcon /> {post.likes}</span>
            <span className="flex items-center gap-0.5 text-[10px]"><CommentIcon /> {post.comments}</span>
            <span className="flex items-center gap-0.5 text-[10px]"><ShareIcon /> {post.shares}</span>
            {platform === 'Instagram' && (
              <span className="flex items-center gap-0.5 text-[10px] ml-auto"><BookmarkIcon /> {post.saves}</span>
            )}
          </div>
        </div>

        <div className="px-3 pb-0.5">
          <p className="text-[9.5px] text-gray-500">
            liked by <span className="font-semibold text-black">Iwaloye </span> and others
          </p>
        </div>

        <div className="px-3 pb-3">
          <p className="text-[10px] leading-[1.4] text-gray-800 line-clamp-4">
            <span className="font-semibold">Dr. Najeem Folasayo Salaam</span>{' '}
            {post.caption}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── main section ── */
const Journey = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All')
  const container = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const filteredPosts = useMemo(() => {
    switch (activeTab) {
      case 'Facebook':
        return FacebookPosts
      case 'Instagram':
        return InstagramPosts
      case 'Twitter':
        return XPosts
      case 'All':
        return [...InstagramPosts, ...FacebookPosts, ...XPosts]
      default:
        return [...InstagramPosts, ...FacebookPosts, ...XPosts]
    }
  }, [activeTab])

  useGSAP(() => {
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
        <div ref={headingRef} className="mb-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans lg:text-[70px] uppercase tracking-wide text-black leading-none">
            Follow My Journey
          </h2>
          <p className="text-xs md:text-sm text-black/80 mt-3">
            &quot;Follow up on our socials so you don&apos;t miss out&quot;
          </p>
        </div>

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

        <div
          key={activeTab}
          ref={cardsRef}
          className="flex justify-start gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12"
        >
          {filteredPosts.map((post, i) => (
            <SocialCard key={`${activeTab}-${i}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey
