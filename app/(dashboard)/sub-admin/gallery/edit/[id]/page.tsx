"use client";

import { useState, useRef, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetAlbumByIdQuery, useUpdateAlbumMutation, useDeleteAlbumMediaMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";

export default function EditGalleryPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: albumResponse, isLoading: isFetching } = useGetAlbumByIdQuery(id);
    const [updateAlbum, { isLoading: isUpdating }] = useUpdateAlbumMutation();
    const [deleteAlbumMedia] = useDeleteAlbumMediaMutation();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [existingMedia, setExistingMedia] = useState<any[]>([]);
    const [newMedia, setNewMedia] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [deletingMediaIds, setDeletingMediaIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        const album = albumResponse?.data;
        if (album) {
            setTitle(album.title || "");
            setSubtitle(album.subtitle || "");
            setExistingMedia(album.media || []);
        }
    }, [albumResponse]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(f => f.size <= 2048 * 1024);
        if (validFiles.length < files.length) toast.error("Some files exceed the 2MB limit.");
        setNewMedia(prev => [...prev, ...validFiles]);
        setNewPreviews(prev => [...prev, ...validFiles.map(f => URL.createObjectURL(f))]);
    };

    const removeNewFile = (index: number) => {
        const updated = [...newMedia];
        updated.splice(index, 1);
        setNewMedia(updated);
        const updatedPreviews = [...newPreviews];
        URL.revokeObjectURL(updatedPreviews[index]);
        updatedPreviews.splice(index, 1);
        setNewPreviews(updatedPreviews);
    };

    const markForDelete = async (mediaId: number) => {
        setDeletingMediaIds(prev => new Set(prev).add(mediaId));
        try {
            await deleteAlbumMedia({ slug: album?.slug ?? id, mediaId }).unwrap();
            setExistingMedia(prev => prev.filter(m => m.id !== mediaId));
            toast.success("Image deleted");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete image");
        } finally {
            setDeletingMediaIds(prev => {
                const next = new Set(prev);
                next.delete(mediaId);
                return next;
            });
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) { toast.error("Album title is required"); return; }
        const formData = new FormData();
        formData.append("title", title);
        if (subtitle) formData.append("subtitle", subtitle);
        newMedia.forEach(f => formData.append("media[]", f));

        try {
            await updateAlbum({ id: album?.slug ?? id, data: formData }).unwrap();
            toast.success("Album updated successfully");
            router.push("/sub-admin/gallery");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update album");
        }
    };

    const album = albumResponse?.data;

    return (
        <>
            <SubAdminSidebar />
            <SidebarInset className="flex flex-col flex-1 min-w-0">
                <DashboardNavbar userName="Admin User" userRole="Super Admin" userInitials="AD" />

                {isFetching ? (
                    <main className="flex-1 flex items-center justify-center bg-white">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </main>
                ) : (
                    <main className="flex-1 overflow-y-auto p-6 bg-white">
                        <div className="max-w-6xl mx-auto">

                            {/* Header row */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-[22px] font-bold text-[#111827]">{album?.title || "Edit Album"}</h1>
                                    <p className="text-[13px] text-gray-500 mt-0.5">Manage Gallery</p>
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 bg-[#155DFC] text-white text-[13px] font-semibold px-4 py-2 rounded-md transition-colors"
                                >
                                    <span className="text-lg leading-none">+</span> Add Image
                                </button>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/png, image/jpeg, image/webp"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* Title & Subtitle inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[12px] font-semibold text-[#374151]">Album Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="h-10 px-3 border border-gray-200 bg-gray-50 text-[13px] text-gray-800 rounded focus:outline-none focus:border-[#6D28D9] transition-colors"
                                        placeholder="Enter album title"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[12px] font-semibold text-[#374151]">Subtitle</label>
                                    <input
                                        type="text"
                                        value={subtitle}
                                        onChange={e => setSubtitle(e.target.value)}
                                        className="h-10 px-3 border border-gray-200 bg-gray-50 text-[13px] text-gray-800 rounded focus:outline-none focus:border-[#6D28D9] transition-colors"
                                        placeholder="Enter subtitle (optional)"
                                    />
                                </div>
                            </div>

                            {/* Photo grid */}
                            {(existingMedia.length > 0 || newPreviews.length > 0) && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                                    {existingMedia.map((media: any) => {
                                        const src = media.url || `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${media.path}`;
                                        return (
                                            <div key={media.id} className="relative border border-gray-200 rounded overflow-hidden bg-gray-100 aspect-square">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={src}
                                                    alt={media.name || "Album image"}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // fallback: show placeholder if image fails
                                                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3C/svg%3E";
                                                    }}
                                                />
                                                <button
                                                    onClick={() => markForDelete(media.id)}
                                                    disabled={deletingMediaIds.has(media.id)}
                                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-red-500 bg-white/80 px-3 py-1 rounded shadow-sm hover:bg-white transition-colors disabled:opacity-60 flex items-center gap-1 whitespace-nowrap"
                                                >
                                                    {deletingMediaIds.has(media.id)
                                                        ? <><Loader2 className="h-3 w-3 animate-spin" /> Deleting...</>
                                                        : "Delete"
                                                    }
                                                </button>
                                            </div>
                                        );
                                    })}
                                    {newPreviews.map((preview, index) => (
                                        <div key={`new-${index}`} className="relative border-2 border-indigo-300 rounded overflow-hidden bg-gray-100 aspect-square">
                                            <img src={preview} alt={`New ${index}`} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => removeNewFile(index)}
                                                className="absolute bottom-0 right-0 text-[11px] font-bold text-red-500 bg-white/90 px-2 py-1 hover:bg-white transition-colors"
                                            >
                                                Remove
                                            </button>
                                            <span className="absolute top-1 left-1 text-[9px] font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded">NEW</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Empty state */}
                            {existingMedia.length === 0 && newPreviews.length === 0 && !isFetching && (
                                <div className="border-2 border-dashed border-gray-200 rounded-lg py-16 flex flex-col items-center justify-center mb-8 text-gray-400">
                                    <p className="text-sm font-medium">No images in this album yet</p>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="mt-3 text-sm text-[#6D28D9] font-semibold hover:underline"
                                    >
                                        + Click to add images
                                    </button>
                                </div>
                            )}

                            {/* Bottom actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link href="/sub-admin/gallery">
                                    <button className="px-5 py-2 text-[13px] font-medium text-gray-700 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isUpdating}
                                    className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-[#155DFC] rounded transition-colors disabled:opacity-60"
                                >
                                    {isUpdating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                    Save Album
                                </button>
                            </div>

                        </div>
                    </main>
                )}
            </SidebarInset>
        </>
    );
}
