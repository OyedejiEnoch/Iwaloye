import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const footerLink1 = [
  {
    title: "About Ìwàloyè",
    href: "/about"
  },
  {
    title: "My Vision",
    href: "/priorities"
  },
  {
    title: "Donate",
    href: "#support"
  },
  {
    title: "Membership",
    href: "/membership"
  },
  {
    title: "Gallery",
    href: "/gallery"
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
    title: "Privacy Notice",
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

import Donate from '../Donate'

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      {/* Top branding bar */}
      <div className="border-b border-gray-200 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-3xl lg:text-[35px] font-bold uppercase">
            Ìwàloyè{' '}
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
                    {item.title === "Donate" ? (
                      <Donate trigger={
                        <button className="text-[13px] text-gray-500 hover:text-black transition-colors">
                          {item.title}
                        </button>
                      } />
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[13px] text-gray-500 hover:text-black transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Help column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-[24px]">Get in touch</h4>
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
              <a
                href="https://www.facebook.com/share/17MZxWnGPE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a
                href="https://x.com/najeemfsalaam?s=11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/najeemsalaam?igsh=MW13bzc5M2kzbWllcQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              {/* <a
                href="https://wa.me/2348033589733"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a> */}
              <a href="https://wa.me/c/2348150794750" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center`}><Image src={'/icons/WhatsApp.svg'} alt="whatsapp" width={30} height={26} /></a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[12px] text-gray-400">
            ©️2026 Najeem Folasayo Salaam. All Rights Reserved.
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
