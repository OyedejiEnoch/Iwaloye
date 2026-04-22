'use client'

import React, { useRef } from 'react'
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGetAllCalendersQuery } from '@/redux/api/detailsApi'

gsap.registerPlugin(ScrollTrigger)

// Map event_type to a badge color
const getBadgeColor = (type: string) => {
  const t = type?.toLowerCase() || ''
  if (t.includes('rally')) return 'bg-red-100 text-red-600'
  if (t.includes('meet')) return 'bg-indigo-100 text-indigo-600'
  if (t.includes('out')) return 'bg-green-100 text-green-600'
  if (t.includes('work')) return 'bg-yellow-100 text-yellow-700'
  if (t.includes('press')) return 'bg-purple-100 text-purple-600'
  return 'bg-gray-100 text-gray-600'
}

// Format "H:i" time strings like "15:03" → "3:03 PM"
const formatTime = (time?: string) => {
  if (!time) return null
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

// Format "Y-m-d" date strings to "April 14, 2026"
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Skeleton card that matches the real card design
const SkeletonCard = () => (
  <div className="event-card bg-white border border-black/10 p-8 animate-pulse">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="h-5 bg-gray-200 rounded w-2/5" />
        <div className="h-5 bg-gray-200 rounded-full w-16" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  </div>
)

const Calendar = () => {
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError } = useGetAllCalendersQuery(null)
  const events: any[] = data?.data || []

  useGSAP(() => {
    // Header animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "all"
    })

    // Cards staggered reveal
    const cards = cardsRef.current?.querySelectorAll('.event-card')
    if (cards && cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        clearProps: "all"
      })
    }
  }, { scope: container, dependencies: [isLoading] })

  return (
    <main ref={container} className="min-h-screen bg-white pt-28 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans text-gray-900 mb-6 uppercase tracking-tighter">CAMPAIGN CALENDAR</h1>
          <p className="text-black/80 text-sm tracking-wide">&ldquo;Keep up with campaign events near you&rdquo;</p>
        </div>

        {/* Events List */}
        <div ref={cardsRef} className="space-y-6 max-w-6xl mx-auto">

          {/* Skeleton loading state */}
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

          {/* Error state */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">Unable to load calendar events. Please try again later.</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">No upcoming events scheduled.</p>
            </div>
          )}

          {/* Real events */}
          {!isLoading && events.map((event: any) => {
            const startFormatted = formatTime(event.start_time)
            const endFormatted = formatTime(event.end_time)
            const timeDisplay = startFormatted
              ? endFormatted
                ? `${startFormatted} - ${endFormatted}`
                : startFormatted
              : null

            return (
              <div
                key={event.id}
                className="event-card group bg-white border border-black/20 p-8 hover:shadow hover:border-orange-100 transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-inter md:text-[18px] text-gray-900 transition-colors">
                      {event.title}
                    </h2>
                    {event.event_type && (
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${getBadgeColor(event.event_type)}`}>
                        {event.event_type}
                      </span>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-gray-500 font-inter text-sm max-w-2xl leading-relaxed">
                      {event.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="flex items-center gap-2 text-[#4A5565]">
                      <CalendarIcon size={18} />
                      <span className="text-sm font-inter">{formatDate(event.event_date)}</span>
                    </div>
                    {timeDisplay && (
                      <div className="flex items-center gap-2 text-[#4A5565]">
                        <Clock size={18} />
                        <span className="text-sm font-inter">{timeDisplay}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#4A5565]">
                      <MapPin size={18} />
                      <span className="text-sm font-inter">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Calendar
