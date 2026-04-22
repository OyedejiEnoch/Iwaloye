"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRef, useState } from "react"

gsap.registerPlugin(ScrollTrigger)

const Faqs = [
    {
        question: "How can I contribute to the campaign?",
        answer: "You can support the campaign in multiple ways. Make a financial contribution through our secure donation channel or sign up as a volunteer to actively participate in campaign activities and outreach programs."
    },
    {
        question: "Can I join a campaign support group?",
        answer: "Yes. We welcome individuals and organizations who want to be part of our support network. Simply fill out the contact form, and a member of our team will reach out with next steps."
    },
    {
        question: "What campaign events are happening near me?",
        answer: "Stay informed about upcoming rallies, town halls, and community engagements by visiting our Campaign Calendar."
    },
    {
        question: "How can I receive updates from the campaign?",
        answer: "You can stay up to date by subscribing to our newsletter, reading our latest news publications, or following us on our official social media platforms for real-time updates."
    },
    {
        question: "How can I get in touch with the campaign team?",
        answer: "We would love to hear from you. You can reach us through the contact page, submit feedback directly on the website, or connect with us via our verified social media channels"
    },
]

const Faq = () => {
    const container = useRef<HTMLDivElement>(null)
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    useGSAP(() => {
        // FAQ reveal
        gsap.fromTo(".faq-card",
            { opacity: 0, y: 20 },
            {
                scrollTrigger: {
                    trigger: ".faq-section",
                    start: "top 85%",
                },
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    ScrollTrigger.refresh();
                }
            }
        )
    }, { scope: container })

    return (
        <section className="bg-white pt-16">
            <div ref={container} className="faq-section bg-white max-w-5xl mx-auto mb-32">
                <div className="flex items-center justify-center gap-2 mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-[70px] font-bold text-gray-900 uppercase font-sans">FAQ</h2>
                </div>

                <div className="space-y-4">
                    {Faqs.map((faq, idx) => (
                        <div key={idx} className="faq-card w-[90%] mx-auto md:w-full border border-black/10 overflow-hidden bg-white group">
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full p-6 flex items-center justify-between text-left transition-all"
                            >
                                <span className="font-bold text-gray-900">{faq.question}</span>
                                {openFaq === idx ? <ChevronUp size={20} className="text-[#F47321]" /> : <ChevronDown size={20} className="text-gray-400 group-hover:text-black" />}
                            </button>
                            <div className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-6 pt-0 text-gray-500 text-sm leading-relaxed md:pl-16">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Faq