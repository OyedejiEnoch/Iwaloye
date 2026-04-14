"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock data map based on ID
const galleryDetailsMap: Record<string, any> = {
  "01": {
    title: "LUNCH DAY",
    subtitle: "The moments between the milestones.",
    images: Array(12).fill("/assets/imageHolder.png"),
  },
  "02": {
    title: "HOW DO I BECOME A MEMBER?",
    subtitle: "Join our movement and make a difference in your community.",
    images: Array(8).fill("/assets/imageHolder.png"),
  }
};

const defaultData = {
  title: "GALLERY HIGHLIGHTS",
  subtitle: "Select moments from our journey.",
  images: Array(10).fill("/assets/imageHolder.png"),
};

export default function GalleryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrapping params using React.use() for Next.js App Router async params
  const { id } = use(params);

  const data = galleryDetailsMap[id] || defaultData;

  return (
    <div className="min-h-screen bg-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm text-gray-800 font-medium hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <h1 className="text-5xl md:text-[3.5rem] font-sans font-medium text-[#101828] mb-4 tracking-tight leading-none uppercase">
            {data.title}
          </h1>
          <p className="text-gray-500 text-base md:text-[1.1rem]">
            {data.subtitle}
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-16 pb-12">
          {data.images.map((img: string, index: number) => {
            // Dynamic hover rotation to make them randomly scatter on hover
            const popOutRotations = [
              "group-hover:-rotate-3 group-hover:-translate-x-2",
              "group-hover:rotate-2 group-hover:-translate-y-2",
              "group-hover:-rotate-2 group-hover:translate-x-2",
              "group-hover:rotate-3 group-hover:translate-y-2",
              "group-hover:-rotate-1",
              "group-hover:rotate-1 group-hover:-translate-y-1"
            ];
            const hoverRotation = popOutRotations[index % popOutRotations.length];

            return (
              <div key={index} className="group relative w-full aspect-square cursor-pointer z-10 transition-colors">
                {/* The Pop-Out Element */}
                <div className={`absolute inset-0 bg-transparent transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom
                                 group-hover:-inset-3 group-hover:-bottom-12 group-hover:z-[100] group-hover:scale-[1.12] 
                                 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:bg-white group-hover:p-3 group-hover:pb-12
                                 ${hoverRotation} border border-transparent group-hover:border-gray-100 pointer-events-none group-hover:pointer-events-auto`}>

                  <div className="relative w-full h-full bg-gray-50 overflow-hidden group-hover:rounded-sm transition-all duration-300">
                    <Image
                      src={img}
                      alt={`Gallery Item ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />

                    {/* Checkered pattern overlay matching the placeholder design when missing/loading */}
                    <div
                      className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                        backgroundPosition: '0 0, 10px 10px',
                        backgroundSize: '20px 20px'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
