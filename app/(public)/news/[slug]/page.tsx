'use client'

import React, { useRef } from 'react';
import SingleNewsDetail from '@/components/news/SingleNewsDetail';
import RecentPostsSidebar from '@/components/news/RecentPostsSidebar';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGetSingleNewsQuery } from '@/redux/api/detailsApi';
import { useParams } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger)

// mock content for demonstration
const mockArticle = {
    title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
    image: '/assets/newsImg.png',
    author: 'my-guru',
    date: 'Dec 10',
    year: '2025',
    content: [
        "The Economic and Financial Crimes Commission is currently interrogating Chief Executive Officers and Managing Directors of Zenith Bank, Providus Bank, and Jaiz Bank in connection with the over N44 billion fraud allegedly uncovered in the Ministry of Humanitarian Affairs and Poverty Alleviation.",
        "Our correspondent gathered that the senior bank executives are currently being quizzed by EFCC interrogators at the commission's headquarters, Jabi, Abuja as of 4:55 pm on Tuesday.",
        "The PUNCH reports that the suspended Minister of Humanitarian Affairs, Betta Edu, is currently being held and is undergoing interrogation by the EFCC over N585million scandal.",
        "Also, Halima Shehu, the embattled Co-ordinator and Chief Executive Officer of the National Social Investment Programme Agency domiciled in the Ministry of Humanitarian Affairs and Poverty Alleviation is being probed by the EFCC over an alleged N44bn fraud.",
        "Confirming the probe of the senior bank executives to our correspondent on Tuesday, an EFCC source revealed that Zenith, Providus, and Jaiz banks are being questioned over the N44.5bn fraud uncovered in the ministry involving Edu and Shehu.",
        "The source said, \"The CEOs and MDs of Zenith Bank, Providus Bank, and Jaiz Bank are currently being grilled by our interrogators here at the headquarters.",
        "\"They were invited and are being probed in connection with the uncovered N44bn fraud and the N585million involving Halima Shehu and Betta Edu.\"",
        "\"The suspended minister and the coordinator have both made new revelations during their interrogations, and the investigation is still ongoing.\"",
        "Edu was suspended by President Bola Tinubu on Monday, over an alleged N585m cash transfer saga.",
        "The suspended minister was invited by the anti-graft agency in compliance with Tinubu's order that a comprehensive investigation encompassing her activities in the ministry be carried out, a top source in the anti-graft commission told reporters.",
        "The PUNCH reports that Edu's predecessor, Sadiya Farouq, was queried by EFCC interrogators over allegations that she laundered N37.1 billion while serving as a minister in former President Muhammadu Buhari's cabinet.",
        "Also, Shehu was earlier arrested in connection with an alleged N44.8billion money laundering and had been mandated to report to the EFCC every day following her release last Wednesday.",
        "The PUNCH reports that the NSIPA Coordinator was arrested and taken into EFCC custody Tuesday night following her suspension.",
        "It was learnt that the N44bn was suspiciously moved from NSIPA's accounts into private and corporate accounts linked to persons serving as fronts.",
        "Confirming her release from EFCC custody in a telephone interview with our correspondent on Thursday, the spokesperson for the EFCC, Dele Oyewale said Shehu has been mandated to meet with EFCC interrogators every day as the investigation continues.",
        "Oyewale said, \"Halima Shehu has been released, but she is still answering to our interrogators, and she has been mandated to meet with investigators every day as the investigation is ongoing.\"",
        "\"Concerning reports on the N44bn and N585m making the rounds, the commission is still tracing all the suspicious transactions, her agency was under the Ministry of Humanitarian Affairs too.\"",
        "\"There's a lot of money involved because the Ministry and agencies are focused on interventions. Hence, we can't put a figure to all of the transactions now because the commission is still tracing the transactions.\""
    ]
};

const NewsArticlePage = ({ params }: { params: { slug: string } }) => {
    const container = useRef<HTMLDivElement>(null)
    const articleRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const { slug } = useParams()
    const { data, isLoading } = useGetSingleNewsQuery(slug as string)
    useGSAP(() => {
        // Main content reveal
        gsap.from(articleRef.current, {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: "power2.out",
            clearProps: "all"
        })

        // Sidebar reveal
        gsap.from(sidebarRef.current, {
            opacity: 0,
            x: 30,
            duration: 1.2,
            delay: 0.3,
            ease: "power2.out",
            clearProps: "all"
        })
    }, { scope: container })

    return (
        <div ref={container} className="max-w-7xl mx-auto px-4 md:px-8 lg:px-8 py-12 md:py-8 lg:py-10 mt-16 md:mt-16 bg-white">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                {/* Main Article Content */}
                <div ref={articleRef} className="w-full md:flex-1">
                    <SingleNewsDetail
                        title={data?.data?.title}
                        image={data?.data?.image_or_media_url}
                        author={data?.data?.author_name}
                        date={data?.data?.created_at ? new Date(data.data.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric' }) : ''}
                        year={data?.data?.created_at ? new Date(data.data.created_at).getFullYear().toString() : ''}
                        content={data?.data?.body}
                    />
                </div>

                {/* Sidebar */}
                <aside ref={sidebarRef} className="lg:w-[400px] sticky top-10">
                    <RecentPostsSidebar currentId={data?.data?.id} />
                </aside>

            </div>
        </div>
    );
};

export default NewsArticlePage;
