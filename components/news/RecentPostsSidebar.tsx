import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';

import { useGetAllNewsQuery } from '@/redux/api/detailsApi';

interface RecentPostsSidebarProps {
    currentId?: string | number;
}

const RecentPostsSidebar = ({ currentId }: RecentPostsSidebarProps) => {
    const { data: newsResponse, isLoading } = useGetAllNewsQuery(null);
    
    const allNews = newsResponse?.data || [];
    const recentPosts = allNews
        .filter((post: any) => post.id !== currentId)
        .slice(0, 4);

    if (isLoading) {
        return (
            <div className="w-full lg:max-w-[400px]">
                <h2 className="text-xl font-semibold text-gray-900 mb-8">Recent Posts</h2>
                <div className="space-y-8">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="flex gap-4 animate-pulse">
                            <div className="w-24 h-24 bg-gray-200 shrink-0" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 bg-gray-200 w-full" />
                                <div className="h-4 bg-gray-200 w-2/3" />
                                <div className="h-3 bg-gray-200 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:max-w-[400px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Recent Posts</h2>

            <div className="space-y-8">
                {recentPosts.map((post: any, index: number) => {
                    const date = new Date(post.created_at);
                    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
                    const formattedYear = date.getFullYear();

                    return (
                        <Link key={post.id || index} href={`/news/${post.id}`} className="group flex gap-4 ">
                            <div className="relative w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                                <Image
                                    src={post.image_or_media_url || "/assets/imageHolder.png"}
                                    alt={post.title || "Recent Post"}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col justify-between border-b border-black/20 pb-2">
                                <h3 className="text-[14px] leading-tight font-sans font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3">
                                    {post.title}
                                </h3>
                                <div className="text-[12px] text-gray-400 mt-2">
                                    {formattedDate} | <span className="font-bold text-black">{formattedYear}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
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
