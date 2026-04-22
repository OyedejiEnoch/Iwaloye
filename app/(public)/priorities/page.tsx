'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Check, LineChart, Heart, Shield, PenTool, Monitor, GraduationCap, CheckIcon, CheckCircleIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { features } from '@/components/landing/Mission'
import { useGetAllVisionQuery } from '@/redux/api/detailsApi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NewButton from '@/components/NewButton'


gsap.registerPlugin(ScrollTrigger)

const ManifestoItems = [
  "People-centered and accountable governance.",
  "Job creation and economic empowerment.",
  "Quality Education and accessible healthcare.",
  "State Safety, security, and community trust."
]

const PriorityAreas = [
  {
    icon: LineChart,
    title: "Economy, Infrastructure & Investment",
    desc: "We must build a resilient economy through modern development. My priority is to launch an infrastructure drive that supports local businesses while attracting foreign investment to create sustainable jobs.",
    focus: [
      "Focus on reliable power, modern transport, and digital connectivity.",
      "Support for SMEs through industrial hubs and public-private partnerships.",
      "Incentives for local and foreign investors to boost productivity and job creation."
    ]
  },
  {
    icon: LineChart,
    title: "Healthcare Access & Quality",
    desc: "A healthy state is a productive state. My priority is to bring affordable healthcare closer to the people, especially in rural and underserved areas, through standardized and well-equipped community centers.",
    focus: [
      "'Community Health First' initiative with well-equipped centers in every ward.",
      "Revival of the Osun State Ambulance Service for timely paramedical interventions.",
      "Investment in the welfare, training, and global-standard skills of medical professionals."
    ]
  },
  {
    icon: LineChart,
    title: "Security",
    desc: "Safety and trust are the pillars of every community. My priority is to create a locally driven security system that combines modern technology with strong community collaboration to protect lives and property.",
    focus: [
      "Community Safety Partnership focused on intelligence sharing and rapid response",
      "'Smart Borders, Safe Streets' via CCTV, emergency hotlines, and crime tracking.",
      "Youth engagement and collaboration with the police to prevent crime and restore trust."
    ]
  },
  {
    icon: Heart,
    title: "Food Security & Agricultural Development",
    desc: "Osun must be able to feed itself and lead in exports. My priority is to support our smallholder farmers and transform the agricultural sector into a modern, high-yield value chain that ensures affordable food for all while enriching our rural communities.",
    focus: [
      "'Grow Osun, Feed the State' initiative for food security.",
      "Support for farmers with affordable inputs, irrigation, and storage facilities.",
      "Modernizing rural roads and stabilizing markets to reduce food waste."
    ]
  },
  {
    icon: Monitor,
    title: "Government as a Service Provider",
    desc: "Government exists to serve the people, not the other way around. My priority is to digitize public services and eliminate bureaucracy. This ensures fast, transparent, and accountable service for every resident of Osun.",
    focus: [
      "“Serving Citizens First” initiative through the digitization of public services.",
      "Setting clear service standards and ensuring agency accountability.",
      "Fast, transparent, and reliable access to healthcare, education, and social services."
    ]
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Guaranteeing free, compulsory, and quality basic education for every child is our foundation. My priority is to invest in trained teachers and modern infrastructure to ensure no child is excluded due to poverty, gender, or location.",
    focus: [
      "Implementation of the One Child, One Skill primary education initiative.",
      "Investment in safe school infrastructure, modern learning materials, and digital access.",
      "National programming blending core literacy and numeracy with practical life skills."
    ]
  },
  {
    icon: Monitor,
    title: "Welfare & Social Services",
    desc: "Ensuring dignity and inclusion for every citizen is a moral imperative. My priority is to introduce an integrated social support system that provides a basic standard of living for our most vulnerable families.",
    focus: [
      "'Care for All' initiative providing targeted cash assistance and affordable housing.",
      "Access to healthcare and free school meals for children and the elderly.",
      "Support systems for people with disabilities and unemployed youth."
    ]
  },

]

const Priorities = () => {
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetAllVisionQuery(null)

  useGSAP(() => {
    // Header reveal
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out"
    })

    // Vision Statement reveal
    gsap.from(".vision-section", {
      scrollTrigger: {
        trigger: ".vision-section",
        start: "top 85%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out"
    })

    // Manifesto items reveal
    gsap.from(".manifesto-item", {
      scrollTrigger: {
        trigger: ".manifesto-list",
        start: "top 80%",
      },
      opacity: 0,
      x: (index) => index % 2 === 0 ? -30 : 30,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out"
    })

    // Feature highlights (images) reveal
    gsap.from(".feature-highlight", {
      scrollTrigger: {
        trigger: ".feature-highlights-container",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.95,
      y: 40,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out"
    })

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

    // Priority Areas reveal
    gsap.from(".priority-card", {
      scrollTrigger: {
        trigger: ".priority-grid",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1,
      ease: "power2.out"
    })

    // Why sections reveal
    gsap.from(".why-image", {
      scrollTrigger: {
        trigger: ".why-section",
        start: "top 80%",
      },
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power3.out"
    })

    gsap.from(".why-content", {
      scrollTrigger: {
        trigger: ".why-section",
        start: "top 80%",
      },
      opacity: 0,
      x: 50,
      duration: 1.2,
      ease: "power3.out"
    })
  }, { scope: container })

  const PriorityCard = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3 border border-gray-200 rounded p-4 hover:bg-green-50 transition-colors duration-300">
      <CheckCircleIcon size={40} className='text-green-500' />
      <p className="text-xs md:text-sm leading-relaxed text-gray-600">{text}</p>
    </div>
  );

  return (
    <main ref={container} className="min-h-screen bg-white pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <h1 className="text-3xl md:text-5xl lg:text-[80px] font-sans uppercase text-gray-900 mb-4">My Vision for osun state</h1>
          <p className="text-black/70 text-[20px] font-gentium">“A comprehensive plan for building a stronger, more prosperous Osun State.”</p>
        </div>

        {/* Vision Statement */}
        <section className="mb-32 vision-section">

          <div className="flex items-start md:items-center justify-center gap-2  max-sm:px-4 mb-8 mx-auto w-fit">
            <span className="flex w-[7px] h-[7px] bg-[#ff8a00] shrink-0 mt-3"></span>
            <h2 className="text-2xl md:text-3xl font-bold font-gentium text-gray-900 text-left">
              Vision Statement
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 -mt-3 ml-4 text-center">A Stronger Osun, Built for the People</p>

          <div className="max-w-6xl ml-4">
            <p className="text-black/70 font-inter text-center leading-relaxed text-sm md:text-base">
              We envision an Osun State governed in the true interest of the people, where leadership is accountable, public institutions serve with integrity, and opportunities are created for every citizen to thrive. Guided by the ADC's commitment to people-driven governance and democratic reform, our focus is on building an Osun where progress is inclusive, public services are strengthened, and decision-making reflects the collective will of the people. From our towns to our rural communities, Osun deserves a government that listens, serves, and puts the people first.
            </p>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="flex flex-col">
          {/* Left Column - Sequence */}
          <div className="relative flex justify-center flex-col w-full md:max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-[7px] h-[7px] bg-[#F47321]"></span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-sans">A New Dawn for Osun, A Blueprint for Shared Prosperity</h2>
            </div>
            {/* <p className="text-gray-400 text-sm mb-6 ml-4">Our Plan for a Prosperous Osun State</p> */}

            <div className="ml-4 w-full md:max-w-2xl mb-12 mx-auto">
              <p className="text-black/70 text-sm leading-relaxed ">
                This manifesto presents a clear and practical roadmap for rebuilding Osun State's economy, strengthening public institutions, and improving the quality of life for all citizens.
                It is guided by the values of fairness, inclusion, accountability, and sustainable development.
              </p>
            </div>

            {/* Mobile View - Stacked items */}
            <div className="flex flex-col gap-6 md:hidden px-4 mb-16">
              {ManifestoItems.map((item, idx) => (
                <PriorityCard key={idx} text={item} />
              ))}
              <div className="mt-4 flex justify-center">
                <NewButton text='Download Manifesto' icon='/icons/Note.png' className='w-full bg-black text-white py-4 h-[60px]' hoverBgClass='bg-white border border-black text-black' hoverTextClass='group-hover:text-black' />
              </div>
            </div>

            <div className="relative max-w-4xl hidden md:grid mx-auto grid-cols-[1fr_48px_1fr] gap-0">

              {/* ── Left column ── */}
              <div className="flex flex-col pr-8 gap-8">
                {/* Top spacer — aligns first left card to sit between dot 1 and dot 2 */}
                <div className="h-12 md:h-24 " />
                <PriorityCard text={ManifestoItems[0]} />
                <div className="h-12 md:h-24" />
                <PriorityCard text={ManifestoItems[1]} />
              </div>

              {/* ── Center dotted line ── */}
              <div className="relative flex flex-col items-center">
                {/* Dashed vertical line */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    borderLeft: "1.9px dashed #d1d5db",
                    width: 0,
                  }}
                />
                {/* 4 dots — one per card */}
                {[12, 37, 62, 87, 105].map((pct, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-gray-900 z-10"
                    style={{ top: `${pct}%` }}
                  />
                ))}
              </div>

              {/* ── Right column ── */}
              <div className="flex flex-col pl-8 gap-8">
                <PriorityCard text={ManifestoItems[2]} />
                <div className="h-12 md:h-24" />
                <PriorityCard text={ManifestoItems[3]} />
              </div>
              <div className="absolute -bottom-17 flex right-0 w-[315px] justify-end">
                <NewButton text='Download Manifesto' icon='/icons/Note.png' className='mt-10 bg-black text-white py-4 px-6 min-w-[190px] min-h-[60px]' hoverBgClass='bg-white border border-black text-black' hoverTextClass='group-hover:text-black' />
              </div>

            </div>
          </div>

        </section>


        {/* Key Priority Areas */}
        <section className="mb-32 mt-40">
          <div className="flex text-left gap-2  max-sm:px-4 mb-1 w-fit">
            <span className="flex w-[7px] h-[7px] bg-[#ff8a00] shrink-0 mt-3"></span>
            <h2 className="text-xl md:text-2xl font-bold font-gentium text-gray-900 text-left">
              Creating a transparent, accountable political system free from elite control.
            </h2>
          </div>
          <p className="text-gray-400 text-sm mb-16 ml-4">These are the core areas where I will focus my efforts to transform Osun State</p>

          <div className="priority-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            {PriorityAreas.map((area, idx) => (
              <div key={idx} className="priority-card flex flex-col border-l border-black/10 pl-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6 shadow-lg">
                  <area.icon size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">{area.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {area.desc}
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-900">Key Focus Areas:</p>
                  {area.focus.map((item, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 group cursor-default">
                      <div className="w-1 h-1 bg-black rounded-full transition-all group-hover:w-2 group-hover:bg-[#F47321]"></div>
                      <span className="text-xs text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why these priorities matter? */}
        {/* <section className="why-section grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="why-image relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image src="/assets/iwaloye1.png" alt="Candidate" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
          </div>

          <div className="why-content">
            <h2 className="text-6xl font-sans font-bold text-gray-900 mb-12 leading-[1.1]">
              Why these priorities matter?
            </h2>
            <div className="space-y-8">
              <p className="text-gray-600 text-sm italic text-right leading-relaxed pl-4 md:pl-12 opacity-80">
                These priorities are rooted in our commitment to people-driven governance and democratic reform, guided by the belief that leadership must reflect the collective will and everyday realities of the people it serves. Across Osun State, citizens continue to face challenges that affect daily life: unemployment and limited economic opportunities, rising living costs, uneven access to quality education and healthcare, security concerns, and gaps in infrastructure between urban centres and rural communities. Addressing these challenges requires more than promises; it requires clear priorities, accountable leadership, and a government that works in the public interest. In line with the ideals of the African Democratic Congress,
              </p>
              <p className="text-gray-600 text-sm italic text-right leading-relaxed pl-4 md:pl-12 opacity-80">
                these priorities focus on strengthening public institutions so they serve with integrity, efficiency, and transparency. By expanding opportunities for youth, women, farmers, traders and professionals, and by improving access to essential public services, we seek to build an Osun State where progress is inclusive and sustainable. Development must not be concentrated in a few places or benefit a few people; it must reach every town, village, and community across the state. These priorities also reflect a firm commitment to accountability and participation in governance. When citizens are heard, institutions are strengthened, and leadership is answerable to the people, trust is restored and progress becomes achievable. Through people-driven policies, responsible use of public resources, and transparent decision-making, we are committed to building an Osun State where governance serves the many, opportunities are shared, and development is measured by the real improvement in the lives of the people.
              </p>
            </div>
          </div>
        </section> */}

      </div>
    </main>
  )
}

export default Priorities


// <div className="aspect-[16/6] relative">
{/* grayscale group-hover:grayscale-0/  */ }
// <Image src="/assets/supportImg3.png" alt="Community" fill className="object-cover transition-all duration-500" />