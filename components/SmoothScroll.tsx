'use client'

import React, { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode
}) {
    const lenisRef = React.useRef<any>(null)

    useEffect(() => {
        // Essential for GSAP ScrollTrigger to work correctly with Lenis
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)

        return () => {
            gsap.ticker.remove(update)
        }
    }, [])

    return (
        <ReactLenis 
            ref={lenisRef} 
            root 
            autoRaf={false}
            options={{ 
                duration: 1.2, 
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    )
}
