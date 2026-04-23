"use client";

import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useGetAllAlbumsQuery, useDeleteAlbumMutation } from "@/redux/api/adminApi";
import Link from "next/link";

// Mock data based on provided image
const initialGalleryItems = [
  { id: 1, title: "Campaign Rally in Lagos", date: "Oct 12, 2023", category: "Rallies", image: "https://images.unsplash.com/photo-1540910419892-f39a62a15242?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Youth Engagement Forum", date: "Oct 15, 2023", category: "Meetings", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Townhall Meeting - Abuja", date: "Oct 18, 2023", category: "Meetings", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Community Outreach", date: "Oct 20, 2023", category: "Outreach", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Supporters Parade", date: "Oct 22, 2023", category: "Rallies", image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Strategic Planning", date: "Oct 25, 2023", category: "Internal", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
];

export default function GalleryManagementPage() {
  const { data: albumsResponse, isLoading: isLoadingAlbums } = useGetAllAlbumsQuery();
  const albums: any[] = albumsResponse?.data || [];

  const [deleteAlbum] = useDeleteAlbumMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string, title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDeleteClick = (id: string, title: string) => {
    setSelectedItem({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    setIsDeleting(true);
    try {
      await deleteAlbum(selectedItem.id).unwrap();
      toast.success("Album removed successfully");
    } catch (error) {
      toast.error("Failed to delete album");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gallery</h1>
                <p className="text-base text-gray-500 mt-1">
                  Manage Gallery
                </p>
              </div>
              <Link href="/admin/gallery/add" className="flex items-center bg-[#155DFC] text-white font-semibold gap-2 h-11 px-6 rounded-none transition-all text-sm shadow-sm">
                <Plus className="h-5 w-5" />
                Add Album
              </Link>
            </div>

            {/* Gallery List */}
            <div className="flex flex-col gap-4 text-left">
              {isLoadingAlbums ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                albums?.map((album: any) => {
                  return (
                    <Card key={album.id} className="border border-black/20 bg-white rounded-none shadow-none hover:shadow transition-all overflow-hidden group">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-bold text-gray-900">{album.title}</h3>
                          <p className="text-sm text-gray-500">{album.description || "The moments between the milestones."}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 text-gray-700 border-gray-200 hover:bg-gray-50 font-medium"
                          >
                            <Link href={`/admin/gallery/edit/${album.slug ?? album.id}`}>
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 text-red-600 border-gray-200 hover:bg-red-50 font-medium"
                            onClick={() => handleDeleteClick(album.slug ?? album.id, album.title)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })

              )}

              {!isLoadingAlbums && albums?.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
                  <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No albums found. Create your first album!</p>
                </div>
              )}
            </div>

            {/* Standardized Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className="max-w-[400px]">
                <DialogHeader className="items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <DialogTitle className="text-xl font-bold text-center">Remove from Gallery?</DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedItem?.title}"</span>? This item will be permanently removed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:flex-1 h-11 border-gray-200">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="w-full sm:flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-medium"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Delete Album"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
