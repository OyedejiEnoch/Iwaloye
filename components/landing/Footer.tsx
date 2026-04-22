import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const footerLink1 = [
  {
    title: "About",
    href: "/about"
  },
  {
    title: "Donate",
    href: "#support"
  },
  {
    title: "Gallery",
    href: "/gallery"
  },
  {
    title: "My Vision",
    href: "/priorities"
  },
  {
    title: "Membership",
    href: "/membership"
  },
  {
    title: "News",
    href: "/news"
  },
]

const footerLink2 = [
  {
    title: "Contact Us",
    href: "/contact"
  },
  {
    title: "Campaign Calendar",
    href: "/calender"
  },
  {
    title: "Privacy Policy",
    href: "/privacy"
  }
]

const footerLink3 = [
  {
    title: "Facebook",
    href: "#"
  },
  {
    title: "X (Twitter)",
    href: "#"
  },
  {
    title: "Instagram",
    href: "#"
  }
]

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      {/* Top branding bar */}
      <div className="border-b border-gray-200 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-3xl lg:text-[35px] font-bold uppercase">
            Ìwàlọ́yé{' '}
            <span className="text-base md:text-lg lg:text-[28px] normal-case font-carattere font-medium align-middle">
              for
            </span>
          </h2>
          <p className="text-xl md:text-3xl ml-10 font-bold uppercase -mt-3 lg:text-[35px]">
            <span className="text-sm md:text-base lg:text-[28px] font-normal normal-case font-carattere mr-1">
              Osun State
            </span>
            Governor
          </p>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Logo + description column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/adcLogo.png"
                alt="ADC Logo"
                width={150}
                height={100}
                className="object-contain"
              />

            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
              We Intense and Intentional Leadership, an activity that
              identifies challenges, gets the people to see the realities in
              these challenges, collectively evolve adaptive or technical
              solutions to these problems with a view to a ensuring
              Excellent living conditions for all Nigerian.
            </p>
          </div>

          {/* Pages column */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-[24px]">Pages</h4>
            <ul className="space-y-[6px]">
              {footerLink1.map(
                (item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-gray-500 hover:text-black transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Help column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-[24px]">Help</h4>
            <ul className="space-y-[6px]">
              {footerLink2.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-gray-500 hover:text-black transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials column */}
          <div className="md:col-span-2 md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-[24px]">Socials</h4>
            <div className="flex md:justify-start gap-3">
              {/* Facebook */}
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              {/* X (Twitter) */}
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              {/* Instagram */}
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[12px] text-gray-400">
            ©2025 African Democratic Congress. All Rights Reserved.
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Powered by{' '}
            <Link href="#" className="text-[#E8792B] hover:underline font-medium">
              Teslis Contractors Nigeria Ltd
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
