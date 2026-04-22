import Image from 'next/image';
import React from 'react';
import { UserPen } from 'lucide-react';

interface SingleNewsDetailProps {
    title: string;
    image: string;
    author: string;
    date: string;
    year: string;
    content: string[];
}

const SingleNewsDetail = ({ title, image, author, date, year, content }: SingleNewsDetailProps) => {
    // console.log(content)
    return (
        <article className="w-full">
            <h1 className="text-3xl md:text-4xl lg:text-[1.8rem] leading-tight font-gentium font-bold text-gray-900 mb-8">
                {title}
            </h1>

            <div className="relative w-full aspect-[16/9] mb-8 bg-gray-100 overflow-hidden">
                <Image
                    src={image || "/assets/imageHolder.png"}
                    alt={title || "News Article"}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8 py-4 border-y border-gray-100">
                <div className="flex items-center gap-3 bg-[#F47321] text-white w-[138px] h-[38px] justify-center text-sm tracking-wide">
                    <span className='text-white/60 font-medium'>{date}</span>
                    <div className="w-[1.5px] h-5 bg-white/50" />
                    <span className="font-medium">{year}</span>
                </div>

                <div className="flex items-center gap-2 text-black/80 text-sm">
                    <UserPen size={18} className='text-[#F47321]' />
                    <span className="font-medium tracking-wide">By-{author}</span>
                </div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">
                {content}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-900 border-b-2 border-black inline-block pb-1">Source</p>
            </div>
        </article>
    );
};

export default SingleNewsDetail;
