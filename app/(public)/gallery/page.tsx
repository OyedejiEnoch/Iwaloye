"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, MoveRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetAllAlbumsQuery } from "@/redux/api/detailsApi";

export default function GalleryPage() {
    const { data: albumsResponse, isLoading } = useGetAllAlbumsQuery();
    const albums = albumsResponse?.data || [];
    const [openIndex, setOpenIndex] = useState<string>("");
    console.log(albumsResponse)

    // Set first album as open when data arrives if none is open
    useEffect(() => {
        if (albums.length > 0 && !openIndex) {
            setOpenIndex(albums[0].slug || String(albums[0].id));
        }
    }, [albums, openIndex]);

    const toggleAccordion = (id: string) => {
        setOpenIndex((prev) => (prev === id ? "" : id));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="pt-30 pb-16 px-6 text-center max-w-4xl mx-auto">
                <h1
                    className="text-6xl md:text-7xl mb-6 text-[#101828] font-sans"
                >
                    GALLERY
                </h1>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--gentium-font)' }}>
                    "Our story is written in laughter and shared victories. Step inside our highlights
                    and see the heart behind the work"
                </p>
            </section>

            {/* Accordion Section */}
            <section className="max-w-6xl mx-auto px-6 pb-32">
                <div className="w-full h-px bg-gray-200 mb-8" />

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        <p className="text-gray-500 mt-4 font-gentium">Loading our story...</p>
                    </div>
                ) : albums.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 font-gentium italic">No albums available at the moment. Check back soon!</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {albums.map((album: any, index: number) => {
                            const albumId = album.slug || String(album.id);
                            const isOpen = openIndex === albumId;
                            const displayId = String(index + 1).padStart(2, '0');

                            return (
                                <div
                                    key={album.id}
                                    className="border-b border-gray-200 py-6 md:py-8 transition-colors"
                                >
                                    {/* Accordion Trigger */}
                                    <div
                                        className="flex items-start md:items-center cursor-pointer group"
                                        onClick={() => toggleAccordion(albumId)}
                                    >
                                        <div className="mr-6 md:mr-10 mt-1 md:mt-0 transition-transform duration-300">
                                            {isOpen ? (
                                                <ChevronUp className="w-5 h-5 text-black" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                                            )}
                                        </div>

                                        <div className="flex-1 pr-6">
                                            <h3 className="text-base md:text-lg font-bold text-gray-900 tracking-wide uppercase">
                                                {album.title}
                                            </h3>
                                            {isOpen && album.subtitle && (
                                                <p className="text-gray-500 text-sm mt-3.5 font-sans">
                                                    {album.subtitle}
                                                </p>
                                            )}
                                        </div>

                                        <div className="ml-4 flex items-center justify-center">
                                            <div className="text-base md:text-lg font-bold text-black origin-center rotate-90 tracking-widest">
                                                {displayId}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Content Area (Images) */}
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-12 mb-4 pt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="pl-12 md:pl-16 pr-8">
                                                {album.media && album.media.length > 0 ? (
                                                    <>
                                                        <div className="flex flex-row flex-nowrap items-center gap-4 overflow-x-auto pb-8 xl:overflow-x-visible no-scrollbar">
                                                            {album.media.slice(0, 4).map((media: any, imgIndex: number) => {
                                                                const rotations = [
                                                                    "-rotate-6 sm:translate-y-9",
                                                                    "rotate-3 sm:translate-y-6",
                                                                    "-rotate-2 sm:translate-y-8",
                                                                    "rotate-6 sm:translate-y-6"
                                                                ];
                                                                const rotationClass = rotations[imgIndex % 4];
                                                                const src = media.url || `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${media.path}`;
                                                                console.log(`Album: ${album.title}, Image ${imgIndex}, src:`, src);

                                                                return (
                                                                    <div
                                                                        key={media.id}
                                                                        className={`flex-shrink-0 bg-white p-2 shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-[200px] h-[270px] md:w-[240px] md:h-[300px] lg:w-[240px] lg:h-[350px] transition-transform duration-500 hover:scale-105 hover:z-20 ${rotationClass}`}
                                                                    >
                                                                        <div className="w-full h-full relative bg-gray-100 overflow-hidden">
                                                                            <Image
                                                                                src={src}
                                                                                alt={`${album.title} image ${imgIndex + 1}`}
                                                                                fill
                                                                                className="object-cover relative z-10"
                                                                                unoptimized
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        <div className="mt-14 mb-4">
                                                            <Link href={`/gallery/${albumId}`} className="inline-flex items-center gap-3 text-sm font-medium text-gray-900 group">
                                                                View full gallery
                                                                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-lg">
                                                        <p className="text-gray-400 italic font-gentium">No images currently available for this section.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}