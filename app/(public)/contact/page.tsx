'use client'

import { ChevronsRight, Globe, Mail, Phone, Loader2 } from 'lucide-react'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useSubmitContactMutation } from '@/redux/api/detailsApi'
import { toast } from 'sonner'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const container = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const contactInfoRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)

    const [details, setDetails] = useState({
        full_name: "",
        email: "",
        subject: "",
        message: ""
    })

    const [submitContact, { isLoading }] = useSubmitContactMutation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDetails({ ...details, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!details.full_name || !details.email || !details.subject || !details.message) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            await submitContact(details).unwrap()
            toast.success("Message sent successfully!")
            setDetails({
                full_name: "",
                email: "",
                subject: "",
                message: ""
            })
        } catch (err: any) {
            console.error("Contact Error:", err)
            toast.error(err?.data?.message || "Failed to send message. Please try again.")
        }
    }

    useGSAP(() => {
        // Header reveal
        gsap.from(headerRef.current, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        })

        // Contact info items reveal
        const infoItems = contactInfoRef.current?.querySelectorAll('.contact-item');
        if (infoItems) {
            gsap.from(infoItems, {
                scrollTrigger: {
                    trigger: contactInfoRef.current,
                    start: "top 85%",
                },
                opacity: 0,
                x: -30,
                stagger: 0.2,
                duration: 1,
                ease: "power2.out"
            })
        }

        // Form reveal
        gsap.from(formRef.current, {
            scrollTrigger: {
                trigger: formRef.current,
                start: "top 85%",
            },
            opacity: 0,
            x: 30,
            duration: 1.2,
            ease: "power2.out"
        })
    }, { scope: container })

    return (
        <main ref={container} className="min-h-screen bg-white pt-28 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div ref={headerRef} className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl lg:text-[100px] font-sans text-gray-900 mb-4 uppercase tracking-tight">Contact Us</h1>
                    <p className="text-black/80 text-[20px] font-gentium">“Have a question, suggestion or would like to support?  We&apos;re here to listen and respond.”</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                    <div ref={contactInfoRef} className='flex flex-col gap-4'>
                        <div className="contact-item">
                            <h2 className='text-xl md:text-2xl font-semibold'>Contact Us</h2>
                            <p className='text-xs text-gray-500 mt-2'>Reach out to us for any inquiries or feedback.</p>
                        </div>

                        <div className='mt-4 space-y-10'>
                            <div className='contact-item flex items-start gap-6 group'>
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <Image src="/icons/phoneIcon.svg" alt="Phone" width={28} height={28} className='text-[#F47321]' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='text-lg text-black/70'>Call Us</h2>
                                    <p className='text-sm font-semibold'>+2348150794750</p>
                                </div>
                            </div>
                            <div className='contact-item flex items-start gap-6 group'>
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <Image src="/icons/mailIcon.svg" alt="Mail" width={28} height={28} className='text-[#F47321]' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='text-black/70 text-lg'>Quick Email</h2>
                                    <p className='text-sm font-semibold'>info@iwaloye2026.com</p>
                                </div>
                            </div>
                            <div className='contact-item flex items-start gap-6'>
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <Image src="/icons/mapIcon.svg" alt="Map" width={28} height={28} className='text-[#F47321]' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='text-black/70 text-lg'>Campaign Address</h2>
                                    <p className='text-sm font-semibold max-w-lg'>Oranmiyan Building, Aregbe, Osogbo, Osun State.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div ref={formRef} className='space-y-8 p-2 md:p-0'>
                        <div>
                            <h2 className='text-2xl font-semibold'>Get in Touch </h2>
                            <p className='text-sm text-black/70'>Drop a message for us and we will get back to you as soon as possible.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <input
                                        type="text"
                                        id="full_name"
                                        placeholder="Full Name"
                                        value={details.full_name}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="example@gmail.com"
                                        value={details.email}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <input
                                    type="text"
                                    id="subject"
                                    placeholder="Subject"
                                    value={details.subject}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all"
                                    required
                                />
                            </div>
                            <div className='space-y-2'>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Your message here..."
                                    value={details.message}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 bg-white text-sm outline-none focus:border-[#F47321] transition-all resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full p-4 bg-[#F47321] flex items-center gap-2 justify-center text-white font-bold text-sm tracking-widest hover:bg-orange-700 transition-all shadow-lg disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        Sending... <Loader2 className="animate-spin w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Submit Message <ChevronsRight />
                                    </>
                                )}
                            </button>
                        </form>

                    </div>
                </div>

                <div className='flex flex-col mt-8'>
                    <h2 className='font-semibold mb-4'>Follow us</h2>

                    <div className="flex items-center space-x-2">

                        <a href="https://www.facebook.com/share/17MZxWnGPE/?mibextid=wwXIfr" className="bg-white rounded-full overflow-hidden flex items-center justify-center p-[2px]"><Image src='/icons/Facebook.png' alt="facebook" width={26} height={26} /></a>
                        <a href="https://x.com/najeemfsalaam?s=11" className="bg-white rounded-full overflow-hidden flex items-center justify-center p-[2px]"><Image src='/icons/X.png' alt="x" width={26} height={26} /></a>
                        <a href="https://www.instagram.com/najeemsalaam?igsh=MW13bzc5M2kzbWllcQ==" className="bg-white rounded-full overflow-hidden flex items-center justify-center p-[2px]"><Image src='/icons/Instagram.png' alt="instagram" width={26} height={26} /></a>
                        {/* <a href="https://wa.me/2348033589733" className= "invert brightness-200 bg-black rounded-full overflow-hidden flex items-center justify-center p-[2px]" : ""}><Image src='/icons/WhatsApp.png' alt="whatsapp" width={26} height={26} /></a> */}
                        <div className="h-8 w-[2px] bg-black" />

                        <a href="https://adc.org.ng/" target="_blank" rel="noopener noreferrer" className="ml-2">
                            <Image src='/assets/adcLogo.png' alt="logo" width={100} height={100} />
                        </a>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default Contact
