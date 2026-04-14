'use client'

import React, { useRef } from 'react'
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    id: 1,
    title: "Community Town Hall Meeting",
    category: "Meeting",
    description: "Monthly town hall to discuss community issues and campaign progress",
    date: "March 15, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Lagos City Hall",
    badgeColor: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 2,
    title: "Youth Outreach Program",
    category: "Outreach",
    description: "Engaging with youth leaders and student organizations",
    date: "March 18, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Abuja National Stadium",
    badgeColor: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    title: "Campaign Rally - Port Harcourt",
    category: "Rally",
    description: "Major campaign rally in the Rivers State capital",
    date: "March 22, 2026",
    time: "4:00 PM - 7:00 PM",
    location: "Liberation Stadium, Port Harcourt",
    badgeColor: "bg-red-100 text-red-600"
  },
  {
    id: 4,
    title: "Volunteer Training Workshop",
    category: "Meeting",
    description: "Training session for new campaign volunteers",
    date: "March 25, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Online via Zoom",
    badgeColor: "bg-indigo-100 text-indigo-600"
  }
]

const Calendar = () => {
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Header animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out"
    })

    // Cards staggered reveal
    const cards = cardsRef.current?.querySelectorAll('.event-card')
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      })
    }
  }, { scope: container })

  return (
    <main ref={container} className="min-h-screen bg-white pt-12 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-sans text-gray-900 mb-6 uppercase tracking-tighter">CAMPAIGN CALENDAR</h1>
          <p className="text-black/80 text-sm tracking-wide">“Follow campaign updates, speeches, announcements, and press releases”</p>
        </div>

        {/* Events List */}
        <div  className="space-y-6 max-w-5xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card group bg-white border border-black/20 p-8 hover:shadow-md hover:border-orange-100 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 ">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 transition-colors">
                    {event.title}
                  </h2>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${event.badgeColor}`}>
                    {event.category}
                  </span>
                </div>

                <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                  {event.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon size={18} className="" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} className="" />
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} className="" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Calendar

