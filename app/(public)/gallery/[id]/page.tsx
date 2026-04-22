"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGetSingleAlbumQuery } from "@/redux/api/detailsApi";

export default function GalleryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrapping params using React.use() for Next.js App Router async params
  const { id } = use(params);

  const { data: albumResponse, isLoading } = useGetSingleAlbumQuery(id);
  const album = albumResponse?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <p className="text-gray-500 mt-4 font-gentium italic">Loading our highlights...</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm text-gray-800 font-medium hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase">Album Not Found</h1>
            <p className="text-gray-500">The album you're looking for doesn't exist or has been moved.</p>
          </div>
        </div>
      </div>
    );
  }

  const images = album.media || [];

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
            {album.title}
          </h1>
          {album.subtitle && (
            <p className="text-gray-500 text-base md:text-[1.1rem]">
              {album.subtitle}
            </p>
          )}
        </div>

        {/* Responsive Gallery Layout */}
        {images.length > 0 ? (
          <div className="flex flex-col items-center gap-12 mt-16 pb-12 w-full max-w-4xl mx-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:max-w-none md:mx-0">
            {images.map((media: any, index: number) => {
              const src = media.url || `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${media.path}`;

              // Consistent base rotations for a "piled" effect (Desktop Only)
              const baseRotations = [
                "-rotate-2",
                "rotate-1",
                "-rotate-1",
                "rotate-2",
              ];
              const baseRotation = baseRotations[index % baseRotations.length];

              // Dynamic hover rotation (Desktop Only)
              const popOutRotations = [
                "md:group-hover:-rotate-3 md:group-hover:-translate-x-2",
                "md:group-hover:rotate-2 md:group-hover:-translate-y-2",
                "md:group-hover:-rotate-2 md:group-hover:translate-x-2",
                "md:group-hover:rotate-3 md:group-hover:translate-y-2",
                "md:group-hover:-rotate-1",
                "md:group-hover:rotate-1 md:group-hover:-translate-y-1"
              ];
              const hoverRotation = popOutRotations[index % popOutRotations.length];

              return (
                <div
                  key={media.id || index}
                  className="group relative w-full aspect-[4/5] md:aspect-square cursor-default md:cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)]
                                   md:-inset-6 md:p-2.5 md:pb-8 md:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)]
                                   md:group-hover:-inset-10 md:group-hover:-bottom-16 md:group-hover:scale-[1.1] 
                                   md:group-hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,0.3)]
                                   md:hover:!z-[999]
                                   p-1.5 md:${baseRotation} ${hoverRotation} pointer-events-none group-hover:pointer-events-auto`}
                    style={{ zIndex: (images.length - index) + 10 }}
                  >
                    <div className="relative w-full h-full bg-gray-50 overflow-hidden shadow-inner">
                      <Image
                        src={src}
                        alt={`${album.title} item ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
                        unoptimized
                      />

                      {/* Checkered pattern overlay (Desktop Only Hint) */}
                      <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply hidden md:block"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                          backgroundPosition: '0 0, 10px 10px',
                          backgroundSize: '20px 20px'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg mt-16">
            <p className="text-gray-400 font-gentium italic">No images currently available for this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
