"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRef, useState } from "react"

const Faqs = [
    {
        question: "How do I become a member?",
        answer: "Simply fill out our online registration form and choose your membership tier. Once approved, you'll receive a welcome package with all necessary information."
    },
    {
        question: "What are the membership fees used for?",
        answer: "Membership fees are used to fund campaign activities, community outreach programs, and administrative costs to keep the movement running efficiently."
    },
    {
        question: "How can I get involved in local activities?",
        answer: "Once you register, you'll be assigned to a local ward and movement where you can participate in town halls, door-to-door canvassing, and local organizing."
    }
]

const Faq = () => {
    const container = useRef<HTMLDivElement>(null)
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    useGSAP(() => {
        // FAQ reveal
        gsap.from(".faq-card", {
            scrollTrigger: {
                trigger: ".faq-section",
                start: "top 85%",
            },
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        })
    }, { scope: container })

    return (
        <section className="bg-white">
            <div ref={container} className="faq-section bg-white max-w-5xl mx-auto mb-32">
                <div className="flex items-center justify-center gap-2 mb-16">
                    <span className="w-2 h-2 bg-[#F47321] rounded-full"></span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase font-sans">FAQ</h2>
                </div>

                <div className="space-y-4">
                    {Faqs.map((faq, idx) => (
                        <div key={idx} className="faq-card border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                            >
                                <span className="font-bold text-gray-900">{faq.question}</span>
                                {openFaq === idx ? <ChevronUp size={20} className="text-[#F47321]" /> : <ChevronDown size={20} className="text-gray-400" />}
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