"use client";

import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function EditGalleryPage() {
    return (
        <>
            <AdminSidebar />
            <SidebarInset className="flex flex-col flex-1 min-w-0">
                <DashboardNavbar
                    userName="Admin User"
                    userRole="Super Admin"
                    userInitials="AD"
                />
                <main className="flex-1 overflow-y-auto p-6 bg-white">
                    <div className="max-w-8xl mx-auto mt-2">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-[22px] font-bold text-[#111827]">Lunch Day</h1>
                                <p className="text-[14px] text-gray-500 mt-0.5">
                                    Manage Gallery
                                </p>
                            </div>
                            <Button className="bg-[#5c21f3] hover:bg-[#4b1bc4] text-white font-medium text-[13px] gap-1.5 h-9 px-5 rounded-md transition-all shadow-sm shadow-[#5c21f3]/20">
                                <Plus className="h-4 w-4" />
                                Add Leader
                            </Button>
                        </div>

                        {/* Note: No wrapper card in Image 2. Form directly on bg-white */}
                        <div className="max-w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold text-[#111827]">Album Title</label>
                                    <Input 
                                        defaultValue="Lunch Day!" 
                                        className="h-10 bg-gray-50/30 border-gray-200 text-[13px] rounded" 
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold text-[#111827]">Subtitle</label>
                                    <Input 
                                        defaultValue="The moments between the milestones." 
                                        className="h-10 bg-gray-50/30 border-gray-200 text-[13px] rounded" 
                                    />
                                </div>
                            </div>

                            {/* Image Grid with exactly 5 columns matching the mockup */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="relative aspect-square w-full bg-gray-50 overflow-hidden border border-gray-100">
                                        <Image 
                                            src="/assets/imageHolder.png" 
                                            alt={`Gallery item ${index + 1}`} 
                                            fill 
                                            className="object-cover" 
                                            unoptimized
                                        />
                                        {/* Mimicking the checkered background from the screenshot */}
                                        <div 
                                          className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" 
                                          style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                                            backgroundPosition: '0 0, 10px 10px',
                                            backgroundSize: '20px 20px'
                                          }}
                                        ></div>
                                        {/* Delete button positioned precisely bottom-right */}
                                        <button className="absolute bottom-2 right-2 bg-white text-[#ef4444] text-[11px] font-bold px-3 py-1 rounded-sm shadow-sm hover:bg-red-50 transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Bottom Actions with full-width separator line */}
                            <div className="border-t border-[#e2e8f0] pt-6 pb-2 flex justify-end gap-3">
                                <Link href="/admin/gallery">
                                    <Button variant="outline" className="h-[36px] px-5 text-[12px] font-bold border-[#e2e8f0] rounded text-[#374151] bg-white hover:bg-gray-50 shadow-none">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button className="h-[36px] px-5 text-[12px] font-bold bg-[#5c21f3] hover:bg-[#4b1bc4] rounded text-white shadow-none">
                                    Save Album
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </>
    );
}
