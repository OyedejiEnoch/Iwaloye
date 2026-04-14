"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle
} from "lucide-react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import Link from "next/link";
import { useGetAllLeadersQuery, useDeleteLeaderMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function LeaderManagementPage() {
  const { data: leadersData, isLoading } = useGetAllLeadersQuery();
  const [deleteLeader, { isLoading: isDeleting }] = useDeleteLeaderMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<{ id: string, name: string } | null>(null);

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedLeader({ id, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLeader) return;
    try {
      const idToSubmit = !isNaN(Number(selectedLeader.id)) ? Number(selectedLeader.id) : selectedLeader.id;
      await deleteLeader(idToSubmit as any).unwrap();
      toast.success("Leader deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete leader");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedLeader(null);
    }
  };

  const leaders = leadersData?.data || [];

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
          <div className="max-w-7xl mx-auto">
            {/* Header section matching mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-[#111827]">Meet Our Leaders</h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  Manage leadership team profiles
                </p>
              </div>
              <Link href="/admin/leaders/add">
                <Button className="bg-[#155DFC] hover:bg-[#155DFC] text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add Leader
                </Button>
              </Link>
            </div>

            {/* Container Area */}
            <div className="bg-[#F9FAFB] border border-gray-100/50 rounded-xl p-6">
              <div className="mb-6 flex items-center">
                <h2 className="text-sm font-semibold text-[#374151]">Published Articles</h2>
              </div>

              {/* Grid layout matching mockup - 4 columns on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-400">
                    <Loader2 className="h-8 w-8 animate-spin text-[#6B21A8] mb-2" />
                    <p className="text-sm">Loading leaders...</p>
                  </div>
                ) : leaders.length > 0 ? (
                  leaders.map((leader: any) => (
                    <Card key={leader.id || leader._id} className="border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-lg group">
                      {/* Square Image Container */}
                      <div className="aspect-square relative bg-gray-50 overflow-hidden border-b border-gray-50">
                        {leader.image ? (
                          <img
                            src={leader.image}
                            alt={leader.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#F3F4F6]">
                            <div className="w-full h-full bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4 flex flex-col items-start gap-1">
                        <h3 className="font-bold text-[#111827] text-base leading-tight">
                          {leader.full_name}
                        </h3>
                        <p className="text-xs text-[#6B7280] font-medium leading-tight">
                          {leader.position}
                        </p>

                        {/* Action footer matching mockup style */}
                        <div className="flex items-center gap-2 w-full mt-4">
                          <Link href={`/admin/leaders/edit/${leader.id || leader._id}`} className="flex-1">
                            <Button variant="outline" className="w-full h-9 gap-2 text-xs font-semibold border-gray-200 text-[#374151] hover:bg-gray-50 uppercase tracking-wider">
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 border-gray-100 text-red-500 hover:bg-red-50 hover:border-red-100 transition-colors"
                            onClick={() => handleDeleteClick(leader.id || leader._id, leader.full_name)}
                            disabled={isDeleting}
                          >
                            {isDeleting && selectedLeader?.id === (leader.id || leader._id) ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-20 bg-white border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-gray-500">No leaders found. Click "Add Leader" to create one.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Standardized Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className="max-w-[400px]">
                <DialogHeader className="items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <DialogTitle className="text-xl font-bold text-center">Delete Leader?</DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedLeader?.name}"</span>? This action cannot be undone.
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
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      "Delete Leader"
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
