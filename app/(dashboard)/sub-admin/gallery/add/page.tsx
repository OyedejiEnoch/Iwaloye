"use client";

import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function AddGalleryPage() {
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
                        <div className="mb-8">
                            <h1 className="text-[22px] font-bold text-[#111827]">Gallery</h1>
                            <p className="text-[14px] text-gray-500 mt-0.5">
                                Manage Gallery
                            </p>
                        </div>

                        {/* Form Card wrapper - exactly matches image 1 */}
                        <div className="bg-white border border-[#e2e8f0] max-w-full">
                            <div className="p-6">
                                <h2 className="text-[14px] font-bold text-[#111827] mb-8">Upload Pictures</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[12px] font-bold text-[#111827]">Album Title</label>
                                        <Input 
                                            placeholder="Enter first name" 
                                            className="h-10 bg-[#f8fafc]/50 border-gray-200 text-[13px] rounded bg-gray-50/30" 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[12px] font-bold text-[#111827]">Subtitle</label>
                                        <Input 
                                            placeholder="Enter last name" 
                                            className="h-10 bg-[#f8fafc]/50 border-gray-200 text-[13px] rounded bg-gray-50/30" 
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mb-2">
                                    <label className="text-[12px] font-bold text-[#111827]">Upload Images</label>
                                    <div className="border border-[#cbd5e1] rounded py-16 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50/30 transition-colors">
                                        <Upload className="w-5 h-5 text-gray-400 mb-2" strokeWidth={1.5} />
                                        <p className="text-[13px] text-gray-600 mb-0.5">Click to upload or drag and drop images</p>
                                        <p className="text-[11px] text-gray-400">PNG, JPG or WebP (max. 2MB)</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom Actions */}
                            <div className="border-t border-[#e2e8f0] p-6 flex justify-end gap-3 mt-4">
                                <Link href="/admin/gallery">
                                    <Button variant="outline" className="h-[36px] px-5 text-[12px] font-bold border-[#e2e8f0] rounded text-[#374151] bg-white hover:bg-gray-50">
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
