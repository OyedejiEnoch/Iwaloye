import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface RecentPost {
    title: string;
    image: string;
    date: string;
    year: string;
    slug: string;
}

const recentPosts: RecentPost[] = [
    {
        title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
        image: '/assets/newsImg.png',
        date: 'Dec 10',
        year: '2025',
        slug: 'adc-raises-concerns-ambassadorial-nominations-1',
    },
    {
        title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
        image: '/assets/newsImg2.png',
        date: 'Dec 10',
        year: '2025',
        slug: 'adc-raises-concerns-ambassadorial-nominations-2',
    },
    {
        title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
        image: '/assets/newsImg3.png',
        date: 'Dec 10',
        year: '2025',
        slug: 'adc-raises-concerns-ambassadorial-nominations-3',
    },
    {
        title: "ADC Raises Concerns over President Tinubu's Ambassadorial Nominations, Calls for Rejection",
        image: '/assets/newsImg2.png',
        date: 'Dec 10',
        year: '2025',
        slug: 'adc-raises-concerns-ambassadorial-nominations-4',
    },
];

const RecentPostsSidebar = () => {
    return (
        <div className="w-full lg:max-w-[400px]">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Recent Posts</h2>

            <div className="space-y-8">
                {recentPosts.map((post, index) => (
                    <Link key={index} href={`/news/${post.slug}`} className="group flex gap-4">
                        <div className="relative w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <h3 className="text-[14px] leading-tight font-sans font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3">
                                {post.title}
                            </h3>
                            <div className="text-[12px] text-gray-400 mt-2">
                                {post.date} | <span className="font-bold text-black">{post.year}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <Link
                href="/news"
                className="mt-10 inline-flex items-center gap-2 border border-black px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-all uppercase"
            >
                Read More
                <ChevronRight size={16} />
            </Link>
        </div>
    );
};

export default RecentPostsSidebar;
