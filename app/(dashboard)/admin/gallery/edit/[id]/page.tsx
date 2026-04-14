"use client";

import { useState, useRef, useEffect } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, X, Loader2, Upload, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetAlbumByIdQuery, useUpdateAlbumMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";

export default function EditGalleryPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { data: album, isLoading: isLoadingAlbum } = useGetAlbumByIdQuery(id);
    const [updateAlbum, { isLoading: isUpdating }] = useUpdateAlbumMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [existingMedia, setExistingMedia] = useState<any[]>([]);
    const [deletedMediaIds, setDeletedMediaIds] = useState<string[]>([]);
    const [newMedia, setNewMedia] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (album) {
            setTitle(album.title || "");
            setSubtitle(album.subtitle || "");
            setExistingMedia(album.media || []);
        }
    }, [album]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => file.size <= 2048 * 1024);
        
        if (validFiles.length < files.length) {
            toast.error("Some files exceed the 2MB size limit.");
        }

        const updatedNewMedia = [...newMedia, ...validFiles];
        setNewMedia(updatedNewMedia);

        const updatedPreviews = validFiles.map(file => URL.createObjectURL(file));
        setNewPreviews([...newPreviews, ...updatedPreviews]);
    };

    const removeExistingMedia = (mediaId: string, index: number) => {
        const updatedMedia = [...existingMedia];
        updatedMedia.splice(index, 1);
        setExistingMedia(updatedMedia);
        setDeletedMediaIds([...deletedMediaIds, mediaId]);
    };

    const removeNewMedia = (index: number) => {
        const updatedNewMedia = [...newMedia];
        updatedNewMedia.splice(index, 1);
        setNewMedia(updatedNewMedia);

        const updatedPreviews = [...newPreviews];
        URL.revokeObjectURL(updatedPreviews[index]);
        updatedPreviews.splice(index, 1);
        setNewPreviews(updatedPreviews);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error("Album title is required");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        if (subtitle) formData.append("subtitle", subtitle);
        
        // Handle deletions if the backend requires it
        if (deletedMediaIds.length > 0) {
            deletedMediaIds.forEach(id => formData.append("deleted_media[]", id));
        }

        // Add new files
        newMedia.forEach((file) => {
            formData.append("media[]", file);
        });

        // Note: For PUT with FormData, some backends need _method=PUT
        // But we'll try standard PUT first via our mutation
        try {
            await updateAlbum({ id, data: formData }).unwrap();
            toast.success("Album updated successfully");
            router.push("/admin/gallery");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update album");
        }
    };

    if (isLoadingAlbum) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

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
                    <div className="max-w-8xl mx-auto mt-2 text-left">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-[22px] font-bold text-[#111827]">{title || "Loading..."}</h1>
                                <p className="text-[14px] text-gray-500 mt-0.5">
                                    Manage Gallery
                                </p>
                            </div>
                            <Button 
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-[#5c21f3] hover:bg-[#4b1bc4] text-white font-medium text-[13px] gap-1.5 h-9 px-5 rounded-md transition-all shadow-sm shadow-[#5c21f3]/20"
                            >
                                <Plus className="h-4 w-4" />
                                Add Photo
                            </Button>
                        </div>

                        <div className="max-w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold text-[#111827]">Album Title</label>
                                    <Input 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Album Title" 
                                        className="h-10 bg-gray-50/30 border-gray-200 text-[13px] rounded" 
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-bold text-[#111827]">Subtitle</label>
                                    <Input 
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        placeholder="Subtitle" 
                                        className="h-10 bg-gray-50/30 border-gray-200 text-[13px] rounded" 
                                    />
                                </div>
                            </div>

                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                className="hidden" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />

                            {/* Image Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                                {/* Existing Media */}
                                {existingMedia.map((item, index) => (
                                    <div key={item.id} className="relative aspect-square w-full bg-gray-50 overflow-hidden border border-gray-100 group">
                                        <img 
                                            src={item.url || item.image} 
                                            alt={`Gallery item ${index + 1}`} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <button 
                                            onClick={() => removeExistingMedia(item.id, index)}
                                            className="absolute bottom-2 right-2 bg-white text-[#ef4444] text-[11px] font-bold px-3 py-1 rounded-sm shadow-sm hover:bg-red-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}

                                {/* New Media Previews */}
                                {newPreviews.map((preview, index) => (
                                    <div key={`new-${index}`} className="relative aspect-square w-full bg-gray-50 overflow-hidden border border-indigo-200 group">
                                        <img 
                                            src={preview} 
                                            alt={`New item ${index + 1}`} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute top-1 left-1 bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase">New</div>
                                        <button 
                                            onClick={() => removeNewMedia(index)}
                                            className="absolute bottom-2 right-2 bg-white text-[#ef4444] text-[11px] font-bold px-3 py-1 rounded-sm shadow-sm hover:bg-red-50 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                                {/* Add more triggers inline if empty or just rely on top button */}
                                {existingMedia.length === 0 && newMedia.length === 0 && (
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        <Upload className="h-6 w-6 text-gray-300 mb-2" />
                                        <span className="text-[11px] text-gray-400 font-bold">Upload Photos</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Bottom Actions */}
                            <div className="border-t border-[#e2e8f0] pt-6 pb-2 flex justify-end gap-3">
                                <Link href="/admin/gallery">
                                    <Button variant="outline" className="h-[36px] px-5 text-[12px] font-bold border-[#e2e8f0] rounded text-[#374151] bg-white hover:bg-gray-50 shadow-none">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button 
                                    onClick={handleSubmit}
                                    disabled={isUpdating}
                                    className="h-[36px] px-5 text-[12px] font-bold bg-[#5c21f3] hover:bg-[#4b1bc4] rounded text-white shadow-none min-w-[100px]"
                                >
                                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Save Album"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </>
    );
}
