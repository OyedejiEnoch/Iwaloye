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

        {/* Vertical Image Feed */}
        {images.length > 0 ? (
          <div className="flex flex-col items-center gap-12 md:gap-20 mt-16 pb-12 w-full max-w-4xl mx-auto">
            {images.map((media: any, index: number) => {
              const src = media.url || `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${media.path}`;

              return (
                <div
                  key={media.id || index}
                  className="group relative w-full aspect-[4/5] md:aspect-video cursor-default"
                >
                  <div
                    className="absolute inset-0 bg-white p-1.5 md:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100"
                  >
                    <div className="relative w-full h-full bg-gray-50 overflow-hidden shadow-inner">
                      <Image
                        src={src}
                        alt={`${album.title} item ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
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
