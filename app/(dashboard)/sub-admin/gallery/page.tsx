"use client";

import { useState } from "react";
import SubAdminSidebar from "@/components/dashboard/SubAdminSidebar";
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
  const [items, setItems] = useState(initialGalleryItems);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: number, title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: number, title: string) => {
    setSelectedItem({ id, title });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    setIsDeleting(true);
    try {
      // Simulate API call since adminApi doesn't have deleteGallery yet
      await new Promise(resolve => setTimeout(resolve, 800));
      setItems(items.filter(item => item.id !== selectedItem.id));
      toast.success("Image removed from gallery");
    } catch (error) {
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <SubAdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Sub Admin User"
          userRole="Sub Admin"
          userInitials="SA"
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage campaign photos and media events
                </p>
              </div>
              <Button className="bg-[#155DFC] hover:bg-[#1458ec] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                <Plus className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {items.map((item) => (
                <Card key={item.id} className="group border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all rounded-xl">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Action Bar Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-9 w-9 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 border-none shadow-sm rounded-lg backdrop-blur-sm transition-all"
                          onClick={() => handleDeleteClick(item.id, item.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2 text-left">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium uppercase tracking-wider">
                      <span>{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add More Placeholder */}
              <button className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-[#155DFC] hover:border-[#155DFC] hover:bg-blue-50/30 transition-all group">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="font-semibold">Add New Photo</span>
              </button>
            </div>

            {/* Standardized Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-[400px]">
                    <DialogHeader className="items-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                        <DialogTitle className="text-xl font-bold text-center">Remove from Gallery?</DialogTitle>
                        <DialogDescription className="text-center text-gray-600">
                            Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedItem?.title}"</span>? This image will be permanently removed from the website.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:flex-1 h-11 border-gray-200 font-medium">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="w-full sm:flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-medium"
                        >
                            {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Delete Photo"
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