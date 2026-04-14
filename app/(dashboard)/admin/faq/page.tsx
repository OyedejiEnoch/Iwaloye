"use client";

import { useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Edit2,
  Trash2,
  SquarePen,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useGetAllFaqsQuery, useDeleteFaqMutation } from "@/redux/api/adminApi";
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

export default function FAQManagementPage() {
  const { data: faqsData, isLoading, isError } = useGetAllFaqsQuery();

  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<{ id: string, question: string } | null>(null);

  const handleDeleteClick = (id: string, question: string) => {
    setSelectedFaq({ id, question });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedFaq) return;
    try {
      // Ensure numeric ID for backend compatibility
      const idToSubmit = !isNaN(Number(selectedFaq.id)) ? Number(selectedFaq.id) : selectedFaq.id;
      await deleteFaq(idToSubmit as any).unwrap();
      toast.success("FAQ deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete FAQ");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedFaq(null);
    }
  };

  const faqList = faqsData?.data || (Array.isArray(faqsData) ? faqsData : []);

  return (
    <>
      <AdminSidebar />
      <SidebarInset className="flex flex-col flex-1 min-w-0">
        <DashboardNavbar
          userName="Admin User"
          userRole="Super Admin"
          userInitials="AD"
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50 bg-white">
          <div className="max-w-8xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage frequently asked questions
                </p>
              </div>
              <Link href="/admin/faq/add">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium gap-2 h-10 px-6 rounded-lg transition-all shadow-sm">
                  <Plus className="h-4 w-4" />
                  Add FAQ
                </Button>
              </Link>
            </div>

            <div className="bg-[#F9FAFB] p-6">
              {/* Main Content Area */}
              <Card className="border-gray-200 shadow-sm overflow-hidden rounded">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-800 px-2">All FAQs</h2>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-b border-gray-100">
                          <TableHead className="py-4 px-6 text-xs font-semibold text-gray-600 w-[40%]">Question</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold text-gray-600 w-[20%] ">Category</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold text-gray-600">Date Published</TableHead>
                          <TableHead className="py-4 px-4 text-xs font-semibold text-gray-600 w-[30%] text-center">Views</TableHead>
                          <TableHead className="py-4 px-6 text-xs font-semibold text-gray-600 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                              <div className="flex flex-col items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-2" />
                                <p className="text-sm font-medium">Loading FAQs...</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : faqList.length > 0 ? (
                          faqList.map((faq: any) => (
                            <TableRow key={faq.id || faq._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                              <TableCell className="py-4 px-6 font-medium text-gray-900">
                                {faq.question}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600">
                                {faq.category || "General"}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600">
                                {faq.created_at ? new Date(faq.created_at).toLocaleDateString() : (faq.datePublished || "N/A")}
                              </TableCell>
                              <TableCell className="py-4 px-4 text-sm text-gray-600 text-center">
                                {faq.views || 0}
                              </TableCell>
                              <TableCell className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Link href={`/admin/faq/edit/${faq.id || faq._id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#155DFC] hover:bg-[#155DFC]/5 rounded-lg transition-colors">
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    onClick={() => handleDeleteClick(faq.id || faq._id, faq.question)}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting && selectedFaq?.id === (faq.id || faq._id) ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                              <div className="flex flex-col items-center justify-center">
                                <AlertCircle className="h-8 w-8 text-gray-300 mb-2" />
                                <p className="text-lg font-medium text-gray-900">No FAQs yet</p>
                                <p className="text-sm text-gray-500 mt-1">Add frequently asked questions to help your users</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-[400px]">
                  <DialogHeader className="items-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                    <DialogTitle className="text-xl font-bold text-center">Delete FAQ?</DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                      Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedFaq?.question}"</span>? This action cannot be undone.
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
                        "Delete FAQ"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
