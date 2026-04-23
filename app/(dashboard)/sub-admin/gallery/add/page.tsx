"use client";

import { useState, useRef } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCreateAlbumMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";

export default function AddGalleryPage() {
    const router = useRouter();
    const [createAlbum, { isLoading }] = useCreateAlbumMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [media, setMedia] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        // Filter files by size (2MB) as requested by backend
        const validFiles = files.filter(file => file.size <= 2048 * 1024);

        if (validFiles.length < files.length) {
            toast.error("Some files exceed the 2MB size limit.");
        }

        const newMedia = [...media, ...validFiles];
        setMedia(newMedia);

        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);
    };

    const removeFile = (index: number) => {
        const newMedia = [...media];
        newMedia.splice(index, 1);
        setMedia(newMedia);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error("Album title is required");
            return;
        }

        if (media.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        if (subtitle) formData.append("subtitle", subtitle);

        media.forEach((file) => {
            formData.append("media[]", file);
        });

        try {
            await createAlbum(formData).unwrap();
            toast.success("Album created successfully");
            router.push("/sub-admin/gallery");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create album");
        }
    };
    return (
        <>
            <SubAdminSidebar />
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
                                            placeholder="Enter album title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="h-10 bg-[#f8fafc]/50 border-gray-200 text-[13px] rounded bg-gray-50/30"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[12px] font-bold text-[#111827]">Subtitle</label>
                                        <Input
                                            placeholder="Enter album subtitle (optional)"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                            className="h-10 bg-[#f8fafc]/50 border-gray-200 text-[13px] rounded bg-gray-50/30"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mb-2">
                                    <label className="text-[12px] font-bold text-[#111827]">Upload Images</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpeg, image/webp"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-[#cbd5e1] rounded-lg py-12 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50/30 hover:border-[#5c21f3]/30 transition-all group"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-indigo-50 transition-colors">
                                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#5c21f3] transition-colors" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-[14px] font-medium text-[#111827] mb-0.5">Click to upload or drag and drop images</p>
                                        <p className="text-[12px] text-gray-400">PNG, JPG or WebP (max. 2MB per image)</p>
                                    </div>
                                </div>

                                {/* Previews Grid */}
                                {previews.length > 0 && (
                                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="relative aspect-square rounded-lg border border-gray-100 overflow-hidden group shadow-sm bg-gray-50">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFile(index);
                                                    }}
                                                    className="absolute top-1.5 right-1.5 h-6 w-6 bg-white/90 rounded-md flex items-center justify-center text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Bottom Actions */}
                            <div className="border-t border-[#e2e8f0] p-6 flex justify-end gap-3 mt-4">
                                <Link href="/admin/gallery">
                                    <Button variant="outline" className="h-[36px] px-5 text-[12px] font-bold border-[#e2e8f0] rounded text-[#374151] bg-white hover:bg-gray-50">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="h-[36px] px-5 text-[12px] font-bold bg-[#5c21f3] hover:bg-[#4b1bc4] rounded text-white shadow-none"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
                                            Saving...
                                        </>
                                    ) : "Save Album"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </>
    );
}
